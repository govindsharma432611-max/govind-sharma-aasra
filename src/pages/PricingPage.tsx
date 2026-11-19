import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { PricingSection } from '../components/pricing/PricingSection';
import { ActionButton } from '../components/ui/ActionButton';
import { WhatsAppIcon } from '../components/ui/SocialIcons';
import { buildWhatsAppUrl } from '../data/business';
import { PRICING_FAQS } from '../data/faq';
import { applyDocumentMetadata } from '../lib/metadata';

export const PricingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    applyDocumentMetadata({
      title: 'Pricing & Custom Quotes — AASRA Web Devs',
      description:
        'Explore AASRA Web Devs service packages across Website Development, Application Development, Branding, Marketing, and AI Automation. Request a Custom Quote.',
      path: '/pricing',
    });
  }, []);

  return (
    <div className="bg-white text-[#050404]">
      <section className="pt-28 pb-14 lg:pt-36 lg:pb-18 border-b border-[#050404]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Pricing' }]} />
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
            Transparent Scoping
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#1D0D42] max-w-4xl">
            PACKAGES BUILT AROUND REAL PROJECT SCOPE.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#050404]/75 max-w-2xl leading-relaxed">
            Every engagement is quoted transparently after reviewing your requirements, integrations, and target timeline—so you never overpay for features you do not need.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <PricingSection />
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="py-16 lg:py-24 bg-[#EAEAEA]/55 border-t border-[#050404]/8">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1D0D42] mb-6">
            Pricing Questions
          </h2>
          <div className="divide-y divide-[#050404]/12 border-t border-b border-[#050404]/12">
            {PRICING_FAQS.map((faq, idx) => {
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

      <section className="bg-[#1D0D42] text-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-5 text-center space-y-5">
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            Need a Clear Proposal for Your Project?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ActionButton to="/contact" size="lg">
              Request a Custom Quote
            </ActionButton>
            <a
              href={buildWhatsAppUrl(
                'Hello Aasra Web Devs Team, I would like to request a custom quote for my project.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full border border-white/25 text-sm font-display font-semibold text-white hover:border-[#A786FC] hover:text-[#A786FC] transition-colors whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
