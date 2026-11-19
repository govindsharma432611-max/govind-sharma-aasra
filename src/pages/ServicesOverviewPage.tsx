import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SERVICE_CATEGORIES, SERVICES } from '../data/services';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ActionButton } from '../components/ui/ActionButton';
import { applyDocumentMetadata } from '../lib/metadata';

export const ServicesOverviewPage: React.FC = () => {
  useEffect(() => {
    applyDocumentMetadata({
      title: 'Services — All 12 Capabilities | AASRA Web Devs',
      description:
        'Explore all twelve AASRA Web Devs services across Development, Creative & Branding, Marketing & Growth, and Technology & Intelligence.',
      path: '/services',
    });
  }, []);

  return (
    <div className="bg-white text-[#050404]">
      <section className="pt-28 pb-14 lg:pt-36 lg:pb-20 border-b border-[#050404]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Services' }]} />
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
            Full-Spectrum Digital Studio
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#1D0D42] max-w-4xl">
            EVERYTHING YOUR BRAND NEEDS TO MOVE FORWARD.
          </h1>
          <p className="mt-5 text-lg text-[#050404]/75 max-w-2xl leading-relaxed">
            Engage us for a single specialised discipline or combine engineering, brand design, marketing, and AI automation into one connected system.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-20">
          {SERVICE_CATEGORIES.map((category) => {
            const items = SERVICES.filter((s) => s.categoryId === category.id);
            return (
              <div key={category.id} className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#050404]/12">
                  <div>
                    <span className="font-display text-xs font-bold uppercase tracking-widest text-[#6327FB] tabular-nums">
                      {category.number} · Discipline
                    </span>
                    <h2 className="mt-1.5 font-display text-3xl sm:text-4xl font-bold text-[#1D0D42]">
                      {category.title}
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-[#050404]/75 max-w-md">
                    {category.summary}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((svc) => (
                    <article
                      key={svc.slug}
                      className="rounded-2xl border border-[#050404]/10 bg-[#EAEAEA]/35 hover:bg-white hover:border-[#6327FB]/40 hover:shadow-[0_18px_40px_-22px_rgba(29,13,66,0.2)] transition-all p-7 flex flex-col justify-between"
                    >
                      <div>
                        <span className="font-display text-xs font-bold text-[#6327FB] tabular-nums">
                          {svc.number}
                        </span>
                        <h3 className="mt-2 font-display text-2xl font-bold text-[#1D0D42]">
                          {svc.name}
                        </h3>
                        <p className="mt-3 text-sm text-[#050404]/75 leading-relaxed">
                          {svc.shortDescription}
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-[#050404]/8">
                        <Link
                          to={`/services/${svc.slug}`}
                          className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-[#1D0D42] hover:text-[#6327FB] transition-colors min-h-[44px]"
                        >
                          <span>Explore {svc.name}</span>
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#1D0D42] text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center space-y-5">
          <h2 className="font-display text-3xl sm:text-5xl font-bold">
            Not Sure Which Combination Fits Best?
          </h2>
          <p className="text-base text-white/80 max-w-xl mx-auto">
            Share your business objective and we will recommend the leanest, highest-impact scope.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <ActionButton to="/contact" size="lg">
              START A PROJECT
            </ActionButton>
            <ActionButton to="/pricing" variant="secondary-dark" size="lg">
              View Pricing &amp; Quotes
            </ActionButton>
          </div>
        </div>
      </section>
    </div>
  );
};
