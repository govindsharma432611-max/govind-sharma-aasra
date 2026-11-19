import React from 'react';
import { ServiceVisualType } from '../../data/services';
import { ResilientImage } from '../ui/ResilientImage';
import { ArrowRight, BarChart3, Bot, CheckCircle2, Globe, Layers, Smartphone, Workflow } from 'lucide-react';

export const ServiceVisualShowcase: React.FC<{ visualType: ServiceVisualType; title: string }> = ({
  visualType,
  title,
}) => {
  switch (visualType) {
    case 'website-mockup':
      return (
        <div className="rounded-2xl border border-[#050404]/10 bg-[#EAEAEA]/60 p-5 sm:p-8 space-y-4">
          <div className="flex items-center justify-between text-xs font-display font-semibold text-[#1D0D42]">
            <span>Responsive Browser &amp; Mobile Architecture</span>
            <Globe className="w-4 h-4 text-[#6327FB]" aria-hidden="true" />
          </div>
          <div className="rounded-xl overflow-hidden border border-[#050404]/10 bg-white">
            <ResilientImage
              src="/src/assets/images/case_web_platform_1795014319169.jpg"
              alt={`${title} responsive website visual showcase`}
              aspectClass="aspect-[16/10]"
            />
          </div>
        </div>
      );

    case 'app-mockup':
      return (
        <div className="rounded-2xl border border-[#050404]/10 bg-[#EAEAEA]/60 p-5 sm:p-8 space-y-4">
          <div className="flex items-center justify-between text-xs font-display font-semibold text-[#1D0D42]">
            <span>Smartphone Interface &amp; Touch Ergonomics</span>
            <Smartphone className="w-4 h-4 text-[#6327FB]" aria-hidden="true" />
          </div>
          <div className="rounded-xl overflow-hidden border border-[#050404]/10 bg-white">
            <ResilientImage
              src="/src/assets/images/case_mobile_app_1795014320945.jpg"
              alt={`${title} mobile interface showcase`}
              aspectClass="aspect-[16/10]"
            />
          </div>
        </div>
      );

    case 'logo-identity':
      return (
        <div className="rounded-2xl border border-[#050404]/10 bg-[#EAEAEA]/60 p-5 sm:p-8 space-y-4">
          <div className="flex items-center justify-between text-xs font-display font-semibold text-[#1D0D42]">
            <span>Brand Identity &amp; Mark Proportions</span>
            <Layers className="w-4 h-4 text-[#6327FB]" aria-hidden="true" />
          </div>
          <div className="rounded-xl overflow-hidden border border-[#050404]/10 bg-white">
            <ResilientImage
              src="/src/assets/images/case_brand_identity_1795014322320.jpg"
              alt={`${title} brand identity presentation`}
              aspectClass="aspect-[16/10]"
            />
          </div>
        </div>
      );

    case 'typography-specimen':
      return (
        <div className="rounded-2xl border border-[#1D0D42]/15 bg-[#1D0D42] text-white p-6 sm:p-10 space-y-6">
          <div className="flex items-center justify-between text-xs font-display uppercase tracking-widest text-[#A786FC]">
            <span>Typographic Scale Specimen</span>
            <span>Bricolage Grotesque · Plus Jakarta Sans</span>
          </div>
          <div className="space-y-3 border-t border-white/15 pt-6">
            <p className="font-display text-4xl sm:text-5xl font-bold tracking-tight">Aa Bb Cc 0123</p>
            <p className="font-display text-xl text-[#A786FC]">Display Weight · Architectural Clarity</p>
            <p className="text-sm text-white/75 max-w-lg leading-relaxed">
              Calibrated line measures, optical tracking, and tabular numeral alignment ensure interfaces remain legible across desktop monitors and compact mobile viewports.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/15 text-xs font-display tabular-nums">
            <div><span className="text-white/50 block">Display</span><span>64px / -0.03em</span></div>
            <div><span className="text-white/50 block">Heading</span><span>36px / -0.02em</span></div>
            <div><span className="text-white/50 block">Body</span><span>16px / 1.6lh</span></div>
          </div>
        </div>
      );

    case 'poster-layout':
      return (
        <div className="rounded-2xl border border-[#050404]/10 bg-[#EAEAEA]/60 p-5 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch">
            <div className="sm:col-span-7 rounded-xl bg-[#1D0D42] text-white p-6 flex flex-col justify-between min-h-[260px]">
              <span className="font-display text-xs uppercase tracking-widest text-[#A786FC]">Key Visual Poster Grid</span>
              <div>
                <p className="font-display text-3xl font-bold leading-none tracking-tight">BUILD DIGITAL.<br />CREATE IMPACT.</p>
                <p className="text-xs text-white/70 mt-3">Print CMYK 300DPI + Digital Multi-Ratio Kit</p>
              </div>
            </div>
            <div className="sm:col-span-5 flex flex-col gap-4">
              <div className="flex-1 rounded-xl bg-white border border-[#050404]/10 p-4 flex flex-col justify-between">
                <span className="font-display text-xs font-semibold text-[#6327FB]">1:1 Feed Layout</span>
                <p className="text-xs text-[#050404]/70">Balanced focal typography with clear action framing.</p>
              </div>
              <div className="flex-1 rounded-xl bg-[#6327FB] text-white p-4 flex flex-col justify-between">
                <span className="font-display text-xs font-semibold text-white/80">9:16 Story Format</span>
                <p className="text-xs text-white/90">Safe-zone margins preserved for mobile overlays.</p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'marketing-strategy':
      return (
        <div className="rounded-2xl border border-[#050404]/10 bg-white p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between text-xs font-display font-semibold uppercase tracking-wider text-[#6327FB]">
            <span>Connected Acquisition Funnel</span>
            <span>Strategy Blueprint</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {[
              { stage: '01. Discovery', desc: 'Search intent & targeted reach' },
              { stage: '02. Consideration', desc: 'Case clarity & proof pages' },
              { stage: '03. Conversion', desc: 'Fast, low-friction brief capture' },
              { stage: '04. Retention', desc: 'CRM nurture & lifecycle touchpoints' },
            ].map((item) => (
              <div key={item.stage} className="rounded-xl bg-[#EAEAEA]/60 p-4 border border-[#050404]/8">
                <p className="font-display text-sm font-bold text-[#1D0D42]">{item.stage}</p>
                <p className="text-xs text-[#050404]/75 mt-1.5 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'campaign-dashboard':
      return (
        <div className="rounded-2xl border border-[#1D0D42]/15 bg-[#1D0D42] text-white p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <span className="font-display text-xs uppercase tracking-widest text-[#A786FC]">Campaign Governance Structure</span>
            <BarChart3 className="w-4 h-4 text-[#A786FC]" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl bg-white/8 border border-white/10 p-4">
              <p className="text-xs text-white/65">Search Intent Layer</p>
              <p className="font-display text-lg font-semibold mt-1">Exact &amp; Phrase Segmentation</p>
            </div>
            <div className="rounded-xl bg-white/8 border border-white/10 p-4">
              <p className="text-xs text-white/65">Creative Matrix</p>
              <p className="font-display text-lg font-semibold mt-1">Structured Hook Testing</p>
            </div>
            <div className="rounded-xl bg-white/8 border border-white/10 p-4">
              <p className="text-xs text-white/65">Attribution Hygiene</p>
              <p className="font-display text-lg font-semibold mt-1">Qualified Enquiry Events</p>
            </div>
          </div>
        </div>
      );

    case 'social-grid':
      return (
        <div className="rounded-2xl border border-[#050404]/10 bg-[#EAEAEA]/60 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between text-xs font-display font-semibold text-[#1D0D42]">
            <span>Editorial Social Content Grid</span>
            <span>Cohesive Visual Rhythm</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { bg: 'bg-[#1D0D42] text-white', label: 'Brand Manifesto' },
              { bg: 'bg-white text-[#1D0D42] border border-[#050404]/10', label: 'Educational Carousel' },
              { bg: 'bg-[#6327FB] text-white', label: 'Product Spotlight' },
              { bg: 'bg-white text-[#1D0D42] border border-[#050404]/10', label: 'Process Breakdown' },
              { bg: 'bg-[#A786FC] text-[#1D0D42]', label: 'Launch Graphic' },
              { bg: 'bg-[#1D0D42] text-white', label: 'Studio Insight' },
            ].map((tile) => (
              <div
                key={tile.label}
                className={`aspect-square rounded-xl p-3 flex items-end font-display text-xs font-semibold ${tile.bg}`}
              >
                {tile.label}
              </div>
            ))}
          </div>
        </div>
      );

    case 'ai-workflow':
      return (
        <div className="rounded-2xl border border-[#050404]/10 bg-[#EAEAEA]/60 p-5 sm:p-8 space-y-5">
          <div className="flex items-center justify-between text-xs font-display font-semibold text-[#1D0D42]">
            <span>Guarded AI Agent Pipeline</span>
            <Bot className="w-4 h-4 text-[#6327FB]" aria-hidden="true" />
          </div>
          <div className="rounded-xl overflow-hidden border border-[#050404]/10 bg-white">
            <ResilientImage
              src="/src/assets/images/case_ai_automation_1795014319906.jpg"
              alt={`${title} workflow architecture visual`}
              aspectClass="aspect-[16/9]"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="rounded-xl bg-white p-3.5 border border-[#050404]/8 font-display font-semibold text-[#1D0D42]">
              1. Grounded Retrieval
            </div>
            <div className="rounded-xl bg-white p-3.5 border border-[#050404]/8 font-display font-semibold text-[#1D0D42]">
              2. Schema-Validated Action
            </div>
            <div className="rounded-xl bg-white p-3.5 border border-[#050404]/8 font-display font-semibold text-[#1D0D42]">
              3. Human Approval Gate
            </div>
          </div>
        </div>
      );

    case 'data-dashboard':
      return (
        <div className="rounded-2xl border border-[#050404]/10 bg-white p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between text-xs font-display font-semibold text-[#1D0D42]">
            <span>Business Intelligence Schema Blueprint</span>
            <BarChart3 className="w-4 h-4 text-[#6327FB]" aria-hidden="true" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#050404]/15 text-[#050404]/60 font-display uppercase tracking-wider">
                  <th className="py-2.5 pr-4">Layer</th>
                  <th className="py-2.5 pr-4">Source Systems</th>
                  <th className="py-2.5">Decision Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#050404]/8 text-[#050404]/85">
                <tr>
                  <td className="py-3 pr-4 font-display font-semibold text-[#1D0D42]">Ingestion</td>
                  <td className="py-3 pr-4">CRM, Web Analytics, Billing</td>
                  <td className="py-3">Normalised single schema</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-display font-semibold text-[#1D0D42]">Modeling</td>
                  <td className="py-3 pr-4">Attribution &amp; Cohort Rules</td>
                  <td className="py-3">Verified metric definitions</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-display font-semibold text-[#1D0D42]">Reporting</td>
                  <td className="py-3 pr-4">Executive BI Views</td>
                  <td className="py-3">Weekly leadership clarity</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'process-diagram':
      return (
        <div className="rounded-2xl border border-[#050404]/10 bg-[#EAEAEA]/60 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between text-xs font-display font-semibold text-[#1D0D42]">
            <span>Automated Operational Sequence</span>
            <Workflow className="w-4 h-4 text-[#6327FB]" aria-hidden="true" />
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {[
              'Enquiry Trigger',
              'Validation & CRM Sync',
              'Team Alert & Workspace',
              'Audit & Retry Guard',
            ].map((node, idx, arr) => (
              <React.Fragment key={node}>
                <div className="flex-1 rounded-xl bg-white border border-[#050404]/10 p-4 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6327FB] shrink-0" aria-hidden="true" />
                  <span className="font-display text-xs font-semibold text-[#1D0D42]">{node}</span>
                </div>
                {idx < arr.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-[#6327FB] hidden sm:block shrink-0" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      );
  }
};
