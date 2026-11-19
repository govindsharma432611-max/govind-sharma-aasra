import React from 'react';
import { useLocation } from 'react-router-dom';
import { buildWhatsAppServiceMessage, buildWhatsAppUrl } from '../../data/business';
import { SERVICES } from '../../data/services';
import { useCookieConsent } from '../legal/CookieConsent';
import { usePWA } from '../pwa/PWAContext';
import { WhatsAppIcon } from '../ui/SocialIcons';

export const FloatingWhatsAppButton: React.FC = () => {
  const location = useLocation();
  const { isOnline } = usePWA();
  const { isBannerVisible } = useCookieConsent();

  // Detect active service from /services/:slug for contextual WhatsApp message prefill
  const serviceSlugMatch = location.pathname.match(/^\/services\/([^/]+)$/);
  const activeService = serviceSlugMatch
    ? SERVICES.find((svc) => svc.slug === serviceSlugMatch[1])
    : undefined;

  let prefilledMessage =
    'Hello Aasra Web Devs Team, I would like to enquire about your digital services.';

  if (activeService) {
    prefilledMessage = buildWhatsAppServiceMessage({
      service: activeService.name,
    });
  } else if (location.pathname === '/pricing') {
    prefilledMessage =
      'Hello Aasra Web Devs Team, I reviewed your pricing packages and would like to request a custom quote.';
  } else if (location.pathname === '/contact') {
    prefilledMessage =
      'Hello Aasra Web Devs Team, I am on your contact page and would like to start a project conversation.';
  }

  const whatsappUrl = buildWhatsAppUrl(prefilledMessage);

  // Offset above offline banner or mobile cookie banner to guarantee zero overlap
  const bottomPositionClass = !isOnline
    ? 'bottom-16'
    : isBannerVisible
    ? 'bottom-28 sm:bottom-5'
    : 'bottom-4 sm:bottom-5';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with Aasra Web Devs"
      title="Open WhatsApp conversation with Aasra Web Devs"
      className={`fixed left-4 sm:left-5 ${bottomPositionClass} z-40 inline-flex items-center justify-center gap-2 h-11 sm:h-11 px-3 sm:px-4 rounded-full bg-[#1D0D42] text-white border border-white/20 shadow-[0_12px_30px_-10px_rgba(29,13,66,0.55)] hover:bg-[#6327FB] hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6327FB] focus-visible:ring-offset-2 whitespace-nowrap`}
    >
      <WhatsAppIcon className="w-5 h-5 text-[#A786FC] shrink-0" />
      <span className="hidden sm:inline font-display text-xs font-semibold tracking-wide">
        WhatsApp
      </span>
    </a>
  );
};
