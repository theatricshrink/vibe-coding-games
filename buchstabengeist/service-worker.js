var CACHE = 'buchstabengeist-v8';
var ASSETS = [
  '/buchstabengeist/',
  '/buchstabengeist/index.html',
  '/buchstabengeist/src/i18n/lang.js',
  '/buchstabengeist/src/i18n/strings.js',
  '/buchstabengeist/src/data/words.js',
  '/buchstabengeist/src/game/logic.js',
  '/buchstabengeist/src/audio/audio.js',
  '/buchstabengeist/src/scenes/BootScene.js',
  '/buchstabengeist/src/scenes/MenuScene.js',
  '/buchstabengeist/src/scenes/GameScene.js',
  '/buchstabengeist/src/scenes/GameOverScene.js',
  '/buchstabengeist/src/main.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  // For navigation requests, don't intercept if we can't guarantee a response —
  // a rejected respondWith() causes ERR_FAILED in the browser.
  if (e.request.mode === 'navigate') {
    e.respondWith(
      caches.match(e.request).then(function(r) {
        return r || fetch(e.request).catch(function() {
          // Network failed and nothing cached — let browser show its own error
          // rather than ERR_FAILED by returning a minimal fallback.
          return new Response('<!DOCTYPE html><title>Offline</title><p>Game unavailable offline.</p>', {
            headers: { 'Content-Type': 'text/html' }
          });
        });
      })
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(function(r) { return r || fetch(e.request); })
  );
});
