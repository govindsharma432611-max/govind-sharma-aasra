import { BUSINESS_INFO, LEADERSHIP_TEAM } from '../data/business';
import { PRICING_PACKAGES } from '../data/pricing';
import { SERVICES } from '../data/services';

function isHindiOrHinglish(text: string): boolean {
  if (/[\u0900-\u097F]/.test(text)) return true;
  const lower = text.toLowerCase();
  const hinglishMarkers = [
    'kya',
    'kaise',
    'kitna',
    'kitne',
    'chahiye',
    'banwana',
    'banana',
    'karna',
    'karte',
    'hai',
    'hain',
    'aap',
    'aapka',
    'mera',
    'batao',
    'bataiye',
    'paisa',
    'kharcha',
    'sampark',
    'namaste',
    'namaskar',
    'hindi',
  ];
  let hits = 0;
  for (const w of hinglishMarkers) {
    if (new RegExp(`\\b${w}\\b`, 'i').test(lower)) hits += 1;
  }
  return hits >= 2 || /\b(batao|bataiye|banwana|kitne ka|kya kya)\b/i.test(lower);
}

export function generateStaticAssistantReply(userInput: string): string {
  const query = userInput.trim();
  const lower = query.toLowerCase();
  // Remove the brand name itself ("Aasra Web Devs") so "Web Devs" doesn't falsely match "Website Development"
  const cleanLower = lower.replace(/aasra\s*web\s*devs|web\s*devs/g, ' ').trim();
  const hindi = isHindiOrHinglish(query);

  // Greeting
  if (/^(hi|hello|hey|namaste|namaskar|good morning|good evening|hii+)\b/i.test(cleanLower) && cleanLower.length < 28) {
    return hindi
      ? `नमस्ते! **Aasra Web Devs** में आपका स्वागत है। मैं आपकी हमारी 12 सेवाओं, पैकेज, कस्टम कोटेशन या टीम से संपर्क करने में मदद कर सकता हूँ। आप किस बारे में जानना चाहते हैं?\n\n• **वेबसाइट और ऐप डेवलपमेंट**\n• **ब्रांडिंग, लोगो और मेनू डिज़ाइन**\n• **डिजिटल मार्केटिंग और सोशल मीडिया**\n• **AI एजेंट्स और बिज़नेस ऑटोमेशन**\n\nसीधे बात करने के लिए WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}) या ${BUSINESS_INFO.emailHref} पर संपर्क करें।`
      : `Hello! Welcome to **Aasra Web Devs**. I can help you explore our 12 digital services, packages, custom pricing process, or connect you with our team.\n\nWhat are you looking to build or grow today? You can also reach our team directly on WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}) or via ${BUSINESS_INFO.emailHref}.`;
  }

  // Contact / Human / Founders
  if (/(contact|reach|call|phone|whatsapp|email|talk to human|team|founder|owner|govind|anmol|avi|connect|sampark)/i.test(cleanLower)) {
    const founders = LEADERSHIP_TEAM.map((f) => `• **${f.name}** — ${f.role}`).join('\n');
    return hindi
      ? `आप **Aasra Web Devs** टीम से सीधे इन माध्यमों से जुड़ सकते हैं:\n\n• **WhatsApp**: ${BUSINESS_INFO.whatsappBaseUrl} (${BUSINESS_INFO.whatsappNumber})\n• **Email**: ${BUSINESS_INFO.emailHref}\n• **Enquiry Form**: /contact\n• **Instagram**: ${BUSINESS_INFO.instagramUrl}\n• **LinkedIn**: ${BUSINESS_INFO.linkedinCompanyUrl}\n\n**Leadership Team:**\n${founders}`
      : `You can connect with the **Aasra Web Devs** team directly through any of these official channels:\n\n• **WhatsApp**: ${BUSINESS_INFO.whatsappBaseUrl} (${BUSINESS_INFO.whatsappNumber})\n• **Email**: ${BUSINESS_INFO.emailHref}\n• **Project Brief Form**: /contact\n• **Instagram**: ${BUSINESS_INFO.instagramUrl}\n• **LinkedIn**: ${BUSINESS_INFO.linkedinCompanyUrl}\n\n**Founding Leadership:**\n${founders}`;
  }

  // E-commerce cost / Pricing / Packages
  if (/(e-?commerce|ecommerce|shop|store|price|pricing|cost|budget|quote|package|packages|charge|rate|kitna|kitne|kharcha|paisa)/i.test(cleanLower)) {
    const pkgLines = PRICING_PACKAGES.slice(0, 4)
      .map((p) => `• **${p.packageName}** (${p.category}): ${p.price} — ${p.summary}`)
      .join('\n');

    if (/(e-?commerce|ecommerce|shop|store)/i.test(cleanLower)) {
      return hindi
        ? `**Aasra Web Devs** कोई फिक्स या अनुमानित कीमत पहले से प्रकाशित नहीं करता। हर **ई-कॉमर्स वेबसाइट** की कीमत आपके प्रोजेक्ट के स्कोप पर निर्भर करती है:\n\n• प्रोडक्ट कैटलॉग का साइज और वेरिएंट्स\n• पेमेंट गेटवे, शिपिंग और इन्वेंटरी इंटीग्रेशन\n• कस्टम UI/UX, PWA और एडमिन डैशबोर्ड जरूरतें\n\nसही कस्टम कोटेशन के लिए कृपया /contact पर अपना प्रोजेक्ट ब्रीफ भेजें या सीधे WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}) और ${BUSINESS_INFO.emailHref} पर संपर्क करें।`
        : `**Aasra Web Devs** does not publish fixed public prices because every **e-commerce website** is scoped around your exact requirements:\n\n• Catalog size, product variants, and checkout workflows\n• Payment gateway, shipping, and ERP/inventory integrations\n• Custom UI/UX, installable PWA speed, and admin capabilities\n\nAll published plans use **Request a Custom Quote** so you only pay for what your business actually needs. Share your goals via /contact, WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}), or ${BUSINESS_INFO.emailHref} for a tailored quotation.`;
    }

    return hindi
      ? `**Aasra Web Devs** के सभी पैकेज **Request a Custom Quote** मॉडल पर काम करते हैं ताकि कीमत आपके वास्तविक स्कोप और टाइमलाइन के अनुसार तय हो सके:\n\n${pkgLines}\n\nपूरा विवरण /pricing पर देखें, या कस्टम कोट के लिए /contact, WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}) और ${BUSINESS_INFO.emailHref} पर संपर्क करें।`
      : `**Aasra Web Devs** packages use a **Request a Custom Quote** model tailored to your project scope, features, and timeline:\n\n${pkgLines}\n\nExplore full scope breakdowns at /pricing, or request a tailored quote via /contact, WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}), or ${BUSINESS_INFO.emailHref}.`;
  }

  // Mobile Apps / Application Development
  if (/(mobile app|android|ios|application|app development|software)/i.test(cleanLower)) {
    return hindi
      ? `जी हाँ! **Aasra Web Devs** कस्टम **Application Development** (/services/application-development) प्रदान करता है:\n\n• वेब ऐप्स, क्लाइंट पोर्टल्स और इंटरनल ऑपरेशन टूल्स\n• iOS और Android के लिए क्रॉस-प्लेटफ़ॉर्म मोबाइल एप्लिकेशन\n• सुरक्षित API आर्किटेक्चर और इन्स्टॉलेबल PWA समाधान\n\nअपने ऐप आइडिया पर चर्चा करने के लिए /contact पर जाएँ या WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}) पर मैसेज करें।`
      : `Yes! **Aasra Web Devs** builds custom **Application Development** solutions (/services/application-development), including:\n\n• Mobile applications (Android & iOS) and cross-platform experiences\n• SaaS products, client portals, and internal operations dashboards\n• Scalable API backends and installable Progressive Web Apps (PWAs)\n\nShare your app requirements at /contact or chat with our team on WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}).`;
  }

  // Website Development
  if (/(website|web development|web design|landing page|pwa|site)/i.test(cleanLower)) {
    return hindi
      ? `हम तेज़, रिस्पॉन्सिव और SEO-रेडी **Website Development** (/services/website-development) बनाते हैं:\n\n• बिज़नेस और कॉर्पोरेट वेबसाइट्स\n• हाई-कन्वर्जन लैंडिंग पेज और प्रोडक्ट शोकेस\n• कस्टम ई-कॉमर्स और इन्स्टॉलेबल PWA प्लेटफ़ॉर्म\n\nपैकेज देखने के लिए /pricing पर जाएँ या सीधे WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}) पर बात करें।`
      : `**Aasra Web Devs** engineers fast, responsive, SEO-ready **Website Development** (/services/website-development):\n\n• Custom business websites & flagship brand platforms\n• High-converting landing pages & interactive product showcases\n• E-commerce architectures & installable PWAs\n\nExplore /pricing for package details or start directly on WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}) or /contact.`;
  }

  // AI Automation & Business Automation & Data
  if (/(automate|automation|ai agent|ai|chatbot|workflow|crm|data analysis|bi|dashboard)/i.test(cleanLower)) {
    return hindi
      ? `जी हाँ! हम **AI Agents & AI Automation** (/services/ai-agents-automation), **Business Process Automation** (/services/business-process-automation) और **Data Analysis & BI** (/services/data-analysis) में मदद करते हैं:\n\n• लीड कैप्चर, CRM अपडेट और इनवॉइस/रिपोर्टिंग ऑटोमेशन\n• कस्टम AI असिस्टेंट और वर्कफ़्लो एजेंट्स\n• लाइव बिज़नेस डैशबोर्ड और डेटा एनालिटिक्स\n\nअपने बिज़नेस वर्कफ़्लो को ऑटोमेट करने के लिए /contact या WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}) पर संपर्क करें।`
      : `Yes! **Aasra Web Devs** builds intelligent automation and analytics systems across three dedicated services:\n\n• **AI Agents & AI Automation** (/services/ai-agents-automation) — guarded AI assistants, enquiry triage, and workflow agents\n• **Business Process Automation** (/services/business-process-automation) — connecting CRM, forms, billing, and notifications to remove manual work\n• **Data Analysis & BI** (/services/data-analysis) — decision-ready dashboards and operational reporting\n\nTell us what workflows you want to streamline via /contact or WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}).`;
  }

  // Digital Marketing / Performance / Social Media
  if (/(marketing|seo|ads|meta|google ads|social media|instagram|linkedin|growth|leads|performance)/i.test(cleanLower)) {
    return hindi
      ? `जी हाँ! **Aasra Web Devs** पूरी **Marketing & Growth** सेवाएँ देता है:\n\n• **Digital Marketing** (/services/digital-marketing) — SEO, कंटेंट और फ़नल रणनीति\n• **Performance Marketing** (/services/performance-marketing) — Google Ads व Meta Ads ट्रैकिंग और कन्वर्जन ऑप्टिमाइज़ेशन\n• **Social Media Management** (/services/social-media-management) — मंथली कंटेंट, डिज़ाइन और कंसिस्टेंट ग्रोथ\n\nग्रोथ प्लान के लिए WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}) या /contact पर जुड़ें।`
      : `Yes! **Aasra Web Devs** provides full-funnel growth services:\n\n• **Digital Marketing** (/services/digital-marketing) — technical SEO, positioning, and conversion architecture\n• **Performance Marketing** (/services/performance-marketing) — structured paid search & social campaigns with proper tracking\n• **Social Media Management** (/services/social-media-management) — consistent visual content calendars and channel management\n\nDiscuss your growth goals at /contact or WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}).`;
  }

  // Branding / Logo / Typography / Poster / Menu Design
  if (/(logo|brand|branding|typography|font|poster|graphic|menu|creative|design)/i.test(cleanLower)) {
    return hindi
      ? `**Aasra Web Devs** का क्रिएटिव और ब्रांडिंग स्टूडियो 4 विशेष सेवाएँ देता है:\n\n• **Logo Design** (/services/logo-design)\n• **Typography Design** (/services/typography-design)\n• **Poster & Promotional Design** (/services/poster-design)\n• **Menu Design** (/services/menu-design)\n\nसंपूर्ण ब्रांड सिस्टम के लिए /services या WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}) पर संपर्क करें।`
      : `**Aasra Web Devs** delivers cohesive **Creative & Branding** systems across four specialized services:\n\n• **Logo Design** (/services/logo-design) — geometric marks & scalable brand identities\n• **Typography Design** (/services/typography-design) — custom type pairings & hierarchy systems\n• **Poster & Promotional Design** (/services/poster-design) — launch visuals & print/social campaigns\n• **Menu Design** (/services/menu-design) — restaurant, café, and hospitality menu layouts\n\nBrowse examples at /work or message us on WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}).`;
  }

  // Process
  if (/(process|how do you work|steps|timeline|methodology|start)/i.test(cleanLower)) {
    return hindi
      ? `हमारा 4-स्टेज प्रोसेस सरल और पारदर्शी है: **1. Discover → 2. Strategise → 3. Build → 4. Grow** (विस्तार से /process पर देखें)। शुरू करने के लिए /contact पर ब्रीफ सबमिट करें या WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}) पर बात करें।`
      : `We follow a clear 4-stage methodology — **1. Discover → 2. Strategise → 3. Build → 4. Grow** (full breakdown at /process). To start your project, submit a brief at /contact or message us on WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}).`;
  }

  // All Services overview
  if (/(service|services|offer|what do you do|capabilities|kya karte|offerings)/i.test(cleanLower)) {
    const list = SERVICES.map((s, idx) => `${idx + 1}. **${s.name}** (/services/${s.slug})`).join('\n');
    return hindi
      ? `**Aasra Web Devs** चार मुख्य श्रेणियों में **12 डिजिटल सेवाएँ** प्रदान करता है:\n\n${list}\n\nसभी सेवाओं का विवरण /services पर देखें या सीधे WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}) पर बात करें।`
      : `**Aasra Web Devs** offers **12 connected digital services** across Development, Creative & Branding, Marketing & Growth, and AI & Automation:\n\n${list}\n\nExplore details at /services, check packages at /pricing, or reach our team on WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}).`;
  }

  // Out-of-scope or general fallback (honest boundary)
  return hindi
    ? `मैं **Aasra AI Assistant** हूँ और केवल **Aasra Web Devs** की सेवाओं, पैकेज, कस्टम कोटेशन और प्रोजेक्ट पूछताछ से जुड़े सवालों में मदद करता हूँ। अपने प्रोजेक्ट के लिए सही समाधान जानने के लिए कृपया /services, /pricing या /contact देखें, या हमारी टीम से सीधे WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}) और ${BUSINESS_INFO.emailHref} पर बात करें।`
    : `I'm **Aasra AI Assistant**, and I specifically help with **Aasra Web Devs** services (Development, Branding, Digital Marketing, and AI Automation), packages, and project enquiries.\n\nFor anything outside these topics or for a tailored quote, please explore /services and /pricing, or connect directly with our human team on WhatsApp (${BUSINESS_INFO.whatsappBaseUrl}), ${BUSINESS_INFO.emailHref}, or /contact.`;
}
