import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import { getServiceBySlug, SERVICES } from '../data/services';
import { buildWhatsAppServiceMessage, buildWhatsAppUrl } from '../data/business';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ActionButton } from '../components/ui/ActionButton';
import { ServiceVisualShowcase } from '../components/services/ServiceVisualShowcase';
import { WhatsAppIcon } from '../components/ui/SocialIcons';
import { applyDocumentMetadata } from '../lib/metadata';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (service) {
      applyDocumentMetadata({
        title: service.metaTitle,
        description: service.metaDescription,
        path: `/services/${service.slug}`,
      });
    }
  }, [service]);

  if (!service) {
    return (
      <section className="pt-36 pb-24 max-w-4xl mx-auto px-5 text-center space-y-5">
        <h1 className="font-display text-4xl font-bold text-[#1D0D42]">Service Not Found</h1>
        <p className="text-base text-[#050404]/75">
          The requested service page could not be located. Browse all twelve AASRA capabilities below.
        </p>
        <ActionButton to="/services">View All Services</ActionButton>
      </section>
    );
  }

  const related = SERVICES.filter((s) => s.categoryId === service.categoryId && s.slug !== service.slug);
  const serviceWhatsAppUrl = buildWhatsAppUrl(
    buildWhatsAppServiceMessage({ service: service.name })
  );

  return (
    <div className="bg-white text-[#050404]">
      {/* 1. Service-specific Hero */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 border-b border-[#050404]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Services', to: '/services' },
              { label: service.name },
            ]}
          />
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
            {service.number} · {service.category}
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1D0D42] max-w-4xl leading-[1.05]">
            {service.heroHeadline}
          </h1>
          <p className="mt-5 text-lg text-[#050404]/75 max-w-2xl leading-relaxed">
            {service.heroSubheadline}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ActionButton to={`/contact?service=${encodeURIComponent(service.name)}`} size="lg">
              Request a Custom Quote
            </ActionButton>
            <a
              href={serviceWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full border border-[#050404]/20 text-sm font-display font-semibold text-[#1D0D42] hover:border-[#6327FB] hover:text-[#6327FB] transition-colors whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#6327FB]" />
              <span>WhatsApp Enquiry</span>
            </a>
            <ActionButton to="/work" variant="secondary" size="lg">
              Explore Our Work
            </ActionButton>
          </div>
        </div>
      </section>

      {/* 2. Introduction & 7. Category Visual Showcase */}
      <section className="py-16 lg:py-24 bg-[#EAEAEA]/50 border-b border-[#050404]/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1D0D42]">
              Overview: {service.name}
            </h2>
            <p className="text-base text-[#050404]/80 leading-relaxed">
              {service.introduction}
            </p>
          </div>
          <div className="lg:col-span-7">
            <ServiceVisualShowcase visualType={service.visualType} title={service.name} />
          </div>
        </div>
      </section>

      {/* 3. Problems We Solve & 4. Our Capabilities */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1D0D42]">
              Problems We Solve
            </h2>
            <ul className="space-y-4">
              {service.problemsWeSolve.map((problem) => (
                <li
                  key={problem}
                  className="rounded-xl border border-[#050404]/10 bg-[#EAEAEA]/40 p-4 text-sm text-[#050404]/85 leading-relaxed"
                >
                  {problem}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1D0D42]">
              Our Capabilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {service.capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="rounded-2xl border border-[#050404]/10 bg-white p-6"
                >
                  <h3 className="font-display text-lg font-bold text-[#1D0D42]">{cap.title}</h3>
                  <p className="mt-2 text-sm text-[#050404]/75 leading-relaxed">{cap.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Deliverables & 6. Working Process */}
      <section className="py-16 lg:py-24 bg-[#EAEAEA]/55 border-y border-[#050404]/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1D0D42]">
              Key Deliverables
            </h2>
            <ul className="space-y-3">
              {service.deliverables.map((del) => (
                <li key={del} className="flex items-start gap-3 text-sm sm:text-base text-[#050404]/85">
                  <CheckCircle2 className="w-5 h-5 text-[#6327FB] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1D0D42]">
              Working Process
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.processSteps.map((step) => (
                <div key={step.step} className="rounded-2xl bg-white border border-[#050404]/10 p-6">
                  <span className="font-display text-xs font-bold text-[#6327FB] tabular-nums">
                    STEP {step.step}
                  </span>
                  <h3 className="mt-1.5 font-display text-lg font-bold text-[#1D0D42]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#050404]/75 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQs */}
      {service.faqs.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1D0D42] mb-6">
              {service.name} FAQs
            </h2>
            <div className="divide-y divide-[#050404]/12 border-t border-b border-[#050404]/12">
              {service.faqs.map((faq, idx) => {
                const open = openFaq === idx;
                return (
                  <div key={faq.question}>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? null : idx)}
                      className="w-full py-5 flex items-center justify-between gap-4 text-left font-display text-base sm:text-lg font-semibold text-[#1D0D42] cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#6327FB] shrink-0 transition-transform ${
                          open ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {open && (
                      <p className="pb-5 text-sm sm:text-base text-[#050404]/75 leading-relaxed">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Services + 9. Contact CTA */}
      <section className="bg-[#1D0D42] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="max-w-2xl space-y-4">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#A786FC]">
              Start Your {service.name} Project
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
              Ready to Scope Your Requirements?
            </h2>
            <p className="text-base text-white/80">
              Share your timeline and objectives—we will respond with a tailored plan and custom quote.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <ActionButton to={`/contact?service=${encodeURIComponent(service.name)}`} size="lg">
              START A PROJECT
            </ActionButton>
            <a
              href={serviceWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full border border-white/25 text-sm font-display font-semibold text-white hover:border-[#A786FC] hover:text-[#A786FC] transition-colors whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {related.length > 0 && (
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mt-12 pt-8 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs">
            <span className="font-display uppercase tracking-wider text-[#A786FC]">
              Related in {service.category}:
            </span>
            {related.map((rel) => (
              <Link
                key={rel.slug}
                to={`/services/${rel.slug}`}
                className="text-white/80 hover:text-white underline underline-offset-4"
              >
                {rel.name}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
