// Service worker : met l'application en cache pour un fonctionnement hors ligne.
// Changer VERSION à chaque mise à jour des fichiers pour forcer le rafraîchissement.
const VERSION = 'fiche-ba-v16';
const FILES = [
  './', 'index.html', 'fill.js', 'pdf-lib.min.js', 'BA.pdf', 'manifest.webmanifest',
  'fonts/atkinson-hyperlegible-latin-400-normal.woff2', 'fonts/atkinson-hyperlegible-latin-700-normal.woff2',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request).then((res) => {
      if (res.ok && new URL(e.request.url).origin === location.origin) {
        const copy = res.clone(); caches.open(VERSION).then((c) => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match('index.html')))
  );
});
