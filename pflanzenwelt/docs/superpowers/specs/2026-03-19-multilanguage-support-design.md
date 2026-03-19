# Multilanguage Support Design

## Goal

Add German / English language switching to the game portal and Pflanzenwelt game.

## Language Selection

- DE / EN toggle buttons in top-right of portal `index.html`
- Selection saved to `localStorage` key `pgame_lang`
- Defaults to `'de'` if not set
- No in-game switcher — change language from the portal only

## Architecture

### New files (loaded before all other game scripts)

**`pflanzenwelt/src/i18n/lang.js`**
Reads `pgame_lang` from localStorage, sets global `var LANG = 'de' | 'en'`.

**`pflanzenwelt/src/i18n/strings.js`**
All hardcoded UI strings from every scene, structured as:
```js
var STRINGS = {
  de: { ... },
  en: { ... }
};
```
Covers: StartScene instructions, QuizScene feedback ("Gefangen!", "Tschüss!"), CollectionScene labels, WinScene title/subtitle, button labels.

### Modified files

**`pflanzenwelt/src/data/creatures.js`**
Each creature gains a `nameEn` field. Scenes use `creature.name` for DE, `creature.nameEn` for EN.

**`pflanzenwelt/src/data/questions.js`**
Current questions renamed to `QUESTIONS_DE`. New `QUESTIONS_EN` block added with 45 English questions. `QUESTIONS_EN` entries **must use identical field names** to `QUESTIONS_DE` (`frage`, `optionen`, `antwort`) so `QuizScene` works without changes to its data access. English categories are `'Maths'`, `'English'`, `'General Knowledge'`. Bottom of file: `var QUESTIONS = LANG === 'en' ? QUESTIONS_EN : QUESTIONS_DE`.

**`pflanzenwelt/src/scenes/StartScene.js`**, **`QuizScene.js`**, **`CollectionScene.js`**, **`WinScene.js`**
All hardcoded strings replaced with `STRINGS[LANG].key` references. Notable specifics:
- `QuizScene` uses `creature.name` (line 27) — must become `LANG === 'en' ? creature.nameEn : creature.name`
- `QuizScene._correct()` and `_wrong()` have feedback strings inside tween callbacks — these must also be replaced
- `CollectionScene` displays `c.rarity` raw — rarity labels must come from `STRINGS[LANG].rarity[c.rarity]`

`STRINGS[LANG]` must include:
- All scene UI strings (titles, instructions, button labels, feedback)
- Category names used in `GameScene._startEncounter()`: `categories` array must be `STRINGS[LANG].categories` (e.g. `['Mathe','Deutsch','Allgemeinwissen']` for DE, `['Maths','English','General Knowledge']` for EN) so they match the question data
- Rarity labels: `{ common: '...', uncommon: '...', rare: '...' }`

**`pflanzenwelt/index.html`**
Load order: `lang.js` → `creatures.js` → `questions.js` → `strings.js` → scenes → `main.js`.
Set `<html lang="de">` dynamically via JS to match `LANG` on page load.

**`index.html` (portal)**
DE / EN buttons top-right. Clicking saves to `pgame_lang` and re-renders all translatable text in-place (no page reload). All translatable strings — heading, subtitle, card title/description, play button — are defined in a `PORTAL_STRINGS` JS object inline in the page:
```js
var PORTAL_STRINGS = {
  de: { heading: '🎮 Wilmas Vibe Coding Spielesammlung', subtitle: 'Wähle ein Spiel!', play: 'Spielen →', ... },
  en: { heading: '🎮 Wilma\'s Vibe Coding Game Collection', subtitle: 'Choose a game!', play: 'Play →', ... }
};
```
Elements that need re-rendering carry a `data-i18n` attribute keyed to `PORTAL_STRINGS`.

## English creature names

| DE | EN |
|----|----|
| Blättchen | Leafling |
| Mooskind | Mossy |
| Dornika | Thornia |
| Blumsel | Bloomlet |
| Rankbert | Tangleton |
| Pilzling | Shroomling |
| Baumgeist | Treespirit |
| Bisaknosp | Budling |

## English questions (45 total)

Categories: `'Maths'` (15), `'English'` (15), `'General Knowledge'` (15).
Grade 3–4 level, matching difficulty of the German set.
