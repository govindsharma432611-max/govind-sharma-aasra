import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ActionButton } from '../components/ui/ActionButton';
import { Reveal } from '../components/animations/Reveal';
import { applyDocumentMetadata } from '../lib/metadata';

const PROCESS_STAGES = [
  {
    number: '01',
    title: 'Initial Discussion',
    description:
      'We begin with a focused conversation to understand your business model, audience, current digital footprint, and immediate objectives—no rushed pitches.',
    outputs: ['Goal alignment summary', 'Initial feasibility check', 'Timeline expectations'],
  },
  {
    number: '02',
    title: 'Requirement Analysis',
    description:
      'We audit existing brand assets, technical infrastructure, workflows, and competitive positioning to document exact functional and creative requirements.',
    outputs: ['Technical & brand audit', 'User journey mapping', 'Integration checklist'],
  },
  {
    number: '03',
    title: 'Strategy & Planning',
    description:
      'Before writing production code or designing final visuals, we lock in information architecture, design direction, marketing funnels, and milestone schedules.',
    outputs: ['Approved scope & milestones', 'Architecture blueprint', 'Channel or automation plan'],
  },
  {
    number: '04',
    title: 'Design & Development',
    description:
      'Designers and engineers collaborate in parallel—crafting responsive UIs, brand identities, campaign creatives, API integrations, and guarded AI automations.',
    outputs: ['Interactive design previews', 'Modular codebase & assets', 'Milestone review checkpoints'],
  },
  {
    number: '05',
    title: 'Testing & Quality Assurance',
    description:
      'Every deliverable goes through responsive viewport verification, accessibility checks, form & API validation, SEO inspection, and PWA offline checks.',
    outputs: ['Cross-device layout sign-off', 'TypeScript & runtime verification', 'Performance & SEO checks'],
  },
  {
    number: '06',
    title: 'Delivery & Launch',
    description:
      'We coordinate clean production deployment, domain/SSL verification, service worker activation, and complete handover documentation for your team.',
    outputs: ['Production deployment', 'Asset & source handover', 'Team walkthrough'],
  },
  {
    number: '07',
    title: 'Support and Optimisation',
    description:
      'After launch, we support ongoing maintenance, campaign iteration, analytics refinement, and workflow upgrades as your business grows.',
    outputs: ['Post-launch monitoring', 'Conversion & speed refinements', 'Scalable iteration roadmap'],
  },
];

export const ProcessPage: React.FC = () => {
  useEffect(() => {
    applyDocumentMetadata({
      title: 'Our 7-Stage Process — AASRA Web Devs',
      description:
        'Good work starts with a good process. Explore AASRA Web Devs’ seven-stage workflow from Initial Discussion through Launch and Ongoing Optimisation.',
      path: '/process',
    });
  }, []);

  return (
    <div className="bg-white text-[#050404]">
      <section className="pt-28 pb-14 lg:pt-36 lg:pb-20 border-b border-[#050404]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Our Process' }]} />
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
            How AASRA Delivers
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#1D0D42] max-w-4xl">
            GOOD WORK STARTS WITH A GOOD PROCESS.
          </h1>
          <p className="mt-5 text-lg text-[#050404]/75 max-w-2xl leading-relaxed">
            Predictable quality comes from clear discovery, structured milestones, and thorough verification before anything reaches your customers.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="relative space-y-8">
            <div
              aria-hidden="true"
              className="hidden sm:block absolute left-6 top-6 bottom-6 w-px bg-[#1D0D42]/15"
            />
            {PROCESS_STAGES.map((stage, idx) => (
              <Reveal key={stage.number} delay={idx * 0.04}>
                <div className="relative flex flex-col sm:flex-row gap-5 sm:gap-8">
                  <div className="w-12 h-12 rounded-full bg-[#1D0D42] text-white font-display text-sm font-bold flex items-center justify-center shrink-0 tabular-nums relative z-10 ring-8 ring-white">
                    {stage.number}
                  </div>
                  <div className="flex-1 rounded-2xl border border-[#050404]/10 bg-[#EAEAEA]/40 p-6 sm:p-8">
                    <h2 className="font-display text-2xl font-bold text-[#1D0D42]">
                      {stage.title}
                    </h2>
                    <p className="mt-2.5 text-base text-[#050404]/80 leading-relaxed">
                      {stage.description}
                    </p>
                    <div className="mt-5 pt-4 border-t border-[#050404]/10 flex flex-wrap gap-x-5 gap-y-2 text-xs font-display font-medium text-[#6327FB]">
                      {stage.outputs.map((out) => (
                        <span key={out}>· {out}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1D0D42] text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-5 text-center space-y-5">
          <h2 className="font-display text-3xl sm:text-5xl font-bold">
            Ready to Begin Stage 01?
          </h2>
          <p className="text-base text-white/80 max-w-xl mx-auto">
            Share your project brief and let&apos;s schedule an initial discovery discussion.
          </p>
          <div className="pt-2">
            <ActionButton to="/contact" size="lg">
              START A PROJECT
            </ActionButton>
          </div>
        </div>
      </section>
    </div>
  );
};
