import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { BUSINESS_INFO } from '../src/data/business.ts';
import { validateContactPayload } from '../src/lib/validation.ts';

const contactRateLimitMap = new Map<string, { count: number; resetAt: number }>();
const recentSubmissions = new Map<string, number>();

export function checkBucketLimit(
  map: Map<string, { count: number; resetAt: number }>,
  ip: string,
  maxRequests: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const entry = map.get(ip);
  if (!entry || entry.resetAt < now) {
    map.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) {
    return false;
  }
  entry.count += 1;
  return true;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatEnquiryPlainText(
  d: NonNullable<ReturnType<typeof validateContactPayload>['sanitized']>
): string {
  return [
    `New Project Enquiry — ${BUSINESS_INFO.name}`,
    `Full Name: ${d.fullName}`,
    `Business Name: ${d.businessName || 'Not provided'}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone}`,
    `Service Required: ${d.service}`,
    `Project Budget: ${d.budget || 'Not specified'}`,
    `Project Timeline: ${d.timeline || 'Flexible / Exploring'}`,
    '',
    'Project Description:',
    d.description,
  ].join('\n');
}

function formatEnquiryHtml(
  d: NonNullable<ReturnType<typeof validateContactPayload>['sanitized']>
): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#050404;border:1px solid #EAEAEA;border-radius:12px;padding:24px;">
      <h2 style="color:#1D0D42;margin-top:0;">New Project Enquiry — Aasra Web Devs</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;font-weight:bold;">Full Name:</td><td>${escapeHtml(d.fullName)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Business:</td><td>${escapeHtml(d.businessName || 'Not provided')}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Email:</td><td>${escapeHtml(d.email)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Phone:</td><td>${escapeHtml(d.phone)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Service:</td><td>${escapeHtml(d.service)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Budget:</td><td>${escapeHtml(d.budget || 'Not specified')}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Timeline:</td><td>${escapeHtml(d.timeline || 'Flexible / Exploring')}</td></tr>
      </table>
      <div style="margin-top:16px;padding:14px;background:#F7F7FA;border-radius:8px;">
        <strong>Message / Project Brief:</strong>
        <p style="white-space:pre-wrap;margin:8px 0 0;">${escapeHtml(d.description)}</p>
      </div>
    </div>
  `;
}

export interface ContactProcessResult {
  statusCode: number;
  payload: Record<string, unknown>;
}

export async function processContactSubmission(
  rawBody: unknown,
  clientIp: string
): Promise<ContactProcessResult> {
  if (!checkBucketLimit(contactRateLimitMap, clientIp, 8, 15 * 60 * 1000)) {
    return {
      statusCode: 429,
      payload: {
        ok: false,
        code: 'RATE_LIMITED',
        message: 'Too many requests in a short period. Please wait a few minutes or message us on WhatsApp.',
      },
    };
  }

  const bodyObj = (rawBody && typeof rawBody === 'object' ? rawBody : {}) as Record<string, unknown>;

  if (typeof bodyObj.companyWebsite === 'string' && bodyObj.companyWebsite.trim().length > 0) {
    return {
      statusCode: 400,
      payload: {
        ok: false,
        code: 'VALIDATION_FAILED',
        message: 'Submission rejected by spam protection.',
      },
    };
  }

  const validation = validateContactPayload(bodyObj);
  if (!validation.valid || !validation.sanitized) {
    return {
      statusCode: 400,
      payload: {
        ok: false,
        code: 'VALIDATION_FAILED',
        message: 'Please correct the highlighted fields before submitting.',
        errors: validation.errors,
      },
    };
  }

  const d = validation.sanitized;

  const now = Date.now();
  for (const [k, ts] of recentSubmissions.entries()) {
    if (now - ts > 3 * 60 * 1000) recentSubmissions.delete(k);
  }
  const fingerprint = crypto
    .createHash('sha256')
    .update(`${d.email}|${d.service}|${d.description}`)
    .digest('hex');

  if (recentSubmissions.has(fingerprint)) {
    return {
      statusCode: 409,
      payload: {
        ok: false,
        code: 'DUPLICATE_SUBMISSION',
        message:
          'This project enquiry was already submitted moments ago. You can continue on WhatsApp or adjust your brief if needed.',
      },
    };
  }

  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || BUSINESS_INFO.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim() || toEmail;

  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  if (smtpHost && smtpUser && smtpPass) {
    try {
      const port = Number(process.env.SMTP_PORT || 465);
      const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465;
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port,
        secure,
        auth: { user: smtpUser, pass: smtpPass },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
      });

      await transporter.sendMail({
        from: `"Aasra Web Devs Website" <${fromEmail}>`,
        to: toEmail,
        replyTo: d.email,
        subject: `New Aasra Web Devs Enquiry: ${d.service} — ${d.fullName}`,
        text: formatEnquiryPlainText(d),
        html: formatEnquiryHtml(d),
      });

      recentSubmissions.set(fingerprint, now);
      return {
        statusCode: 200,
        payload: {
          ok: true,
          delivered: true,
          channel: 'email',
          message: `Your enquiry has been sent to ${toEmail}. Our team will respond shortly.`,
        },
      };
    } catch {
      return {
        statusCode: 502,
        payload: {
          ok: false,
          code: 'DELIVERY_FAILED',
          message: `SMTP email delivery failed. Please copy your brief or message us on WhatsApp (${BUSINESS_INFO.whatsappNumber}).`,
        },
      };
    }
  }

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    try {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL?.trim() || 'onboarding@resend.dev',
          to: [toEmail],
          reply_to: d.email,
          subject: `New Aasra Web Devs Enquiry: ${d.service} — ${d.fullName}`,
          text: formatEnquiryPlainText(d),
          html: formatEnquiryHtml(d),
        }),
      });
      if (!emailRes.ok) {
        throw new Error(`Resend status ${emailRes.status}`);
      }
      recentSubmissions.set(fingerprint, now);
      return {
        statusCode: 200,
        payload: {
          ok: true,
          delivered: true,
          channel: 'email',
          message: `Your enquiry has been emailed to ${toEmail}. We will respond shortly.`,
        },
      };
    } catch {
      return {
        statusCode: 502,
        payload: {
          ok: false,
          code: 'DELIVERY_FAILED',
          message: `Email delivery failed right now. Please continue via WhatsApp (${BUSINESS_INFO.whatsappNumber}) or email ${toEmail} directly.`,
        },
      };
    }
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (webhookUrl) {
    try {
      const webhookRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'aasra-web-devs-contact',
          recipientEmail: toEmail,
          submittedAt: new Date().toISOString(),
          enquiry: d,
        }),
      });
      if (!webhookRes.ok) {
        throw new Error(`Webhook status ${webhookRes.status}`);
      }
      recentSubmissions.set(fingerprint, now);
      return {
        statusCode: 200,
        payload: {
          ok: true,
          delivered: true,
          channel: 'webhook',
          message: `Your enquiry has been forwarded to the Aasra Web Devs team (${toEmail}).`,
        },
      };
    } catch {
      return {
        statusCode: 502,
        payload: {
          ok: false,
          code: 'DELIVERY_FAILED',
          message: 'Could not reach the configured enquiry endpoint. Please continue via WhatsApp or copy your brief.',
        },
      };
    }
  }

  recentSubmissions.set(fingerprint, now);
  return {
    statusCode: 200,
    payload: {
      ok: false,
      delivered: false,
      code: 'DELIVERY_NOT_CONFIGURED',
      recipientEmail: toEmail,
      message: `Your project brief is validated for ${toEmail}, but automated email delivery is not active on this server yet. You can continue immediately via WhatsApp or copy your brief below.`,
    },
  };
}
