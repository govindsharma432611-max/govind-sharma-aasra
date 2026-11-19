export interface LegalSection {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
}

export interface LegalDocumentData {
  slug: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  reviewNotice: string;
  sections: LegalSection[];
}

export const LEGAL_DOCUMENTS: Record<string, LegalDocumentData> = {
  'privacy-policy': {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    subtitle: 'How AASRA Web Devs collects, uses, stores, and protects visitor and enquiry information.',
    lastUpdated: '[Last Updated: Editable Date — Pending Final Publication Review]',
    reviewNotice:
      'This document is structured as an editable template for AASRA Web Devs. Specific registered entity details, Data Protection Officer contacts, and regional statutory references marked in brackets must be confirmed by legal counsel prior to commercial launch.',
    sections: [
      {
        id: 'information-collection',
        number: '01',
        title: 'Information Collection',
        paragraphs: [
          'We collect information that you voluntarily provide when interacting with the AASRA Web Devs website or installed web application, including details submitted through project enquiry forms, newsletter inputs, or direct communications.',
          'Where permitted by your cookie preferences, we may also process limited technical metadata such as browser type, viewport dimensions, and visited public pages to maintain security and performance.',
        ],
      },
      {
        id: 'personal-information',
        number: '02',
        title: 'Personal Information',
        paragraphs: [
          'Personal information requested through our enquiry form may include your full name, business name, email address, phone number, selected service, estimated budget, target timeline, and project description.',
          'We do not require sensitive financial, government-identification, or payment card information on public enquiry pages.',
        ],
      },
      {
        id: 'cookies',
        number: '03',
        title: 'Cookies',
        paragraphs: [
          'Essential browser storage and cookies are used strictly to support core application functionality, cookie preference state, and Progressive Web App session dismissal behavior.',
          'Non-essential analytics or marketing cookies remain disabled unless explicitly enabled by you through our Cookie Consent controls. See our Cookie Policy for complete details.',
        ],
      },
      {
        id: 'information-usage',
        number: '04',
        title: 'Information Usage',
        paragraphs: [
          'Submitted enquiry information is used solely to review your project requirements, respond to your request, prepare tailored proposals, and manage legitimate business communication.',
          'We do not sell, rent, or trade personal enquiry information to third-party data brokers.',
        ],
      },
      {
        id: 'third-party-services',
        number: '05',
        title: 'Third-Party Services',
        paragraphs: [
          '[Placeholder: List active third-party email delivery, CRM, hosting, or analytics subprocessors once configured in your production environment, e.g., hosting infrastructure and transactional email providers.]',
          'Each third-party service provider engaged in processing operational data is expected to maintain appropriate confidentiality and security safeguards.',
        ],
      },
      {
        id: 'data-storage',
        number: '06',
        title: 'Data Storage',
        paragraphs: [
          '[Placeholder: Specify primary hosting region, database location, and cross-border transfer safeguards applicable to your registered business jurisdiction.]',
          'Browser-side PWA caches store only public static assets and public pages—never private personal submissions or sensitive responses.',
        ],
      },
      {
        id: 'security',
        number: '07',
        title: 'Security',
        paragraphs: [
          'We apply reasonable administrative and technical measures, including HTTPS transport encryption in deployment, input sanitization, and rate limiting on enquiry endpoints, to protect submitted information against unauthorized access.',
          'No internet transmission or electronic storage mechanism can be guaranteed 100% secure.',
        ],
      },
      {
        id: 'retention',
        number: '08',
        title: 'Retention',
        paragraphs: [
          'We retain enquiry and project correspondence only for as long as necessary to fulfill the purpose for which it was collected, maintain accurate business records, or comply with applicable legal obligations.',
        ],
      },
      {
        id: 'user-rights',
        number: '09',
        title: 'User Rights',
        paragraphs: [
          'Depending on your applicable jurisdiction, you may request access to, correction of, or deletion of personal information you have provided to us, or withdraw consent for optional communications.',
          'Requests may be directed to: aasra.official07@gmail.com (or via our online contact form at /contact).',
        ],
      },
      {
        id: 'policy-updates',
        number: '10',
        title: 'Policy Updates',
        paragraphs: [
          'AASRA Web Devs may revise this Privacy Policy periodically to reflect operational, technical, or legal updates. The revised date at the top of this page indicates the most recent version.',
        ],
      },
    ],
  },
  'terms-and-conditions': {
    slug: 'terms-and-conditions',
    title: 'Terms & Conditions',
    subtitle: 'General terms governing access to the AASRA Web Devs digital platform and client service engagements.',
    lastUpdated: '[Last Updated: Editable Date — Pending Legal Counsel Review]',
    reviewNotice:
      'These Terms & Conditions provide a structured baseline for AASRA Web Devs. Registered legal entity name, governing jurisdiction, and commercial contracting terms marked as placeholders must be reviewed and finalized by qualified legal counsel.',
    sections: [
      {
        id: 'acceptance',
        number: '01',
        title: 'Acceptance',
        paragraphs: [
          'By accessing or using the AASRA Web Devs website, Progressive Web Application, or engaging our studio services, you agree to be bound by these Terms & Conditions and any written project agreement executed between you and [Placeholder: Legal Entity Name of AASRA Web Devs].',
        ],
      },
      {
        id: 'services',
        number: '02',
        title: 'Services',
        paragraphs: [
          'AASRA Web Devs offers services across Development, Creative & Branding, Marketing & Growth, and Technology & Intelligence, including custom websites, applications, branding systems, marketing campaigns, AI agents, analytics, and process automation.',
          'Specific deliverables, timelines, and commercial fees are governed exclusively by a signed Statement of Work (SOW) or formal proposal.',
        ],
      },
      {
        id: 'project-scope',
        number: '03',
        title: 'Project Scope',
        paragraphs: [
          'Work begins only after scope, deliverables, and pricing have been mutually confirmed in writing. Requests extending beyond the agreed scope will be quoted separately as a change request.',
        ],
      },
      {
        id: 'client-responsibilities',
        number: '04',
        title: 'Client Responsibilities',
        paragraphs: [
          'Timely delivery depends on prompt client feedback, accurate brand materials, required platform access credentials, and written sign-off at designated milestones.',
          'Delays in providing required inputs may proportionally adjust delivery schedules.',
        ],
      },
      {
        id: 'payments',
        number: '05',
        title: 'Payments',
        paragraphs: [
          'Fee structures, advance deposits, milestone invoices, and retainer billing cycles are specified in each individual proposal. [Placeholder: Specify currency, late-payment terms, and applicable tax invoicing rules once business registration details are finalized.]',
        ],
      },
      {
        id: 'revisions',
        number: '06',
        title: 'Revisions',
        paragraphs: [
          'Each project proposal defines the included rounds of design or functional revisions at key milestones. Consolidated, written feedback helps keep revision cycles efficient and predictable.',
        ],
      },
      {
        id: 'delivery-timelines',
        number: '07',
        title: 'Delivery Timelines',
        paragraphs: [
          'Estimated launch dates are good-faith projections contingent upon mutual responsiveness, third-party platform review processes, and absence of unscheduled scope expansions.',
        ],
      },
      {
        id: 'intellectual-property',
        number: '08',
        title: 'Intellectual Property',
        paragraphs: [
          'Unless otherwise specified in writing, ownership or usage rights for custom client deliverables transfer upon receipt of full final payment. Open-source libraries, pre-existing studio tooling, and licensed third-party fonts remain subject to their respective licenses.',
        ],
      },
      {
        id: 'confidentiality',
        number: '09',
        title: 'Confidentiality',
        paragraphs: [
          'Both parties agree to treat non-public business strategies, credentials, technical architectures, and commercial terms shared during an engagement as confidential.',
        ],
      },
      {
        id: 'liability',
        number: '10',
        title: 'Liability',
        paragraphs: [
          'To the maximum extent permitted by applicable law, AASRA Web Devs shall not be liable for indirect, incidental, or consequential damages, third-party platform outages, or commercial performance variations beyond our direct reasonable control.',
        ],
      },
      {
        id: 'termination',
        number: '11',
        title: 'Termination',
        paragraphs: [
          'Either party may terminate an ongoing engagement in accordance with the notice period and settlement terms defined in the applicable Statement of Work or retainer agreement.',
        ],
      },
      {
        id: 'dispute-resolution',
        number: '12',
        title: 'Dispute Resolution',
        paragraphs: [
          'Parties agree to first attempt good-faith amicable resolution of any disagreement before initiating formal mediation, arbitration, or judicial proceedings.',
        ],
      },
      {
        id: 'governing-law',
        number: '13',
        title: 'Governing Law',
        paragraphs: [
          '[Placeholder: Insert governing jurisdiction, city, state/country courts, and applicable statutory framework once confirmed by your legal advisor.]',
        ],
      },
    ],
  },
  'cookie-policy': {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    subtitle: 'Transparent explanation of essential storage, optional analytics, and consent preferences on AASRA Web Devs.',
    lastUpdated: '[Last Updated: Editable Date — Pending Final Review]',
    reviewNotice:
      'Review this Cookie Policy alongside any future analytics or marketing pixels connected to your production deployment.',
    sections: [
      {
        id: 'cookie-types',
        number: '01',
        title: 'Cookie Types',
        paragraphs: [
          'Cookies and equivalent local browser storage technologies help websites remember user preferences, maintain session state, and—when consented—measure site usage.',
        ],
      },
      {
        id: 'essential-cookies',
        number: '02',
        title: 'Essential Cookies',
        paragraphs: [
          'Essential storage is strictly necessary for core site operation, remembering your Cookie Consent selection, and managing PWA installation prompt dismissal during a browsing session. Essential cookies cannot be disabled without affecting basic site usability.',
        ],
      },
      {
        id: 'analytics-cookies',
        number: '03',
        title: 'Analytics Cookies',
        paragraphs: [
          'Analytics cookies help measure aggregated page visits and navigation performance. On AASRA Web Devs, analytics tracking remains inactive unless you explicitly opt in via Accept All or Manage Preferences.',
        ],
      },
      {
        id: 'marketing-cookies',
        number: '04',
        title: 'Marketing Cookies',
        paragraphs: [
          'Marketing cookies are used only when campaign attribution or remarketing tools are enabled and explicitly consented to by the visitor. By default, marketing cookies are turned off.',
        ],
      },
      {
        id: 'third-party-cookies',
        number: '05',
        title: 'Third-Party Cookies',
        paragraphs: [
          '[Placeholder: Document any third-party embeds, font providers, or consented analytics scripts active in production.]',
        ],
      },
      {
        id: 'cookie-management',
        number: '06',
        title: 'Cookie Management',
        paragraphs: [
          'You can update or withdraw your consent preferences at any time by clicking "Cookie Preferences" in the website footer, or by clearing site storage within your browser settings.',
        ],
      },
    ],
  },
  'refund-cancellation-policy': {
    slug: 'refund-cancellation-policy',
    title: 'Refund & Cancellation Policy',
    subtitle: 'Clear guidelines regarding project bookings, advance payments, cancellations, and retainers.',
    lastUpdated: '[Last Updated: Editable Date — Pending Commercial & Legal Review]',
    reviewNotice:
      'Commercial refund thresholds and cancellation notice periods marked below should be aligned with your finalized client contract terms.',
    sections: [
      {
        id: 'bookings',
        number: '01',
        title: 'Bookings',
        paragraphs: [
          'Project slots and dedicated studio capacity are reserved once a proposal is approved and the initial booking confirmation is completed.',
        ],
      },
      {
        id: 'advance-payments',
        number: '02',
        title: 'Advance Payments',
        paragraphs: [
          'Advance payments cover initial discovery, architectural planning, resource allocation, and kickoff preparation. [Placeholder: Specify exact non-refundable deposit window or kickoff percentage per your business policy.]',
        ],
      },
      {
        id: 'cancellation',
        number: '03',
        title: 'Cancellation',
        paragraphs: [
          'Cancellation requests must be submitted in writing by an authorized client representative. Work completed up to the date of written cancellation notice remains billable based on documented milestone progress.',
        ],
      },
      {
        id: 'refund-eligibility',
        number: '04',
        title: 'Refund Eligibility',
        paragraphs: [
          'Where an advance payment exceeds the value of completed discovery, design, or engineering work prior to cancellation, any eligible unused balance will be reviewed according to the signed agreement. [Placeholder: Define processing timeline in business days.]',
        ],
      },
      {
        id: 'completed-work',
        number: '05',
        title: 'Completed Work',
        paragraphs: [
          'Deliverables, approved milestones, third-party software licenses, domain registrations, or ad spend already executed or transferred are non-refundable.',
        ],
      },
      {
        id: 'subscription-services',
        number: '06',
        title: 'Subscription Services',
        paragraphs: [
          'Monthly marketing, social media, or maintenance retainers require written cancellation notice prior to the next billing cycle as specified in the retainer schedule. [Placeholder: Insert required notice period, e.g., 15 or 30 days.]',
        ],
      },
      {
        id: 'exceptional-circumstances',
        number: '07',
        title: 'Exceptional Circumstances',
        paragraphs: [
          'In the rare event that AASRA Web Devs is unable to deliver an agreed milestone due to internal capacity or force majeure, unused pre-paid milestone balances will be handled fairly in consultation with the client.',
        ],
      },
    ],
  },
  disclaimer: {
    slug: 'disclaimer',
    title: 'Disclaimer',
    subtitle: 'Important disclosures regarding general website information, marketing outcomes, and external platforms.',
    lastUpdated: '[Last Updated: Editable Date — Pending Legal Review]',
    reviewNotice:
      'Ensure this Disclaimer is reviewed alongside your client contracts prior to commercial launch.',
    sections: [
      {
        id: 'general-information',
        number: '01',
        title: 'General Information',
        paragraphs: [
          'All content published on the AASRA Web Devs website, insights section, and capability showcases is provided for general informational purposes only.',
          'Conceptual showcases and system blueprints displayed in our portfolio illustrate architectural approaches and design standards rather than fabricated client results.',
        ],
      },
      {
        id: 'no-guaranteed-results',
        number: '02',
        title: 'No Guaranteed Business Results',
        paragraphs: [
          'While we engineer high-craft software, branding, and marketing systems designed for practical impact, business growth depends on market conditions, pricing, product quality, and sales execution outside our sole control.',
        ],
      },
      {
        id: 'marketing-performance',
        number: '03',
        title: 'Marketing Performance',
        paragraphs: [
          'Search engine rankings, paid ad click costs, and social media reach fluctuate continuously due to platform algorithm changes, seasonality, and competitor activity. No fixed revenue, ranking position, or ROAS guarantee is implied.',
        ],
      },
      {
        id: 'third-party-platforms',
        number: '04',
        title: 'Third-Party Platforms',
        paragraphs: [
          'Websites, applications, AI agents, and automations frequently integrate with external cloud providers, ad networks, AI model APIs, and browsers. AASRA Web Devs is not responsible for policy changes, pricing updates, or downtime caused by third-party vendors.',
        ],
      },
      {
        id: 'external-links',
        number: '05',
        title: 'External Links',
        paragraphs: [
          'Links to external websites or resources are provided for convenience. We do not endorse or assume responsibility for the content or privacy practices of third-party domains.',
        ],
      },
      {
        id: 'technical-limitations',
        number: '06',
        title: 'Technical Limitations',
        paragraphs: [
          'Progressive Web App installation prompts and standalone display behavior depend on each visitor’s operating system, browser engine, and device security policies.',
        ],
      },
      {
        id: 'professional-advice',
        number: '07',
        title: 'Professional Advice',
        paragraphs: [
          'Nothing on this website constitutes legal, tax, financial, or regulatory compliance advice. Businesses should consult qualified professionals before making legal or statutory decisions.',
        ],
      },
    ],
  },
};
