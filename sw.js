self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('pwa-cache').then((cache) => cache.addAll([
      './',
      './index.html',
      'https://i.ibb.co/7Jx8FvWg/MVIMG-20251211-143921.jpg'
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
