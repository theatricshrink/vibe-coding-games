# Morse Interceptor — Game Design Spec

## Concept
A Cold War spy-themed browser game that teaches morse code through immersive mission-based gameplay. The player is a signals operator intercepting and transmitting secret transmissions. Aesthetic: CRT terminal, green phosphor, shortwave radio, 1960s intelligence operation.

## Tech Stack
- Vanilla HTML/CSS/JS (single file) or React — your call based on complexity
- Web Audio API for all sound generation (no external audio assets needed)
- Web Vibration API for haptic feedback on mobile
- PWA wrapper (manifest + service worker) for offline support and add-to-homescreen

---

## Localisation (i18n)

### Supported Languages
- **English** (default)
- **German** (Deutsch)

### Language Selection
- Detected automatically from `navigator.language` on first load
- Manually overridable via a toggle in settings (EN / DE flag or label)
- Selection persisted in `localStorage`

### Implementation Approach
- All UI strings stored in a single `i18n.js` (or inline object) with `en` and `de` keys
- No external i18n library needed — a simple `t('key')` lookup function is sufficient
- Date/time formatting should use `Intl.DateTimeFormat` with the active locale

### Scope of Translation
Everything visible to the player is translated:

- All UI labels, button text, settings, menus
- Mission briefing flavour texts
- Achievement names and citation descriptions
- Commendations Board headings and locked/unlocked states
- Error messages and feedback text
- Morse reference chart labels
- Onboarding / tutorial text

### German-Specific Notes
- German strings are often longer than English — UI layouts must not break with ~30% longer text. Use flexible/wrapping containers, avoid fixed-width text boxes.
- Achievement names should feel authentically German, not just literally translated. Examples:
  - *Ghost Signal* → **Geistfrequenz** (Ghost Frequency)
  - *Iron Operator* → **Eiserner Funker** (Iron Radio Operator)
  - *Never Say Die* → **Niemals aufgeben** (Never Give Up)
  - *Night Watch* → **Nachtwache**
  - *Deep Cover* → **Undercover** (acceptable loan word) or **Im Verborgenen**
  - *First Contact* → **Erstkontakt**
  - *Full Spectrum* → **Volles Spektrum**
- Mission briefing texts should lean into the Cold War East/West German angle in the German locale — feels thematically native ("Eine Nachricht aus Ost-Berlin wurde abgefangen…")
- The word *Funker* (radio operator) is a great in-universe German term to use throughout

---

## Game Modes

### Decode Mode (Hear/See → Identify)
- A morse sequence plays as audio beeps AND flashes visually on screen
- Player must identify the correct letter
- Early levels: multiple choice answer selection (4 options)
- Later levels: free-text input
- Mobile: always use tap-to-select to avoid keyboard UX issues

### Encode Mode (See Letter → Tap Out)
- Player is shown a letter and must tap out the correct morse sequence
- Input via dual tap zones (see Input System below)
- A pause-to-confirm window auto-submits after the player stops tapping
- Built sequence is shown visually in real time as dots and dashes above the input zones

---

## Input System

### Mobile / Tablet (primary)
- Screen bottom half split into two large tap zones:
  - LEFT zone = dot (·)
  - RIGHT zone = dash (—)
- Short tap on either zone triggers the corresponding symbol
- Tapped symbols appear in a live display above the zones
- After ~900ms of inactivity, the sequence auto-confirms
- Haptic feedback: short vibration for dot, longer vibration for dash (Web Vibration API)
- Visual flash on each tap (zone briefly highlights)

### Desktop
- Spacebar short tap = dot
- Spacebar hold (>300ms) = dash
- Or: F key = dot, J key = dash (home row, both hands)
- Same pause-to-confirm timing applies
- Keyboard shortcut hints shown in UI

### Settings
- Adjustable confirm pause timing (600ms / 900ms / 1200ms) — framed as "operator sensitivity calibration"

---

## Audio

All audio generated via Web Audio API — no external files.

- Dot beep: ~80ms tone, 600Hz sine wave
- Dash beep: ~240ms tone, 600Hz sine wave
- Inter-symbol gap: ~80ms silence
- Correct answer SFX: short ascending two-tone chime
- Wrong answer SFX: low static burst
- Ambient background: low-volume shortwave radio static (generated noise, toggleable)
- All audio respects a master mute toggle

---

## Visual Design

- **Color palette**: near-black background (#040d08), phosphor green (#00ff88), dim green (#00aa55), amber (#ffaa00) for warnings, red (#ff3333) for errors
- **Fonts**: Share Tech Mono (monospace body), Oswald (display/headings) — both on Google Fonts
- **CRT effects**: CSS scanline overlay, vignette radial gradient, subtle flicker animation
- **Layout**: mobile-first, single column, vertically stacked panels
- **Panels**: dark background, green border, panel labels in small caps
- **Animations**: tap zone flash, signal pulse on incoming transmissions, letter unlock celebration

---

## Progression System

### Letter Unlocks
Letters introduced in waves, grouped by morse complexity:

| Wave | Letters | Reason |
|------|---------|--------|
| 1 | E, T | Single symbol (· and —) |
| 2 | A, N | Two symbols |
| 3 | I, M, S, O | Common, short |
| 4 | D, G, K, R, U, W | Three symbols |
| 5 | Full alphabet | All 26 letters |
| 6 | Numbers 0–9 | Five symbols each |

### Mission Structure
- Each mission has a briefing: short flavour text ("Agent, we've intercepted a transmission from East Berlin…")
- Mission names reference real Cold War operations (Operation Paperclip, Operation Mincemeat, etc.)
- Each mission focuses on a letter wave + review of previous waves
- Missions alternate: odd = decode, even = encode (or player can choose)

### Scoring & Feedback
- **Signal Strength meter**: degrades with wrong answers or slow responses, resets per mission
- **Accuracy %** tracked per session
- **Streak counter**: consecutive correct answers
- Stars per mission (1–3) based on accuracy + speed
- No harsh fail states — mistakes are educational, not punishing

---

## Morse Reference

Always available in-game as a toggleable overlay. Two display options:

1. **Alphabet grid**: all 26 letters with their morse code, highlighted as letters are unlocked
2. **Morse tree**: binary branching diagram (left = dot, right = dash), E and T at root — shows how operators actually navigate the code mentally

Advanced players can hide the reference to self-test.

---

## UI Structure (Screen Layout)

```
┌─────────────────────────────────┐
│  MORSE INTERCEPTOR    Score/Lives│  ← Header
│  CLASSIFIED // EYES ONLY        │
├─────────────────────────────────┤
│  MISSION BRIEFING PANEL         │  ← Context / flavour text
├─────────────────────────────────┤
│  TRANSMISSION DISPLAY           │  ← Flashing morse / letter prompt
│  [ · — · ]                      │
├─────────────────────────────────┤
│  INPUT DISPLAY                  │  ← Live dot/dash sequence building
│  [ · — ]                        │
├─────────────────────────────────┤
│  [   ·   DOT  ] [ DASH  —   ]  │  ← Dual tap zones (mobile)
└─────────────────────────────────┘
```

---

## PWA Requirements
- `manifest.json`: name, short_name, theme_color (#040d08), background_color, icons
- `service-worker.js`: cache-first strategy for offline play
- Installable on iOS and Android home screens

---

## Achievement System

### Commendations Board
A dedicated screen accessible from the main menu titled **"COMMENDATIONS // FIELD CITATIONS"**. Displays a grid of military medals and badges — locked ones shown as dark silhouettes with a classified stamp. Unlocked ones rendered in full color with a brief citation text below. A counter shows e.g. `7 / 18 CITATIONS AWARDED`.

On unlock, an overlay animation plays: the medal drops in from the top, spins once, lands with a metallic thud SFX, and a teletype-style message prints the citation text.

All achievements stored in `localStorage`.

---

### Achievement List

#### Performance Citations

| ID | Name | Condition | Badge Description |
|----|------|-----------|-------------------|
| `ghost_signal` | **Ghost Signal** | Complete any mission with 100% accuracy | Round silver medal, center shows a radio wave fading to silence. Ribbon: black and grey stripes. |
| `iron_operator` | **Iron Operator** | 5 missions in a row with zero errors | Hexagonal iron-grey badge, crossed telegraph keys in center. Ribbon: dark red with a single gold stripe. |
| `speed_of_light` | **Speed of Light** | Decode a letter in under 1 second | Circular gold medal, lightning bolt bisecting a dot and dash. Ribbon: electric blue with white edges. |
| `blitz` | **Blitz Transmission** | Complete a full encode mission in under 30 seconds | Shield shape, stopwatch overlaid on a fist. Ribbon: olive green with amber stripe. |
| `stone_cold` | **Stone Cold** | Unlock a full letter wave with no mistakes | Star-shaped medal, snowflake at center. Ribbon: icy white and steel blue. |
| `untouchable` | **Untouchable** | Reach a 20-answer correct streak | Circular bronze medal, laurel wreath border, number 20 at center. Ribbon: purple and gold. |

#### Progression Citations

| ID | Name | Condition | Badge Description |
|----|------|-----------|-------------------|
| `first_contact` | **First Contact** | Complete your first mission | Simple circular brass pin, single radio tower emitting waves. No ribbon — pinned directly, recruit style. |
| `full_spectrum` | **Full Spectrum** | Unlock all 26 letters | Large octagonal gold medal, full alphabet arranged in a circle around a morse key. Ribbon: tricolor green/black/green. |
| `numbers_game` | **Numbers Game** | Unlock all digits 0–9 | Square silver badge, binary 0 and 1 framing the number 10. Ribbon: dark grey with white pinstripe. |
| `veteran` | **Veteran Operator** | Complete 50 missions total | Large ornate medal, aged gold finish, eagle silhouette at top. Ribbon: deep navy with three gold stripes. |
| `centurion` | **Centurion** | Complete 100 missions total | Same design as Veteran but with a red enamel center and the Roman numeral C. Ribbon: crimson and gold. |

#### Hidden / Fun Citations

| ID | Name | Condition | Badge Description |
|----|------|-----------|-------------------|
| `sos` | **Mayday** | Tap SOS (··· — — — ···) manually anywhere in the game — easter egg, not part of a mission | Distress-red circular badge, SOS in bold morse dots/dashes around the rim, life preserver ring at center. Ribbon: red and white stripes. |
| `insomniac` | **Night Watch** | Play any mission after midnight local time | Dark navy badge, crescent moon over a glowing radio set. Ribbon: midnight blue with silver edges. |
| `stubborn` | **Never Say Die** | Fail the same letter 5 times then finally get it correct | Battered, dented bronze medal with a crack down the middle, repaired with a gold seam (kintsugi style). Ribbon: worn brown with frayed edges. |
| `the_hard_way` | **No Crutches** | Complete a mission with the morse reference chart hidden | Blindfolded operator silhouette on a dark green badge. Ribbon: forest green with black stripe. |
| `cryptophile` | **Deep Cover** | Accumulate 30 minutes of total playtime | Circular medal, hourglass at center, roman numerals around the edge. Ribbon: burgundy and silver. |
| `night_shift` | **Graveyard Shift** | Play on 3 different days after midnight | Same as Night Watch but with three stars added above the moon. Unlocks silently — no fanfare animation, just appears. |
| `perfect_run` | **Flawless Intercept** | Complete 3 missions back-to-back with 100% accuracy each | Large prestige medal, gold with a diamond center stone, ornate border. Ribbon: white with gold edges — clearly the rarest-looking badge in the collection. |

---

### Badge Visual Rendering
Render badges as SVG components so they scale crisply on all screen sizes and can be animated (spin, glow, shimmer on hover). Each badge has three states:
- **Locked**: desaturated silhouette, `opacity: 0.25`, "CLASSIFIED" red stamp overlay
- **Unlocked**: full color, subtle drop shadow, soft glow matching badge color
- **Hover**: slow rotation + increased glow, tooltip shows citation text and date earned

---

## Nice-to-Haves (if time allows)
- Two-player race mode: both players decode the same transmission, first correct answer wins
- "Interference" mechanic at higher levels: random static bursts obscure part of the signal
- Leaderboard using localStorage (no backend needed)
- Operator callsign: player picks a two-letter callsign at start, used in mission briefings
