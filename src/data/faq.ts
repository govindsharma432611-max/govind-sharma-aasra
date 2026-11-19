export interface FAQItem {
  question: string;
  answer: string;
}

export const HOME_FAQS: FAQItem[] = [
  {
    question: 'What services does AASRA provide?',
    answer:
      'AASRA Web Devs provides twelve connected services across four disciplines: Development (Website Development, Application Development), Creative & Branding (Logo Design, Typography Design, Poster & Promotional Design, Menu Design), Marketing & Growth (Digital Marketing, Performance Marketing, Social Media Management), and Technology & Intelligence (AI Agents & AI Automation, Data Analysis & BI, Business Process Automation).',
  },
  {
    question: 'Do you work with startups?',
    answer:
      'Yes. We partner with early-stage founders and startups as well as established businesses. For startups, we focus on clean foundational architecture—launching cohesive brand identities, high-converting websites or MVPs, and practical growth systems without unnecessary overhead.',
  },
  {
    question: 'Can I hire you for individual services?',
    answer:
      'Yes. While many clients engage us across multiple connected disciplines, you can hire AASRA for any single service—such as Website Development, Logo Design, Performance Marketing, or Business Process Automation.',
  },
  {
    question: 'Do you develop applications?',
    answer:
      'Yes. We design and engineer custom web applications, customer portals, internal business dashboards, and installable Progressive Web Applications (PWAs) built for desktop and mobile devices.',
  },
  {
    question: 'Do you provide digital marketing?',
    answer:
      'Yes. Our Marketing & Growth team handles full-funnel Digital Marketing, Performance Marketing across paid search and social channels, and ongoing Social Media Management—tightly aligned with your website and conversion analytics.',
  },
  {
    question: 'Do you develop AI agents?',
    answer:
      'Yes. We build practical, retrieval-grounded AI agents and guarded automation workflows for lead triage, knowledge lookup, document structuring, and operational routing with clear human-in-the-loop controls.',
  },
  {
    question: 'How do I start a project?',
    answer:
      'Visit our Contact page and share your project brief, timeline, and required service. We review your goals, schedule an initial discovery discussion, and prepare a tailored scope and custom quote.',
  },
  {
    question: 'How is pricing determined?',
    answer:
      'Every engagement is scoped around your exact requirements, complexity, integrations, and timeline rather than arbitrary flat tags. Share your brief and we will provide a clear, transparent custom quote before any work begins.',
  },
];

export const PRICING_FAQS: FAQItem[] = [
  {
    question: 'Why do packages show "Request a Custom Quote" instead of fixed rates?',
    answer:
      'Project complexity varies significantly—a five-page flagship website has very different requirements from a multi-role web application or an integrated AI workflow. Custom quoting ensures you only pay for the exact capabilities your business needs.',
  },
  {
    question: 'Can multiple services be bundled into one engagement?',
    answer:
      'Yes. Combining branding, website development, marketing setup, or automation into a single coordinated roadmap often removes handoff friction and accelerates launch timelines.',
  },
  {
    question: 'How are payment milestones structured?',
    answer:
      'Milestone schedules (such as project initiation, design approval, and final delivery) or monthly retainer terms are confirmed clearly in writing in your project proposal prior to kickoff.',
  },
];
