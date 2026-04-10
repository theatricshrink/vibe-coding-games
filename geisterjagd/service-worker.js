var CACHE_NAME = 'geisterjagd-v1';
var CACHE_URLS = [
  '/geisterjagd/index.html',
  '/geisterjagd/src/i18n/lang.js',
  '/geisterjagd/src/i18n/strings.js',
  '/geisterjagd/src/utils/BoardGrid.js',
  '/geisterjagd/src/utils/GhostAI.js',
  '/geisterjagd/src/utils/Audio.js',
  '/geisterjagd/src/scenes/BootScene.js',
  '/geisterjagd/src/scenes/MenuScene.js',
  '/geisterjagd/src/scenes/GameScene.js',
  '/geisterjagd/src/scenes/GameOverScene.js',
  '/geisterjagd/src/main.js',
  'https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE_NAME).then(function(cache) { return cache.addAll(CACHE_URLS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.filter(function(k) { return k !== CACHE_NAME; }).map(function(k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  if (e.request.mode === 'navigate') return;
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached && !cached.redirected) return cached;
      return fetch(e.request);
    })
  );
});
