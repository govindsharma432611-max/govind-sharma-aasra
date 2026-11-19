import React, { useState } from 'react';
import { Check } from 'lucide-react';
import {
  PRICING_CATEGORIES,
  PRICING_COMPARISON_ROWS,
  PRICING_PACKAGES,
} from '../../data/pricing';
import { buildWhatsAppServiceMessage, buildWhatsAppUrl } from '../../data/business';
import { ActionButton } from '../ui/ActionButton';
import { WhatsAppIcon } from '../ui/SocialIcons';

export const PricingSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');

  const visiblePackages =
    selectedCategory === 'All Categories'
      ? PRICING_PACKAGES
      : PRICING_PACKAGES.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-16">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter pricing categories">
        {PRICING_CATEGORIES.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2.5 min-h-[44px] rounded-full font-display text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-[#1D0D42] text-white'
                  : 'bg-[#EAEAEA]/70 text-[#050404]/75 hover:bg-[#EAEAEA] hover:text-[#1D0D42]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePackages.map((pkg) => (
          <article
            key={pkg.id}
            className={`rounded-2xl p-7 flex flex-col justify-between border transition-shadow ${
              pkg.recommended
                ? 'bg-[#1D0D42] text-white border-[#6327FB]'
                : 'bg-white text-[#050404] border-[#050404]/12 hover:shadow-[0_20px_40px_-20px_rgba(29,13,66,0.18)]'
            }`}
          >
            <div>
              <p
                className={`font-display text-xs font-semibold uppercase tracking-wider ${
                  pkg.recommended ? 'text-[#A786FC]' : 'text-[#6327FB]'
                }`}
              >
                {pkg.category}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
                {pkg.packageName}
              </h2>

              <div className="mt-5 pb-5 border-b border-current/10">
                <p className="font-display text-2xl font-bold">{pkg.price}</p>
                <p className={`text-xs mt-1 ${pkg.recommended ? 'text-white/70' : 'text-[#050404]/60'}`}>
                  {pkg.billingPeriod}
                </p>
              </div>

              <p
                className={`mt-5 text-sm leading-relaxed ${
                  pkg.recommended ? 'text-white/80' : 'text-[#050404]/75'
                }`}
              >
                {pkg.summary}
              </p>

              <div className="mt-6">
                <h3 className="font-display text-xs font-semibold uppercase tracking-wider opacity-70 mb-3">
                  Core Features
                </h3>
                <ul className="space-y-2 text-sm">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          pkg.recommended ? 'text-[#A786FC]' : 'text-[#6327FB]'
                        }`}
                        aria-hidden="true"
                      />
                      <span className={pkg.recommended ? 'text-white/85' : 'text-[#050404]/80'}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="font-display text-xs font-semibold uppercase tracking-wider opacity-70 mb-2.5">
                  Deliverables
                </h3>
                <ul className="space-y-1.5 text-xs opacity-80">
                  {pkg.deliverables.map((del) => (
                    <li key={del}>· {del}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <h3 className="font-display text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">
                  Optional Add-Ons
                </h3>
                <ul className="space-y-1 text-xs opacity-75">
                  {pkg.addOns.map((addon) => (
                    <li key={addon}>+ {addon}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 space-y-2.5">
              <ActionButton
                to={`/contact?service=${encodeURIComponent(pkg.packageName)}`}
                variant={pkg.recommended ? 'primary' : 'secondary'}
                className="w-full"
              >
                {pkg.ctaLabel}
              </ActionButton>
              <a
                href={buildWhatsAppUrl(
                  buildWhatsAppServiceMessage({
                    service: `${pkg.packageName} (${pkg.category})`,
                  })
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 min-h-[44px] rounded-full border font-display text-xs font-semibold transition-colors whitespace-nowrap ${
                  pkg.recommended
                    ? 'border-white/25 text-white hover:border-[#A786FC] hover:text-[#A786FC]'
                    : 'border-[#050404]/15 text-[#1D0D42] hover:border-[#6327FB] hover:text-[#6327FB]'
                }`}
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span>WhatsApp Quote</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Comparison Matrix */}
      <section aria-labelledby="pricing-comparison-heading" className="rounded-2xl border border-[#050404]/10 bg-[#EAEAEA]/45 p-6 sm:p-8">
        <h2 id="pricing-comparison-heading" className="font-display text-2xl font-bold text-[#1D0D42]">
          Engagement Comparison
        </h2>
        <p className="mt-2 text-sm text-[#050404]/75 max-w-2xl">
          Whether you require a focused single discipline or an integrated multi-service partnership, every scope receives transparent milestones prior to kickoff.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#050404]/15 font-display text-xs uppercase tracking-wider text-[#1D0D42]">
                <th className="py-3 pr-4">Dimension</th>
                <th className="py-3 pr-4">Single Service</th>
                <th className="py-3 pr-4">Integrated Growth</th>
                <th className="py-3">Custom Business Solutions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#050404]/10 text-[#050404]/80">
              {PRICING_COMPARISON_ROWS.map((row) => (
                <tr key={row.capability}>
                  <td className="py-4 pr-4 font-display font-semibold text-[#1D0D42]">{row.capability}</td>
                  <td className="py-4 pr-4">{row.singleService}</td>
                  <td className="py-4 pr-4">{row.integratedGrowth}</td>
                  <td className="py-4 font-medium text-[#6327FB]">{row.customSolution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
