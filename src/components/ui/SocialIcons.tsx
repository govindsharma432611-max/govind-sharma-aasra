import React from 'react';

interface IconProps {
  className?: string;
}

export const WhatsAppIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.45L3 20.5l1.55-5.15A8.5 8.5 0 1 1 21 11.5Z" />
    <path d="M9.4 9.1c.2-.45.45-.46.7-.46h.55c.18 0 .42.08.52.34l.68 1.62c.1.24.06.48-.1.68l-.42.52a.4.4 0 0 0-.05.45 7.4 7.4 0 0 0 2.9 2.9.4.4 0 0 0 .45-.05l.52-.42c.2-.16.44-.2.68-.1l1.62.68c.26.1.34.34.34.52v.55c0 .25-.01.5-.46.7-.68.3-1.95.5-3.92-.48-1.98-.98-3.5-2.5-4.48-4.48-.98-1.97-.78-3.24-.48-3.92Z" />
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <rect width="18" height="18" x="3" y="3" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

export const LinkedInIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
