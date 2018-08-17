/*
 * Outstanding tasks
 * - Make it work offline
 * 
 */

// var dataCacheName = 'amountData-v1';
var cacheName = 'amountPWA-final-1';
var filesToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/manifest.json',
  '/icon_400x400.jpg',
  '/splash.jpg',
  '/inline.css'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') {
	  return;
	}
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
		  return;
	}else{
		  event.respondWith(
		    caches.open(cacheName).then(function(cache) {
			  return cache.match(event.request).then(function(response) {
			      var fetchPromise = fetch(event.request).then(function(networkResponse) {
			        cache.put(event.request, networkResponse.clone());
			        return networkResponse;
			      }) 
			    return response || fetchPromise;
			  })
			})
		  );
	}
});

/*
 * Stale-while-revalidate from https://jakearchibald.com/2014/offline-cookbook/
 */

/*
self.addEventListener('fetch', function(event) {
	  event.respondWith(
	    caches.match(event.request).then(function(response) {
	      return response || fetch(event.request);
	    })
	  );
	});
*/





