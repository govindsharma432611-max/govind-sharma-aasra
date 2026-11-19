import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowUpRight,
  Loader2,
  Mail,
  Maximize2,
  MessageSquare,
  Minus,
  Send,
  X,
} from 'lucide-react';
import {
  CHATBOT_SUGGESTED_QUESTIONS,
  CHATBOT_WELCOME_MESSAGE,
} from '../../data/aiKnowledgeBase';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../../data/business';
import { generateStaticAssistantReply } from '../../lib/staticAssistant';
import { useCookieConsent } from '../legal/CookieConsent';
import { usePWA } from '../pwa/PWAContext';
import { WhatsAppIcon } from '../ui/SocialIcons';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isError?: boolean;
  fallback?: {
    whatsappUrl: string;
    email: string;
  };
}

type ChatViewState = 'closed' | 'minimized' | 'open';

const MAX_INPUT_LENGTH = 1000;

function sanitizeRenderedText(raw: string): string {
  return raw
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .trim();
}

const URL_OR_ROUTE_REGEX =
  /(https:\/\/wa\.me\/[^\s),\]]+|https:\/\/www\.instagram\.com\/[^\s),\]]+|https:\/\/www\.linkedin\.com\/[^\s),\]]+|mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\*\*[^*]+\*\*|(?<=^|[\s(\[])\/(?:services\/[a-z0-9-]+|pricing|contact|about|process))/g;

function renderSafeMessageContent(text: string): React.ReactNode {
  const cleaned = sanitizeRenderedText(text);
  const lines = cleaned.split('\n');

  return lines.map((line, lineIdx) => {
    const formattedLine = line.replace(/^#{1,4}\s+/, '');
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    const regex = new RegExp(URL_OR_ROUTE_REGEX.source, 'g');
    let match: RegExpExecArray | null;

    while ((match = regex.exec(formattedLine)) !== null) {
      if (match.index > lastIndex) {
        parts.push(formattedLine.slice(lastIndex, match.index));
      }

      const token = match[0];
      if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <strong key={`${lineIdx}-${match.index}`} className="font-semibold text-[#1D0D42]">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith('http://') || token.startsWith('https://')) {
        parts.push(
          <a
            key={`${lineIdx}-${match.index}`}
            href={token}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium text-[#6327FB] hover:text-[#1D0D42] break-all"
          >
            {token.includes('wa.me') ? 'Chat on WhatsApp' : token}
          </a>
        );
      } else if (token.startsWith('mailto:')) {
        parts.push(
          <a
            key={`${lineIdx}-${match.index}`}
            href={token}
            className="underline font-medium text-[#6327FB] hover:text-[#1D0D42] break-all"
          >
            {token.replace(/^mailto:/, '')}
          </a>
        );
      } else if (token.startsWith('/')) {
        parts.push(
          <Link
            key={`${lineIdx}-${match.index}`}
            to={token}
            className="underline font-medium text-[#6327FB] hover:text-[#1D0D42]"
          >
            {token}
          </Link>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < formattedLine.length) {
      parts.push(formattedLine.slice(lastIndex));
    }

    return (
      <React.Fragment key={lineIdx}>
        {parts.length > 0 ? parts : formattedLine}
        {lineIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

const AasraSpiralBadge: React.FC = () => (
  <span className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0 p-1 border border-white/20">
    <svg viewBox="0 0 512 512" fill="none" aria-hidden="true" className="w-full h-full">
      <path
        d="M214 148C144 170 96 208 66 250C54 316 74 398 138 446C200 492 278 468 322 392C274 428 206 426 164 384C116 336 120 236 214 148Z"
        fill="#CFD2D9"
      />
      <path
        d="M214 148C136 218 118 326 166 382C206 426 274 428 322 392C282 454 206 476 146 438C92 404 72 328 84 268C116 218 160 176 214 148Z"
        fill="#FFFFFF"
      />
      <path
        d="M214 148C144 170 96 208 66 250C54 316 74 398 138 446C200 492 278 468 322 392C274 428 206 426 164 384C116 336 120 236 214 148Z"
        fill="none"
        stroke="#050404"
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <path
        d="M66 250C72 135 164 62 272 68C376 74 446 154 442 268C439 354 388 438 296 484C352 408 386 324 374 242C362 162 296 122 214 148C144 170 96 208 66 250Z"
        fill="#3D63F2"
        stroke="#050404"
        strokeWidth="10"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-msg',
  role: 'assistant',
  content: CHATBOT_WELCOME_MESSAGE,
};

export const AasraChatbot: React.FC = () => {
  const [viewState, setViewState] = useState<ChatViewState>('closed');
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const { updateAvailable } = usePWA();
  const { isBannerVisible } = useCookieConsent();

  useEffect(() => {
    if (viewState !== 'open') return;
    if (messages.length > 1 || isStreaming) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = 0;
    }
  }, [messages, viewState, isStreaming]);

  useEffect(() => {
    if (viewState === 'open') {
      const timer = window.setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 60);
      return () => window.clearTimeout(timer);
    }
  }, [viewState]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && viewState === 'open') {
        setViewState('minimized');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [viewState]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const sendMessage = async (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed || isStreaming) return;
    if (trimmed.length > MAX_INPUT_LENGTH) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    const assistantId = `a-${Date.now() + 1}`;
    const placeholderAssistant: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
    };

    const historyForApi = [...messages.filter((m) => m.id !== 'welcome-msg' && !m.isError), userMessage]
      .slice(-12)
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    setMessages((prev) => [...prev, userMessage, placeholderAssistant]);
    setInput('');
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    const streamStaticReply = async () => {
      const fullReply = generateStaticAssistantReply(trimmed);
      const chunkSize = 18;
      for (let i = 0; i < fullReply.length; i += chunkSize) {
        if (controller.signal.aborted) return;
        const snapshot = fullReply.slice(0, i + chunkSize);
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: snapshot } : m))
        );
        await new Promise((resolve) => window.setTimeout(resolve, 12));
      }
    };

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyForApi }),
        signal: controller.signal,
      });

      const contentType = response.headers.get('content-type') || '';

      // On pure static hosts (like GitHub Pages), /api/chat returns 404/405 HTML.
      if (
        response.status === 404 ||
        response.status === 405 ||
        (!contentType.includes('text/event-stream') && !contentType.includes('application/json'))
      ) {
        await streamStaticReply();
        return;
      }

      if (contentType.includes('text/event-stream') && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let accumulated = '';
        let receivedErrorPayload: { error?: string; fallback?: ChatMessage['fallback'] } | null = null;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split('\n\n');
          buffer = events.pop() || '';

          for (const evt of events) {
            const dataLine = evt
              .split('\n')
              .find((line) => line.startsWith('data:'));
            if (!dataLine) continue;

            const payloadStr = dataLine.slice(5).trim();
            if (!payloadStr || payloadStr === '[DONE]') continue;

            try {
              const parsed = JSON.parse(payloadStr) as {
                token?: string;
                delta?: string;
                done?: boolean;
                error?: boolean | string;
                fallback?: boolean | ChatMessage['fallback'];
                message?: string;
                whatsappUrl?: string;
                email?: string;
              };

              const piece = parsed.token ?? parsed.delta;
              if (typeof piece === 'string' && piece.length > 0) {
                accumulated += piece;
                setMessages((prev) =>
                  prev.map((m) => (m.id === assistantId ? { ...m, content: accumulated } : m))
                );
              } else if (parsed.error) {
                const fbObj =
                  parsed.fallback && typeof parsed.fallback === 'object'
                    ? parsed.fallback
                    : {
                        whatsappUrl: parsed.whatsappUrl || BUSINESS_INFO.whatsappBaseUrl,
                        email: parsed.email || BUSINESS_INFO.email,
                      };
                receivedErrorPayload = {
                  error:
                    typeof parsed.error === 'string'
                      ? parsed.error
                      : parsed.message ||
                        'Our AI assistant is temporarily busy. Please reach out directly via WhatsApp or Email.',
                  fallback: fbObj,
                };
              }
            } catch {
              // Ignore malformed partial SSE chunk
            }
          }
        }

        if (receivedErrorPayload && !accumulated.trim()) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    content:
                      receivedErrorPayload?.error ||
                      'Our AI assistant is temporarily busy. Please reach out directly via WhatsApp or Email.',
                    isError: true,
                    fallback: receivedErrorPayload?.fallback || {
                      whatsappUrl: BUSINESS_INFO.whatsappBaseUrl,
                      email: BUSINESS_INFO.email,
                    },
                  }
                : m
            )
          );
        } else if (!accumulated.trim()) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    content:
                      'I could not generate a response right now. Please connect with the Aasra Web Devs team directly via WhatsApp or Email.',
                    isError: true,
                    fallback: {
                      whatsappUrl: BUSINESS_INFO.whatsappBaseUrl,
                      email: BUSINESS_INFO.email,
                    },
                  }
                : m
            )
          );
        }
      } else {
        const data = (await response.json().catch(() => ({}))) as {
          message?: string;
          whatsappUrl?: string;
          email?: string;
          fallback?: boolean | ChatMessage['fallback'];
        };

        const fbObj =
          data.fallback && typeof data.fallback === 'object'
            ? data.fallback
            : {
                whatsappUrl: data.whatsappUrl || BUSINESS_INFO.whatsappBaseUrl,
                email: data.email || BUSINESS_INFO.email,
              };

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    data.message ||
                    'Our AI assistant is temporarily unavailable. You can message our team directly on WhatsApp or by email.',
                  isError: true,
                  fallback: fbObj,
                }
              : m
          )
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content:
                  'Connection interrupted before receiving a reply. Please try again or reach our team directly on WhatsApp or Email.',
                isError: true,
                fallback: {
                  whatsappUrl: buildWhatsAppUrl(`Hello Aasra Web Devs Team, ${trimmed}`),
                  email: BUSINESS_INFO.email,
                },
              }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(input);
    }
  };

  const handleResetToClose = () => {
    abortRef.current?.abort();
    setViewState('closed');
  };

  // Position cleanly above PWA update toast or mobile cookie bar
  const bottomOffsetClass = updateAvailable
    ? 'bottom-24 sm:bottom-24'
    : isBannerVisible
    ? 'bottom-28 sm:bottom-24'
    : 'bottom-4 sm:bottom-5';

  // State 1: Floating "Chat with AI" Trigger
  if (viewState === 'closed') {
    return (
      <button
        type="button"
        onClick={() => setViewState('open')}
        aria-label="Chat with AI — Open Aasra AI Assistant"
        className={`group fixed right-4 sm:right-5 ${bottomOffsetClass} z-40 inline-flex items-center gap-2.5 h-11 pl-3.5 pr-4 rounded-full bg-[#6327FB] text-white border border-white/15 shadow-[0_14px_34px_-10px_rgba(99,39,251,0.55)] hover:bg-[#1D0D42] hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D0D42] focus-visible:ring-offset-2 cursor-pointer whitespace-nowrap`}
      >
        <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105">
          <MessageSquare className="w-3.5 h-3.5 text-white" aria-hidden="true" />
        </span>
        <span className="font-display text-xs font-semibold tracking-wide">Chat with AI</span>
      </button>
    );
  }

  // State 2: Minimized Dock Bar
  if (viewState === 'minimized') {
    return (
      <div
        role="region"
        aria-label="Minimized Aasra AI Assistant"
        className={`fixed right-4 sm:right-5 ${bottomOffsetClass} z-50 flex items-center gap-2 rounded-full bg-[#1D0D42] text-white pl-3 pr-2 py-1.5 border border-[#A786FC]/35 shadow-2xl`}
      >
        <button
          type="button"
          onClick={() => setViewState('open')}
          className="flex items-center gap-2.5 pr-2 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A786FC] rounded-full"
          aria-label="Restore Aasra AI Assistant chat window"
        >
          <AasraSpiralBadge />
          <span className="font-display text-xs font-semibold whitespace-nowrap">
            Aasra AI Assistant
          </span>
          <Maximize2 className="w-3.5 h-3.5 text-[#A786FC]" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={handleResetToClose}
          aria-label="Close Aasra AI Assistant"
          className="w-8 h-8 rounded-full flex items-center justify-center text-white/75 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const hasUserMessages = messages.some((m) => m.role === 'user');

  // State 3: Open Chat Drawer
  return (
    <section
      role="dialog"
      aria-label="Aasra AI Assistant"
      aria-modal="false"
      className="fixed right-3 left-3 sm:left-auto sm:right-5 bottom-4 sm:bottom-5 z-50 sm:w-[400px] h-[min(600px,calc(100dvh-5.5rem))] rounded-2xl bg-white border border-[#1D0D42]/18 shadow-[0_28px_70px_-20px_rgba(29,13,66,0.42)] flex flex-col overflow-hidden text-[#050404]"
    >
      {/* Header */}
      <header className="bg-[#1D0D42] text-white px-4 py-3.5 flex items-center justify-between gap-3 shrink-0 border-b border-white/10">
        <div className="flex items-center gap-2.5 min-w-0">
          <AasraSpiralBadge />
          <div className="min-w-0">
            <h2 className="font-display text-sm font-bold leading-tight truncate">
              Aasra AI Assistant
            </h2>
            <p className="text-[11px] text-[#A786FC] truncate">
              Aasra Web Devs · Official Virtual Assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setViewState('minimized')}
            aria-label="Minimize chat"
            title="Minimize"
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/80 hover:bg-white/12 hover:text-white transition-colors cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleResetToClose}
            aria-label="Close chat"
            title="Close"
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/80 hover:bg-white/12 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Message History */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#EAEAEA]/30">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const isThinkingPlaceholder =
            !isUser && isStreaming && msg.content === '' && !msg.isError;

          if (isThinkingPlaceholder) {
            return (
              <div key={msg.id} className="flex justify-start">
                <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white border border-[#050404]/10 px-4 py-3 text-sm text-[#1D0D42] flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#6327FB]" aria-hidden="true" />
                  <span className="text-xs font-medium text-[#050404]/70">
                    Aasra AI Assistant is typing...
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  isUser
                    ? 'rounded-tr-sm bg-[#6327FB] text-white'
                    : msg.isError
                    ? 'rounded-tl-sm bg-white border border-red-200 text-[#050404]'
                    : 'rounded-tl-sm bg-white border border-[#050404]/10 text-[#050404]'
                }`}
              >
                {msg.isError && (
                  <div className="flex items-center gap-1.5 text-red-700 font-display text-xs font-semibold mb-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>Assistant Temporarily Unavailable</span>
                  </div>
                )}

                <div className="break-words">
                  {isUser ? msg.content : renderSafeMessageContent(msg.content)}
                </div>

                {msg.fallback && (
                  <div className="mt-3 pt-2.5 border-t border-[#050404]/10 flex flex-wrap gap-2">
                    <a
                      href={msg.fallback.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#1D0D42] text-white px-3 py-1.5 text-xs font-display font-semibold hover:bg-[#6327FB] transition-colors whitespace-nowrap"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 text-[#A786FC]" />
                      <span>WhatsApp Team</span>
                    </a>
                    <a
                      href={`mailto:${msg.fallback.email}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#050404]/20 text-[#1D0D42] px-3 py-1.5 text-xs font-display font-semibold hover:border-[#6327FB] hover:text-[#6327FB] transition-colors whitespace-nowrap"
                    >
                      <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Email Us</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Suggested Questions (interactive controls shown until visitor asks a question) */}
        {!hasUserMessages && (
          <div className="pt-1 space-y-2">
            <p className="font-display text-[11px] font-semibold uppercase tracking-wider text-[#1D0D42]/65 px-1">
              Suggested Questions
            </p>
            <div className="flex flex-col gap-1.5">
              {CHATBOT_SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled={isStreaming}
                  onClick={() => void sendMessage(q)}
                  className="text-left rounded-xl border border-[#1D0D42]/15 bg-white px-3.5 py-2 text-xs font-medium text-[#1D0D42] hover:border-[#6327FB] hover:bg-[#6327FB]/5 transition-colors flex items-center justify-between gap-2 cursor-pointer"
                >
                  <span>{q}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#6327FB] shrink-0" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Direct Human Handoff Strip */}
      <div className="px-4 py-2 bg-white border-t border-[#050404]/10 flex items-center justify-between gap-2 text-[11px] text-[#050404]/70 shrink-0">
        <span>Prefer speaking with our team?</span>
        <div className="flex items-center gap-3">
          <a
            href={BUSINESS_INFO.whatsappBaseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display font-semibold text-[#6327FB] hover:text-[#1D0D42] underline underline-offset-2 whitespace-nowrap"
          >
            WhatsApp
          </a>
          <a
            href={BUSINESS_INFO.emailHref}
            className="font-display font-semibold text-[#6327FB] hover:text-[#1D0D42] underline underline-offset-2 whitespace-nowrap"
          >
            Email
          </a>
        </div>
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleFormSubmit}
        className="p-3 bg-white border-t border-[#050404]/12 flex items-end gap-2 shrink-0"
      >
        <label htmlFor="aasra-chat-input" className="sr-only">
          Ask Aasra AI Assistant a question
        </label>
        <textarea
          id="aasra-chat-input"
          ref={inputRef}
          rows={1}
          maxLength={MAX_INPUT_LENGTH}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask in English or Hindi..."
          disabled={isStreaming}
          className="flex-1 resize-none rounded-xl border border-[#050404]/18 bg-[#EAEAEA]/35 px-3.5 py-2.5 text-sm text-[#050404] placeholder:text-[#050404]/45 focus:border-[#6327FB] focus:bg-white focus:outline-none max-h-28"
        />
        <button
          type="submit"
          disabled={isStreaming || !input.trim()}
          aria-label="Send message"
          className="h-10 w-10 rounded-xl bg-[#6327FB] text-white flex items-center justify-center hover:bg-[#1D0D42] disabled:opacity-45 disabled:cursor-not-allowed transition-colors shrink-0 cursor-pointer"
        >
          {isStreaming ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
      </form>
    </section>
  );
};

export default AasraChatbot;
