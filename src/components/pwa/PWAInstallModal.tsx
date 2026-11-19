import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Download, PlusSquare, Share, Smartphone, X } from 'lucide-react';
import { assetUrl } from '../../lib/utilities';
import { usePWA } from './PWAContext';

export const PWAInstallModal: React.FC = () => {
  const {
    isInstalled,
    isIOS,
    platform,
    canPromptNatively,
    showInstallModal,
    dismissInstallModal,
    triggerNativeInstall,
  } = usePWA();

  if (isInstalled || !showInstallModal) {
    return null;
  }

  const handleInstallClick = async () => {
    if (canPromptNatively) {
      await triggerNativeInstall();
    } else {
      dismissInstallModal();
    }
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="pwa-install-title"
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-[#050404]/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-[#1D0D42]/10 text-[#050404]"
        >
          <button
            type="button"
            onClick={dismissInstallModal}
            aria-label="Close installation dialog"
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-[#050404]/60 hover:text-[#1D0D42] hover:bg-[#EAEAEA] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <img
              src={assetUrl('/icons/icon-192.png')}
              alt="AASRA application icon"
              className="w-16 h-16 rounded-2xl shadow-md mb-5"
            />

            {isIOS ? (
              <>
                <h2
                  id="pwa-install-title"
                  className="font-display text-2xl font-bold tracking-tight text-[#1D0D42]"
                >
                  INSTALL AASRA ON YOUR IPHONE.
                </h2>
                <p className="mt-2.5 text-sm text-[#050404]/75 leading-relaxed">
                  Add AASRA Web Devs to your iOS home screen for a fast, standalone app experience.
                </p>

                <ol className="mt-5 w-full space-y-3 text-left bg-[#EAEAEA]/60 rounded-xl p-4 border border-[#050404]/8">
                  <li className="flex items-start gap-3 text-sm text-[#050404]">
                    <span className="w-6 h-6 rounded-full bg-[#1D0D42] text-white text-xs font-display font-bold flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <span className="flex items-center gap-1.5 flex-wrap">
                      Tap the <strong>Share</strong> button <Share className="w-4 h-4 text-[#6327FB] inline" aria-hidden="true" /> in your Safari browser bar.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#050404]">
                    <span className="w-6 h-6 rounded-full bg-[#1D0D42] text-white text-xs font-display font-bold flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <span className="flex items-center gap-1.5 flex-wrap">
                      Scroll and choose <strong>Add to Home Screen</strong> <PlusSquare className="w-4 h-4 text-[#6327FB] inline" aria-hidden="true" />.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#050404]">
                    <span className="w-6 h-6 rounded-full bg-[#1D0D42] text-white text-xs font-display font-bold flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <span>Confirm the installation and tap <strong>Add</strong>.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#050404]">
                    <span className="w-6 h-6 rounded-full bg-[#1D0D42] text-white text-xs font-display font-bold flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </span>
                    <span>Open <strong>AASRA</strong> directly from your home screen.</span>
                  </li>
                </ol>

                <button
                  type="button"
                  onClick={dismissInstallModal}
                  className="mt-6 w-full min-h-[48px] rounded-full bg-[#6327FB] text-white font-display text-sm font-semibold tracking-wider hover:bg-[#1D0D42] transition-colors cursor-pointer"
                >
                  GOT IT
                </button>
              </>
            ) : canPromptNatively ? (
              <>
                <h2
                  id="pwa-install-title"
                  className="font-display text-2xl font-bold tracking-tight text-[#1D0D42]"
                >
                  TAKE AASRA WITH YOU.
                </h2>
                <p className="mt-2.5 text-sm text-[#050404]/75 leading-relaxed">
                  Install our app for a faster, more convenient experience. Access AASRA directly from your home screen.
                </p>

                <div className="mt-6 w-full flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={handleInstallClick}
                    className="w-full min-h-[48px] rounded-full bg-[#6327FB] text-white font-display text-sm font-semibold tracking-wider hover:bg-[#1D0D42] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#6327FB]/25"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    INSTALL APP
                  </button>
                  <button
                    type="button"
                    onClick={dismissInstallModal}
                    className="w-full min-h-[44px] rounded-full text-sm font-display font-medium text-[#050404]/70 hover:text-[#1D0D42] hover:bg-[#EAEAEA]/60 transition-colors cursor-pointer"
                  >
                    NOT NOW
                  </button>
                </div>

                <p className="mt-4 text-xs text-[#050404]/55">
                  Your digital growth partner, one tap away.
                </p>
              </>
            ) : (
              <>
                <h2
                  id="pwa-install-title"
                  className="font-display text-2xl font-bold tracking-tight text-[#1D0D42]"
                >
                  INSTALL AASRA APPLICATION.
                </h2>
                <p className="mt-2.5 text-sm text-[#050404]/75 leading-relaxed">
                  {platform === 'android-chromium'
                    ? 'Open your browser menu (three dots) and tap "Install app" or "Add to Home screen" to launch AASRA in standalone mode.'
                    : 'In Chrome, Edge, or compatible desktop browsers, click the Install icon in the address bar or open the browser menu and select "Install AASRA Web Devs".'}
                </p>

                <div className="mt-5 w-full rounded-xl bg-[#EAEAEA]/60 p-4 text-left text-xs text-[#050404]/80 flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-[#6327FB] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    Installing places the AASRA icon on your device and enables standalone navigation with offline fallback support.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={dismissInstallModal}
                  className="mt-6 w-full min-h-[48px] rounded-full bg-[#6327FB] text-white font-display text-sm font-semibold tracking-wider hover:bg-[#1D0D42] transition-colors cursor-pointer"
                >
                  GOT IT
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
