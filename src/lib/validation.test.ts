import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactPayload, ALL_SERVICE_NAMES } from './validation';

test('ALL_SERVICE_NAMES contains all 12 AASRA services including Menu Design', () => {
  assert.equal(ALL_SERVICE_NAMES.length, 12);
  assert.ok(ALL_SERVICE_NAMES.includes('Menu Design'));
});

test('validateContactPayload rejects empty submission with specific required field errors', () => {
  const result = validateContactPayload({});
  assert.equal(result.valid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.service);
  assert.equal(result.errors.budget, undefined);
  assert.equal(result.errors.timeline, undefined);
  assert.ok(result.errors.description);
  assert.ok(result.errors.consent);
});

test('validateContactPayload rejects invalid email and short description', () => {
  const result = validateContactPayload({
    fullName: 'Aarav Patel',
    email: 'invalid-email',
    phone: '+91 9876543210',
    service: 'Website Development',
    budget: '$2,500 – $7,500',
    timeline: '1 – 2 Months',
    description: 'Too short',
    consent: true,
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.email);
  assert.ok(result.errors.description);
});

test('validateContactPayload accepts complete valid enquiry even without optional budget/timeline and strips angle brackets', () => {
  const result = validateContactPayload({
    fullName: '  Priya <Sharma>  ',
    businessName: 'Studio North',
    email: 'PRIYA@Example.com',
    phone: '+1 (555) 234-5678',
    service: 'AI Agents and AI Automation',
    description: 'We need an internal retrieval-grounded AI assistant for client onboarding and CRM routing.',
    consent: true,
  });
  assert.equal(result.valid, true);
  assert.equal(result.sanitized?.fullName, 'Priya Sharma');
  assert.equal(result.sanitized?.email, 'priya@example.com');
  assert.equal(result.sanitized?.service, 'AI Agents and AI Automation');
  assert.equal(result.sanitized?.budget, 'Not specified');
});
