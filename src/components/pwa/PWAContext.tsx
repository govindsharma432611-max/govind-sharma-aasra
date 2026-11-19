import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  classifyInstallPlatform,
  detectInstalledState,
  detectIOSDevice,
  InstallPlatform,
  readSessionDismissal,
  shouldShowAutoInstallPopup,
  writeSessionDismissal,
} from '../../lib/pwa';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface PWAContextValue {
  isInstalled: boolean;
  isOnline: boolean;
  isIOS: boolean;
  platform: InstallPlatform;
  canPromptNatively: boolean;
  showInstallModal: boolean;
  updateAvailable: boolean;
  openInstallModal: () => void;
  dismissInstallModal: () => void;
  triggerNativeInstall: () => Promise<'accepted' | 'dismissed' | 'unavailable'>;
  applyAppUpdate: () => void;
}

const PWAContext = createContext<PWAContextValue | null>(null);

export const PWAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [platform, setPlatform] = useState<InstallPlatform>('desktop-other');
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);

  // Sync installed & platform state
  useEffect(() => {
    const standaloneMatch = window.matchMedia('(display-mode: standalone)');
    const navStandalone = Boolean((window.navigator as unknown as { standalone?: boolean }).standalone);
    const installed = detectInstalledState({
      displayModeStandalone: standaloneMatch.matches,
      navigatorStandalone: navStandalone,
    });
    setIsInstalled(installed);

    const ua = window.navigator.userAgent || '';
    const touchPoints = window.navigator.maxTouchPoints || 0;
    const ios = detectIOSDevice(ua, touchPoints);
    setIsIOS(ios);
    setPlatform(
      classifyInstallPlatform({
        userAgent: ua,
        maxTouchPoints: touchPoints,
        displayModeStandalone: standaloneMatch.matches,
        navigatorStandalone: navStandalone,
        hasDeferredPrompt: false,
      })
    );

    const handleDisplayChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsInstalled(true);
        setShowInstallModal(false);
      }
    };
    standaloneMatch.addEventListener('change', handleDisplayChange);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Automatic iOS prompt once per session when not installed
    const dismissed = readSessionDismissal(window.sessionStorage);
    let iosTimer: number | undefined;
    if (
      !installed &&
      !dismissed &&
      ios &&
      shouldShowAutoInstallPopup({
        isInstalled: installed,
        dismissedInSession: dismissed,
        hasDeferredPrompt: false,
        isIOS: ios,
        isMobileViewport: window.innerWidth < 1024,
      })
    ) {
      iosTimer = window.setTimeout(() => {
        setShowInstallModal(true);
      }, 1200);
    }

    return () => {
      standaloneMatch.removeEventListener('change', handleDisplayChange);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (iosTimer) window.clearTimeout(iosTimer);
    };
  }, []);

  // Listen for Chromium beforeinstallprompt & appinstalled
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);

      const ua = window.navigator.userAgent || '';
      const touchPoints = window.navigator.maxTouchPoints || 0;
      setPlatform(
        classifyInstallPlatform({
          userAgent: ua,
          maxTouchPoints: touchPoints,
          hasDeferredPrompt: true,
        })
      );

      const installed = detectInstalledState({
        displayModeStandalone: window.matchMedia('(display-mode: standalone)').matches,
        navigatorStandalone: Boolean((window.navigator as unknown as { standalone?: boolean }).standalone),
      });
      const dismissed = readSessionDismissal(window.sessionStorage);

      if (
        shouldShowAutoInstallPopup({
          isInstalled: installed,
          dismissedInSession: dismissed,
          hasDeferredPrompt: true,
          isIOS: false,
          isMobileViewport: window.innerWidth < 1024,
        })
      ) {
        setShowInstallModal(true);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowInstallModal(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Register Service Worker and handle safe updates
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    let refreshing = false;
    const onControllerChange = () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

    const baseUrl = import.meta.env.BASE_URL || '/';
    navigator.serviceWorker
      .register(`${baseUrl}sw.js`, { scope: baseUrl })
      .then((registration) => {
        if (registration.waiting) {
          setWaitingWorker(registration.waiting);
          setUpdateAvailable(true);
        }

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setWaitingWorker(newWorker);
              setUpdateAvailable(true);
            }
          });
        });
      })
      .catch((err) => {
        console.warn('Service Worker registration skipped or failed:', err);
      });

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
    };
  }, []);

  const openInstallModal = useCallback(() => {
    if (isInstalled) return;
    setShowInstallModal(true);
  }, [isInstalled]);

  const dismissInstallModal = useCallback(() => {
    writeSessionDismissal(window.sessionStorage);
    setShowInstallModal(false);
  }, []);

  const triggerNativeInstall = useCallback(async () => {
    if (!deferredPrompt) return 'unavailable';
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        setShowInstallModal(false);
        return 'accepted';
      }
      writeSessionDismissal(window.sessionStorage);
      setShowInstallModal(false);
      return 'dismissed';
    } catch {
      return 'unavailable';
    }
  }, [deferredPrompt]);

  const applyAppUpdate = useCallback(() => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      setUpdateAvailable(false);
    }
  }, [waitingWorker]);

  return (
    <PWAContext.Provider
      value={{
        isInstalled,
        isOnline,
        isIOS,
        platform,
        canPromptNatively: Boolean(deferredPrompt),
        showInstallModal,
        updateAvailable,
        openInstallModal,
        dismissInstallModal,
        triggerNativeInstall,
        applyAppUpdate,
      }}
    >
      {children}
    </PWAContext.Provider>
  );
};

export function usePWA(): PWAContextValue {
  const ctx = useContext(PWAContext);
  if (!ctx) {
    throw new Error('usePWA must be used inside PWAProvider');
  }
  return ctx;
}
