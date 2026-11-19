import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, Copy, Loader2 } from 'lucide-react';
import {
  ALL_SERVICE_NAMES,
  BUDGET_OPTIONS,
  ContactFormInput,
  TIMELINE_OPTIONS,
  validateContactPayload,
} from '../../lib/validation';
import {
  BUSINESS_INFO,
  buildWhatsAppServiceMessage,
  buildWhatsAppUrl,
} from '../../data/business';
import { ActionButton } from '../ui/ActionButton';
import { WhatsAppIcon } from '../ui/SocialIcons';

type SubmissionState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'delivered'; message: string; channel: string }
  | { status: 'not_configured'; message: string; summaryText: string }
  | { status: 'error'; message: string };

export const ContactForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';

  const [form, setForm] = useState<ContactFormInput>({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    service: (ALL_SERVICE_NAMES as readonly string[]).includes(initialService) ? initialService : '',
    budget: '',
    timeline: '',
    description: '',
    consent: false,
    companyWebsite: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({});
  const [submission, setSubmission] = useState<SubmissionState>({ status: 'idle' });
  const [copied, setCopied] = useState(false);
  const inFlightRef = useRef(false);

  useEffect(() => {
    const paramService = searchParams.get('service');
    if (paramService && (ALL_SERVICE_NAMES as readonly string[]).includes(paramService)) {
      setForm((prev) => ({ ...prev, service: paramService }));
    }
  }, [searchParams]);

  const updateField = <K extends keyof ContactFormInput>(key: K, value: ContactFormInput[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const buildSummaryText = () =>
    [
      `AASRA Web Devs — Project Brief`,
      `Full Name: ${form.fullName}`,
      `Business Name: ${form.businessName || 'Not specified'}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Service Required: ${form.service}`,
      `Project Budget: ${form.budget || 'Not specified'}`,
      `Project Timeline: ${form.timeline || 'Flexible / Exploring'}`,
      ``,
      `Project Description:`,
      form.description,
    ].join('\n');

  const whatsappUrl = buildWhatsAppUrl(
    buildWhatsAppServiceMessage({
      service: form.service || undefined,
      fullName: form.fullName || undefined,
      businessName: form.businessName || undefined,
      email: form.email || undefined,
      phone: form.phone || undefined,
      budget: form.budget || undefined,
      timeline: form.timeline || undefined,
      description: form.description || undefined,
    })
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inFlightRef.current || submission.status === 'submitting') return;
    setCopied(false);

    const validation = validateContactPayload(form);
    if (!validation.valid) {
      setFieldErrors(validation.errors);
      setSubmission({
        status: 'error',
        message: 'Please review and complete all required fields.',
      });
      return;
    }

    inFlightRef.current = true;
    setFieldErrors({});
    setSubmission({ status: 'submitting' });

    try {
      const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();
      const targetEndpoint = formspreeEndpoint || '/api/contact';

      const response = await fetch(targetEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      });

      const contentType = response.headers.get('content-type') || '';

      // Static hosting (e.g., GitHub Pages) returns 404/405 or HTML instead of a JSON API response
      if (
        !formspreeEndpoint &&
        (response.status === 404 || response.status === 405 || !contentType.includes('application/json'))
      ) {
        setSubmission({
          status: 'not_configured',
          message:
            'Your project brief has been validated. Send it directly via WhatsApp, open it in your email client, or copy the formatted brief below.',
          summaryText: buildSummaryText(),
        });
        return;
      }

      const data = await response.json();

      if (response.ok && (data.delivered || formspreeEndpoint)) {
        setSubmission({
          status: 'delivered',
          message: data.message || 'Your enquiry has been received by AASRA Web Devs.',
          channel: data.channel || 'email',
        });
        return;
      }

      if (data.code === 'DELIVERY_NOT_CONFIGURED') {
        setSubmission({
          status: 'not_configured',
          message: data.message,
          summaryText: buildSummaryText(),
        });
        return;
      }

      if (data.errors) {
        setFieldErrors(data.errors);
      }

      setSubmission({
        status: 'error',
        message: data.message || 'Unable to submit enquiry right now. Please try again.',
      });
    } catch {
      setSubmission({
        status: 'not_configured',
        message:
          'Your project brief has been validated. You can send it right now via WhatsApp, your email app, or copy the brief below.',
        summaryText: buildSummaryText(),
      });
    } finally {
      inFlightRef.current = false;
    }
  };

  const handleCopySummary = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-[#050404]/15 bg-white px-4 py-3 text-sm text-[#050404] placeholder:text-[#050404]/40 focus:border-[#6327FB] focus:ring-2 focus:ring-[#6327FB]/20 focus:outline-none transition-colors';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot anti-spam field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Company Website</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.companyWebsite}
          onChange={(e) => updateField('companyWebsite', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className="block font-display text-xs font-semibold uppercase tracking-wider text-[#1D0D42] mb-2">
            Full Name *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            placeholder="Your full name"
            value={form.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            aria-invalid={Boolean(fieldErrors.fullName)}
            className={inputClass}
          />
          {fieldErrors.fullName && (
            <p className="mt-1.5 text-xs text-red-700 font-medium">{fieldErrors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="businessName" className="block font-display text-xs font-semibold uppercase tracking-wider text-[#1D0D42] mb-2">
            Business Name
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            placeholder="Company or brand name (optional)"
            value={form.businessName}
            onChange={(e) => updateField('businessName', e.target.value)}
            className={inputClass}
          />
          {fieldErrors.businessName && (
            <p className="mt-1.5 text-xs text-red-700 font-medium">{fieldErrors.businessName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block font-display text-xs font-semibold uppercase tracking-wider text-[#1D0D42] mb-2">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            className={inputClass}
          />
          {fieldErrors.email && (
            <p className="mt-1.5 text-xs text-red-700 font-medium">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block font-display text-xs font-semibold uppercase tracking-wider text-[#1D0D42] mb-2">
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            aria-invalid={Boolean(fieldErrors.phone)}
            className={inputClass}
          />
          {fieldErrors.phone && (
            <p className="mt-1.5 text-xs text-red-700 font-medium">{fieldErrors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block font-display text-xs font-semibold uppercase tracking-wider text-[#1D0D42] mb-2">
          Service Required *
        </label>
        <select
          id="service"
          name="service"
          required
          value={form.service}
          onChange={(e) => updateField('service', e.target.value)}
          aria-invalid={Boolean(fieldErrors.service)}
          className={inputClass}
        >
          <option value="">Select one of our twelve services</option>
          {ALL_SERVICE_NAMES.map((svc) => (
            <option key={svc} value={svc}>
              {svc}
            </option>
          ))}
        </select>
        {fieldErrors.service && (
          <p className="mt-1.5 text-xs text-red-700 font-medium">{fieldErrors.service}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="budget" className="block font-display text-xs font-semibold uppercase tracking-wider text-[#1D0D42] mb-2">
            Project Budget <span className="font-normal text-[#050404]/55">(optional)</span>
          </label>
          <select
            id="budget"
            name="budget"
            value={form.budget}
            onChange={(e) => updateField('budget', e.target.value)}
            aria-invalid={Boolean(fieldErrors.budget)}
            className={inputClass}
          >
            <option value="">Select estimated budget (optional)</option>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {fieldErrors.budget && (
            <p className="mt-1.5 text-xs text-red-700 font-medium">{fieldErrors.budget}</p>
          )}
        </div>

        <div>
          <label htmlFor="timeline" className="block font-display text-xs font-semibold uppercase tracking-wider text-[#1D0D42] mb-2">
            Project Timeline <span className="font-normal text-[#050404]/55">(optional)</span>
          </label>
          <select
            id="timeline"
            name="timeline"
            value={form.timeline}
            onChange={(e) => updateField('timeline', e.target.value)}
            aria-invalid={Boolean(fieldErrors.timeline)}
            className={inputClass}
          >
            <option value="">Select target timeline (optional)</option>
            {TIMELINE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {fieldErrors.timeline && (
            <p className="mt-1.5 text-xs text-red-700 font-medium">{fieldErrors.timeline}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block font-display text-xs font-semibold uppercase tracking-wider text-[#1D0D42] mb-2">
          Project Description *
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          placeholder="Tell us about your business goals, scope, and what success looks like..."
          value={form.description}
          onChange={(e) => updateField('description', e.target.value)}
          aria-invalid={Boolean(fieldErrors.description)}
          className={inputClass}
        />
        {fieldErrors.description && (
          <p className="mt-1.5 text-xs text-red-700 font-medium">{fieldErrors.description}</p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => updateField('consent', e.target.checked)}
            className="mt-1 h-4 w-4 accent-[#6327FB] rounded cursor-pointer shrink-0"
          />
          <span className="text-xs text-[#050404]/75 leading-relaxed">
            I agree to AASRA Web Devs processing this enquiry in accordance with the{' '}
            <Link to="/privacy-policy" className="underline text-[#6327FB] hover:text-[#1D0D42]">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {fieldErrors.consent && (
          <p className="mt-1.5 text-xs text-red-700 font-medium">{fieldErrors.consent}</p>
        )}
      </div>

      {/* Submission Feedback States */}
      {submission.status === 'error' && (
        <div role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{submission.message}</span>
        </div>
      )}

      {submission.status === 'delivered' && (
        <div role="status" className="rounded-xl border border-[#6327FB]/30 bg-[#1D0D42] text-white p-5 space-y-3">
          <div className="flex items-center gap-2.5 text-[#A786FC] font-display font-semibold text-sm">
            <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
            <span>Enquiry Sent to {BUSINESS_INFO.email} ({submission.channel})</span>
          </div>
          <p className="text-sm text-white/85">{submission.message}</p>
          <div className="pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-xs font-display font-semibold text-white hover:border-[#A786FC] hover:text-[#A786FC] transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>Open Follow-up in WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {submission.status === 'not_configured' && (
        <div role="status" className="rounded-2xl border border-[#1D0D42]/20 bg-[#EAEAEA]/60 p-5 space-y-3 text-sm text-[#050404]">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#6327FB] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-display font-bold text-[#1D0D42]">
                Enquiry Validated &amp; Ready to Send
              </p>
              <p className="mt-1 text-xs text-[#050404]/75 leading-relaxed">
                {submission.message}{' '}
                <a href={BUSINESS_INFO.emailHref} className="underline text-[#6327FB] font-medium">
                  {BUSINESS_INFO.email}
                </a>
              </p>
            </div>
          </div>
          <pre className="rounded-xl bg-white border border-[#050404]/10 p-3.5 text-xs overflow-x-auto whitespace-pre-wrap text-[#050404]/85">
            {submission.summaryText}
          </pre>
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#6327FB] text-white px-4 py-2 text-xs font-display font-semibold hover:bg-[#1D0D42] transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>Review &amp; Send via WhatsApp</span>
            </a>
            <a
              href={`mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(
                `New Aasra Web Devs Enquiry: ${form.service || 'Project Brief'} — ${form.fullName}`
              )}&body=${encodeURIComponent(submission.summaryText)}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#1D0D42]/25 bg-white text-[#1D0D42] px-4 py-2 text-xs font-display font-semibold hover:border-[#6327FB] hover:text-[#6327FB] transition-colors"
            >
              <span>Send via Email App</span>
            </a>
            <button
              type="button"
              onClick={() => handleCopySummary(submission.summaryText)}
              className="inline-flex items-center gap-2 rounded-full bg-[#1D0D42] text-white px-4 py-2 text-xs font-display font-semibold hover:bg-[#6327FB] transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{copied ? 'Copied Brief Summary' : 'Copy Brief Summary'}</span>
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <ActionButton type="submit" size="lg" disabled={submission.status === 'submitting'}>
            {submission.status === 'submitting' ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                Sending Enquiry...
              </span>
            ) : (
              'Submit Project Enquiry'
            )}
          </ActionButton>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full border border-[#050404]/20 text-sm font-display font-semibold text-[#1D0D42] hover:border-[#6327FB] hover:text-[#6327FB] hover:bg-[#1D0D42]/5 transition-colors whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#6327FB]" />
            <span>Send via WhatsApp</span>
          </a>
        </div>
        <p className="text-xs text-[#050404]/60 leading-relaxed">
          Selecting &ldquo;Send via WhatsApp&rdquo; opens an official WhatsApp chat prefilled with your entered service and project details so you can review and send it yourself.
        </p>
      </div>
    </form>
  );
};
