import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PWAProvider } from './components/pwa/PWAContext';
import { PWAInstallModal } from './components/pwa/PWAInstallModal';
import { PWAStatusBanners } from './components/pwa/PWAStatusBanners';
import { CookieConsentProvider } from './components/legal/CookieConsent';
import { SmoothScrollProvider } from './components/animations/SmoothScrollProvider';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/footer/Footer';
import { FloatingWhatsAppButton } from './components/contact/FloatingWhatsAppButton';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesOverviewPage } from './pages/ServicesOverviewPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { WorkPage } from './pages/WorkPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';
import { PricingPage } from './pages/PricingPage';
import { ProcessPage } from './pages/ProcessPage';
import { InsightsPage } from './pages/InsightsPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { OfflinePage } from './pages/OfflinePage';

const LazyAasraChatbot = lazy(() => import('./components/chat/AasraChatbot'));

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PWAProvider>
        <CookieConsentProvider>
          <SmoothScrollProvider>
            <div className="min-h-screen flex flex-col bg-white text-[#050404]">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesOverviewPage />} />
                  <Route path="/services/:slug" element={<ServiceDetailPage />} />
                  <Route path="/work" element={<WorkPage />} />
                  <Route path="/work/:slug" element={<CaseStudyDetailPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/process" element={<ProcessPage />} />
                  <Route path="/insights" element={<InsightsPage />} />
                  <Route path="/insights/:slug" element={<ArticleDetailPage />} />
                  <Route path="/contact" element={<ContactPage />} />

                  {/* Legal Pages */}
                  <Route path="/privacy-policy" element={<LegalPage docKey="privacy-policy" />} />
                  <Route path="/terms-and-conditions" element={<LegalPage docKey="terms-and-conditions" />} />
                  <Route path="/cookie-policy" element={<LegalPage docKey="cookie-policy" />} />
                  <Route
                    path="/refund-cancellation-policy"
                    element={<LegalPage docKey="refund-cancellation-policy" />}
                  />
                  <Route path="/disclaimer" element={<LegalPage docKey="disclaimer" />} />

                  {/* PWA Offline Fallback */}
                  <Route path="/offline" element={<OfflinePage />} />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
              <FloatingWhatsAppButton />
              <Suspense fallback={null}>
                <LazyAasraChatbot />
              </Suspense>
              <PWAInstallModal />
              <PWAStatusBanners />
            </div>
          </SmoothScrollProvider>
        </CookieConsentProvider>
      </PWAProvider>
    </BrowserRouter>
  );
}
