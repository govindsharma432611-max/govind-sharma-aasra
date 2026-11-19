export type PortfolioCategory =
  | 'All Projects'
  | 'Websites'
  | 'Applications'
  | 'Branding'
  | 'Creative Design'
  | 'Marketing'
  | 'AI & Automation';

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  'All Projects',
  'Websites',
  'Applications',
  'Branding',
  'Creative Design',
  'Marketing',
  'AI & Automation',
];

export interface CaseStudy {
  slug: string;
  title: string;
  category: Exclude<PortfolioCategory, 'All Projects'>;
  projectTypeLabel: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  overview: string;
  challenge: string;
  strategy: string;
  execution: string;
  deliverables: string[];
  resultsNote: string;
  galleryCaptions: string[];
  relatedSlugs: string[];
}

export const PROJECTS: CaseStudy[] = [
  {
    slug: 'commerce-flagship-architecture',
    title: 'Modular Commerce Flagship Architecture',
    category: 'Websites',
    projectTypeLabel: 'Concept Architecture · Websites',
    shortDescription:
      'High-speed editorial storefront and installable PWA concept designed for seamless mobile browsing and technical SEO.',
    image: '/src/assets/images/case_web_platform_1795014319169.jpg',
    imageAlt: 'Laptop displaying a clean white and deep purple web platform interface on a light grey plinth',
    overview:
      'A studio architecture showcase demonstrating how AASRA structures multi-page web platforms that combine editorial storytelling, sub-second page transitions, and installable PWA capability.',
    challenge:
      'Modern commerce and B2B websites often force a trade-off between expressive brand presentation and clean mobile performance.',
    strategy:
      'Pair strict typographic hierarchy and modular React viewports with pre-rendered metadata, structured schema, and lightweight service-worker caching.',
    execution:
      'Engineered responsive 12-column desktop layouts, touch-optimised mobile drawers, and reusable product/service templates with zero layout shift.',
    deliverables: [
      'Responsive multi-device web architecture',
      'Installable PWA manifest and service worker strategy',
      'Semantic HTML and structured JSON-LD metadata',
      'Reusable modular UI component library',
    ],
    resultsNote:
      'This is an internal AASRA studio capability showcase. Verified client performance metrics are published only for consented live client engagements.',
    galleryCaptions: [
      'Desktop editorial grid with balanced whitespace and typographic contrast',
      'Mobile standalone PWA viewport layout',
    ],
    relatedSlugs: ['operations-mobile-workspace', 'unified-brand-identity-system'],
  },
  {
    slug: 'operations-mobile-workspace',
    title: 'Operations & Client Workspace Application',
    category: 'Applications',
    projectTypeLabel: 'System Prototype · Applications',
    shortDescription:
      'Touch-first application blueprint unifying project milestones, approval workflows, and executive status tracking.',
    image: '/src/assets/images/case_mobile_app_1795014320945.jpg',
    imageAlt: 'Smartphone displaying a dark and electric purple mobile dashboard UI on a stone block',
    overview:
      'A full-stack application blueprint crafted for service businesses that need real-time project visibility across desktop teams and mobile stakeholders.',
    challenge:
      'Teams frequently juggle client approvals across email threads, chat apps, and disconnected spreadsheets, causing delayed deliverables.',
    strategy:
      'Consolidate milestone reviews, asset handoffs, and structured status transitions inside a mobile-first web application with clear role states.',
    execution:
      'Built responsive touch cards, tabular milestone timelines, validated submission states, and offline-resilient read caching.',
    deliverables: [
      'Mobile-first application UI system',
      'Role-aware dashboard and milestone views',
      'Validated input forms and API integration contracts',
      'Offline-ready shell architecture',
    ],
    resultsNote:
      'Representative AASRA application prototype. Live client deployment metrics are shared only with explicit client authorization.',
    galleryCaptions: [
      'Mobile workspace overview screen with high-contrast purple telemetry accents',
      'Structured task and milestone approval flow',
    ],
    relatedSlugs: ['commerce-flagship-architecture', 'autonomous-enquiry-triage-agent'],
  },
  {
    slug: 'unified-brand-identity-system',
    title: 'Unified Visual Identity & Type System',
    category: 'Branding',
    projectTypeLabel: 'Brand Study · Branding',
    shortDescription:
      'Geometric monogram, typographic specimen system, and stationery guidelines engineered for print and digital precision.',
    image: '/src/assets/images/case_brand_identity_1795014322320.jpg',
    imageAlt: 'Overhead studio flat-lay of deep purple foil stationery and white typography specimen sheets',
    overview:
      'A comprehensive identity study illustrating how AASRA translates a brand mark into cohesive typography, stationery, and digital interface tokens.',
    challenge:
      'Growing companies often accumulate inconsistent logos, ad-hoc font choices, and mismatched presentation decks as teams scale.',
    strategy:
      'Establish one strict geometric grid, a paired display-and-body typographic scale, and disciplined colour distribution tokens.',
    execution:
      'Produced vector mark variants, print-ready stationery layouts, typographic specimen sheets, and digital brand usage rules.',
    deliverables: [
      'Primary geometric monogram & wordmark suite',
      'Display and body typographic scale system',
      'Print stationery and folder specifications',
      'Digital colour and spacing token guide',
    ],
    resultsNote:
      'Internal AASRA branding system study showcasing our design standards across print and screen.',
    galleryCaptions: [
      'Stationery flat-lay combining deep purple folders and crisp cotton specimen cards',
      'Multi-scale logomark and type hierarchy sheet',
    ],
    relatedSlugs: ['promotional-campaign-key-visuals', 'commerce-flagship-architecture'],
  },
  {
    slug: 'promotional-campaign-key-visuals',
    title: 'Editorial Launch Poster & Campaign Suite',
    category: 'Creative Design',
    projectTypeLabel: 'Art Direction · Creative Design',
    shortDescription:
      'Coordinated poster layouts, launch announcements, and multi-format promotional assets built for print and social distribution.',
    image: '/src/assets/images/hero_studio_showcase_1795014320813.jpg',
    imageAlt: 'Floating architectural digital frames showcasing dark purple visual design panels on white stage',
    overview:
      'A creative direction showcase demonstrating how a single core visual language adapts cleanly across launch posters, social carousels, and web banners.',
    challenge:
      'Promotional assets frequently lose visual cohesion when resized hastily across portrait posters, square feeds, and widescreen hero banners.',
    strategy:
      'Design a modular typographic and framing grid upfront so every aspect ratio maintains clear focal hierarchy and breathing room.',
    execution:
      'Created coordinated print-resolution posters paired with digital launch frames and social grid templates.',
    deliverables: [
      'Campaign key visual direction',
      'Print-ready poster layouts with bleed specs',
      'Multi-ratio digital promotional templates',
      'Typography and colour contrast rules',
    ],
    resultsNote:
      'Creative direction showcase created by AASRA Web Devs to demonstrate campaign consistency across mediums.',
    galleryCaptions: [
      'Widescreen hero frame composition with crisp violet edge lighting',
      'Modular campaign layout system',
    ],
    relatedSlugs: ['unified-brand-identity-system', 'full-funnel-growth-framework'],
  },
  {
    slug: 'full-funnel-growth-framework',
    title: 'Full-Funnel Acquisition & Attribution System',
    category: 'Marketing',
    projectTypeLabel: 'Growth Blueprint · Marketing',
    shortDescription:
      'Integrated search, paid acquisition, and social content architecture connecting traffic directly to qualified enquiries.',
    image: '/src/assets/images/case_web_platform_1795014319169.jpg',
    imageAlt: 'Analytics and marketing funnel dashboard displayed on a sleek laptop in minimalist studio',
    overview:
      'An end-to-end growth framework showing how AASRA aligns paid search, social content pillars, landing pages, and conversion analytics.',
    challenge:
      'Disjointed marketing campaigns often drive traffic to unoptimised pages without clear attribution back to actual enquiries.',
    strategy:
      'Unify campaign creative, intent-matched landing sections, and event tracking under one shared acquisition blueprint.',
    execution:
      'Mapped search and social audience segments to dedicated conversion flows with structured testing hypotheses and reporting views.',
    deliverables: [
      'Channel & audience segmentation architecture',
      'Landing page conversion structure',
      'Creative testing matrix across search & social',
      'Attribution and reporting dashboard layout',
    ],
    resultsNote:
      'Framework blueprint only — AASRA never publishes fabricated ROAS or lead volume percentages.',
    galleryCaptions: [
      'Unified acquisition and conversion review interface',
      'Structured campaign testing workflow',
    ],
    relatedSlugs: ['autonomous-enquiry-triage-agent', 'commerce-flagship-architecture'],
  },
  {
    slug: 'autonomous-enquiry-triage-agent',
    title: 'Autonomous Enquiry Triage & BI Pipeline',
    category: 'AI & Automation',
    projectTypeLabel: 'Intelligence Blueprint · AI & Automation',
    shortDescription:
      'Guarded AI classification agent and automated CRM routing pipeline paired with live operational reporting.',
    image: '/src/assets/images/case_ai_automation_1795014319906.jpg',
    imageAlt: 'Modular frosted glass and deep purple geometric nodes linked by lavender optical pathways',
    overview:
      'An intelligence and automation architecture uniting structured AI agents, webhook orchestration, and clean BI reporting for high-volume service teams.',
    challenge:
      'Manual enquiry sorting, incomplete CRM entries, and delayed follow-ups slow down response times as inbound volume grows.',
    strategy:
      'Combine deterministic validation, retrieval-grounded AI summarization, and human-approved routing rules with full auditability.',
    execution:
      'Designed modular webhook nodes, schema-enforced AI extraction, automated team notifications, and executive pipeline dashboards.',
    deliverables: [
      'AI triage agent specification & schema guardrails',
      'Webhook & CRM automation architecture',
      'Failure-alert & human-in-the-loop review flow',
      'Pipeline analytics & response-time dashboard',
    ],
    resultsNote:
      'Studio intelligence blueprint demonstrating AASRA’s approach to reliable, guarded AI and business automation.',
    galleryCaptions: [
      'Modular node visualization representing guarded AI and data routing',
      'Structured pipeline telemetry and human review flow',
    ],
    relatedSlugs: ['operations-mobile-workspace', 'full-funnel-growth-framework'],
  },
];

export function getProjectBySlug(slug: string): CaseStudy | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
