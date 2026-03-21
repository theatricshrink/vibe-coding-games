# Weltreise — Game Design Spec

**Date:** 2026-03-21
**Status:** Approved
**Target age:** ~10 years
**Platform:** Browser + Mobile (PWA)
**Framework:** Phaser 3.60
**Canvas size:** 960×720 (matches Pflanzenwelt)
**Folder:** `/weltreise/`

---

## Concept

A Mario-style 2D platformer where the player travels the world continent by continent. Each level belongs to one specific country: the background is themed to that country's landmarks, the background music is its national anthem, and enemies are culturally themed characters. Stomping an enemy triggers a geography question about that country. The game teaches world geography through exploration and play.

---

## Overworld Map

- A stylized world map showing 5 continents as selectable worlds
- Continents unlock sequentially (Europe → Africa → Asia → Americas → Oceania)
- Each continent shows a level select screen with 3–5 country slots
- Country levels unlock one by one within a continent (complete level N to unlock N+1)
- Completing all levels in a continent unlocks the next continent on the world map
- Player progress persisted in localStorage under the `weltreise_` key namespace (e.g. `weltreise_progress`)

---

## Continents & Countries

| Continent | Countries |
|-----------|-----------|
| Europe | Austria, France, Germany, Italy, Spain |
| Africa | Egypt, Kenya, Morocco, Nigeria, South Africa |
| Asia | China, India, Japan, Saudi Arabia, Thailand |
| Americas | Argentina, Brazil, Canada, Mexico, USA |
| Oceania | Australia, Fiji, New Zealand |

**Total:** 23 levels, 23 national anthems, ~115 questions (5 per country).

---

## Level Structure

Each level contains:

### Canvas & Background
- Phaser canvas: **960×720** (same as Pflanzenwelt)
- A single static background image per country (no parallax in v1 — can be added later)
- Background image size: **960×720 PNG** (full canvas fill, no gaps)
- Styled to show a recognisable landmark or characteristic scenery for that country
- Examples: Eiffel Tower skyline for France, pyramids for Egypt, Mount Fuji for Japan

### Background Music
- National anthem of the country as a short (~30s) looping audio clip
- Source: Wikimedia Commons public-domain recordings (instrument-only where available)
- Target file size: ≤150KB per file (MP3, mono, 64kbps)
- 23 anthem audio files total; all listed in the service worker cache manifest
- **iOS audio unlock:** the Phaser game config includes `AudioContext` unlock on first user gesture (tap/click), identical to the pattern in Agentenfunk's `main.js`. This ensures anthems and SFX play on iOS Safari
- **Fallback**: if an anthem file fails to load, the level plays in silence — no blocking error

### Enemies
- Each level contains **6–8 enemies** total, ensuring 5 correct answers are always achievable
- 1–2 enemy types culturally themed to the country
- Enemies must use respectful, non-caricature designs — no ethnic or racial stereotypes
- Preferred approach: theme enemies to a well-known symbol, animal, or landmark rather than a person
- Safe examples: a baguette character for France, a cherry blossom sprite for Japan, a football for Brazil, a camel for Egypt, a lederhosen hiker for Austria
- All 23 enemy concepts must be reviewed for cultural sensitivity before art production
- Enemies walk back and forth on platforms

### Combat / Question Mechanic
1. Player jumps on top of enemy (stomp)
2. GameScene pauses; QuestionScene launches as overlay
3. Question popup appears (multiple choice, 4 options)
4. **Correct answer:** QuestionScene stops, GameScene resumes; hit result (correct) applied immediately — star filled, enemy removed
5. **Wrong answer:** QuestionScene stops, GameScene resumes; hit result (wrong) applied immediately as a deferred effect — enemy recovers and resumes walking; player shrinks (if big) or loses a life (if small). The hit cannot be dodged.

**Re-stomp rule:** A recovered enemy can be stomped again. On the second stomp, the next unused question from the pool is shown. A single enemy can only yield one star — once it awards a star it is permanently removed. This prevents star farming while allowing retry on wrong answers.

### QuestionScene Communication
Sequence (matches Pflanzenwelt's exact launch/pause/resume order):
1. `GameScene` calls `this.scene.launch('QuestionScene', { question, enemyId, onResult: fn })`
2. `GameScene` immediately calls `this.scene.pause('GameScene')` (launch first, then pause)
3. `QuestionScene` renders as overlay; player selects answer
4. `QuestionScene` calls `this.scene.stop()`, then `this.scene.resume('GameScene')`, then calls `onResult(correct)`
5. `GameScene` applies the deferred result synchronously inside `onResult` — no resume event listener needed; GameScene is already resumed at the point `onResult` fires

### Star Meter & Win Condition
- Each level has exactly **5 questions** in its question pool and requires **5 correct answers** (5 stars) to open the exit door
- 5 empty stars are displayed at the top of the screen; each correct answer fills one star
- Exit door is locked until all 5 stars are filled
- Questions are drawn from a shuffled pool; no question repeats within a playthrough of a level
- With 6–8 enemies per level, there are always enough stomping opportunities to reach 5 stars
- **Exit door placement:** the exit door is at the far right end of the level (standard Mario convention). The path from the last platform to the door is always clear — no enemies block the final approach. Once stars are filled, the player simply runs right to exit.

### Unavoidable Blockers
- 1–2 enemies placed on narrow platforms where jumping over is geometrically impossible
- Guarantees minimum question engagement regardless of player strategy

### Power-ups
- **Mushroom** (in question blocks, punched from below): player grows big; can take one hit before shrinking
- Question blocks are scattered through the level, Mario-style

### Lives System
- Player starts each level with **3 lives**
- Losing a life: when small and hit by an enemy (including after a wrong answer)
- **0 lives remaining:** GameScene stops, `GameOverScene` launches — shows "Game Over", option to retry the level or return to level select
- Lives reset to 3 at the start of each new level attempt

---

## Controls

### Keyboard
- Arrow keys: move left / right
- Space or Up arrow: jump

### Mobile (Virtual D-Pad)
- Left side of screen: left / right movement buttons
- Right side of screen: large jump button (thumb-friendly)
- Rendered as Phaser UI overlay (GameObjects, not DOM elements)
- **During question popup:** virtual d-pad is hidden (`visible = false`) until the question is dismissed

---

## Data Structure

Lives in `/weltreise/src/data/`, one file per continent. Files use plain `var` globals (no ES modules), consistent with both existing games. Source files are UTF-8; diacritics (ä, ö, ü, é, etc.) are safe to use directly:

```js
// /weltreise/src/data/europe.js
var EUROPE = {
  id: 'europe',
  name: { de: 'Europa', en: 'Europe' },
  countries: [
    {
      id: 'austria',
      name: { de: 'Österreich', en: 'Austria' },
      anthem: 'assets/audio/anthems/austria.mp3',
      background: 'assets/backgrounds/austria.png',
      enemyType: 'austria_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Österreich?', options: ['Wien', 'Graz', 'Salzburg', 'Linz'], answer: 0 },
          en: { q: 'What is the capital of Austria?', options: ['Vienna', 'Graz', 'Salzburg', 'Linz'], answer: 0 }
        }
        // 4 more questions
      ]
    }
    // more countries...
  ]
};
```

Question pool is randomly shuffled per playthrough; no repeat questions within a session.

---

## Language Detection

Language is detected **before Phaser initialises**, in a standalone `lang.js` loaded as the first `<script>` tag in `index.html`. It reads `localStorage.pgame_lang`, falls back to `navigator.language`, and sets a global `var LANG`. This matches the pattern used by Pflanzenwelt and Agentenfunk. Phaser scenes read `LANG` directly — no language detection inside scenes.

---

## Scene Architecture

```
BootScene              — preload global assets (uses LANG already set by lang.js)
MenuScene              — title screen, language toggle, continue/new game
WorldMapScene          — world map, continent selection, unlock state
LevelSelectScene       — country slots for selected continent, completion stars
GameScene              — main platformer loop
  ├─ QuestionScene     — launched as overlay when enemy stomped; pauses GameScene
  ├─ GameOverScene     — launched by GameScene on 0 lives; retry or level select
  └─ WinScene          — launched by GameScene on all stars filled + exit reached
```

### Scene Management for Question Popup
When the player stomps an enemy:
1. `GameScene` stores the pending enemy stun state
2. `GameScene` calls `this.scene.launch('QuestionScene', { question, enemyId, onResult: fn })`
3. `GameScene` immediately calls `this.scene.pause('GameScene')` (launch before pause — same order as Pflanzenwelt)
4. `QuestionScene` renders as a fullscreen overlay above the paused `GameScene`
5. On answer: `QuestionScene` calls `this.scene.stop()`, then `this.scene.resume('GameScene')`, then calls `onResult(correct/false)`
6. `GameScene` applies the result synchronously in `onResult` — no resume event listener required

---

## PWA & Offline

- `manifest.json` in `/weltreise/` root — PWA install metadata (name, icons, display: standalone)
- `service-worker.js` in `/weltreise/` root — registered in `index.html` on `DOMContentLoaded`
- Cache manifest includes: all JS, CSS, background PNGs (23), anthem MP3s (23), sprite sheets, and `index.html`
- Follows the same registration pattern as Agentenfunk's service worker

---

## Tech Stack

- **Framework**: Phaser 3.60 (same as Pflanzenwelt)
- **Language**: Vanilla JavaScript, `var`-based globals, no ES6 modules, no build tools — consistent with both existing games
- **Script loading**: plain `<script src="...">` tags in `index.html`, UTF-8 charset declared. Required load order:
  1. `lang.js` (sets global `LANG` before anything reads it)
  2. Phaser 3.60 (must load before any scene file — scenes call Phaser APIs at parse time)
  3. Data files (`src/data/europe.js`, `africa.js`, … — read `LANG`, must load before scenes)
  4. Scene files (`src/scenes/BootScene.js`, `MenuScene.js`, … — depend on Phaser + data)
  5. `src/main.js` (creates Phaser.Game — must come last)
- **Audio**: Phaser sound system for anthems (MP3); synthesized SFX via Web Audio API for stomps, block hits, correct/wrong answers; iOS AudioContext unlock on first gesture
- **Persistence**: localStorage with `weltreise_` key namespace
- **i18n**: DE/EN via global `LANG` set by `lang.js` reading `localStorage.pgame_lang`
- **Testing**: Custom vanilla test framework (same as Agentenfunk/Pflanzenwelt)
- **Offline**: Service worker + manifest.json for PWA

---

## Portal Integration

Added to `/index.html` game grid with:
- Browser support badge
- Mobile support badge
- Game card with bilingual title and description, following the exact pattern of the existing cards:
  - Add `wtTitle` and `wtDesc` keys to both the `de` and `en` strings objects in `index.html`
  - DE: title `'Weltreise'`, description e.g. `'Bereise die Welt und lerne Geografie!'`
  - EN: title `'World Tour'`, description e.g. `'Travel the world and learn geography!'`
  - Add corresponding `document.getElementById('card-wt-title')` etc. calls in the `render()` function
  - Card HTML follows the same structure as the Pflanzenwelt and Agentenfunk cards

---

## Out of Scope (v1)

- Antarctica
- Split North/South Americas (treated as one continent)
- Parallax backgrounds (single static image per country in v1)
- Timer-based pressure mechanics
- Multiplayer
- User accounts / cloud save
- Enemy animations beyond basic walk cycle
- More than 2 enemy types per level
