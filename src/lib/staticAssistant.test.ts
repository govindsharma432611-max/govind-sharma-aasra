import test from 'node:test';
import assert from 'node:assert/strict';
import { generateStaticAssistantReply } from './staticAssistant';

test('staticAssistant lists all 12 services on service enquiry', () => {
  const reply = generateStaticAssistantReply('What services does Aasra Web Devs offer?');
  assert.match(reply, /12 connected digital services/);
  assert.match(reply, /Website Development/);
  assert.match(reply, /Menu Design/);
});

test('staticAssistant never invents prices for e-commerce and points to custom quote', () => {
  const reply = generateStaticAssistantReply('How much does an e-commerce website cost?');
  assert.match(reply, /Request a Custom Quote/);
  assert.match(reply, /https:\/\/wa\.me\/919257121185/);
  assert.doesNotMatch(reply, /\$\d+|\₹\d+/);
});

test('staticAssistant responds in Hindi when asked in Hindi/Hinglish', () => {
  const reply = generateStaticAssistantReply('Aap website banwana kitna kharcha karte hain?');
  assert.match(reply, /Aasra Web Devs/);
  assert.match(reply, /WhatsApp/);
});

test('staticAssistant provides polite scope boundary on unrelated question', () => {
  const reply = generateStaticAssistantReply('What is the capital of France?');
  assert.match(reply, /Aasra Web Devs/);
  assert.match(reply, /\/contact/);
});
