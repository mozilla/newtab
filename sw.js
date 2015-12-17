// I am a service worker for the remote newtab page.

// NOTE: To invalidate cached resources, change the version number below.
const VERSION = '1';
const CACHE_NAME = 'remote-newtab-v' + VERSION;

self.addEventListener('install', function (event) {
  console.log('I am installed.');

  // NOTE: If we will always serve from a static path (as opposed to a dynamic
  // path like /%VERSION%/%CHANNEL%/%LOCALE%/), we can do this below
  // instead of the more involved fetch handler below.
  // event.waitUntil(
  //   caches.open(CACHE_NAME).then(function (cache) {
  //     return cache.addAll([
  //       '/',
  //       '/www/main.js',
  //       '/www/style.css',
  //       '/img/icon-gear.svg',
  //       '/img/magnifier.png'
  //     ]);
  //   })
  // );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          console.log('cache hit: ' + event.request.url);
          return response;
        }

        console.log('cache miss: ' + event.request.url);

        // A request is a stream and can only be consumed once. Clone to reuse.
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(
          function (resp) {
            // Check if we received a valid response that we want to cache.
            if (resp &&
                resp.status === 200 &&
                resp.type === 'basic' &&  // basic indicates that it's a request to our origin
                !fetchRequest.url.endsWith('/sw.js') // don't cache myself
              ) {
              // A response is a stream too. Clone it for reuse.
              const responseToCache = resp.clone();

              // Cache it.
              caches.open(CACHE_NAME)
                .then(function (cache) {
                  cache.put(event.request, responseToCache);
                });
            }

            return resp;
          }
        );
      })
    );
});

self.addEventListener('activate', function (event) {
  console.log('I am activated.');

  // Claim the client that registered this service worker
  event.waitUntil(self.clients.claim());

  // Do some cache management. Remove caches no longer used.
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('removing cache: ' + cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
