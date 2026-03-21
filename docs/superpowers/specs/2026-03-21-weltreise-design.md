# Weltreise — Game Design Spec

**Date:** 2026-03-21
**Status:** Approved
**Target age:** ~10 years
**Platform:** Browser + Mobile (PWA)
**Framework:** Phaser 3.60
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
- Player progress persisted in localStorage

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

### Background
- Parallax scenery styled to the country (landmarks, colors, architecture)
- Examples: Eiffel Tower skyline for France, pyramids for Egypt, Mount Fuji for Japan

### Background Music
- National anthem of the country as a short (~30s) looping audio clip
- 23 anthem audio files total (public domain)

### Enemies
- 1–2 enemy types culturally themed to the country
- Examples: beret-wearing character for France, sumo for Japan, mummy for Egypt
- Enemies walk back and forth on platforms

### Combat / Question Mechanic
1. Player jumps on top of enemy (stomp)
2. Enemy is stunned; question popup appears (multiple choice, 4 options)
3. **Correct answer:** star filled, enemy defeated, player continues
4. **Wrong answer:** enemy recovers, player shrinks (if big) or loses a life (if small)

### Star Meter
- 3–5 empty stars displayed at the top of the screen
- Each correct answer fills one star
- Exit door is locked until all stars are filled
- Stars are the primary win condition; jumping over enemies is possible but the door won't open

### Unavoidable Blockers
- 1–2 enemies placed on narrow platforms where jumping over is geometrically impossible
- Guarantees minimum question engagement regardless of player strategy

### Power-ups
- **Mushroom** (in question blocks, punched from below): player grows big; can take one hit before shrinking
- Question blocks are scattered through the level, Mario-style

---

## Controls

### Keyboard
- Arrow keys: move left / right
- Space or Up arrow: jump

### Mobile (Virtual D-Pad)
- Left side of screen: left / right movement buttons
- Right side of screen: large jump button (thumb-friendly)
- Rendered as Phaser UI overlay, not DOM elements

---

## Data Structure

Lives in `src/data/`, one file per continent:

```js
// europe.js
export const EUROPE = {
  id: 'europe',
  name: { de: 'Europa', en: 'Europe' },
  countries: [
    {
      id: 'austria',
      name: { de: 'Österreich', en: 'Austria' },
      anthem: 'assets/audio/anthems/austria.mp3',
      background: 'austria',
      enemyType: 'austria_enemy',
      questions: [
        {
          de: { q: 'Was ist die Hauptstadt von Österreich?', options: ['Wien', 'Graz', 'Salzburg', 'Linz'], answer: 0 },
          en: { q: 'What is the capital of Austria?', options: ['Vienna', 'Graz', 'Salzburg', 'Linz'], answer: 0 }
        },
        // ... 4 more questions
      ]
    },
    // ... more countries
  ]
};
```

Question pool is randomly shuffled per playthrough; no repeat questions within a session.

---

## Scene Architecture

```
BootScene
  └─ MenuScene
       └─ WorldMapScene
            └─ LevelSelectScene (per continent)
                 └─ GameScene (platformer)
                      └─ QuestionScene (modal overlay on stomp)
                           └─ (back to GameScene or WinScene)
```

- **BootScene**: preload global assets, detect language
- **MenuScene**: title screen, language toggle, continue/new game
- **WorldMapScene**: world map with continent selection, unlock state
- **LevelSelectScene**: country slots for a continent, shows completion stars
- **GameScene**: main platformer loop — player movement, enemies, platforms, star meter, exit door
- **QuestionScene**: fullscreen modal overlay — displays question, 4 answer buttons, feedback, returns to GameScene
- **WinScene**: level complete screen, shows score, button to next level or world map

---

## Tech Stack

- **Framework**: Phaser 3.60 (same as Pflanzenwelt)
- **Language**: Vanilla JavaScript ES5, no build tools
- **Audio**: Web Audio API for anthems; synthesized SFX for stomps, block hits, correct/wrong answers
- **Persistence**: localStorage — unlocked continents, unlocked levels, completion state
- **i18n**: DE/EN via `localStorage.pgame_lang` (same pattern as other games in this repo)
- **Testing**: Custom vanilla test framework (same as Agentenfunk/Pflanzenwelt)
- **Offline**: Service worker for PWA caching

---

## Portal Integration

Added to `/index.html` game grid with:
- Browser support badge
- Mobile support badge
- Game card with title "Weltreise" and short description

---

## Out of Scope (v1)

- Antarctica
- Split North/South Americas (treated as one continent)
- Timer-based pressure mechanics
- Multiplayer
- User accounts / cloud save
- Enemy animations beyond basic walk cycle
- More than 2 enemy types per level
