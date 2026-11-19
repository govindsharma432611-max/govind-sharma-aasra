import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, SlidersHorizontal, X } from 'lucide-react';
import {
  acceptAllPreferences,
  COOKIE_CONSENT_KEY,
  CookiePreferences,
  parseStoredCookiePreferences,
  rejectNonEssentialPreferences,
} from '../../lib/cookies';
import { usePWA } from '../pwa/PWAContext';

interface CookieConsentContextValue {
  preferences: CookiePreferences | null;
  openPreferencesModal: () => void;
  isBannerVisible: boolean;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  const { showInstallModal } = usePWA();

  useEffect(() => {
    try {
      const stored = parseStoredCookiePreferences(window.localStorage.getItem(COOKIE_CONSENT_KEY));
      if (stored) {
        setPreferences(stored);
        setAnalyticsEnabled(stored.analytics);
        setMarketingEnabled(stored.marketing);
        setShowBanner(false);
      } else {
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }
    setInitialized(true);
  }, []);

  const persist = useCallback((next: CookiePreferences) => {
    setPreferences(next);
    setAnalyticsEnabled(next.analytics);
    setMarketingEnabled(next.marketing);
    setShowBanner(false);
    setShowModal(false);
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage errors in strict privacy contexts
    }
  }, []);

  const handleAcceptAll = () => persist(acceptAllPreferences());
  const handleRejectNonEssential = () => persist(rejectNonEssentialPreferences());
  const handleSaveCustom = () =>
    persist({
      essential: true,
      analytics: analyticsEnabled,
      marketing: marketingEnabled,
      updatedAt: new Date().toISOString(),
    });

  const openPreferencesModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const isBannerVisible = initialized && showBanner && !showModal && !showInstallModal;

  return (
    <CookieConsentContext.Provider value={{ preferences, openPreferencesModal, isBannerVisible }}>
      {children}

      {/* Compact Cookie Banner (suppressed while PWA install modal is active to avoid overlapping modals) */}
      {isBannerVisible && (
        <aside
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 sm:bottom-4 sm:right-4 sm:left-auto sm:max-w-md z-40 sm:rounded-2xl bg-white border-t sm:border border-[#1D0D42]/15 shadow-2xl px-4 py-3 sm:p-5 text-[#050404]"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[#1D0D42] min-w-0">
              <ShieldCheck className="w-4 h-4 text-[#6327FB] shrink-0" aria-hidden="true" />
              <p className="text-xs text-[#050404]/80 truncate sm:whitespace-normal">
                <strong className="font-display text-[#1D0D42]">Cookies:</strong> Essential storage active.{' '}
                <Link to="/cookie-policy" className="underline text-[#6327FB] hover:text-[#1D0D42]">
                  Policy
                </Link>
              </p>
            </div>
            <button
              type="button"
              onClick={handleRejectNonEssential}
              aria-label="Dismiss and use essential cookies only"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#050404]/50 hover:bg-[#EAEAEA] hover:text-[#050404] transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-3.5 py-1.5 min-h-[36px] sm:min-h-[40px] rounded-full bg-[#6327FB] text-white font-display text-xs font-semibold hover:bg-[#1D0D42] transition-colors whitespace-nowrap cursor-pointer"
            >
              Accept All
            </button>
            <button
              type="button"
              onClick={handleRejectNonEssential}
              className="px-3.5 py-1.5 min-h-[36px] sm:min-h-[40px] rounded-full border border-[#050404]/20 text-[#050404] font-display text-xs font-semibold hover:border-[#1D0D42] transition-colors whitespace-nowrap cursor-pointer"
            >
              Reject Non-Essential
            </button>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="px-2.5 py-1.5 min-h-[36px] sm:min-h-[40px] rounded-full text-xs font-display font-medium text-[#1D0D42] hover:bg-[#EAEAEA] transition-colors inline-flex items-center gap-1 whitespace-nowrap cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              Manage Preferences
            </button>
          </div>
        </aside>
      )}

      {/* Cookie Preferences Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050404]/60 backdrop-blur-sm"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-[#1D0D42]/15 text-[#050404]">
            <div className="flex items-center justify-between gap-4 border-b border-[#EAEAEA] pb-4">
              <h2 id="cookie-modal-title" className="font-display text-xl font-bold text-[#1D0D42]">
                Manage Cookie Preferences
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close cookie preferences"
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#050404]/60 hover:bg-[#EAEAEA] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {/* Essential */}
              <div className="rounded-xl bg-[#EAEAEA]/60 p-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-sm font-semibold text-[#1D0D42]">
                    Essential Cookies
                  </h3>
                  <p className="text-xs text-[#050404]/70 mt-1 leading-relaxed">
                    Always active for core site navigation, cookie preference storage, and PWA session handling.
                  </p>
                </div>
                <span className="text-xs font-display font-semibold text-[#1D0D42] whitespace-nowrap pt-0.5">
                  Always On
                </span>
              </div>

              {/* Analytics */}
              <label className="rounded-xl border border-[#EAEAEA] p-4 flex items-start justify-between gap-4 cursor-pointer hover:border-[#A786FC]">
                <div>
                  <span className="font-display text-sm font-semibold text-[#050404] block">
                    Analytics Cookies
                  </span>
                  <span className="text-xs text-[#050404]/70 mt-1 block leading-relaxed">
                    Helps measure aggregated page visits and navigation performance when enabled.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="mt-1 h-5 w-5 accent-[#6327FB] rounded cursor-pointer shrink-0"
                />
              </label>

              {/* Marketing */}
              <label className="rounded-xl border border-[#EAEAEA] p-4 flex items-start justify-between gap-4 cursor-pointer hover:border-[#A786FC]">
                <div>
                  <span className="font-display text-sm font-semibold text-[#050404] block">
                    Marketing Cookies
                  </span>
                  <span className="text-xs text-[#050404]/70 mt-1 block leading-relaxed">
                    Supports optional campaign attribution and remarketing integrations when configured.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={marketingEnabled}
                  onChange={(e) => setMarketingEnabled(e.target.checked)}
                  className="mt-1 h-5 w-5 accent-[#6327FB] rounded cursor-pointer shrink-0"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-2.5 pt-4 border-t border-[#EAEAEA]">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-4 py-2.5 min-h-[44px] rounded-full border border-[#050404]/20 text-xs font-display font-semibold text-[#050404] hover:border-[#1D0D42] cursor-pointer"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-5 py-2.5 min-h-[44px] rounded-full bg-[#1D0D42] text-white text-xs font-display font-semibold hover:bg-[#6327FB] transition-colors cursor-pointer"
              >
                Save Preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-5 py-2.5 min-h-[44px] rounded-full bg-[#6327FB] text-white text-xs font-display font-semibold hover:bg-[#1D0D42] transition-colors cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </CookieConsentContext.Provider>
  );
};

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error('useCookieConsent must be used inside CookieConsentProvider');
  }
  return ctx;
}
