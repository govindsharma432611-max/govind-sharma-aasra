export interface PageMetadata {
  title: string;
  description: string;
  path?: string;
}

const SITE_NAME = 'AASRA Web Devs';

export function applyDocumentMetadata(meta: PageMetadata): void {
  const fullTitle = meta.title.includes(SITE_NAME) ? meta.title : `${meta.title} | ${SITE_NAME}`;
  document.title = fullTitle;

  const setMeta = (selector: string, attr: string, value: string) => {
    let el = document.querySelector<HTMLMetaElement>(selector);
    if (!el) {
      el = document.createElement('meta');
      if (selector.includes('property=')) {
        el.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] ?? '');
      } else if (selector.includes('name=')) {
        el.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] ?? '');
      }
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };

  setMeta('meta[name="description"]', 'content', meta.description);
  setMeta('meta[property="og:title"]', 'content', fullTitle);
  setMeta('meta[property="og:description"]', 'content', meta.description);
  setMeta('meta[name="twitter:title"]', 'content', fullTitle);
  setMeta('meta[name="twitter:description"]', 'content', meta.description);

  const canonicalUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${meta.path ?? window.location.pathname}`
      : '';
  if (canonicalUrl) {
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
  }
}
