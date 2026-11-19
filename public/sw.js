const SW_VERSION = 'v5';
const STATIC_CACHE = `aasra-static-${SW_VERSION}`;
const PAGES_CACHE = `aasra-pages-${SW_VERSION}`;
const IMAGES_CACHE = `aasra-images-${SW_VERSION}`;

const scopedUrl = (relPath) => new URL(relPath, self.registration.scope).href;

const CORE_PRECACHE_PATHS = [
  '',
  'offline.html',
  'offline',
  'manifest.webmanifest',
  'icon.svg',
  'favicon.ico',
  'favicon-16.png',
  'favicon-32.png',
  'favicon-48.png',
  'favicon-96.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return Promise.allSettled(
        CORE_PRECACHE_PATHS.map((relPath) => {
          const targetUrl = scopedUrl(relPath);
          return fetch(targetUrl, { cache: 'no-cache' }).then((response) => {
            if (response && response.ok) {
              return cache.put(targetUrl, response);
            }
          });
        })
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  const validCaches = new Set([STATIC_CACHE, PAGES_CACHE, IMAGES_CACHE]);
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (!validCaches.has(key)) {
              return caches.delete(key);
            }
            return Promise.resolve();
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

function isStaticAsset(url) {
  return (
    url.pathname.includes('/assets/') ||
    /\.(js|css|woff2?|ttf|eot)(\?.*)?$/i.test(url.pathname) ||
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com'
  );
}

function isImageAsset(url) {
  return (
    url.pathname.includes('/icons/') ||
    url.pathname.includes('/src/assets/images/') ||
    /\.(png|jpe?g|svg|webp|ico|gif)(\?.*)?$/i.test(url.pathname)
  );
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return;
  }

  // Never cache API endpoints or Vite HMR internal endpoints
  if (
    url.pathname.includes('/api/') ||
    url.pathname.includes('/@vite') ||
    url.pathname.includes('/@react-refresh')
  ) {
    return;
  }

  // Public page navigation: Network First with cached page or standalone offline.html fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok && url.origin === self.location.origin) {
            const copy = networkResponse.clone();
            caches.open(PAGES_CACHE).then((cache) => {
              cache.put(request, copy);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request);
          if (cachedPage) return cachedPage;
          const cachedOfflineHtml = await caches.match(scopedUrl('offline.html'));
          if (cachedOfflineHtml) return cachedOfflineHtml;
          return new Response(
            '<!doctype html><html><head><meta charset="utf-8"><title>Offline — AASRA Web Devs</title></head><body style="font-family:sans-serif;padding:2rem;background:#fff;color:#050404;"><h1>You\'re currently offline.</h1><p>Please check your internet connection and retry.</p></body></html>',
            { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        })
    );
    return;
  }

  // Images: Stale-While-Revalidate
  if (isImageAsset(url)) {
    event.respondWith(
      caches.open(IMAGES_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const networkPromise = fetch(request)
          .then((response) => {
            if (response && response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cached);
        return cached || networkPromise;
      })
    );
    return;
  }

  // Static versioned assets & fonts: Cache First
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const response = await fetch(request);
        if (response && response.ok) {
          cache.put(request, response.clone());
        }
        return response;
      })
    );
  }
});
