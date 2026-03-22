var CACHE_NAME = 'weltreise-v1';
var CACHE_URLS = [
  '/weltreise/',
  '/weltreise/index.html',
  '/weltreise/src/i18n/lang.js',
  '/weltreise/src/utils/progress.js',
  '/weltreise/src/audio/sfx.js',
  '/weltreise/main.js',
  '/weltreise/src/data/europe.js',
  '/weltreise/src/data/africa.js',
  '/weltreise/src/data/asia.js',
  '/weltreise/src/data/americas.js',
  '/weltreise/src/data/oceania.js',
  '/weltreise/src/scenes/BootScene.js',
  '/weltreise/src/scenes/MenuScene.js',
  '/weltreise/src/scenes/WorldMapScene.js',
  '/weltreise/src/scenes/LevelSelectScene.js',
  '/weltreise/src/scenes/GameScene.js',
  '/weltreise/src/scenes/QuestionScene.js',
  '/weltreise/src/scenes/GameOverScene.js',
  '/weltreise/src/scenes/WinScene.js',
  'https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js',
  '/weltreise/assets/backgrounds/austria.png',
  '/weltreise/assets/backgrounds/france.png',
  '/weltreise/assets/backgrounds/germany.png',
  '/weltreise/assets/backgrounds/italy.png',
  '/weltreise/assets/backgrounds/spain.png',
  '/weltreise/assets/backgrounds/egypt.png',
  '/weltreise/assets/backgrounds/kenya.png',
  '/weltreise/assets/backgrounds/morocco.png',
  '/weltreise/assets/backgrounds/nigeria.png',
  '/weltreise/assets/backgrounds/south_africa.png',
  '/weltreise/assets/backgrounds/china.png',
  '/weltreise/assets/backgrounds/india.png',
  '/weltreise/assets/backgrounds/japan.png',
  '/weltreise/assets/backgrounds/saudi_arabia.png',
  '/weltreise/assets/backgrounds/thailand.png',
  '/weltreise/assets/backgrounds/argentina.png',
  '/weltreise/assets/backgrounds/brazil.png',
  '/weltreise/assets/backgrounds/canada.png',
  '/weltreise/assets/backgrounds/mexico.png',
  '/weltreise/assets/backgrounds/usa.png',
  '/weltreise/assets/backgrounds/australia.png',
  '/weltreise/assets/backgrounds/fiji.png',
  '/weltreise/assets/backgrounds/new_zealand.png',
  '/weltreise/assets/audio/anthems/austria.mp3',
  '/weltreise/assets/audio/anthems/france.mp3',
  '/weltreise/assets/audio/anthems/germany.mp3',
  '/weltreise/assets/audio/anthems/italy.mp3',
  '/weltreise/assets/audio/anthems/spain.mp3',
  '/weltreise/assets/audio/anthems/egypt.mp3',
  '/weltreise/assets/audio/anthems/kenya.mp3',
  '/weltreise/assets/audio/anthems/morocco.mp3',
  '/weltreise/assets/audio/anthems/nigeria.mp3',
  '/weltreise/assets/audio/anthems/south_africa.mp3',
  '/weltreise/assets/audio/anthems/china.mp3',
  '/weltreise/assets/audio/anthems/india.mp3',
  '/weltreise/assets/audio/anthems/japan.mp3',
  '/weltreise/assets/audio/anthems/saudi_arabia.mp3',
  '/weltreise/assets/audio/anthems/thailand.mp3',
  '/weltreise/assets/audio/anthems/argentina.mp3',
  '/weltreise/assets/audio/anthems/brazil.mp3',
  '/weltreise/assets/audio/anthems/canada.mp3',
  '/weltreise/assets/audio/anthems/mexico.mp3',
  '/weltreise/assets/audio/anthems/usa.mp3',
  '/weltreise/assets/audio/anthems/australia.mp3',
  '/weltreise/assets/audio/anthems/fiji.mp3',
  '/weltreise/assets/audio/anthems/new_zealand.mp3'
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
  // Navigation requests: network first, fall back to cache for offline
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(function() {
      return caches.match(e.request);
    }));
    return;
  }
  // Assets: cache first
  e.respondWith(caches.match(e.request).then(function(cached) {
    return cached || fetch(e.request);
  }));
});
