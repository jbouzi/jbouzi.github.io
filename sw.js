var cacheName = 'playAlong';
var filesToCache = [
  '/',
  '/index.html',
  '/play.html',
  '/css/style.css',
  '/js/main.js',
  '/js/abcjs-basic-min.js',
  '/abc/air.abc',
  '/abc/airBT.abc',
  '/abc/aveMaria.abc',
  '/abc/aveMariaBT.abc',
  '/abc/lipSlur.abc',
  '/abc/lipSlurBT.abc'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});