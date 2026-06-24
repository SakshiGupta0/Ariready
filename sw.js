const CACHE = 'ariready-v7';
const ASSETS = [
  'https://sakshigupta0.github.io/Ariready/',
  'https://sakshigupta0.github.io/Ariready/index.html',
  'https://sakshigupta0.github.io/Ariready/manifest.json',
  'https://sakshigupta0.github.io/Ariready/icon-192.png',
  'https://sakshigupta0.github.io/Ariready/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
