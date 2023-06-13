const CACHE_NAME = 'pwa2';

const cacheFiles = [
  './',
  './api.js',
  './utils/display.js',
  './style.css',
  './offline.html',
  './offlinePost.html' 
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);
      try {
        const fetchResponse = await fetch(event.request);
        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      } catch (e) {

      if (event.request.mode === 'navigate' && event.request.url.includes('id')) {
        if (cachedResponse) {
          // Si l'article est dans le cache, le retourner
          return cachedResponse;
        } else {
          // Si l'article n'est pas dans le cache, afficher une page d'erreur
          return cache.match('offlinePost.html');
        }
      }

      if(event.request.mode === 'navigate') {
        const offline = await cache.match('offline.html');
        return offline;
      }

      if (event.request.method === 'GET') {
          return cachedResponse || cache.match('offline.html');
        }
      }
    })()
  );
});







// Active le service worker et supprime les anciens caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
