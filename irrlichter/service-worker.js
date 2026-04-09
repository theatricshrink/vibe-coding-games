var CACHE_NAME = 'irrlichter-v7';
var CACHE_URLS = [
  '/irrlichter/index.html',
  '/irrlichter/src/i18n/lang.js',
  '/irrlichter/src/i18n/strings.js',
  '/irrlichter/src/data/levels.js',
  '/irrlichter/src/utils/MazeGen.js',
  '/irrlichter/src/scenes/BootScene.js',
  '/irrlichter/src/scenes/MenuScene.js',
  '/irrlichter/src/scenes/GameScene.js',
  '/irrlichter/src/scenes/GameOverScene.js',
  '/irrlichter/src/main.js',
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
