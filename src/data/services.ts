export type ServiceCategoryId =
  | 'development'
  | 'creative-branding'
  | 'marketing-growth'
  | 'technology-intelligence';

export type ServiceVisualType =
  | 'website-mockup'
  | 'app-mockup'
  | 'logo-identity'
  | 'typography-specimen'
  | 'poster-layout'
  | 'marketing-strategy'
  | 'campaign-dashboard'
  | 'social-grid'
  | 'ai-workflow'
  | 'data-dashboard'
  | 'process-diagram';

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceDefinition {
  id: string;
  number: string;
  slug: string;
  name: string;
  category: string;
  categoryId: ServiceCategoryId;
  shortDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  introduction: string;
  problemsWeSolve: string[];
  capabilities: { title: string; detail: string }[];
  deliverables: string[];
  processSteps: { step: string; title: string; description: string }[];
  visualType: ServiceVisualType;
  faqs: ServiceFAQ[];
  metaTitle: string;
  metaDescription: string;
}

export interface ServiceCategorySummary {
  id: ServiceCategoryId;
  number: string;
  title: string;
  summary: string;
  serviceSlugs: string[];
}

export const SERVICE_CATEGORIES: ServiceCategorySummary[] = [
  {
    id: 'development',
    number: '01',
    title: 'Development',
    summary:
      'High-speed web architectures, progressive web applications, and cross-platform software built for durability and conversion.',
    serviceSlugs: ['website-development', 'application-development'],
  },
  {
    id: 'creative-branding',
    number: '02',
    title: 'Creative & Branding',
    summary:
      'Distinctive visual identities, typographic systems, and promotional campaign art direction that separate brands from templates.',
    serviceSlugs: ['logo-design', 'typography-design', 'poster-design', 'menu-design'],
  },
  {
    id: 'marketing-growth',
    number: '03',
    title: 'Marketing & Growth',
    summary:
      'Structured acquisition strategies, measurable performance campaigns, and consistent social presence built to compound demand.',
    serviceSlugs: ['digital-marketing', 'performance-marketing', 'social-media-management'],
  },
  {
    id: 'technology-intelligence',
    number: '04',
    title: 'AI, Data & Automation',
    summary:
      'Custom AI agents, executive analytics pipelines, and automated operational workflows that remove manual bottlenecks.',
    serviceSlugs: ['ai-agents-automation', 'data-analysis', 'business-process-automation'],
  },
];

export const SERVICES: ServiceDefinition[] = [
  {
    id: 'website-development',
    number: '01',
    slug: 'website-development',
    name: 'Website Development',
    category: 'Development',
    categoryId: 'development',
    shortDescription:
      'Custom-engineered marketing websites, web platforms, and installable PWAs built for speed, SEO, and clarity.',
    heroHeadline: 'Websites engineered for authority, speed, and measurable conversion.',
    heroSubheadline:
      'From bespoke company flagships to installable Progressive Web Apps, we build web experiences that load fast and guide visitors to action.',
    introduction:
      'Your website is often the first working proof of how seriously your business operates. We architect custom, responsive websites using modern frontend and full-stack tooling—combining editorial layout craft, technical SEO, accessibility, and clean codebases that remain easy to maintain and scale.',
    problemsWeSolve: [
      'Slow, bloated template websites that lose impatient mobile visitors before content renders.',
      'Disconnected brand messaging and unclear user journeys that fail to turn traffic into enquiries.',
      'Rigid CMS setups where simple content updates require developer intervention.',
      'Poor technical SEO structure, missing metadata, and weak Core Web Vitals.',
    ],
    capabilities: [
      { title: 'Custom Frontend Engineering', detail: 'Type-safe React, Next.js, and modern CSS architectures tailored to your brand system.' },
      { title: 'Installable PWA Architecture', detail: 'Web App Manifests, service workers, and offline-ready mobile app experiences.' },
      { title: 'Technical SEO & Performance', detail: 'Semantic HTML, structured data, sitemaps, and asset optimization baked in from day one.' },
      { title: 'API & CMS Integration', detail: 'Clean backend routes, lead-capture forms, and headless content workflows.' },
    ],
    deliverables: [
      'Responsive multi-device UI across mobile, tablet, and desktop',
      'Semantic HTML & technical SEO foundation (metadata, sitemap, schema)',
      'Performance-optimised production build & deployment configuration',
      'Validated enquiry & lead capture flows',
      'Handover documentation and editable content architecture',
    ],
    processSteps: [
      { step: '01', title: 'Architecture & Sitemap', description: 'Define user journeys, page hierarchy, and technical requirements.' },
      { step: '02', title: 'Interface Design', description: 'Craft wireframes, visual direction, and responsive component systems.' },
      { step: '03', title: 'Full-Stack Build', description: 'Implement clean frontend views, animations, APIs, and PWA capabilities.' },
      { step: '04', title: 'QA & Launch', description: 'Cross-browser testing, accessibility checks, SEO verification, and deployment.' },
    ],
    visualType: 'website-mockup',
    faqs: [
      {
        question: 'Can my website also work as an installable app?',
        answer: 'Yes. We can architect your website as a Progressive Web App (PWA) so visitors on mobile and desktop can install it directly to their home screen with standalone navigation and offline support.',
      },
      {
        question: 'Do you build custom designs instead of off-the-shelf themes?',
        answer: 'Every flagship project is designed and engineered specifically around your brand identity, content structure, and conversion goals rather than recycled templates.',
      },
    ],
    metaTitle: 'Website Development Services — Custom Websites & PWAs',
    metaDescription: 'Custom website development and installable Progressive Web Apps engineered for speed, SEO, and conversion by AASRA Web Devs.',
  },
  {
    id: 'application-development',
    number: '02',
    slug: 'application-development',
    name: 'Application Development',
    category: 'Development',
    categoryId: 'development',
    shortDescription:
      'Web applications, client portals, internal tools, and mobile-first software systems designed around real workflows.',
    heroHeadline: 'Software applications built around how your business actually works.',
    heroSubheadline:
      'Customer portals, SaaS products, booking platforms, and mobile-ready web applications engineered for reliability.',
    introduction:
      'Off-the-shelf software forces teams to adapt their operations to rigid workflows. We design and build custom web and cross-platform applications with intuitive interfaces, dependable data models, role-based access, and clean API integrations.',
    problemsWeSolve: [
      'Manual spreadsheet workflows that break as order volume or team headcount grows.',
      'Clunky legacy internal tools with poor mobile usability and slow data lookups.',
      'Fragmented SaaS subscriptions that fail to share customer or operational state.',
      'Unvalidated MVP prototypes that cannot handle real-world authentication or edge cases.',
    ],
    capabilities: [
      { title: 'Full-Stack Web Applications', detail: 'End-to-end TypeScript applications with structured state management and server APIs.' },
      { title: 'Mobile-First & Touch UX', detail: 'Thumb-friendly navigation, offline caching, and installable mobile shells.' },
      { title: 'Database & Auth Design', detail: 'Clean schema modeling, validation, and secure session management.' },
      { title: 'Third-Party Integrations', detail: 'Payment gateways, CRMs, webhooks, and reporting exports.' },
    ],
    deliverables: [
      'Product specification and data model architecture',
      'Interactive UI prototype and design system components',
      'Production-ready application frontend and API layer',
      'Automated validation and core logic test suite',
      'Deployment pipeline and operational documentation',
    ],
    processSteps: [
      { step: '01', title: 'Workflow Mapping', description: 'Audit user roles, edge cases, and required system integrations.' },
      { step: '02', title: 'System & UX Blueprint', description: 'Design interactive flows, component hierarchy, and database schemas.' },
      { step: '03', title: 'Iterative Engineering', description: 'Build modular frontend and backend features with continuous verification.' },
      { step: '04', title: 'Testing & Rollout', description: 'Execute functional QA, security hardening, and staged launch.' },
    ],
    visualType: 'app-mockup',
    faqs: [
      {
        question: 'Do you build both customer-facing apps and internal business tools?',
        answer: 'Yes. We engineer SaaS products and customer portals as well as internal operations dashboards, inventory tools, and scheduling systems.',
      },
      {
        question: 'Can an existing spreadsheet process be turned into a web application?',
        answer: 'Yes. We translate complex multi-sheet workflows into structured, role-safe web applications with proper validation and auditability.',
      },
    ],
    metaTitle: 'Application Development — Custom Web & Mobile Applications',
    metaDescription: 'Custom web applications, customer portals, and mobile-first software systems engineered by AASRA Web Devs.',
  },
  {
    id: 'logo-design',
    number: '03',
    slug: 'logo-design',
    name: 'Logo Design',
    category: 'Creative & Branding',
    categoryId: 'creative-branding',
    shortDescription:
      'Distinctive brand marks, geometric monograms, and scalable identity guidelines built for physical and digital longevity.',
    heroHeadline: 'Marks engineered to stay unmistakable at every scale.',
    heroSubheadline:
      'Original logotypes, monograms, and visual identity systems crafted for digital interfaces, print, and app icons.',
    introduction:
      'A strong logo is not decoration—it is an anchor for recognition across app icons, websites, packaging, and social channels. We craft original geometric marks and wordmarks tested rigorously across tiny mobile favicons and large-format displays.',
    problemsWeSolve: [
      'Generic icon-plus-text logos that look indistinguishable from competitors.',
      'Complex illustrations that collapse into unreadable smudges at favicon or mobile icon sizes.',
      'Inconsistent colour, spacing, and usage across social profiles, decks, and signage.',
    ],
    capabilities: [
      { title: 'Primary Mark & Wordmark', detail: 'Bespoke vector geometry balanced for optical precision.' },
      { title: 'Responsive Icon Variants', detail: 'Full lockups, stacked versions, and simplified app/favicon monograms.' },
      { title: 'Colour & Contrast Systems', detail: 'Primary, monochrome, and dark-surface variants with exact hex/CMYK tokens.' },
      { title: 'Brand Usage Guidelines', detail: 'Clear-space rules, minimum sizing, and misuse prevention.' },
    ],
    deliverables: [
      'Primary vector logo (SVG, EPS, PDF) and high-res PNG exports',
      'Monochrome, dark-background, and light-background lockups',
      'App icon and favicon adaptations (16px to 512px)',
      'Concise Brand Identity Guidelines document',
    ],
    processSteps: [
      { step: '01', title: 'Brand Discovery', description: 'Study positioning, audience expectations, and competitive visual territory.' },
      { step: '02', title: 'Concept Exploration', description: 'Develop distinct structural directions backed by clear rationale.' },
      { step: '03', title: 'Optical Refinement', description: 'Balance curve tension, stroke weights, and legibility across sizes.' },
      { step: '04', title: 'Asset System Delivery', description: 'Package complete vector, digital, and guideline files.' },
    ],
    visualType: 'logo-identity',
    faqs: [
      {
        question: 'Will I receive source vector files and app icon sizes?',
        answer: 'Yes. Every logo engagement includes clean vector master files (SVG/PDF/EPS) alongside digital PNGs sized for websites, social avatars, and PWA/mobile icons.',
      },
    ],
    metaTitle: 'Logo Design & Brand Identity Systems',
    metaDescription: 'Original logo design, geometric monograms, and brand identity guidelines built for digital and print clarity by AASRA Web Devs.',
  },
  {
    id: 'typography-design',
    number: '04',
    slug: 'typography-design',
    name: 'Typography Design',
    category: 'Creative & Branding',
    categoryId: 'creative-branding',
    shortDescription:
      'Custom typographic hierarchies, bespoke lettering lockups, and cross-platform type systems for editorial clarity.',
    heroHeadline: 'Typographic systems that give your brand an unmistakable voice.',
    heroSubheadline:
      'Strategic font pairing, editorial scale systems, and custom display lettering built for screens and print.',
    introduction:
      'Most digital experiences are 90% typography. When type hierarchy is poorly calibrated, even strong copy feels generic or hard to scan. We design complete typographic systems—from display pairings and tabular data scales to custom campaign wordmarks.',
    problemsWeSolve: [
      'Flat, monotonous layouts where headlines, metadata, and body copy compete equally.',
      'Unreadable mobile typography with cramped line heights or excessive line lengths.',
      'Misaligned font licensing and inconsistent type usage across web and marketing collateral.',
    ],
    capabilities: [
      { title: 'Type Pairing & Scale Systems', detail: 'Display, editorial, body, and tabular numeral scales calibrated for readability.' },
      { title: 'Custom Wordmark Lettering', detail: 'Tailored display letterforms for brand titles and hero campaigns.' },
      { title: 'Web Font Performance', detail: 'Subsetting, variable weight optimization, and fallback alignment.' },
      { title: 'Design Token Specification', detail: 'CSS and Tailwind type tokens ready for engineering handoff.' },
    ],
    deliverables: [
      'Complete typographic scale specification (desktop & mobile)',
      'Curated font pairing & licensing guidance',
      'Custom display wordmark or campaign lettering assets (where scoped)',
      'Ready-to-use CSS / Tailwind typography tokens',
    ],
    processSteps: [
      { step: '01', title: 'Voice Audit', description: 'Align typographic personality with brand tone and reading context.' },
      { step: '02', title: 'Specimen Testing', description: 'Test real headlines, long-form prose, and numeric tables side by side.' },
      { step: '03', title: 'Scale Calibration', description: 'Define responsive clamps, tracking, and optical line heights.' },
      { step: '04', title: 'Token Handoff', description: 'Deliver specimen sheets and developer-ready CSS definitions.' },
    ],
    visualType: 'typography-specimen',
    faqs: [
      {
        question: 'Can typography design be paired with an existing logo?',
        answer: 'Yes. We frequently build full typographic hierarchies and campaign display systems around existing brand marks to elevate digital and print communication.',
      },
    ],
    metaTitle: 'Typography Design & Editorial Type Systems',
    metaDescription: 'Bespoke typographic hierarchies, font systems, and display lettering crafted for clarity and brand distinction by AASRA Web Devs.',
  },
  {
    id: 'poster-design',
    number: '05',
    slug: 'poster-design',
    name: 'Poster and Promotional Design',
    category: 'Creative & Branding',
    categoryId: 'creative-branding',
    shortDescription:
      'High-impact print posters, event visuals, launch graphics, and digital promotional layouts designed to command attention.',
    heroHeadline: 'Promotional visuals built to stop the scroll and hold the room.',
    heroSubheadline:
      'Art-directed posters, launch announcements, and campaign key visuals for both physical print and digital feeds.',
    introduction:
      'Whether launching a product, announcing an event, or running a seasonal campaign, promotional design succeeds on composition, hierarchy, and immediate clarity. We create cohesive poster and promotional suites engineered for print accuracy and multi-format digital distribution.',
    problemsWeSolve: [
      'Cluttered promotional flyers that bury the main message, date, or call to action.',
      'Inconsistent ad creatives that dilute brand recognition across channels.',
      'Improper print bleed, resolution, or colour profiles causing costly reprints.',
    ],
    capabilities: [
      { title: 'Key Visual Art Direction', detail: 'Hero campaign compositions adaptable across formats.' },
      { title: 'Print-Ready Posters & Flyers', detail: 'CMYK, bleed, and high-DPI layouts prepared for commercial printing.' },
      { title: 'Digital Launch Kits', detail: 'Coordinated aspect ratios for web banners, stories, and feeds.' },
      { title: 'Event & Product Collateral', detail: 'Standees, brochures, deck covers, and announcement cards.' },
    ],
    deliverables: [
      'Primary poster / key visual design in editable source formats',
      'Print-ready PDFs with bleed and crop marks',
      'Digital promotional adaptations (16:9, 4:5, 1:1, 9:16)',
      'Typography and colour layout specifications',
    ],
    processSteps: [
      { step: '01', title: 'Message Hierarchy', description: 'Distill the single focal hook, supporting proof, and action.' },
      { step: '02', title: 'Visual Composition', description: 'Explore bold grid geometry, typography, and imagery treatments.' },
      { step: '03', title: 'Format Adaptation', description: 'Reflow layouts cleanly across print and digital aspect ratios.' },
      { step: '04', title: 'Press & Digital Export', description: 'Deliver verified print-ready and web-optimised packages.' },
    ],
    visualType: 'poster-layout',
    faqs: [
      {
        question: 'Do you deliver both print-ready files and social adaptations?',
        answer: 'Yes. Every promotional package can be exported in CMYK print-ready PDFs alongside RGB digital formats for web and social campaigns.',
      },
    ],
    metaTitle: 'Poster & Promotional Design — Print & Digital Key Visuals',
    metaDescription: 'Art-directed posters, launch key visuals, and promotional collateral for print and digital campaigns by AASRA Web Devs.',
  },
  {
    id: 'menu-design',
    number: '12',
    slug: 'menu-design',
    name: 'Menu Design',
    category: 'Creative & Branding',
    categoryId: 'creative-branding',
    shortDescription:
      'Editorial hospitality menus, digital QR menu layouts, and service catalogues designed for readability and higher-margin presentation.',
    heroHeadline: 'Menu design crafted for effortless scanning and culinary authority.',
    heroSubheadline:
      'Print-ready restaurant menus, café boards, beverage lists, and mobile-friendly digital menus engineered around guest flow and visual hierarchy.',
    introduction:
      'A well-structured menu shapes how guests perceive quality and guides them toward signature dishes and seasonal specials without visual clutter. We design tactile print menus, table tents, wall boards, and responsive digital menus calibrated for lighting conditions and press precision.',
    problemsWeSolve: [
      'Dense, hard-to-read multi-column menus that overwhelm guests in low hospitality lighting.',
      'Inconsistent pricing alignment and cramped dish descriptions hiding signature items.',
      'Digital QR menus that force guests to pinch-and-zoom awkwardly across tiny smartphone PDFs.',
    ],
    capabilities: [
      { title: 'Print Menu Systems', detail: 'Dine-in booklets, single-sheet boards, bar lists, and seasonal inserts.' },
      { title: 'Visual Hierarchy & Eye-Flow', detail: 'Intentional callout framing, typographic contrast, and dietary marker systems.' },
      { title: 'Mobile & QR Digital Menus', detail: 'Clean screen-optimised menu formats built for instant smartphone browsing.' },
      { title: 'Print Production Prepress', detail: 'CMYK profiles, fold guides, bleed tolerances, and paper finish guidance.' },
    ],
    deliverables: [
      'Master print-ready menu layouts (PDF/X with crop and bleed marks)',
      'Editable source files for seasonal item or price updates',
      'Mobile-friendly digital/QR menu edition (where scoped)',
      'Typography, grid, and icon legend specifications',
    ],
    processSteps: [
      { step: '01', title: 'Item & Category Structuring', description: 'Organise courses, specials, dietary tags, and pricing alignment cleanly.' },
      { step: '02', title: 'Layout & Type Direction', description: 'Pair legible restaurant typography with brand colours and framing.' },
      { step: '03', title: 'Print & Digital Proofing', description: 'Test physical readability proportions alongside mobile viewport flow.' },
      { step: '04', title: 'Press-Ready Handover', description: 'Export verified print files and digital editions ready for launch.' },
    ],
    visualType: 'poster-layout',
    faqs: [
      {
        question: 'Can we easily update prices or seasonal specials later?',
        answer: 'Yes. We deliver cleanly structured master files so item names and prices can be updated smoothly without rebuilding the entire layout.',
      },
    ],
    metaTitle: 'Menu Design — Restaurant, Hospitality & Digital QR Menus',
    metaDescription: 'Editorial restaurant menu design, café boards, and mobile QR menus crafted for clarity and print precision by Aasra Web Devs.',
  },
  {
    id: 'digital-marketing',
    number: '06',
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    category: 'Marketing & Growth',
    categoryId: 'marketing-growth',
    shortDescription:
      'Integrated search, content, funnel, and lifecycle marketing strategies built around sustainable customer acquisition.',
    heroHeadline: 'Coordinated digital marketing built as a connected growth system.',
    heroSubheadline:
      'Aligning search visibility, content authority, landing experiences, and conversion tracking into one coherent strategy.',
    introduction:
      'Isolated marketing tactics burn budget without compounding value. We treat digital marketing as an interconnected architecture—connecting search intent, persuasive landing pages, email lifecycle flows, and clear attribution so every channel reinforces the next.',
    problemsWeSolve: [
      'Scattered marketing activities with no shared funnel or clear conversion goal.',
      'Traffic arriving at generic pages that fail to answer buyer questions.',
      'Lack of organic search visibility for high-intent commercial queries.',
    ],
    capabilities: [
      { title: 'Full-Funnel Strategy', detail: 'Mapping awareness, consideration, and conversion touchpoints.' },
      { title: 'Search Engine Optimization', detail: 'On-page content architecture, internal linking, and intent targeting.' },
      { title: 'Conversion Rate Optimization', detail: 'Improving landing page clarity, offer framing, and form completion.' },
      { title: 'Lifecycle & Email Flows', detail: 'Structured nurture sequences and lead follow-up systems.' },
    ],
    deliverables: [
      'Channel & audience positioning roadmap',
      'SEO content architecture & keyword cluster blueprint',
      'Landing page conversion recommendations & copy frameworks',
      'Tracking & attribution setup plan',
    ],
    processSteps: [
      { step: '01', title: 'Channel & Funnel Audit', description: 'Identify current traffic leaks, positioning gaps, and audience intent.' },
      { step: '02', title: 'Growth Roadmap', description: 'Prioritise high-leverage organic, content, and conversion initiatives.' },
      { step: '03', title: 'Execution & Alignment', description: 'Deploy campaigns tightly paired with purpose-built landing experiences.' },
      { step: '04', title: 'Review & Iterate', description: 'Measure real enquiry quality and refine messaging monthly.' },
    ],
    visualType: 'marketing-strategy',
    faqs: [
      {
        question: 'How does digital marketing connect with AASRA’s web development work?',
        answer: 'Because our marketers sit alongside our designers and engineers, campaigns never send paid or organic traffic to weak landing pages—we optimise the entire journey end to end.',
      },
    ],
    metaTitle: 'Digital Marketing Strategy & Growth Systems',
    metaDescription: 'Full-funnel digital marketing, SEO strategy, and conversion optimization built for sustainable business growth by AASRA Web Devs.',
  },
  {
    id: 'performance-marketing',
    number: '07',
    slug: 'performance-marketing',
    name: 'Performance Marketing',
    category: 'Marketing & Growth',
    categoryId: 'marketing-growth',
    shortDescription:
      'Data-led paid acquisition campaigns across search and social channels with disciplined creative testing and budget governance.',
    heroHeadline: 'Paid acquisition focused on qualified pipeline, not vanity clicks.',
    heroSubheadline:
      'Structured campaign architecture, creative testing, and transparent reporting across search and social ad platforms.',
    introduction:
      'Paid media amplifies whatever system sits behind it. We structure disciplined search and social ad campaigns with tight audience segmentation, iterative ad creative testing, dedicated landing pages, and clear cost-per-qualified-lead tracking.',
    problemsWeSolve: [
      'Ad spend wasted on broad, low-intent clicks that never convert into enquiries.',
      'Stale ad creatives experiencing rising acquisition costs and audience fatigue.',
      'Opaque agency reports focusing on impressions instead of real business outcomes.',
    ],
    capabilities: [
      { title: 'Search & Shopping Campaigns', detail: 'High-intent keyword structuring, negative keyword hygiene, and bid discipline.' },
      { title: 'Paid Social Acquisition', detail: 'Audience testing and creative iteration across Meta and LinkedIn.' },
      { title: 'Creative & Copy Testing', detail: 'Systematic hooks, visual variations, and offer framing experiments.' },
      { title: 'Attribution & Reporting', detail: 'Clean conversion tracking aligned with lead quality.' },
    ],
    deliverables: [
      'Ad account structure & tracking implementation audit',
      'Campaign launch setup across selected paid channels',
      'Creative testing matrix & landing page alignment',
      'Recurring performance review and optimization log',
    ],
    processSteps: [
      { step: '01', title: 'Unit Economics & Tracking', description: 'Verify conversion events and target acquisition thresholds.' },
      { step: '02', title: 'Campaign Architecture', description: 'Build segmented ad groups, audiences, and initial creative sets.' },
      { step: '03', title: 'Controlled Launch', description: 'Deploy structured tests and eliminate wasted spend early.' },
      { step: '04', title: 'Scale & Creative Refresh', description: 'Reallocate budget toward winning segments and iterate creatives.' },
    ],
    visualType: 'campaign-dashboard',
    faqs: [
      {
        question: 'Do you guarantee specific ad returns before running campaigns?',
        answer: 'No honest agency guarantees fixed ROAS upfront because market demand, pricing, and sales follow-up affect outcomes. Instead, we guarantee transparent tracking, disciplined testing, and continuous optimization toward qualified leads.',
      },
    ],
    metaTitle: 'Performance Marketing — Paid Search & Paid Social',
    metaDescription: 'Measurable performance marketing, paid search, and paid social acquisition with disciplined testing by AASRA Web Devs.',
  },
  {
    id: 'social-media-management',
    number: '08',
    slug: 'social-media-management',
    name: 'Social Media Management',
    category: 'Marketing & Growth',
    categoryId: 'marketing-growth',
    shortDescription:
      'Consistent editorial calendars, art-directed social content systems, and brand-aligned community presence.',
    heroHeadline: 'Social channels managed with editorial consistency and visual craft.',
    heroSubheadline:
      'From content pillars and visual grids to publishing workflows, we turn social profiles into credible brand assets.',
    introduction:
      'Inconsistent posting and off-brand graphics erode trust before a prospect ever visits your website. We manage your social presence as an editorial publication—building repeatable content pillars, cohesive visual templates, and steady publishing cadences.',
    problemsWeSolve: [
      'Sporadic posting followed by weeks of silence across key brand channels.',
      'Mismatched visual styles that make a serious company look disorganised.',
      'Content created without clear alignment to products, launches, or buyer objections.',
    ],
    capabilities: [
      { title: 'Content Strategy & Pillars', detail: 'Structured themes balancing education, proof, product, and culture.' },
      { title: 'Art-Directed Visual Grids', detail: 'Cohesive carousels, static visuals, and short-form motion templates.' },
      { title: 'Copywriting & Scheduling', detail: 'Clear, human captions and dependable publishing calendars.' },
      { title: 'Channel Insights', detail: 'Monthly review of reach, engagement quality, and audience response.' },
    ],
    deliverables: [
      'Monthly editorial content calendar',
      'Branded visual post & carousel designs',
      'Platform-tailored copywriting and hashtag/topic structure',
      'Monthly engagement & audience growth summary',
    ],
    processSteps: [
      { step: '01', title: 'Channel Positioning', description: 'Define voice, visual grammar, and priority platforms.' },
      { step: '02', title: 'Monthly Planning', description: 'Map upcoming campaigns, launches, and educational topics.' },
      { step: '03', title: 'Design & Production', description: 'Produce cohesive graphics, carousels, and copy for approval.' },
      { step: '04', title: 'Publishing & Review', description: 'Schedule consistently and refine themes from audience signals.' },
    ],
    visualType: 'social-grid',
    faqs: [
      {
        question: 'Can we review and approve posts before they go live?',
        answer: 'Yes. Every content calendar and visual batch is shared for your team’s review prior to scheduling.',
      },
    ],
    metaTitle: 'Social Media Management & Editorial Content Systems',
    metaDescription: 'Consistent social media management, content strategy, and art-directed visual grids by AASRA Web Devs.',
  },
  {
    id: 'ai-agents-automation',
    number: '09',
    slug: 'ai-agents-automation',
    name: 'AI Agents and AI Automation',
    category: 'Technology & Intelligence',
    categoryId: 'technology-intelligence',
    shortDescription:
      'Custom AI assistants, retrieval workflows, and multi-step agent pipelines integrated safely into business operations.',
    heroHeadline: 'Practical AI agents engineered for real operational leverage.',
    heroSubheadline:
      'Structured LLM workflows, knowledge-grounded assistants, and human-in-the-loop automations built without hype.',
    introduction:
      'Generic chat widgets rarely solve real business bottlenecks. We engineer targeted AI agents connected to your verified knowledge base, CRM, or internal APIs—handling lead qualification, document triage, support drafting, and structured extraction with strict guardrails.',
    problemsWeSolve: [
      'Repetitive customer enquiries or internal knowledge lookups consuming senior staff hours.',
      'Unstructured incoming emails, briefs, or documents requiring manual data entry.',
      'AI experiments that hallucinate or lack proper approval controls and logging.',
    ],
    capabilities: [
      { title: 'Knowledge-Grounded Assistants', detail: 'Retrieval-augmented workflows anchored strictly to your approved documentation.' },
      { title: 'Lead & Support Triage Agents', detail: 'Structured classification, routing, and draft response preparation.' },
      { title: 'Tool & API Orchestration', detail: 'Deterministic function calling connected to CRMs, calendars, and databases.' },
      { title: 'Guardrails & Evaluation', detail: 'Schema-validated outputs, fallback handling, and human review checkpoints.' },
    ],
    deliverables: [
      'Use-case feasibility & workflow specification',
      'Custom AI agent backend & API integrations',
      'Prompt, retrieval, and schema validation architecture',
      'Operator interface or embedded web assistant',
    ],
    processSteps: [
      { step: '01', title: 'Opportunity Audit', description: 'Identify high-volume tasks with clear inputs, rules, and measurable time savings.' },
      { step: '02', title: 'Guardrail Design', description: 'Define data boundaries, fallback states, and human approval points.' },
      { step: '03', title: 'Agent Engineering', description: 'Build retrieval, tool calls, and clean user or operator interfaces.' },
      { step: '04', title: 'Evaluation & Deployment', description: 'Stress-test edge cases before controlled rollout.' },
    ],
    visualType: 'ai-workflow',
    faqs: [
      {
        question: 'How do you prevent AI agents from inventing answers?',
        answer: 'We ground responses in verified retrieval sources, enforce structured output schemas, and design explicit uncertainty fallbacks or human handoffs.',
      },
    ],
    metaTitle: 'AI Agents & AI Automation Solutions',
    metaDescription: 'Custom AI agents, retrieval-grounded assistants, and guarded AI automation workflows built by AASRA Web Devs.',
  },
  {
    id: 'data-analysis',
    number: '10',
    slug: 'data-analysis',
    name: 'Data Analysis and Business Intelligence',
    category: 'Technology & Intelligence',
    categoryId: 'technology-intelligence',
    shortDescription:
      'Clean data pipelines, executive KPI dashboards, and commercial reporting that turn raw records into clear decisions.',
    heroHeadline: 'Turn fragmented operational data into decisions you can act on.',
    heroSubheadline:
      'Unified metrics, executive dashboards, and structured analysis across sales, marketing, and operations.',
    introduction:
      'Teams often sit on years of CRM, spreadsheet, web analytics, and billing records yet still cannot answer basic commercial questions quickly. We clean, model, and visualise your business data into focused dashboards built around the decisions leadership actually needs to make.',
    problemsWeSolve: [
      'Hours lost every week manually merging CSV exports across departments.',
      'Conflicting numbers between marketing platforms, finance sheets, and CRM reports.',
      'Overcrowded charts that display activity without clarifying what changed or why.',
    ],
    capabilities: [
      { title: 'Data Cleaning & Modeling', detail: 'Normalising inconsistent exports into reliable single-source metrics.' },
      { title: 'Executive BI Dashboards', detail: 'Focused, scannable views with clear period comparisons and drill-downs.' },
      { title: 'Marketing & Funnel Analytics', detail: 'Connecting acquisition channels to downstream conversion stages.' },
      { title: 'Automated Reporting Cadences', detail: 'Scheduled summary views ready for weekly leadership reviews.' },
    ],
    deliverables: [
      'KPI definition dictionary & metric logic documentation',
      'Cleaned data transformation pipeline',
      'Interactive BI dashboard or custom web reporting interface',
      'Initial commercial findings & diagnostic report',
    ],
    processSteps: [
      { step: '01', title: 'Decision Framing', description: 'List the exact questions leadership and ops teams need answered.' },
      { step: '02', title: 'Data Audit & Cleanup', description: 'Inspect sources, reconcile schemas, and eliminate duplicate records.' },
      { step: '03', title: 'Dashboard Architecture', description: 'Design clear visual hierarchies with tabular numeric precision.' },
      { step: '04', title: 'Validation & Handover', description: 'Cross-check totals against source systems and train your team.' },
    ],
    visualType: 'data-dashboard',
    faqs: [
      {
        question: 'Can you work with messy spreadsheets and multiple SaaS tools?',
        answer: 'Yes. Most engagements start by consolidating fragmented spreadsheets, CRM exports, and analytics platforms into a consistent data model.',
      },
    ],
    metaTitle: 'Data Analysis & Business Intelligence Dashboards',
    metaDescription: 'Data modeling, executive BI dashboards, and commercial analytics engineered by AASRA Web Devs.',
  },
  {
    id: 'business-process-automation',
    number: '11',
    slug: 'business-process-automation',
    name: 'Business Process Automation',
    category: 'Technology & Intelligence',
    categoryId: 'technology-intelligence',
    shortDescription:
      'End-to-end operational automations linking forms, CRMs, invoicing, notifications, and internal approvals.',
    heroHeadline: 'Eliminate repetitive manual handoffs across your daily operations.',
    heroSubheadline:
      'Reliable system-to-system automations that connect your website, CRM, team alerts, and billing tools.',
    introduction:
      'Growth stalls when every new lead, invoice, or onboarding step requires manual copy-pasting between disconnected tools. We design resilient process automations with clear error handling, retries, and audit logs so your team can focus on high-value client work.',
    problemsWeSolve: [
      'Leads waiting hours for follow-up because form submissions sit unread in an inbox.',
      'Human copy-paste errors across onboarding, invoicing, and project setup.',
      'Fragile no-code zaps that fail silently without alerts or retry logic.',
    ],
    capabilities: [
      { title: 'Lead-to-CRM Pipelines', detail: 'Instant enquiry routing, enrichment, calendar triggers, and Slack/email alerts.' },
      { title: 'Client Onboarding Workflows', detail: 'Automated workspace creation, folder provisioning, and welcome sequences.' },
      { title: 'Webhook & API Orchestration', detail: 'Custom middleware connecting platforms that lack native integrations.' },
      { title: 'Error Monitoring & Retries', detail: 'Predictable failure handling so critical records are never silently dropped.' },
    ],
    deliverables: [
      'End-to-end process map identifying manual bottlenecks',
      'Production workflow automations (custom API or orchestration tools)',
      'Failure-alert & retry safeguards',
      'Operational runbook for your internal team',
    ],
    processSteps: [
      { step: '01', title: 'Bottleneck Mapping', description: 'Document every manual step, trigger, and tool involved today.' },
      { step: '02', title: 'Workflow Architecture', description: 'Design reliable state transitions and edge-case error handling.' },
      { step: '03', title: 'Build & Integration', description: 'Connect APIs, webhooks, databases, and notification channels.' },
      { step: '04', title: 'Shadow Run & Handover', description: 'Verify live runs with logging before full team adoption.' },
    ],
    visualType: 'process-diagram',
    faqs: [
      {
        question: 'Do you build custom API automations or use workflow platforms?',
        answer: 'We choose the cleanest reliable approach for your stack—whether custom Node/TypeScript webhook services or maintainable workflow orchestration platforms.',
      },
    ],
    metaTitle: 'Business Process Automation — Connected Operational Workflows',
    metaDescription: 'Reliable business process automation connecting websites, CRMs, onboarding, and reporting tools by AASRA Web Devs.',
  },
];

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServicesByCategory(categoryId: ServiceCategoryId): ServiceDefinition[] {
  return SERVICES.filter((s) => s.categoryId === categoryId);
}
