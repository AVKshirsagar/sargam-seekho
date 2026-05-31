# Sargam Seekho — Claude Code Build Brief

## What This Is
An Indian classical music learning game for children aged 8–12.
Built with React + Tone.js, packaged with Electron → `.exe` (Windows) / `.dmg` (macOS).

The browser prototype (3 modes, synthetic audio) was built in claude.ai.
This Claude Code session builds the **production version**: all 5 stages, 6 game modes,
Tone.js harmonium synthesis, physical keyboard input, iPad touch support, and Electron packaging.

---

## Validated Architecture (DO NOT CHANGE WITHOUT ASKING)

### 5-Stage Progressive Curriculum

| Stage | Notes Added | Total | Ragas Unlocked | Unlock Condition |
|-------|-------------|-------|----------------|-----------------|
| 1 | Sa Re Ga Ma Pa Dha Ni (shuddha) | 7 | Bhupali, Durga | Default (open) |
| 2 | + tivra Ma (F#) | 8 | + Yaman, Bilaval | 80% accuracy / 20 questions in Stage 1 |
| 3 | + komal Re (Db), komal Dha (Ab) | 10 | + Bhairav, Poorvi | 80% / 20 in Stage 2 |
| 4 | + komal Ga (Eb), komal Ni (Bb) | 12 | + Kafi, Bhairavi, Khamaj, Todi, Marwa, Darbari, Malkauns | 80% / 20 in Stage 3 |
| 5 | All 12 notes × 3 octaves (Mandra, Madhya, Taara) | 36 | All advanced ragas + octave modes | 80% / 20 in Stage 4 |

### 6 Game Modes

| Mode | Description | Available From |
|------|-------------|---------------|
| `HearIdentify` | Play note → click its name (multiple choice) | Stage 1 |
| `FindOnKeyboard` | Note name shown → play it by touch or key press | Stage 1 |
| `AarohaAvaroha` | Hear sequence → drag notes into empty boxes in order | Stage 1 |
| `FillTheGap` | Scale plays with 1 silent gap → identify the missing swara | Stage 2 |
| `RagaExplorer` | Build a raga's aaroha + avaroha; free-play with raga notes only active | Stage 2 |
| `SpeedChallenge` | 60-second timed challenge from all unlocked notes | Stage 3 |

### Audio Architecture
- **Engine**: Tone.js (load from `unpkg.com/tone`)
- **Synthesis**: `Tone.AMSynth` for harmonium-like timbre (warm, sustained, reed-like)
- **Tuning**: Just intonation ratios from `resources/sargam_app_resource_pack.json` — NOT equal temperament
- **Tanpura drone**: `Tone.Part` loop: Sa + Pa (Pa = Sa × 3/2) + Sa-high cycle at ~72 BPM
- **Production audio**: Replace synthesis with real `.wav` samples (see `docs/audio-samples-guide.md`)

### Input System
- **Desktop**: Physical keyboard (`s r g m p d n` = shuddha, `R G D N` = komal, `M` = tivra Ma)
  - Detect: `navigator.maxTouchPoints === 0`
  - Show key labels on UI keyboard
- **iPad/Tablet**: Large touch targets on on-screen keyboard
  - Detect: `navigator.maxTouchPoints > 0`
  - Hide key labels

### Persistent Storage
- Use `localStorage` for Electron builds
- Track per-stage: `questionsAnswered`, `correctAnswers`, `unlocked` (boolean)

---

## Tech Stack

```
React 18          — UI framework
Tone.js 14.7.x    — Audio engine (AMSynth, Part, Transport)
Electron 28.x     — Desktop wrapper
electron-builder  — Packages to .exe / .dmg
localStorage      — Persist stage progress
```

All dependencies in `package.json`. Run `npm install` to start.

---

## File Structure to Build

```
sargam-seekho/
├── CLAUDE_CODE_BRIEF.md          ← YOU ARE HERE
├── package.json                  ← Dependencies + Electron build config
├── .gitignore
├── public/
│   ├── index.html
│   └── favicon.ico
├── electron/
│   ├── main.js                   ← Electron main process (scaffold provided)
│   └── preload.js                ← Context bridge
├── resources/
│   └── sargam_app_resource_pack.json  ← All note/raga/thaat data (DO NOT EDIT)
├── src/
│   ├── App.jsx                   ← Root component, stage routing
│   ├── index.js                  ← React entry point
│   ├── data/
│   │   ├── notes.js              ← Extracted note data (scaffold provided)
│   │   └── ragas.js              ← Extracted raga data (scaffold provided)
│   ├── audio/
│   │   └── ToneEngine.js         ← Audio engine (scaffold provided)
│   ├── store/
│   │   └── gameState.js          ← Stage progress, localStorage persistence (scaffold provided)
│   ├── components/
│   │   ├── StageMap.jsx          ← 5-stage unlock UI
│   │   ├── Keyboard.jsx          ← On-screen keyboard (touch + physical key bindings)
│   │   ├── TanpuraToggle.jsx     ← Start/stop tanpura drone
│   │   ├── ProgressBar.jsx       ← Round progress dots
│   │   ├── ResultsOverlay.jsx    ← End-of-round stars + feedback
│   │   └── modes/
│   │       ├── HearIdentify.jsx
│   │       ├── FindOnKeyboard.jsx
│   │       ├── AarohaAvaroha.jsx ← Drag-and-drop note sequencing
│   │       ├── FillTheGap.jsx
│   │       ├── RagaExplorer.jsx  ← Aaroha/avaroha builder + free-play canvas
│   │       └── SpeedChallenge.jsx
│   └── styles/
│       └── main.css
├── docs/
│   ├── audio-samples-guide.md    ← GitHub repos for real .wav samples
│   └── curriculum-architecture.md
└── audio-references/             ← Placeholder; submodule real repos here
```

---

## Build Commands

```bash
npm install               # Install all dependencies
npm start                 # React dev server (browser)
npm run electron-dev      # Electron + React (hot reload)
npm run dist:win          # Build Windows .exe → dist/
npm run dist:mac          # Build macOS .dmg → dist/
```

---

## Cultural Accuracy Notes (from resource pack + validation)

### Correct Animal Mnemonics (traditional Sangeet Parijat)
| Note | Animal | Emoji |
|------|--------|-------|
| Sa | Peacock (मोर) | 🦚 |
| Re | Bull (बैल) | 🐂 |
| Ga | Goat (बकरी) | 🐐 |
| Ma | Heron (क्रौंच) | 🦢 |
| Pa | Cuckoo (कोयल) | 🐦 |
| Dha | Horse (घोड़ा) | 🐎 |
| Ni | Elephant (हाथी) | 🐘 |

### Note Colors (traditional)
Sa=Green, Re=Red, Ga=Golden, Ma=White, Pa=Blue/Black, Dha=Yellow, Ni=Multi-colour

### Tuning
Use just intonation ratios. Do NOT use `2^(semitone/12)` equal temperament.
Ratios are in `resources/sargam_app_resource_pack.json` → `frequencyUtils.justIntonationRatios`.
Base Sa = 240 Hz (Madhya saptak). Mandra = 120 Hz. Taara = 480 Hz.

---

## Priority Build Order

1. `src/data/notes.js` + `src/data/ragas.js` — data layer first
2. `src/audio/ToneEngine.js` — audio before UI
3. `src/store/gameState.js` — state management
4. `src/components/Keyboard.jsx` — core shared component
5. `src/App.jsx` + `src/components/StageMap.jsx` — routing + unlock system
6. Game modes in order: HearIdentify → FindOnKeyboard → AarohaAvaroha → FillTheGap → RagaExplorer → SpeedChallenge
7. `electron/main.js` — Electron wrapper
8. `npm run dist:win` — final packaging

---

## Audio Samples to Integrate (Phase 2)
See `docs/audio-samples-guide.md` for the 4 priority repositories.
Key file to extract: `harmonium-kannan-orig.wav` from `DhakadG/web-harmonium`.
This is a real recorded harmonium sample, pitch-shifted across keys using Web Audio API.
