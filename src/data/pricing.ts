export interface PricingPackage {
  id: string;
  category: string;
  packageName: string;
  price: string;
  billingPeriod: string;
  summary: string;
  features: string[];
  deliverables: string[];
  addOns: string[];
  ctaLabel: string;
  recommended?: boolean;
}

export const PRICING_CATEGORIES = [
  'All Categories',
  'Website Development',
  'Application Development',
  'Branding & Creative',
  'Digital Marketing',
  'Social Media Management',
  'AI & Automation',
  'Custom Business Solutions',
] as const;

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'website-development',
    category: 'Website Development',
    packageName: 'Website Development',
    price: 'Request a Custom Quote',
    billingPeriod: 'Project-based scope',
    summary:
      'Custom responsive websites, multi-page brand flagships, and installable Progressive Web Apps built for clarity and search performance.',
    features: [
      'Custom responsive UI architecture (no generic themes)',
      'Semantic HTML, technical SEO & Schema.org metadata',
      'Optional installable PWA configuration & offline fallback',
      'Validated lead-capture and contact enquiry integration',
    ],
    deliverables: [
      'Design system & responsive page templates',
      'Production frontend & server configuration',
      'SEO sitemap, robots.txt & performance optimization',
      'Launch checklist and handover documentation',
    ],
    addOns: [
      'Headless CMS setup & editorial training',
      'Multi-language localization structure',
      'Ongoing maintenance & performance retainer',
    ],
    ctaLabel: 'Request a Custom Quote',
  },
  {
    id: 'application-development',
    category: 'Application Development',
    packageName: 'Application Development',
    price: 'Request a Custom Quote',
    billingPeriod: 'Milestone-based scope',
    summary:
      'Custom web applications, client portals, SaaS MVPs, and mobile-first software systems engineered around your operational rules.',
    features: [
      'End-to-end TypeScript frontend and API architecture',
      'Role-based access & structured database schema design',
      'Mobile-first touch workflows & offline resilience',
      'Automated validation and core logic verification',
    ],
    deliverables: [
      'Technical architecture & data model blueprint',
      'Interactive UI components & user workflows',
      'Tested application codebase & API routes',
      'Deployment setup & operational runbook',
    ],
    addOns: [
      'Payment & subscription billing integration',
      'Third-party ERP / CRM sync connectors',
      'Dedicated SLA & feature iteration retainer',
    ],
    ctaLabel: 'Request a Custom Quote',
  },
  {
    id: 'branding-creative',
    category: 'Branding & Creative',
    packageName: 'Branding & Creative',
    price: 'Request a Custom Quote',
    billingPeriod: 'Fixed scope or campaign bundle',
    summary:
      'Cohesive visual identity systems uniting Logo Design, Typography Design, and Poster & Promotional collateral.',
    features: [
      'Primary vector logo, monogram & responsive icon variants',
      'Display and body typographic hierarchy specification',
      'Print-ready poster & digital promotional key visuals',
      'Strict colour palette & brand usage rules',
    ],
    deliverables: [
      'Master vector files (SVG, EPS, PDF) & web/app icons',
      'Typography specimen & CSS/Tailwind token sheet',
      'Print-ready promotional layouts & social sizes',
      'Concise Brand Identity Guidelines document',
    ],
    addOns: [
      'Investor pitch deck & company profile design',
      'Packaging & merchandise artwork adaptation',
      'Custom campaign illustration or motion kit',
    ],
    ctaLabel: 'Request a Custom Quote',
  },
  {
    id: 'digital-marketing',
    category: 'Digital Marketing',
    packageName: 'Digital Marketing',
    price: 'Request a Custom Quote',
    billingPeriod: 'Monthly retainer or launch sprint',
    summary:
      'Full-funnel Digital Marketing and Performance Marketing connecting organic search, paid acquisition, and conversion tracking.',
    features: [
      'Search strategy, on-page SEO & content architecture',
      'Structured Google & paid social campaign management',
      'Creative & landing-page conversion alignment',
      'Transparent lead-quality & attribution reporting',
    ],
    deliverables: [
      'Channel strategy & funnel diagnostic',
      'Campaign builds & ad creative testing matrix',
      'Conversion event & analytics setup audit',
      'Monthly performance & optimization review',
    ],
    addOns: [
      'Dedicated high-converting campaign landing pages',
      'Email lifecycle & CRM nurture sequences',
      'Additional ad platform expansion',
    ],
    ctaLabel: 'Request a Custom Quote',
  },
  {
    id: 'social-media-management',
    category: 'Social Media Management',
    packageName: 'Social Media Management',
    price: 'Request a Custom Quote',
    billingPeriod: 'Monthly content retainer',
    summary:
      'Consistent editorial calendars, art-directed visual grids, and platform-native copywriting to keep your brand active and credible.',
    features: [
      'Strategic content pillars aligned to business goals',
      'Art-directed static posts, carousels & visual templates',
      'Structured approval workflow before publishing',
      'Monthly audience & engagement insights',
    ],
    deliverables: [
      'Monthly editorial calendar & topic plan',
      'Custom-designed visual post batch',
      'Platform-optimised captions & scheduling',
      'Monthly channel summary report',
    ],
    addOns: [
      'Short-form promotional motion edits',
      'Paid boost coordination for top posts',
      'Launch event live coverage graphics',
    ],
    ctaLabel: 'Request a Custom Quote',
  },
  {
    id: 'ai-automation',
    category: 'AI & Automation',
    packageName: 'AI & Automation',
    price: 'Request a Custom Quote',
    billingPeriod: 'Architecture & implementation scope',
    summary:
      'Guarded AI Agents, Data Analysis & BI dashboards, and Business Process Automation built to remove operational bottlenecks.',
    features: [
      'Retrieval-grounded AI agents with strict schema guardrails',
      'Executive BI dashboards & cleaned commercial metrics',
      'Webhook & API orchestration across existing business tools',
      'Error alerting, retry handling & human-in-the-loop safety',
    ],
    deliverables: [
      'Workflow & data-source discovery audit',
      'Production AI agent or automation pipelines',
      'Interactive reporting dashboards (where scoped)',
      'Governance & team handover documentation',
    ],
    addOns: [
      'Custom operator review dashboard',
      'Multi-source warehouse & scheduled reporting',
      'Ongoing model evaluation & prompt tuning',
    ],
    ctaLabel: 'Request a Custom Quote',
  },
  {
    id: 'custom-business-solutions',
    category: 'Custom Business Solutions',
    packageName: 'Custom Business Solutions',
    price: 'Request a Custom Quote',
    billingPeriod: 'Tailored multi-disciplinary partnership',
    summary:
      'Integrated multi-service engagements combining branding, web/app engineering, marketing, and intelligent automation under one unified roadmap.',
    features: [
      'Single strategic roadmap across design, code & growth',
      'Dedicated cross-functional studio execution',
      'Phased milestone delivery tailored to launch timelines',
      'Unified technical, creative & growth governance',
    ],
    deliverables: [
      'Combined brand, technology & growth architecture',
      'Prioritised multi-phase delivery schedule',
      'All scoped engineering, creative & automation assets',
      'Executive review cadence & post-launch support',
    ],
    addOns: [
      'Dedicated quarterly growth & engineering sprints',
      'Team enablement & technical documentation',
      'Custom SLA support coverage',
    ],
    ctaLabel: 'Request a Custom Quote',
    recommended: true,
  },
];

export interface ComparisonRow {
  capability: string;
  singleService: string;
  integratedGrowth: string;
  customSolution: string;
}

export const PRICING_COMPARISON_ROWS: ComparisonRow[] = [
  {
    capability: 'Scope Structure',
    singleService: 'Focused single discipline (e.g. Website or Logo)',
    integratedGrowth: '2–3 connected services (e.g. Web + Marketing)',
    customSolution: 'Full-spectrum brand, software, marketing & AI',
  },
  {
    capability: 'Strategy & Discovery',
    singleService: 'Included for target deliverable',
    integratedGrowth: 'Cross-channel roadmap & conversion alignment',
    customSolution: 'Comprehensive business & systems architecture',
  },
  {
    capability: 'Deliverable Handover',
    singleService: 'Production assets & documentation',
    integratedGrowth: 'Connected web, creative & tracking setup',
    customSolution: 'End-to-end platform, automations & playbooks',
  },
  {
    capability: 'Pricing Model',
    singleService: 'Request a Custom Quote',
    integratedGrowth: 'Request a Custom Quote',
    customSolution: 'Request a Custom Quote',
  },
];
