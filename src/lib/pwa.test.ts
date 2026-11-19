import test from 'node:test';
import assert from 'node:assert/strict';
import {
  detectInstalledState,
  detectIOSDevice,
  classifyInstallPlatform,
  shouldShowAutoInstallPopup,
} from './pwa';

test('detectInstalledState recognizes standalone display-mode and navigator.standalone', () => {
  assert.equal(detectInstalledState({ displayModeStandalone: true, navigatorStandalone: false }), true);
  assert.equal(detectInstalledState({ displayModeStandalone: false, navigatorStandalone: true }), true);
  assert.equal(detectInstalledState({ displayModeStandalone: false, navigatorStandalone: false }), false);
});

test('detectIOSDevice identifies iPhone, iPad, and touch iPadOS Macintosh UA', () => {
  assert.equal(detectIOSDevice('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)', 5), true);
  assert.equal(detectIOSDevice('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 5), true);
  assert.equal(detectIOSDevice('Mozilla/5.0 (Linux; Android 14; Pixel 8)', 5), false);
});

test('classifyInstallPlatform routes iOS, Android, and Desktop properly', () => {
  assert.equal(
    classifyInstallPlatform({
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0)',
      maxTouchPoints: 5,
    }),
    'ios-safari'
  );
  assert.equal(
    classifyInstallPlatform({
      userAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8)',
      hasDeferredPrompt: true,
    }),
    'android-chromium'
  );
  assert.equal(
    classifyInstallPlatform({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      hasDeferredPrompt: true,
    }),
    'desktop-chromium'
  );
});

test('shouldShowAutoInstallPopup suppresses popup when installed or dismissed in session', () => {
  assert.equal(
    shouldShowAutoInstallPopup({
      isInstalled: true,
      dismissedInSession: false,
      hasDeferredPrompt: true,
      isIOS: false,
      isMobileViewport: true,
    }),
    false
  );
  assert.equal(
    shouldShowAutoInstallPopup({
      isInstalled: false,
      dismissedInSession: true,
      hasDeferredPrompt: true,
      isIOS: true,
      isMobileViewport: true,
    }),
    false
  );
  assert.equal(
    shouldShowAutoInstallPopup({
      isInstalled: false,
      dismissedInSession: false,
      hasDeferredPrompt: true,
      isIOS: false,
      isMobileViewport: true,
    }),
    true
  );
  assert.equal(
    shouldShowAutoInstallPopup({
      isInstalled: false,
      dismissedInSession: false,
      hasDeferredPrompt: false,
      isIOS: true,
      isMobileViewport: true,
    }),
    true
  );
});
