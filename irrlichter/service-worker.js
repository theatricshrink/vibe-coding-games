var CACHE = 'irrlichter-v5';
var ASSETS = [
  '/irrlichter/',
  '/irrlichter/index.html',
  '/irrlichter/src/i18n/lang.js',
  '/irrlichter/src/i18n/strings.js',
  '/irrlichter/src/data/levels.js',
  '/irrlichter/src/utils/MazeGen.js',
  '/irrlichter/src/scenes/BootScene.js',
  '/irrlichter/src/scenes/MenuScene.js',
  '/irrlichter/src/scenes/GameScene.js',
  '/irrlichter/src/scenes/GameOverScene.js',
  '/irrlichter/src/main.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) { return cache.addAll(ASSETS); })
  );
  // Take over immediately — don't wait for existing tabs to close
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    Promise.all([
      // Delete all old caches
      caches.keys().then(function(keys) {
        return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) {
          return caches.delete(k);
        }));
      }),
      // Claim all open clients immediately
      self.clients.claim()
    ])
  );
});

self.addEventListener('fetch', function(e) {
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(function() { return caches.match(e.request); }));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      // Discard cached responses with wrong content-type (e.g. HTML served for JS paths)
      if (cached) {
        var ct = cached.headers.get('content-type') || '';
        if (e.request.url.endsWith('.js') && ct.indexOf('javascript') === -1) {
          return fetch(e.request);
        }
        return cached;
      }
      return fetch(e.request);
    })
  );
});
