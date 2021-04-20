// Intialization
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.1/workbox-sw.js');
workbox.setConfig({ debug: false });

// Loading required modules
workbox.loadModule('workbox-routing');
workbox.loadModule('workbox-strategies');
workbox.loadModule('workbox-expiration');
workbox.loadModule('workbox-cacheable-response');

// Required methods
const { registerRoute } = workbox.routing;
const { CacheFirst } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;
const { CacheableResponsePlugin } = workbox.cacheableResponse;

// Caching static assets
registerRoute(({ request }) =>

  request.destination === 'style' ||
  request.destination === 'script' ||
  request.destination === 'worker' ||
  request.destination === 'document',
  new CacheFirst({
    cacheName: 'static',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 7200,
      })
    ],
  }),
);
