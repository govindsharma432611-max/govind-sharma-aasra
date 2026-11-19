export interface NavLinkItem {
  label: string;
  to: string;
}

export const PRIMARY_NAV_LINKS: NavLinkItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
  { label: 'Pricing', to: '/pricing' },
];

export const FOOTER_COMPANY_LINKS: NavLinkItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Our Process', to: '/process' },
  { label: 'Selected Work', to: '/work' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact Us', to: '/contact' },
];

export const FOOTER_LEGAL_LINKS: NavLinkItem[] = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms-and-conditions' },
  { label: 'Cookie Policy', to: '/cookie-policy' },
  { label: 'Refund & Cancellation Policy', to: '/refund-cancellation-policy' },
  { label: 'Disclaimer', to: '/disclaimer' },
];
