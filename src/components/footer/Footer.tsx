import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Mail } from 'lucide-react';
import { AasraLogo } from '../ui/AasraLogo';
import { ActionButton } from '../ui/ActionButton';
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from '../ui/SocialIcons';
import { BUSINESS_INFO, SOCIAL_PROFILES } from '../../data/business';
import { FOOTER_COMPANY_LINKS, FOOTER_LEGAL_LINKS } from '../../data/navigation';
import { SERVICES } from '../../data/services';
import { usePWA } from '../pwa/PWAContext';
import { useCookieConsent } from '../legal/CookieConsent';

export const Footer: React.FC = () => {
  const { isInstalled, canPromptNatively, openInstallModal, triggerNativeInstall } = usePWA();
  const { openPreferencesModal } = useCookieConsent();

  const handleInstallClick = async () => {
    if (canPromptNatively) {
      await triggerNativeInstall();
    } else {
      openInstallModal();
    }
  };

  return (
    <footer className="bg-[#050404] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-20">
        {/* Top Row: Brand & Signature CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          <div className="lg:col-span-6 space-y-4">
            <Link to="/" aria-label="AASRA Web Devs home">
              <AasraLogo variant="light" />
            </Link>
            <p className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white max-w-lg leading-tight pt-2">
              Build Digital. Create Impact. Drive Growth.
            </p>
            <p className="text-sm text-white/70 max-w-md leading-relaxed">
              We combine software engineering, creative branding, digital marketing, and intelligent automation to build digital experiences and growth systems that move businesses forward.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col lg:items-end justify-between gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <ActionButton to="/contact" size="md">
                Start a Project
              </ActionButton>
              {!isInstalled && (
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full border border-white/25 text-xs font-display font-semibold text-white hover:border-[#A786FC] hover:text-[#A786FC] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Install AASRA App</span>
                </button>
              )}
            </div>
            <div className="text-sm text-white/75 lg:text-right space-y-1.5">
              <p className="font-display text-xs uppercase tracking-widest text-[#A786FC]">
                Direct Enquiries
              </p>
              <div className="flex flex-wrap lg:justify-end gap-x-4 gap-y-1">
                <a
                  href={BUSINESS_INFO.emailHref}
                  className="hover:text-white transition-colors underline underline-offset-4"
                >
                  {BUSINESS_INFO.email}
                </a>
                <a
                  href={BUSINESS_INFO.whatsappBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline underline-offset-4"
                >
                  WhatsApp: {BUSINESS_INFO.whatsappNumber}
                </a>
              </div>
              <p>
                <Link to="/contact" className="hover:text-white transition-colors underline underline-offset-4">
                  Submit a Project Brief
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Middle Columns: Navigation, All 11 Services, Legal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 py-14 border-b border-white/10">
          {/* Company */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-[#A786FC] mb-4">
              Navigation
            </h2>
            <ul className="space-y-2.5 text-sm text-white/75">
              {FOOTER_COMPANY_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* All 12 Services */}
          <div className="lg:col-span-6">
            <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-[#A786FC] mb-4">
              All Twelve Services
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-white/75">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Channels */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-[#A786FC] mb-4">
                Legal &amp; Governance
              </h2>
              <ul className="space-y-2.5 text-sm text-white/75">
                {FOOTER_LEGAL_LINKS.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={openPreferencesModal}
                    className="hover:text-white transition-colors text-left cursor-pointer underline underline-offset-4"
                  >
                    Cookie Preferences
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xs font-semibold uppercase tracking-widest text-[#A786FC] mb-3">
                Connect With Us
              </h2>
              <ul className="space-y-2.5 text-sm text-white/80">
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
                        className="inline-flex items-center gap-2.5 hover:text-[#A786FC] transition-colors"
                      >
                        <IconComponent className="w-4 h-4 text-[#A786FC] shrink-0" />
                        <span>{profile.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/55">
          <p>&copy; {new Date().getFullYear()} AASRA Web Devs. All rights reserved.</p>
          <p className="font-display tracking-wide">
            Digital Agency · Creative Studio · Technology &amp; Growth Partner
          </p>
        </div>
      </div>
    </footer>
  );
};
