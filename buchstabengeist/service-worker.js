var CACHE = 'buchstabengeist-v1';
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
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) { return r || fetch(e.request); })
  );
});
