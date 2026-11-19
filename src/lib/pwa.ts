export type InstallPlatform = 'android-chromium' | 'ios-safari' | 'desktop-chromium' | 'desktop-other';

export interface PlatformEnvironment {
  userAgent: string;
  maxTouchPoints?: number;
  displayModeStandalone?: boolean;
  navigatorStandalone?: boolean;
  hasDeferredPrompt?: boolean;
}

export const PWA_DISMISS_STORAGE_KEY = 'aasra_pwa_prompt_dismissed_session';

export function detectInstalledState(env: Pick<PlatformEnvironment, 'displayModeStandalone' | 'navigatorStandalone'>): boolean {
  return Boolean(env.displayModeStandalone || env.navigatorStandalone);
}

export function detectIOSDevice(userAgent: string, maxTouchPoints = 0): boolean {
  const ua = userAgent.toLowerCase();
  const isClassicIOS = /iphone|ipad|ipod/.test(ua);
  // iPadOS 13+ reports Macintosh in UA with touch points > 1
  const isIPadOS = /macintosh/.test(ua) && maxTouchPoints > 1;
  return isClassicIOS || isIPadOS;
}

export function detectAndroidDevice(userAgent: string): boolean {
  return /android/i.test(userAgent);
}

export function classifyInstallPlatform(env: PlatformEnvironment): InstallPlatform {
  if (detectIOSDevice(env.userAgent, env.maxTouchPoints ?? 0)) {
    return 'ios-safari';
  }
  if (detectAndroidDevice(env.userAgent)) {
    return 'android-chromium';
  }
  if (env.hasDeferredPrompt) {
    return 'desktop-chromium';
  }
  return 'desktop-other';
}

export function shouldShowAutoInstallPopup(params: {
  isInstalled: boolean;
  dismissedInSession: boolean;
  hasDeferredPrompt: boolean;
  isIOS: boolean;
  isMobileViewport: boolean;
}): boolean {
  if (params.isInstalled) return false;
  if (params.dismissedInSession) return false;
  // Show automatically when browser fires beforeinstallprompt (Android/Desktop Chromium)
  // OR when on eligible iOS device (Safari does not fire beforeinstallprompt)
  if (params.hasDeferredPrompt) return true;
  if (params.isIOS) return true;
  // On mobile viewports without native prompt yet (or desktop with fallback guidance), wait for native prompt unless iOS
  return false;
}

export function readSessionDismissal(storage?: Pick<Storage, 'getItem'> | null): boolean {
  if (!storage) return false;
  try {
    return storage.getItem(PWA_DISMISS_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function writeSessionDismissal(storage?: Pick<Storage, 'setItem'> | null): void {
  if (!storage) return;
  try {
    storage.setItem(PWA_DISMISS_STORAGE_KEY, '1');
  } catch {
    // Ignore storage quota / privacy mode errors
  }
}
