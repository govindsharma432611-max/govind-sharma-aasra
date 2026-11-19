import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { ActionButton } from '../components/ui/ActionButton';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Reveal } from '../components/animations/Reveal';
import { LinkedInIcon } from '../components/ui/SocialIcons';
import { LEADERSHIP_TEAM } from '../data/business';
import { SERVICE_CATEGORIES } from '../data/services';
import { applyDocumentMetadata } from '../lib/metadata';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    applyDocumentMetadata({
      title: 'About AASRA Web Devs — Digital Agency & Growth Partner',
      description:
        'Creativity with purpose. Technology with vision. Learn about AASRA Web Devs, our mission, philosophy, and multidisciplinary capabilities.',
      path: '/about',
    });
  }, []);

  return (
    <div className="bg-white text-[#050404]">
      {/* Hero */}
      <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-[#050404]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About Us' }]} />
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
            About AASRA Web Devs
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#1D0D42] max-w-4xl leading-[1.04]">
            CREATIVITY WITH PURPOSE.
            <br />
            TECHNOLOGY WITH VISION.
          </h1>
          <p className="mt-6 text-lg text-[#050404]/75 max-w-2xl leading-relaxed">
            We build digital experiences and growth systems that move businesses forward—uniting branding, software development, digital marketing, and intelligent automation.
          </p>
        </div>
      </section>

      {/* 1. Who We Are */}
      <section className="py-16 lg:py-24 bg-[#EAEAEA]/55 border-b border-[#050404]/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1D0D42]">
              01. Who We Are
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-4 text-base sm:text-lg text-[#050404]/80 leading-relaxed max-w-3xl">
            <p>
              AASRA Web Devs is an integrated digital agency, creative branding studio, software engineering partner, and AI automation provider.
            </p>
            <p>
              We do not position ourselves as merely a website-building vendor. Modern businesses rarely fail from lacking a single webpage—they stall when their visual brand, software tools, marketing channels, and internal workflows operate in silos. We bridge those gaps.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Mission & 3. Vision */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal>
            <div className="h-full rounded-2xl border border-[#050404]/10 p-8 bg-white">
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
                02. Our Mission
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-[#1D0D42]">
                Build Practical Digital Leverage for Ambitious Businesses.
              </h2>
              <p className="mt-4 text-base text-[#050404]/75 leading-relaxed">
                To help organisations establish clear brand authority, launch dependable digital products, attract qualified customers, and eliminate repetitive manual work through thoughtfully engineered systems.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl bg-[#1D0D42] text-white p-8">
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#A786FC]">
                03. Our Vision
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold">
                One Partner From First Impression to Automated Scale.
              </h2>
              <p className="mt-4 text-base text-white/80 leading-relaxed">
                To set a dependable standard for multidisciplinary digital studios—where aesthetic restraint, software craftsmanship, transparent marketing, and responsible AI automation operate together seamlessly.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. What Makes Us Different & 6. Philosophy */}
      <section className="py-16 lg:py-24 bg-[#EAEAEA]/55 border-y border-[#050404]/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-5">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
              04. What Makes Us Different
            </p>
            <h2 className="font-display text-3xl font-bold text-[#1D0D42]">
              Systems Thinking Across Every Discipline.
            </h2>
            <ul className="space-y-4 text-base text-[#050404]/80 leading-relaxed">
              <li>
                <strong className="font-display text-[#1D0D42]">Zero vendor handoff friction:</strong> Your logo designer, frontend engineer, marketing strategist, and automation architect align on a single roadmap.
              </li>
              <li>
                <strong className="font-display text-[#1D0D42]">Honest, verifiable execution:</strong> We never publish fabricated vanity metrics, fake guarantees, or bloated templates.
              </li>
              <li>
                <strong className="font-display text-[#1D0D42]">Installable web-first craft:</strong> We build modern web experiences that extend naturally into installable mobile applications.
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
              06. Our Philosophy
            </p>
            <h2 className="font-display text-3xl font-bold text-[#1D0D42]">
              BUILD DIGITAL. CREATE IMPACT. DRIVE GROWTH.
            </h2>
            <p className="text-base text-[#050404]/80 leading-relaxed">
              Technology without brand clarity feels cold. Design without engineering reliability breaks under real users. Marketing without conversion architecture wastes budget. True digital momentum happens only when all three reinforce each other—backed by clean data and automation.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Our Capabilities */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-10 border-b border-[#050404]/10">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
                05. Our Capabilities
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold text-[#1D0D42]">
                Four Pillars. Twelve Services.
              </h2>
            </div>
            <Link
              to="/services"
              className="font-display text-sm font-semibold text-[#6327FB] hover:text-[#1D0D42] underline underline-offset-4"
            >
              Explore All Twelve Services
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_CATEGORIES.map((cat) => (
              <div key={cat.id} className="rounded-2xl border border-[#050404]/10 p-6 bg-white">
                <span className="font-display text-xs font-bold text-[#6327FB] tabular-nums">
                  {cat.number}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-[#1D0D42]">{cat.title}</h3>
                <p className="mt-2 text-sm text-[#050404]/75 leading-relaxed">{cat.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Meet the Founders & Leadership */}
      <section className="py-16 lg:py-24 bg-[#EAEAEA]/55 border-t border-[#050404]/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-10">
            <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
              07. Leadership &amp; Founders
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-[#1D0D42]">
              The Leadership Behind Aasra Web Devs
            </h2>
            <p className="mt-2 text-sm text-[#050404]/70">
              Led directly by our founding partners across engineering, creative direction, digital marketing, and business automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEADERSHIP_TEAM.map((member) => (
              <article key={member.slot} className="rounded-2xl border border-[#050404]/10 bg-white p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#1D0D42] text-white font-display text-base font-bold flex items-center justify-center tabular-nums">
                      {member.slot}
                    </div>
                    <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#6327FB]">
                      {member.role}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-[#1D0D42]">
                    {member.name}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#050404]/75 leading-relaxed">
                    {member.focus}
                  </p>
                </div>

                {member.linkedinUrl ? (
                  <div className="mt-6 pt-4 border-t border-[#050404]/8">
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-display text-xs font-semibold text-[#1D0D42] hover:text-[#6327FB] transition-colors"
                    >
                      <LinkedInIcon className="w-4 h-4 text-[#6327FB]" />
                      <span>LinkedIn Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                ) : (
                  <p className="mt-6 pt-4 border-t border-[#050404]/8 text-xs text-[#050404]/55 font-medium">
                    Aasra Web Devs · Leadership
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="bg-[#1D0D42] text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center space-y-5">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
            Let&apos;s Align Strategy, Design &amp; Engineering.
          </h2>
          <p className="text-base text-white/80 max-w-xl mx-auto">
            Ready to discuss your next website, application, brand identity, or automation system?
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
