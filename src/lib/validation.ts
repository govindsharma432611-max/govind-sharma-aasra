export const ALL_SERVICE_NAMES = [
  'Website Development',
  'Application Development',
  'Logo Design',
  'Typography Design',
  'Poster and Promotional Design',
  'Menu Design',
  'Digital Marketing',
  'Performance Marketing',
  'Social Media Management',
  'AI Agents and AI Automation',
  'Data Analysis and Business Intelligence',
  'Business Process Automation',
] as const;

export const BUDGET_OPTIONS = [
  'Under $2,500 / Early Stage',
  '$2,500 – $7,500',
  '$7,500 – $20,000',
  '$20,000+ / Enterprise',
  'Ongoing Retainer',
  'Request a Custom Quote',
] as const;

export const TIMELINE_OPTIONS = [
  'Immediate (Within 2 weeks)',
  '1 – 2 Months',
  '3 – 6 Months',
  'Flexible / Exploring',
] as const;

export interface ContactFormInput {
  fullName: string;
  businessName?: string;
  email: string;
  phone: string;
  service: string;
  budget?: string;
  timeline?: string;
  description: string;
  consent: boolean;
  companyWebsite?: string; // honeypot
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
  sanitized?: {
    fullName: string;
    businessName: string;
    email: string;
    phone: string;
    service: string;
    budget: string;
    timeline: string;
    description: string;
    consent: boolean;
  };
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^[+\d][\d\s\-().]{6,19}$/;

function cleanText(val: unknown): string {
  if (typeof val !== 'string') return '';
  return val.replace(/[<>]/g, '').trim();
}

export function validateContactPayload(raw: unknown): ContactValidationResult {
  const input = (raw && typeof raw === 'object' ? raw : {}) as Partial<ContactFormInput>;
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};

  const fullName = cleanText(input.fullName);
  const businessName = cleanText(input.businessName);
  const email = cleanText(input.email).toLowerCase();
  const phone = cleanText(input.phone);
  const service = cleanText(input.service);
  const budget = cleanText(input.budget) || 'Not specified';
  const timeline = cleanText(input.timeline) || 'Flexible / Exploring';
  const description = cleanText(input.description);
  const consent = Boolean(input.consent);

  if (fullName.length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  } else if (fullName.length > 100) {
    errors.fullName = 'Full name cannot exceed 100 characters.';
  }

  if (businessName.length > 120) {
    errors.businessName = 'Business name cannot exceed 120 characters.';
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!phone || !PHONE_REGEX.test(phone)) {
    errors.phone = 'Please enter a valid phone number (7–20 digits).';
  }

  if (!service || !(ALL_SERVICE_NAMES as readonly string[]).includes(service)) {
    errors.service = 'Please select one of the AASRA Web Devs services.';
  }

  if (description.length < 20) {
    errors.description = 'Please describe your project goals in at least 20 characters.';
  } else if (description.length > 3000) {
    errors.description = 'Project description cannot exceed 3,000 characters.';
  }

  if (!consent) {
    errors.consent = 'Please confirm you agree to our Privacy Policy before submitting.';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    sanitized: {
      fullName,
      businessName,
      email,
      phone,
      service,
      budget,
      timeline,
      description,
      consent,
    },
  };
}
