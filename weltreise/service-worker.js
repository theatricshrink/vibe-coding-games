var CACHE_NAME = 'weltreise-v4';
var CACHE_URLS = [
  '/weltreise/index.html',
  '/weltreise/src/i18n/lang.js',
  '/weltreise/src/utils/progress.js',
  '/weltreise/src/audio/sfx.js',
  '/weltreise/src/main.js',
  '/weltreise/src/data/europe.js',
  '/weltreise/src/data/africa.js',
  '/weltreise/src/data/asia.js',
  '/weltreise/src/data/americas.js',
  '/weltreise/src/data/oceania.js',
  '/weltreise/src/data/easy_questions.js',
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
  '/weltreise/assets/audio/anthems/austria.wav',
  '/weltreise/assets/audio/anthems/france.wav',
  '/weltreise/assets/audio/anthems/germany.wav',
  '/weltreise/assets/audio/anthems/italy.wav',
  '/weltreise/assets/audio/anthems/spain.wav',
  '/weltreise/assets/audio/anthems/egypt.wav',
  '/weltreise/assets/audio/anthems/kenya.wav',
  '/weltreise/assets/audio/anthems/morocco.wav',
  '/weltreise/assets/audio/anthems/nigeria.wav',
  '/weltreise/assets/audio/anthems/south_africa.wav',
  '/weltreise/assets/audio/anthems/china.wav',
  '/weltreise/assets/audio/anthems/india.wav',
  '/weltreise/assets/audio/anthems/japan.wav',
  '/weltreise/assets/audio/anthems/saudi_arabia.wav',
  '/weltreise/assets/audio/anthems/thailand.wav',
  '/weltreise/assets/audio/anthems/argentina.wav',
  '/weltreise/assets/audio/anthems/brazil.wav',
  '/weltreise/assets/audio/anthems/canada.wav',
  '/weltreise/assets/audio/anthems/mexico.wav',
  '/weltreise/assets/audio/anthems/usa.wav',
  '/weltreise/assets/audio/anthems/australia.wav',
  '/weltreise/assets/audio/anthems/fiji.wav',
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
  if (e.request.mode === 'navigate') return;
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      if (cached && !cached.redirected) return cached;
      return fetch(e.request);
    })
  );
});
