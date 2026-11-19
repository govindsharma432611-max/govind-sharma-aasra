import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Code2, Cpu, LineChart, Palette } from 'lucide-react';
import { HomeHero } from '../components/hero/HomeHero';
import { FeaturedWorkStack } from '../components/portfolio/FeaturedWorkStack';
import { ActionButton } from '../components/ui/ActionButton';
import { Reveal } from '../components/animations/Reveal';
import { SERVICE_CATEGORIES, SERVICES } from '../data/services';
import { HOME_FAQS } from '../data/faq';
import { applyDocumentMetadata } from '../lib/metadata';

const CATEGORY_ICONS = {
  development: Code2,
  'creative-branding': Palette,
  'marketing-growth': LineChart,
  'technology-intelligence': Cpu,
} as const;

const WHY_AASRA_PILLARS = [
  {
    number: '01',
    title: 'Technology Meets Creativity',
    description:
      'Engineering and brand direction sit in the same room. Websites, applications, and visual systems feel cohesive because they are crafted together.',
  },
  {
    number: '02',
    title: 'Strategy Before Execution',
    description:
      'Every wireframe, ad campaign, and automation pipeline begins with positioning, audience clarity, and measurable commercial goals.',
  },
  {
    number: '03',
    title: 'Solutions Built Around Your Business',
    description:
      'We avoid rigid templates. Whether you need a custom application, visual identity, or AI workflow, the architecture fits your operations.',
  },
  {
    number: '04',
    title: 'Connected Digital Services',
    description:
      'Brand, web platform, marketing acquisition, analytics, and automation reinforce one another instead of fragmenting across disconnected vendors.',
  },
  {
    number: '05',
    title: 'Focus on Practical Business Outcomes',
    description:
      'Clean speed, readable copy, dependable operations, and qualified enquiries—never vanity animations or hollow buzzwords.',
  },
];

const HOME_PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discover',
    description:
      'Audit your business model, audience, existing brand assets, and technical bottlenecks to clarify the highest-leverage priorities.',
  },
  {
    number: '02',
    title: 'Strategise',
    description:
      'Define architecture, user journeys, creative direction, marketing channels, and automation guardrails in a clear roadmap.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Design and engineer websites, applications, visual identities, campaigns, and AI workflows with rigorous quality assurance.',
  },
  {
    number: '04',
    title: 'Grow',
    description:
      'Launch cleanly, measure real commercial signals, refine conversion paths, and scale systems alongside your business.',
  },
];

export const HomePage: React.FC = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  useEffect(() => {
    applyDocumentMetadata({
      title: 'AASRA Web Devs — Digital Engineering, Branding & Growth Studio',
      description:
        'We build digital experiences and growth systems that move businesses forward. Custom websites, apps, branding, marketing, and AI automation.',
      path: '/',
    });
  }, []);

  return (
    <div>
      {/* SECTION 1 — HERO */}
      <HomeHero />

      {/* SECTION 2 — INTRODUCTION */}
      <section className="bg-[#EAEAEA]/60 text-[#050404] py-20 lg:py-28 border-y border-[#050404]/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <Reveal className="lg:col-span-6 space-y-4">
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
                Studio Philosophy
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1D0D42] leading-[1.06]">
                MORE THAN AN AGENCY.
                <br />
                YOUR DIGITAL GROWTH PARTNER.
              </h2>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-6 space-y-5 text-base sm:text-lg text-[#050404]/80 leading-relaxed">
              <p>
                Most businesses are forced to stitch together separate freelancers for branding, software engineering, performance marketing, and internal automation. The result is fragmented customer journeys and slow execution.
              </p>
              <p>
                AASRA Web Devs brings all four disciplines under one roof. We design your brand identity, engineer your web and application infrastructure, build your acquisition engine, and automate manual operations—so every layer works together to move your business forward.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-6">
                <ActionButton to="/about" variant="secondary" size="md">
                  About AASRA
                </ActionButton>
                <Link
                  to="/process"
                  className="font-display text-sm font-semibold text-[#1D0D42] hover:text-[#6327FB] transition-colors underline underline-offset-4"
                >
                  See How We Work
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 3 — SERVICES (4 CATEGORIES, ALL 11 SERVICES) */}
      <section className="bg-white text-[#050404] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#050404]/10">
            <div className="max-w-2xl">
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
                Twelve Connected Capabilities
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1D0D42]">
                EVERYTHING YOUR BRAND NEEDS TO MOVE FORWARD.
              </h2>
            </div>
            <ActionButton to="/services" variant="secondary">
              Explore All Services
            </ActionButton>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {SERVICE_CATEGORIES.map((category, idx) => {
              const Icon = CATEGORY_ICONS[category.id];
              const categoryServices = SERVICES.filter((s) => s.categoryId === category.id);
              return (
                <Reveal key={category.id} delay={idx * 0.05}>
                  <div className="h-full rounded-2xl border border-[#050404]/10 bg-white hover:border-[#6327FB]/40 hover:shadow-[0_20px_40px_-24px_rgba(29,13,66,0.2)] transition-all p-7 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-display text-xs font-bold uppercase tracking-widest text-[#6327FB] tabular-nums">
                          {category.number} · Category
                        </span>
                        <span className="w-10 h-10 rounded-xl bg-[#EAEAEA]/70 text-[#1D0D42] flex items-center justify-center">
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      </div>

                      <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1D0D42]">
                        {category.title}
                      </h3>
                      <p className="mt-2.5 text-sm sm:text-base text-[#050404]/75 leading-relaxed">
                        {category.summary}
                      </p>

                      <ul className="mt-6 divide-y divide-[#050404]/8 border-t border-[#050404]/8">
                        {categoryServices.map((svc) => (
                          <li key={svc.slug}>
                            <Link
                              to={`/services/${svc.slug}`}
                              className="group py-3.5 min-h-[44px] flex items-center justify-between gap-4 text-sm font-display font-semibold text-[#050404] hover:text-[#6327FB] transition-colors"
                            >
                              <span>{svc.name}</span>
                              <ArrowUpRight
                                className="w-4 h-4 text-[#050404]/40 group-hover:text-[#6327FB] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0"
                                aria-hidden="true"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4 — SELECTED WORK */}
      <FeaturedWorkStack />

      {/* SECTION 5 — WHY AASRA? */}
      <section className="bg-[#EAEAEA]/60 text-[#050404] py-20 lg:py-28 border-t border-[#050404]/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 lg:sticky lg:top-28 self-start space-y-4">
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
                Why Partner With AASRA
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1D0D42] leading-[1.06]">
                ONE VISION.
                <br />
                MULTIPLE POSSIBILITIES.
              </h2>
              <p className="text-base text-[#050404]/75 leading-relaxed max-w-md">
                Whether launching a foundational brand or modernising operational systems, we align design, software, and growth under a single accountable studio.
              </p>
            </div>

            <div className="lg:col-span-7 divide-y divide-[#050404]/12 border-t border-b border-[#050404]/12">
              {WHY_AASRA_PILLARS.map((pillar) => (
                <Reveal key={pillar.number}>
                  <div className="py-7 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8">
                    <span className="font-display text-sm font-bold text-[#6327FB] tabular-nums shrink-0">
                      {pillar.number}.
                    </span>
                    <div className="space-y-1.5">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#1D0D42]">
                        {pillar.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#050404]/75 leading-relaxed max-w-xl">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — OUR PROCESS */}
      <section className="bg-white text-[#050404] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#050404]/10">
            <div className="max-w-2xl">
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
                Methodology
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold tracking-tight text-[#1D0D42]">
                A CLEAR PATH FROM IDEA TO COMPOUNDING GROWTH.
              </h2>
            </div>
            <ActionButton to="/process" variant="secondary">
              Full 7-Stage Process
            </ActionButton>
          </div>

          <div className="mt-12 relative">
            {/* Connected Timeline Line on Desktop */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-[#050404]/12"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {HOME_PROCESS_STEPS.map((step, idx) => (
                <Reveal key={step.number} delay={idx * 0.06}>
                  <div className="relative pt-2">
                    <div className="w-12 h-12 rounded-full bg-[#1D0D42] text-white font-display text-sm font-bold flex items-center justify-center tabular-nums relative z-10 ring-8 ring-white">
                      {step.number}
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-bold text-[#1D0D42]">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-sm sm:text-base text-[#050404]/75 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — DEEP PURPLE CTA */}
      <section className="relative bg-[#1D0D42] text-white py-20 lg:py-28 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[620px] h-[340px] rounded-full opacity-35 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #6327FB 0%, #A786FC 45%, transparent 75%)' }}
        />
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 text-center relative z-10 space-y-6">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-[#A786FC]">
            BUILD DIGITAL. CREATE IMPACT. DRIVE GROWTH.
          </p>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight leading-[1.03]">
            READY TO BUILD SOMETHING THAT MATTERS?
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Tell us what you are building, rebranding, or automating. We will review your goals and prepare a practical roadmap tailored to your business.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <ActionButton to="/contact" size="lg">
              LET&apos;S TALK
            </ActionButton>
            <ActionButton to="/pricing" variant="secondary-dark" size="lg">
              View Pricing &amp; Scopes
            </ActionButton>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FAQ */}
      <section className="bg-white text-[#050404] py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
              Frequently Asked Questions
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1D0D42]">
              Clarity Before You Commit.
            </h2>
          </div>

          <div className="divide-y divide-[#050404]/12 border-t border-b border-[#050404]/12">
            {HOME_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full py-5 min-h-[56px] flex items-center justify-between gap-4 text-left font-display text-base sm:text-lg font-semibold text-[#1D0D42] hover:text-[#6327FB] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-[#6327FB] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-6 pr-8 text-sm sm:text-base text-[#050404]/75 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
