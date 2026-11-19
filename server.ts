import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { BUSINESS_INFO } from './src/data/business.ts';
import { checkBucketLimit, processContactSubmission } from './server/contactService.ts';
import { sanitizeAndValidateChatMessages, streamGroqResponse } from './server/groqChat.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

// IP rate limit bucket for AI chat
const chatRateLimitMap = new Map<string, { count: number; resetAt: number }>();

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '100kb' }));

  // Health & capability status (never reveals secrets)
  app.get('/api/health', (_req, res) => {
    const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
    const resendConfigured = Boolean(process.env.RESEND_API_KEY);
    const webhookConfigured = Boolean(process.env.CONTACT_WEBHOOK_URL);
    res.json({
      status: 'ok',
      service: 'aasra-web-devs',
      deliveryConfigured: smtpConfigured || resendConfigured || webhookConfigured,
      chatConfigured: Boolean(process.env.GROQ_API_KEY),
    });
  });

  // Server-side Groq AI Chatbot streaming endpoint
  app.post('/api/chat', async (req, res) => {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    if (!checkBucketLimit(chatRateLimitMap, clientIp, 25, 15 * 60 * 1000)) {
      res.status(429).json({
        ok: false,
        fallback: true,
        message: `Rate limit reached. Please wait a few minutes or contact our team directly on WhatsApp (${BUSINESS_INFO.whatsappNumber}) or ${BUSINESS_INFO.email}.`,
        whatsappUrl: BUSINESS_INFO.whatsappBaseUrl,
        email: BUSINESS_INFO.email,
      });
      return;
    }

    const validation = sanitizeAndValidateChatMessages(req.body?.messages);
    if (!validation.valid || !validation.messages) {
      res.status(400).json({
        ok: false,
        fallback: false,
        message: validation.error || 'Invalid message payload.',
      });
      return;
    }

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    const writeEvent = (payload: Record<string, unknown>) => {
      if (!res.writableEnded) {
        res.write(`data: ${JSON.stringify(payload)}\n\n`);
      }
    };

    const result = await streamGroqResponse(validation.messages, (token) => {
      writeEvent({ token });
    });

    if (!result.ok) {
      writeEvent({
        error: true,
        fallback: true,
        message: result.errorMessage,
        whatsappUrl: BUSINESS_INFO.whatsappBaseUrl,
        email: BUSINESS_INFO.email,
      });
    } else {
      writeEvent({ done: true });
    }

    if (!res.writableEnded) {
      res.end();
    }
  });

  // Contact enquiry submission endpoint (SMTP / Resend / Webhook + honest unconfigured fallback)
  app.post('/api/contact', async (req, res) => {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    const result = await processContactSubmission(req.body, clientIp);
    res.status(result.statusCode).json(result.payload);
  });

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir, { index: false }));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AASRA Web Devs server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
