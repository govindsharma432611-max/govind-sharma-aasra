import React, { useEffect } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ContactForm } from '../components/forms/ContactForm';
import { BUSINESS_INFO, SOCIAL_PROFILES } from '../data/business';
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from '../components/ui/SocialIcons';
import { applyDocumentMetadata } from '../lib/metadata';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    applyDocumentMetadata({
      title: 'Contact Us & Start a Project — AASRA Web Devs',
      description:
        'Start a project with AASRA Web Devs. Submit a validated project brief across our twelve digital engineering, branding, marketing, and AI automation services.',
      path: '/contact',
    });
  }, []);

  return (
    <div className="bg-white text-[#050404]">
      <section className="pt-28 pb-14 lg:pt-36 lg:pb-18 border-b border-[#050404]/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]} />
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
            Project Enquiries
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#1D0D42] max-w-4xl">
            LET&apos;S MAKE YOUR NEXT IDEA HAPPEN.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#050404]/75 max-w-2xl leading-relaxed">
            Tell us about your project, select the service you need, and share your target timeline.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-[#1D0D42] text-white p-7 sm:p-8 space-y-5">
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#A786FC]">
                What Happens Next
              </p>
              <h2 className="font-display text-2xl font-bold">
                Structured Discovery, Clear Custom Quotes.
              </h2>
              <ol className="space-y-4 text-sm text-white/80 leading-relaxed">
                <li>
                  <strong className="text-white font-display">01. Brief Review:</strong> We examine your goals, selected service, and technical scope.
                </li>
                <li>
                  <strong className="text-white font-display">02. Discovery Call:</strong> We align on requirements, constraints, and timelines.
                </li>
                <li>
                  <strong className="text-white font-display">03. Proposal &amp; Milestones:</strong> You receive a clear written scope and custom quote prior to kickoff.
                </li>
              </ol>
            </div>

            <div className="rounded-2xl border border-[#050404]/10 bg-[#EAEAEA]/50 p-6 sm:p-7 space-y-4">
              <div>
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-[#6327FB]">
                  Direct Channels
                </p>
                <h2 className="mt-1 font-display text-xl font-bold text-[#1D0D42]">
                  Connect with {BUSINESS_INFO.name}
                </h2>
              </div>

              <ul className="divide-y divide-[#050404]/10 border-t border-[#050404]/10">
                {SOCIAL_PROFILES.map((profile) => {
                  const IconComponent =
                    profile.id === 'whatsapp'
                      ? WhatsAppIcon
                      : profile.id === 'email'
                      ? Mail
                      : profile.id === 'instagram'
                      ? InstagramIcon
                      : LinkedInIcon;

                  return (
                    <li key={profile.id}>
                      <a
                        href={profile.href}
                        target={profile.external ? '_blank' : undefined}
                        rel={profile.external ? 'noopener noreferrer' : undefined}
                        className="group py-3 flex items-center justify-between gap-3 text-sm text-[#050404] hover:text-[#6327FB] transition-colors"
                      >
                        <span className="flex items-center gap-3 min-w-0">
                          <span className="w-9 h-9 rounded-xl bg-white border border-[#050404]/10 flex items-center justify-center text-[#1D0D42] group-hover:border-[#6327FB] group-hover:text-[#6327FB] shrink-0 transition-colors">
                            <IconComponent className="w-4 h-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-display text-xs font-semibold uppercase tracking-wider text-[#1D0D42]/65">
                              {profile.label}
                            </span>
                            <span className="block font-medium truncate">
                              {profile.handle}
                            </span>
                          </span>
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[#050404]/40 group-hover:text-[#6327FB] shrink-0" aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl border border-[#050404]/10 bg-white p-6 sm:p-10 shadow-[0_20px_50px_-30px_rgba(29,13,66,0.16)]">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};
