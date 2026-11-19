import { buildAasraSystemInstruction } from '../src/data/aiKnowledgeBase.ts';
import { BUSINESS_INFO } from '../src/data/business.ts';

export interface ClientChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const SUPPORTED_GROQ_CHAT_MODELS = new Set([
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
  'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant',
  'meta-llama/llama-4-scout-17b-16e-instruct',
  'qwen/qwen3-32b',
]);

const DEFAULT_MODEL = 'openai/gpt-oss-120b';
const DEFAULT_FALLBACK_MODEL = 'llama-3.3-70b-versatile';
const MAX_HISTORY_MESSAGES = 12;
const MAX_USER_MESSAGE_CHARS = 1000;
const GROQ_TIMEOUT_MS = 25000;

export function resolveSupportedGroqModel(configured?: string): string {
  const candidate = configured?.trim();
  if (candidate && SUPPORTED_GROQ_CHAT_MODELS.has(candidate)) {
    return candidate;
  }
  return DEFAULT_MODEL;
}

export function sanitizeAndValidateChatMessages(rawMessages: unknown): {
  valid: boolean;
  messages?: ClientChatMessage[];
  error?: string;
} {
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return { valid: false, error: 'Please enter a message to begin chatting.' };
  }

  const trimmed = rawMessages.slice(-MAX_HISTORY_MESSAGES);
  const cleaned: ClientChatMessage[] = [];

  for (const item of trimmed) {
    if (!item || typeof item !== 'object') continue;
    const role = (item as { role?: unknown }).role;
    const contentRaw = (item as { content?: unknown }).content;
    if (role !== 'user' && role !== 'assistant') continue;
    if (typeof contentRaw !== 'string') continue;

    const clean = contentRaw.replace(/[<>]/g, '').trim();
    if (!clean) continue;

    if (role === 'user' && clean.length > MAX_USER_MESSAGE_CHARS) {
      return {
        valid: false,
        error: `Messages are limited to ${MAX_USER_MESSAGE_CHARS} characters. Please shorten your question.`,
      };
    }

    cleaned.push({
      role,
      content: clean.slice(0, role === 'assistant' ? 3000 : MAX_USER_MESSAGE_CHARS),
    });
  }

  if (cleaned.length === 0 || cleaned[cleaned.length - 1].role !== 'user') {
    return { valid: false, error: 'Please send a valid user message.' };
  }

  return { valid: true, messages: cleaned };
}

export function sanitizeAssistantOutput(text: string): string {
  return text
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim();
}

export async function runPromptGuardCheck(userText: string, apiKey: string, guardModel?: string): Promise<boolean> {
  const model = guardModel?.trim();
  if (!model || !model.includes('prompt-guard')) {
    return true;
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: userText.slice(0, 500) }],
        max_completion_tokens: 16,
        temperature: 0,
      }),
    });
    if (!res.ok) return true;
    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const verdict = data.choices?.[0]?.message?.content?.trim().toLowerCase() || '';
    if (verdict.includes('jailbreak') || verdict.includes('malicious')) {
      return false;
    }
    return true;
  } catch {
    return true;
  } finally {
    clearTimeout(timeout);
  }
}

export interface GroqStreamResult {
  ok: boolean;
  statusCode?: number;
  errorMessage?: string;
}

export async function streamGroqResponse(
  messages: ClientChatMessage[],
  onToken: (token: string) => void
): Promise<GroqStreamResult> {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false,
      statusCode: 503,
      errorMessage: `Aasra AI Assistant is not active right now. You can reach our team directly on WhatsApp (${BUSINESS_INFO.whatsappNumber}) or email ${BUSINESS_INFO.email}.`,
    };
  }

  const guardSafe = await runPromptGuardCheck(
    messages[messages.length - 1].content,
    apiKey,
    process.env.GROQ_GUARD_MODEL
  );

  if (!guardSafe) {
    return {
      ok: false,
      statusCode: 400,
      errorMessage:
        'Please ask questions focused on Aasra Web Devs services, packages, pricing, or project enquiries.',
    };
  }

  const primaryModel = resolveSupportedGroqModel(process.env.GROQ_MODEL);
  const fallbackModel = resolveSupportedGroqModel(process.env.GROQ_FALLBACK_MODEL || DEFAULT_FALLBACK_MODEL);
  const instantModel = 'llama-3.1-8b-instant';
  const modelsToTry = Array.from(new Set([primaryModel, fallbackModel, instantModel]));

  const systemInstruction = buildAasraSystemInstruction();
  const groqMessages = [
    { role: 'system', content: systemInstruction },
    ...messages,
  ];

  for (let i = 0; i < modelsToTry.length; i += 1) {
    const model = modelsToTry[i];
    const hasMoreModels = i < modelsToTry.length - 1;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), GROQ_TIMEOUT_MS);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: groqMessages,
          temperature: 0.4,
          max_completion_tokens: 1100,
          stream: true,
        }),
      });

      if (!response.ok) {
        clearTimeout(timeout);
        if (hasMoreModels && (response.status === 429 || response.status >= 500 || response.status === 404 || response.status === 400)) {
          continue;
        }
        return {
          ok: false,
          statusCode: response.status === 429 ? 429 : 502,
          errorMessage:
            response.status === 429
              ? `Our AI assistant is experiencing high demand right now. Please connect with us directly via WhatsApp or email ${BUSINESS_INFO.email}.`
              : `Our AI assistant is temporarily unavailable. Please reach out directly via WhatsApp (${BUSINESS_INFO.whatsappNumber}) or email ${BUSINESS_INFO.email}.`,
        };
      }

      if (!response.body) {
        clearTimeout(timeout);
        continue;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const rawLine of lines) {
          const line = rawLine.trim();
          if (!line || !line.startsWith('data:')) continue;
          const payload = line.slice(5).trim();
          if (payload === '[DONE]') {
            clearTimeout(timeout);
            return { ok: true };
          }
          try {
            const parsed = JSON.parse(payload) as {
              choices?: Array<{ delta?: { content?: string } }>;
            };
            const piece = parsed.choices?.[0]?.delta?.content;
            if (typeof piece === 'string' && piece.length > 0) {
              const safePiece = piece.replace(/[<>]/g, '');
              if (safePiece) {
                onToken(safePiece);
              }
            }
          } catch {
            // Skip malformed SSE partial frame cleanly
          }
        }
      }

      clearTimeout(timeout);
      return { ok: true };
    } catch {
      clearTimeout(timeout);
      if (model !== fallbackModel) {
        continue;
      }
      return {
        ok: false,
        statusCode: 504,
        errorMessage: `The AI response timed out. Please reach us directly on WhatsApp (${BUSINESS_INFO.whatsappNumber}) or email ${BUSINESS_INFO.email}.`,
      };
    }
  }

  return {
    ok: false,
    statusCode: 502,
    errorMessage: `Unable to reach the AI service right now. Please contact us via WhatsApp (${BUSINESS_INFO.whatsappNumber}) or ${BUSINESS_INFO.email}.`,
  };
}
