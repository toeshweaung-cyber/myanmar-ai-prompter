const CACHE_NAME = 'prompt-pro-v4'; // Version နံပါတ်ကို v4 လို့ ပြောင်းထားပါတယ်
const assets = [
  '/myanmar-ai-prompter/',
  '/myanmar-ai-prompter/index.html',
  '/myanmar-ai-prompter/manifest.json',
  '/myanmar-ai-prompter/icon-192.png',
  '/myanmar-ai-prompter/icon-512.png'
];

// Install service worker
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets...');
      return cache.addAll(assets);
    })
  );
});

// Activate service worker (ဒါက ကုဒ်ဟောင်းတွေကို ရှင်းပေးမှာပါ)
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch events
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
