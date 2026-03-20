var CACHE = 'agentenfunk-v1';
var ASSETS = [
  '/agentenfunk/',
  '/agentenfunk/index.html',
  '/agentenfunk/src/i18n/lang.js',
  '/agentenfunk/src/i18n/strings.js',
  '/agentenfunk/src/data/morse.js',
  '/agentenfunk/src/data/missions.js',
  '/agentenfunk/src/data/achievements.js',
  '/agentenfunk/src/audio/audio.js',
  '/agentenfunk/src/input/input.js',
  '/agentenfunk/src/game/progression.js',
  '/agentenfunk/src/game/achievements-engine.js',
  '/agentenfunk/src/ui/router.js',
  '/agentenfunk/src/ui/morse-reference.js',
  '/agentenfunk/src/ui/badges.js',
  '/agentenfunk/src/screens/MenuScreen.js',
  '/agentenfunk/src/screens/MissionScreen.js',
  '/agentenfunk/src/screens/DecodeScreen.js',
  '/agentenfunk/src/screens/EncodeScreen.js',
  '/agentenfunk/src/screens/CommendationsScreen.js',
  '/agentenfunk/src/screens/SettingsScreen.js',
  '/agentenfunk/src/screens/CampaignEndScreen.js',
  '/agentenfunk/src/main.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE).then(function(cache) { return cache.addAll(ASSETS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  e.respondWith(caches.match(e.request).then(function(cached) {
    return cached || fetch(e.request);
  }));
});
