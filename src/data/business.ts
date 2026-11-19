export interface SocialProfile {
  id: 'instagram' | 'linkedin-company' | 'linkedin-founder' | 'whatsapp' | 'email';
  label: string;
  handle: string;
  href: string;
  external: boolean;
}

export interface FounderProfile {
  slot: string;
  name: string;
  role: string;
  focus: string;
  linkedinUrl?: string;
}

export const BUSINESS_INFO = {
  name: 'Aasra Web Devs',
  displayName: 'AASRA Web Devs',
  tagline: 'Build Digital. Create Impact. Drive Growth.',
  email: 'aasra.official07@gmail.com',
  emailHref: 'mailto:aasra.official07@gmail.com',
  whatsappNumber: '+91 9257121185',
  whatsappDigits: '919257121185',
  whatsappBaseUrl: 'https://wa.me/919257121185',
  instagramUrl: 'https://www.instagram.com/aasra.official_07/',
  instagramHandle: '@aasra.official_07',
  linkedinCompanyUrl: 'https://www.linkedin.com/company/aasra-web-devs/',
  linkedinFounderUrl: 'https://www.linkedin.com/in/govind-sharma-1154a7332/',
} as const;

export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    handle: BUSINESS_INFO.whatsappNumber,
    href: BUSINESS_INFO.whatsappBaseUrl,
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    handle: BUSINESS_INFO.email,
    href: BUSINESS_INFO.emailHref,
    external: false,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: BUSINESS_INFO.instagramHandle,
    href: BUSINESS_INFO.instagramUrl,
    external: true,
  },
  {
    id: 'linkedin-company',
    label: 'LinkedIn (Company)',
    handle: 'Aasra Web Devs',
    href: BUSINESS_INFO.linkedinCompanyUrl,
    external: true,
  },
  {
    id: 'linkedin-founder',
    label: 'LinkedIn (Founder)',
    handle: 'Govind Sharma',
    href: BUSINESS_INFO.linkedinFounderUrl,
    external: true,
  },
];

export const LEADERSHIP_TEAM: FounderProfile[] = [
  {
    slot: '01',
    name: 'Govind Sharma',
    role: 'Founder',
    focus: 'Technology vision, full-stack architecture, AI workflows, and digital growth systems.',
    linkedinUrl: BUSINESS_INFO.linkedinFounderUrl,
  },
  {
    slot: '02',
    name: 'Anmol Tungaria',
    role: 'Co-Founder',
    focus: 'Product execution, engineering strategy, creative direction, and client delivery operations.',
  },
  {
    slot: '03',
    name: 'Avi Mathur',
    role: 'Co-Founder',
    focus: 'Business growth, digital marketing strategy, performance systems, and client partnerships.',
  },
];

export function buildWhatsAppUrl(prefilledMessage?: string): string {
  if (!prefilledMessage || !prefilledMessage.trim()) {
    return BUSINESS_INFO.whatsappBaseUrl;
  }
  const encoded = encodeURIComponent(prefilledMessage.trim());
  return `${BUSINESS_INFO.whatsappBaseUrl}?text=${encoded}`;
}

export interface WhatsAppEnquiryDraft {
  service?: string;
  fullName?: string;
  businessName?: string;
  email?: string;
  phone?: string;
  budget?: string;
  timeline?: string;
  description?: string;
}

export function buildWhatsAppServiceMessage(draft: WhatsAppEnquiryDraft): string {
  const lines = ['Hello Aasra Web Devs Team, I would like to discuss a project enquiry.'];
  if (draft.service) lines.push(`Selected Service: ${draft.service}`);
  if (draft.fullName) lines.push(`Name: ${draft.fullName}`);
  if (draft.businessName) lines.push(`Business: ${draft.businessName}`);
  if (draft.email) lines.push(`Email: ${draft.email}`);
  if (draft.phone) lines.push(`Phone: ${draft.phone}`);
  if (draft.budget) lines.push(`Estimated Budget: ${draft.budget}`);
  if (draft.timeline) lines.push(`Target Timeline: ${draft.timeline}`);
  if (draft.description) lines.push(`Project Brief: ${draft.description}`);
  return lines.join('\n');
}
