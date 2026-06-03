// ═══════════════════════════════════════════════════════
//  e-Sarathi Home Automation — Service Worker
//  Required for: PWA install prompt + Play Store TWA
// ═══════════════════════════════════════════════════════

const CACHE_NAME = 'esarathi-ha-v1';

const ASSETS_TO_CACHE = [
  '/apps/home_automation/',
  '/apps/home_automation/index.html',
  '/apps/home_automation/favicon.png',
  '/apps/home_automation/icons/icon-192.png',
  '/apps/home_automation/icons/icon-512.png',
];

// Install — cache all core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate — clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch — serve from cache, fall back to network
self.addEventListener('fetch', event => {
  // Skip non-GET and cross-origin requests (e.g. BLE/WiFi API calls)
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cache new successful responses for app assets
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
