import test from 'node:test';
import assert from 'node:assert/strict';
import { SERVICES, SERVICE_CATEGORIES } from '../data/services';
import { PROJECTS, PORTFOLIO_CATEGORIES } from '../data/projects';
import { PRICING_PACKAGES } from '../data/pricing';
import { LEGAL_DOCUMENTS } from '../data/legal';
import { HOME_FAQS } from '../data/faq';
import { ARTICLES } from '../data/articles';

test('Services catalog contains all 12 services across 4 categories', () => {
  assert.equal(SERVICES.length, 12);
  assert.equal(SERVICE_CATEGORIES.length, 4);
  const categorySlugs = SERVICE_CATEGORIES.flatMap((c) => c.serviceSlugs);
  assert.equal(categorySlugs.length, 12);
  for (const slug of categorySlugs) {
    assert.ok(SERVICES.some((s) => s.slug === slug), `Missing service for slug ${slug}`);
  }
});

test('Pricing packages never fabricate prices and use Request a Custom Quote', () => {
  assert.equal(PRICING_PACKAGES.length, 7);
  for (const pkg of PRICING_PACKAGES) {
    assert.equal(pkg.price, 'Request a Custom Quote');
  }
});

test('Portfolio covers all non-All categories with local image assets', () => {
  const nonAll = PORTFOLIO_CATEGORIES.filter((c) => c !== 'All Projects');
  for (const cat of nonAll) {
    assert.ok(PROJECTS.some((p) => p.category === cat), `Missing showcase for category ${cat}`);
  }
  for (const p of PROJECTS) {
    assert.ok(p.image.startsWith('/src/assets/images/'), `Project ${p.slug} must use local generated asset`);
  }
});

test('All 5 legal documents and 8 home FAQs and 7+ articles are populated', () => {
  assert.deepEqual(Object.keys(LEGAL_DOCUMENTS).sort(), [
    'cookie-policy',
    'disclaimer',
    'privacy-policy',
    'refund-cancellation-policy',
    'terms-and-conditions',
  ]);
  assert.equal(HOME_FAQS.length, 8);
  assert.ok(ARTICLES.length >= 7);
});
