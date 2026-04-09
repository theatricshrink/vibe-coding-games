// Nuke all caches and pass every request straight to the network.
// This fixes browsers that cached bad responses from before the game files existed.
var CACHE = 'irrlichter-v6';

self.addEventListener('install', function() {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys()
      .then(function(keys) {
        return Promise.all(keys.map(function(k) { return caches.delete(k); }));
      })
      .then(function() { return self.clients.claim(); })
  );
});

// No caching — always fetch from network
self.addEventListener('fetch', function(e) {
  e.respondWith(fetch(e.request));
});
