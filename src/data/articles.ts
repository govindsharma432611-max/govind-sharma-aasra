export type ArticleCategory =
  | 'All'
  | 'Technology'
  | 'Web Development'
  | 'Branding'
  | 'Marketing'
  | 'AI & Automation'
  | 'Business Growth'
  | 'Data & Analytics';

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  'All',
  'Technology',
  'Web Development',
  'Branding',
  'Marketing',
  'AI & Automation',
  'Business Growth',
  'Data & Analytics',
];

export interface Article {
  slug: string;
  title: string;
  category: Exclude<ArticleCategory, 'All'>;
  excerpt: string;
  readingTime: string;
  publishedAt: string;
  featured?: boolean;
  coverImage: string;
  coverAlt: string;
  sections: { heading: string; body: string[] }[];
}

export const ARTICLES: Article[] = [
  {
    slug: 'why-modern-business-websites-should-be-installable-pwas',
    title: 'Why Modern Business Websites Should Be Installable Progressive Web Apps',
    category: 'Web Development',
    excerpt:
      'How combining an editorial web presence with a Web App Manifest and service worker delivers mobile app convenience without app-store friction.',
    readingTime: '5 min read',
    publishedAt: 'November 2026',
    featured: true,
    coverImage: '/src/assets/images/hero_studio_showcase_1795014320813.jpg',
    coverAlt: 'Floating architectural UI cards showcasing modern web application screens',
    sections: [
      {
        heading: 'Bridging the gap between browser reach and home-screen presence',
        body: [
          'Most businesses maintain a website for search discovery and wish they also had a mobile application for repeat client engagement. Maintaining separate native codebases is costly and often unnecessary when the core experience relies on web content, booking, or account access.',
          'A Progressive Web App (PWA) allows visitors to open your domain in any modern browser and install it directly onto their phone or desktop home screen with standalone navigation and instant relaunch.',
        ],
      },
      {
        heading: 'What separates a reliable PWA from a broken wrapper',
        body: [
          'True installability requires more than a manifest file. Service workers must apply thoughtful caching strategies—serving static assets rapidly while keeping API mutations and contact submissions strictly online-verified.',
          'Respecting platform differences is equally critical: Chromium browsers support native installation triggers, while iOS Safari users benefit from clear guided instructions for Add to Home Screen.',
        ],
      },
    ],
  },
  {
    slug: 'designing-guarded-ai-agents-for-real-operations',
    title: 'Designing Guarded AI Agents That Actually Work in Daily Operations',
    category: 'AI & Automation',
    excerpt:
      'Moving past generic chat widgets toward structured, schema-validated AI workflows with human-in-the-loop checkpoints.',
    readingTime: '6 min read',
    publishedAt: 'November 2026',
    coverImage: '/src/assets/images/case_ai_automation_1795014319906.jpg',
    coverAlt: 'Frosted glass and deep purple geometric blocks representing structured AI workflows',
    sections: [
      {
        heading: 'Start with deterministic boundaries, not open-ended prompts',
        body: [
          'The fastest way for an AI automation project to fail in production is asking a language model to improvise without strict data boundaries or schema validation.',
          'Reliable operational agents operate on narrow, well-defined inputs: classifying incoming briefs, retrieving verified policy passages, or drafting structured summaries for human approval.',
        ],
      },
      {
        heading: 'Where AI pairs best with Business Process Automation',
        body: [
          'When an AI extraction step hands structured JSON directly to deterministic webhook or CRM pipelines, businesses eliminate hours of manual triage while keeping full visibility over every action.',
        ],
      },
    ],
  },
  {
    slug: 'typography-as-competitive-advantage-in-digital-brands',
    title: 'Why Typographic Hierarchy Matters More Than Decorative Effects',
    category: 'Branding',
    excerpt:
      'How intentional display-to-body pairing, optical spacing, and restraint create unmistakable authority across screens and print.',
    readingTime: '4 min read',
    publishedAt: 'October 2026',
    coverImage: '/src/assets/images/case_brand_identity_1795014322320.jpg',
    coverAlt: 'Minimalist brand stationery and typographic specimen sheets on light grey stone',
    sections: [
      {
        heading: 'Reading rhythm drives trust before visitors read a word',
        body: [
          'Visitors form an impression of credibility in milliseconds. Balanced line lengths, crisp contrast, and disciplined scale shifts signal engineering and creative rigour immediately.',
          'Instead of compensating for weak typography with heavy shadows and floating badges, strong studio design lets whitespace and letterforms carry the page.',
        ],
      },
    ],
  },
  {
    slug: 'connecting-paid-acquisition-to-conversion-architecture',
    title: 'Why Performance Marketing Fails Without Conversion-Ready Landing Systems',
    category: 'Marketing',
    excerpt:
      'Ad targeting only solves half the equation—why landing page clarity, page speed, and honest attribution decide campaign ROI.',
    readingTime: '5 min read',
    publishedAt: 'October 2026',
    coverImage: '/src/assets/images/case_web_platform_1795014319169.jpg',
    coverAlt: 'Laptop showing clean marketing analytics and funnel interface',
    sections: [
      {
        heading: 'Ad spend amplifies the quality of the destination page',
        body: [
          'Raising ad budgets on a slow or confusing website simply accelerates wasted spend. Every campaign hook should land visitors on a fast, message-matched page that answers objections clearly.',
          'When marketing teams and web engineers share one unified architecture, testing new offers and tracking genuine lead quality becomes effortless.',
        ],
      },
    ],
  },
  {
    slug: 'turning-fragmented-spreadsheets-into-decision-dashboards',
    title: 'From Fragmented Spreadsheets to Executive Business Intelligence',
    category: 'Data & Analytics',
    excerpt:
      'A practical guide to reconciling CRM, marketing, and operational records into clear metrics leadership can actually use.',
    readingTime: '5 min read',
    publishedAt: 'October 2026',
    coverImage: '/src/assets/images/case_mobile_app_1795014320945.jpg',
    coverAlt: 'Mobile device displaying clean tabular project metrics',
    sections: [
      {
        heading: 'Define the decision before building the chart',
        body: [
          'Effective business intelligence starts by auditing which metrics truly govern cash flow, pipeline velocity, and delivery capacity—not cramming twenty gauges onto a single screen.',
        ],
      },
    ],
  },
  {
    slug: 'choosing-custom-software-vs-off-the-shelf-tools',
    title: 'When Should a Growing Business Invest in Custom Web Applications?',
    category: 'Technology',
    excerpt:
      'Practical criteria for deciding when off-the-shelf SaaS subscriptions cost more in friction than a tailored application.',
    readingTime: '4 min read',
    publishedAt: 'September 2026',
    coverImage: '/src/assets/images/case_web_platform_1795014319169.jpg',
    coverAlt: 'Custom web application workspace displayed on matte laptop',
    sections: [
      {
        heading: 'Signs your team has outgrown stitched spreadsheets',
        body: [
          'When teams spend more time reconciling manual workarounds across five tools than serving clients, a purpose-built web application quickly pays back its engineering investment in speed and accuracy.',
        ],
      },
    ],
  },
  {
    slug: 'building-connected-digital-systems-for-compounding-growth',
    title: 'One Vision: Why Brand, Software, and Growth Belong Under One Roof',
    category: 'Business Growth',
    excerpt:
      'How eliminating handoff gaps between branding studios, software teams, and marketers creates compounding momentum.',
    readingTime: '4 min read',
    publishedAt: 'September 2026',
    coverImage: '/src/assets/images/hero_studio_showcase_1795014320813.jpg',
    coverAlt: 'Unified AASRA studio showcase visual',
    sections: [
      {
        heading: 'Disconnected vendors build disconnected customer journeys',
        body: [
          'Hiring one vendor for a logo, another for a website, and a third for marketing often creates friction at every boundary. AASRA aligns brand, engineering, marketing, and automation inside one cohesive partnership.',
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
