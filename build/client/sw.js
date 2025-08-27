const CACHE_NAME = 'lva-site-v5';
const STATIC_CACHE = 'lva-static-v5';
const BASE_PATH = '/healthinsurancedave/';
const urlsToCache = [
  BASE_PATH,
  BASE_PATH + 'about',
  BASE_PATH + 'services',
  BASE_PATH + 'certifications',
  BASE_PATH + 'discover',
  BASE_PATH + 'health_master',
  BASE_PATH + 'nil_master',
  BASE_PATH + 'solar_master'
];

// Cache static assets - these should be relative to the root since SW runs at root level
const staticAssets = [
  '/NiL/schoolLogo.png',
  '/NiL/Vicotoria.png',
  '/NiL/Vicotoria1.png',
  '/NiL/Vicotoria2.png',
  '/NiL/victoriaAward.png',
  '/Health/David Brown.png',
  '/Health/Matthias Wendler.png'
];

// Install event - cache resources with error handling
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        console.log('Opened main cache');
        return Promise.allSettled(
          urlsToCache.map(url => 
            cache.add(url).catch(err => {
              console.warn(`Failed to cache ${url}:`, err);
              return null;
            })
          )
        );
      }),
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('Opened static cache');
        return Promise.allSettled(
          staticAssets.map(asset => 
            cache.add(asset).catch(err => {
              console.warn(`Failed to cache static asset ${asset}:`, err);
              return null;
            })
          )
        );
      })
    ]).catch((error) => {
      console.error('Cache installation failed:', error);
    })
  );
});

// Fetch event - serve from cache if available with better error handling
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip requests to external domains
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip requests for development assets in dev mode
  if (event.request.url.includes('localhost:5173') && 
      (event.request.url.includes('__vite') || 
       event.request.url.includes('@vite') ||
       event.request.url.includes('node_modules'))) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          return response;
        }

        // Fetch from network with error handling
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response before caching
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              })
              .catch((error) => {
                console.warn('Failed to cache response:', error);
              });

            return response;
          })
          .catch((error) => {
            console.warn('Fetch failed:', error);
            // Return a fallback response for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
            return new Response('Network error', { status: 503 });
          });
      })
      .catch((error) => {
        console.error('Cache match failed:', error);
        return fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle background sync tasks
  console.log('Background sync triggered');
  return Promise.resolve();
}

// Handle push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(BASE_PATH)
  );
});
