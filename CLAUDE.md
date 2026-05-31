# CLAUDE.md — Sargam Seekho

**Indian Classical Music Learning Game** | Target: Kids 8–12 | Distribution: `.exe` / `.dmg`

This file was prepared in a Claude.ai planning session (2026-05-31). All architecture,
data, game mechanics, and audio decisions are fully specified below. Build from this file.

---

## Tech Stack

| Layer        | Choice                     | Reason                                      |
|--------------|----------------------------|---------------------------------------------|
| UI Framework | **React 18 + Vite**        | Do NOT use CRA (deprecated). Use Vite.      |
| Audio        | **Tone.js 14.x**           | AMSynth for harmonium timbre; just intonation |
| Desktop      | **Electron 28+**           | `.exe` (Windows) + `.dmg` (macOS) output    |
| Packaging    | **electron-builder 24+**   | contextIsolation: true, sandbox: true        |
| State        | React state + localStorage | No backend. All offline.                    |
| Styling      | CSS Modules or Tailwind    | Your choice; prefer CSS Modules for portability |

### Scaffold command
```bash
npm create vite@latest sargam-seekho -- --template react
cd sargam-seekho
npm install tone electron electron-builder concurrently wait-on
```

---

## 5-Stage Progressive Curriculum

Each stage unlocks when **80% accuracy over 20 questions** is achieved in the previous stage.
Progress is saved to `localStorage`. Stages are additive — each adds notes to the pool.

### Stage 1 — Shuddha Swaras (7 notes)
- Notes: `Sa Re Ga Ma Pa Dha Ni`
- Desktop keys: `s r g m p d n`
- Ragas available: Bhupali `S R G P D`, Durga `S R M P D`

### Stage 2 — + Tivra Ma (8 notes)
- Adds: tivra Ma (F#, semitone 6)
- Desktop key: `M` (uppercase)
- Ragas: + Yaman `S R G M' P D N`, Bilaval `S R G M P D N`

### Stage 3 — + Komal Re, Komal Dha (10 notes)
- Adds: komal Re (Db, semitone 1), komal Dha (Ab, semitone 8)
- Desktop keys: `R` (komal Re), `D` (komal Dha) — uppercase = komal
- Ragas: + Bhairav `S r G M P d N`, Poorvi `S r G M' P d N`

### Stage 4 — Full Chromatic (12 notes)
- Adds: komal Ga (Eb, semitone 3), komal Ni (Bb, semitone 10)
- Desktop keys: `G` (komal Ga), `N` (komal Ni)
- Ragas: + Kafi, Bhairavi, Khamaj, Darbari Kanada, Malkauns, Todi, Marwa

### Stage 5 — Three Saptaks (36 notes)
- All 12 notes × 3 octaves: Mandra (low, ×0.5), Madhya (mid, ×1), Taara (high, ×2)
- UI: octave toggle button (Mandra / Madhya / Taara) in top bar
- All 12 ragas active at full difficulty

---

## Keyboard Map (from resource pack — authoritative)

```
Shuddha (lowercase): s=Sa  r=Re  g=Ga  m=Ma  p=Pa  d=Dha  n=Ni
Komal   (uppercase): R=komal Re  G=komal Ga  D=komal Dha  N=komal Ni
Tivra   (uppercase): M=tivra Ma
Octave              : S=Sa (upper octave)
```

**iPad/tablet detection:** `navigator.maxTouchPoints > 0`
→ Hide all keyboard shortcut labels from UI; increase key touch targets to min 48px height.

---

## Audio Engine

### Tone.js Setup (harmonium timbre)

```javascript
// src/audio/engine.js
import * as Tone from 'tone';

const harmonium = new Tone.AMSynth({
  harmonicity: 2,
  oscillator: { type: 'sine' },
  envelope: { attack: 0.05, decay: 0.2, sustain: 0.65, release: 1.4 },
  modulation: { type: 'sine' },
  modulationEnvelope: { attack: 0.1, decay: 0.2, sustain: 0.8, release: 0.6 },
  volume: -6,
}).toDestination();

export function playNote(note, octave = 'madhya', duration = '2n') {
  Tone.start(); // required: must follow user gesture
  const f = noteFreq(note, octave);
  harmonium.triggerAttackRelease(f, duration);
}
```

### Just Intonation Frequencies (use these — NOT equal temperament)

```javascript
// src/data/notes.js — already scaffolded in this repo
const BASE_SA = 240; // Hz, standard reference

const RATIOS = {
  'Sa': 1/1, 'komal Re': 16/15, 'Re': 9/8, 'komal Ga': 6/5,
  'Ga': 5/4, 'Ma': 4/3, 'tivra Ma': 45/32, 'Pa': 3/2,
  'komal Dha': 8/5, 'Dha': 5/3, 'komal Ni': 9/5, 'Ni': 15/8, 'Sa2': 2/1,
};

export function noteFreq(note, octave = 'madhya') {
  const mult = { mandra: 0.5, madhya: 1, taara: 2 }[octave];
  return BASE_SA * RATIOS[note] * mult;
}
```

### Tanpura Drone (Sa + Pa + Sa' cycle)

```javascript
// src/audio/tanpura.js
import * as Tone from 'tone';
import { noteFreq } from '../data/notes';

const droneSynth = new Tone.PolySynth(Tone.AMSynth, { volume: -18 }).toDestination();

export const tanpura = {
  part: null,
  start() {
    Tone.start();
    Tone.Transport.bpm.value = 60;
    this.part = new Tone.Sequence((time, freq) => {
      droneSynth.triggerAttackRelease(freq, '1n', time, 0.035);
    }, [noteFreq('Sa'), noteFreq('Pa'), noteFreq('Sa2'), noteFreq('Sa')], '1n');
    this.part.start(0);
    Tone.Transport.start();
  },
  stop() {
    this.part?.stop();
    Tone.Transport.stop();
  },
};
```

---

## 6 Game Modes — Full Specifications

### Mode 1: Hear & Identify (all stages)
- Play one note via `playNote()`
- Show 4 multiple-choice buttons (from active stage note pool; 1 correct + 3 distractors)
- User clicks button OR presses keyboard key
- Correct → green flash, mascot bounce animation, +score
- Wrong → red flash, correct key highlighted, note re-played, explanation shown
- NO visual highlight on keyboard during the challenge (the highlight IS the answer)

### Mode 2: Find on Keyboard (all stages)
- Show note name: Devanagari + Roman (e.g., "म Ma")
- User finds and plays it on the on-screen keyboard or physical key
- Keyboard keys show key label on desktop, hide on touch
- After answer: highlight correct key (green). If wrong: show correct + wrong keys

### Mode 3: Aaroha / Avaroha (all stages)
- Generate N random notes WITHOUT repeats (sampling without replacement from active pool)
  - Stage 1–2: N=3 | Stage 3–4: N=4 | Stage 5: N=5
- Play audio sequence only — no text, no visual key hints during playback
- Show N empty answer boxes
- Show note tile tray: animal emoji + Devanagari + Roman per tile
- Click tile → selects it (plays its sound so student can compare)
- Click empty box → places selected tile there
- Click filled box → removes tile back to tray
- All boxes filled → "Check!" button appears
- On check: green/red per box; replay correct sequence; wrong boxes show correct note

### Mode 4: Fill the Gap (Stage 2+)
- Take a raga's aaroha/avaroha (e.g., Yaman: S R G M' P D N S')
- Play the full scale with ONE note replaced by silence (the "gap")
- Show scale visually as boxes: filled notes visible, gap shown as "?"
- 4 multiple-choice options (all from stage's note pool)
- After answer: play correct note, reveal name

### Mode 5: Raga Explorer (Stage 2+)
Three sub-modes selectable via tabs:

**5a — Ear Training:** Hear the raga's aaroha then avaroha. Identify each note in turn.

**5b — Free Play (Raga Keyboard):**
- Full keyboard displayed; only the raga's notes are active (coloured, clickable)
- Non-raga notes are greyed out (pointer-events: none)
- Pressing a greyed key plays a soft dissonant "vadi" sound + tooltip "Not in this raga"
- Active notes use the raga's characteristic colour from notes.js
- Tanpura drone auto-starts when entering Free Play

**5c — Build Mode:**
- Tile tray shows all notes for the stage
- Empty boxes for aaroha (ascending) and avaroha (descending) rows
- Student drags/clicks notes into correct positions
- "Check" compares against raga definition in ragas.js

### Mode 6: Speed Challenge (Stage 3+)
- 60-second countdown timer
- Rapid Hear & Identify from all active stage notes
- Streak multiplier: ×2 after 5 correct, ×3 after 10, ×5 after 20
- End screen: accuracy %, notes-per-minute, personal best (localStorage)
- No server — personal best only

---

## Animal Mnemonics (from resource pack — use exactly these)

| Note | Animal   | Emoji | Colour   | Devanagari |
|------|----------|-------|----------|------------|
| Sa   | Peacock  | 🦚    | Green    | सा         |
| Re   | Bull     | 🐂    | Red      | रे          |
| Ga   | Goat     | 🐐    | Golden   | गा          |
| Ma   | Heron    | 🦢    | White    | म          |
| Pa   | Cuckoo   | 🐦    | Blue     | प          |
| Dha  | Horse    | 🐎    | Yellow   | ध          |
| Ni   | Elephant | 🐘    | Multi    | नि          |

---

## Component Architecture

```
src/
├── App.jsx                        # Stage routing, global keyboard listener
├── components/
│   ├── ui/
│   │   ├── Keyboard.jsx           # On-screen keyboard (all 12 chromatic notes)
│   │   ├── NoteKey.jsx            # Single key: animal + Devanagari + Roman + key label
│   │   ├── TanpuraDrone.jsx       # Toggle drone on/off
│   │   ├── MascotPeacock.jsx      # Animated peacock, bounce on correct answer
│   │   ├── ProgressDots.jsx       # Round progress (8 dots per round)
│   │   └── StageMap.jsx           # Stage unlock overview screen
│   └── modes/
│       ├── HearIdentify.jsx
│       ├── FindOnKeyboard.jsx
│       ├── AarohaAvaroha.jsx      # Drag/click-to-box sequence
│       ├── FillTheGap.jsx
│       ├── RagaExplorer.jsx       # Tabbed: EarTraining | FreePlay | BuildMode
│       └── SpeedChallenge.jsx
├── audio/
│   ├── engine.js                  # Tone.js init, playNote(), stopAll()
│   └── tanpura.js                 # Drone sequence
├── data/
│   ├── notes.js                   # All 12 notes + just intonation ratios + animals
│   ├── ragas.js                   # 12 ragas with note arrays + metadata
│   ├── thaats.js                  # 10 Bhatkhande thaats
│   └── stages.js                  # Stage definitions + unlock conditions
├── store/
│   └── progression.js             # localStorage read/write, unlock logic
└── utils/
    └── keyboard.js                # window keydown handler, KEY_MAP
electron/
├── main.js                        # Electron main process
└── preload.js                     # contextBridge security layer
scripts/
└── download-samples.sh            # Fetch real .wav samples from open-source repos
resources/
└── sargam_app_resource_pack.json  # Source of truth for all musical data
```

---

## Progression Logic

```javascript
// src/store/progression.js
const KEYS = {
  stage: 'ss_stage',
  stats: 'ss_stats',   // { 1: {correct:0, total:0}, 2:..., ... }
  stars: 'ss_stars',
};

export function getStage() {
  return parseInt(localStorage.getItem(KEYS.stage) || '1');
}

export function recordAnswer(stage, correct) {
  const stats = JSON.parse(localStorage.getItem(KEYS.stats) || '{}');
  if (!stats[stage]) stats[stage] = { correct: 0, total: 0 };
  stats[stage].total += 1;
  if (correct) stats[stage].correct += 1;
  localStorage.setItem(KEYS.stats, JSON.stringify(stats));
  checkAndUnlock(stage, stats);
}

function checkAndUnlock(stage, stats) {
  const s = stats[stage];
  if (s.total >= 20 && s.correct / s.total >= 0.8) {
    const current = getStage();
    if (stage === current && current < 5) {
      localStorage.setItem(KEYS.stage, String(current + 1));
    }
  }
}
```

---

## Electron Setup

```javascript
// electron/main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  const win = new BrowserWindow({
    width: 1100, height: 800, minWidth: 800, minHeight: 600,
    title: 'Sargam Seekho',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
    },
  });
  isDev
    ? win.loadURL('http://localhost:5173')
    : win.loadFile(path.join(__dirname, '../dist/index.html'));
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
```

---

## Build Commands

```bash
npm install                   # install all dependencies
npm run dev                   # Vite dev server (browser)
npm run electron:dev          # Vite + Electron together (development)
npm run build                 # Vite production build
npm run dist                  # Build .exe (Windows) and .dmg (macOS)
```

### package.json scripts section:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "electron:dev": "concurrently \"vite\" \"wait-on http://localhost:5173 && electron .\"",
    "dist": "npm run build && electron-builder"
  },
  "build": {
    "appId": "com.sargamseeho.app",
    "productName": "Sargam Seekho",
    "directories": { "output": "dist-app" },
    "win": { "target": "nsis", "icon": "public/icon.ico" },
    "mac": { "target": "dmg", "icon": "public/icon.icns" },
    "files": ["dist/**", "electron/**", "public/**"]
  }
}
```

---

## Priority Build Order for Claude Code

1. `src/data/notes.js` — foundation; all other modules import from here
2. `src/audio/engine.js` + `src/audio/tanpura.js` — Tone.js setup
3. `src/utils/keyboard.js` — key event listener, touch detection
4. `src/components/ui/Keyboard.jsx` — on-screen keyboard (most reused component)
5. `src/store/progression.js` — stage unlock logic
6. `src/App.jsx` — stage routing, mode tabs
7. Mode 1: `HearIdentify.jsx`
8. Mode 2: `FindOnKeyboard.jsx`
9. Mode 3: `AarohaAvaroha.jsx`
10. Mode 5: `RagaExplorer.jsx` (with all 3 sub-modes)
11. Mode 4: `FillTheGap.jsx`
12. Mode 6: `SpeedChallenge.jsx`
13. `electron/main.js` + `electron/preload.js`
14. `electron-builder` config + test `.exe` build

---

## Audio Samples (Phase 2 — after synthesis works)

See `resources/audio-sources.md` for all GitHub repos.

Key repo for real harmonium WAV: `github.com/DhakadG/web-harmonium`
File: `harmonium-kannan-orig.wav` (loop root D4) — pitch-shift with Tone.Player for all notes.

```bash
# Run this to download real samples:
bash scripts/download-samples.sh
# Files land in public/audio/ (git-ignored)
```

---

## Important Notes for Claude Code

- Tone.js `AudioContext` requires a user gesture. Call `Tone.start()` inside a click handler.
- Use `import * as Tone from 'tone'` (not named imports for top-level objects).
- All game state in React + localStorage. No Redux needed.
- Touch detection: `const isTouch = navigator.maxTouchPoints > 0` (check once at app load).
- The `.wav` files in `public/audio/` are not committed to git (see `.gitignore`).
- Resource pack at `resources/sargam_app_resource_pack.json` is the musical data source of truth.
