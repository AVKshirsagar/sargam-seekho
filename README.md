# Sargam Seekho — Indian Classical Music Learning Game

**Age:** 8–12 | **Distribution:** `.exe` (Windows) / `.dmg` (macOS) | **Audio:** Tone.js → real harmonium samples

A progressive ear-training game built on the full 10-thaat, 12-raga Hindustani system.
Children advance through 5 stages, unlocking chromatic notes and ragas as they demonstrate mastery.

---

## Quick Start (Development)

```bash
npm install
npm run dev              # Browser dev server at localhost:5173
npm run electron:dev     # Electron desktop window
```

## Build for Distribution

```bash
npm run dist             # → dist-app/Sargam Seekho Setup.exe + .dmg
npm run dist:win         # Windows only
npm run dist:mac         # macOS only
```

## Add Real Audio Samples (Phase 2)

```bash
bash scripts/download-samples.sh    # downloads harmonium .wav files
```

---

## 5-Stage Curriculum

| Stage | Notes | New This Stage | Ragas Unlocked |
|-------|-------|----------------|----------------|
| 1 | 7 | Sa Re Ga Ma Pa Dha Ni | Bhupali, Durga |
| 2 | 8 | + tivra Ma (M') | Yaman, Bilaval |
| 3 | 10 | + komal Re, komal Dha | Bhairav, Poorvi |
| 4 | 12 | + komal Ga, komal Ni | Kafi, Bhairavi, Khamaj, Darbari, Malkauns, Todi, Marwa |
| 5 | 36 | × 3 octaves (Mandra / Madhya / Taara) | All ragas, full difficulty |

**Unlock:** 80% accuracy over 20 questions per stage.

---

## Game Modes

1. **Hear & Identify** — Play note → select name (multiple choice)
2. **Find on Keyboard** — Name shown → find and play the note
3. **Aaroha / Avaroha** — Hear sequence → reconstruct by placing note tiles
4. **Fill the Gap** — Raga scale with one silent note → identify the gap
5. **Raga Explorer** — Ear training, free-play keyboard, raga builder (3 sub-modes)
6. **Speed Challenge** — 60-second timed run with streak multiplier

---

## Audio Sources

| Repo | What it provides |
|------|-----------------|
| `DhakadG/web-harmonium` | `harmonium-kannan-orig.wav` — real harmonium, root D4 |
| `devchauhann/harmoniumweb` | `harmonium.wav` — alternative harmonium sample |
| `MrAkbari91/web-harmonium` | Professional harmonium recordings + MIDI |
| `hemanth/sa-ri-ga-ma` | Indian notes via Web Audio API (original reference) |
| `MTG/saraga` | 108 HCM recordings for ML raga identification |

See `resources/audio-sources.md` for details and download instructions.

---

## Tech Stack

- **React 18 + Vite** — UI framework
- **Tone.js 14** — Audio synthesis (AMSynth harmonium timbre, just intonation tuning)
- **Electron 28** — Desktop packaging
- **electron-builder** — `.exe` / `.dmg` output
- **localStorage** — Stage progress persistence

## Key Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Full architecture spec for Claude Code |
| `resources/sargam_app_resource_pack.json` | Musical data source of truth |
| `src/data/notes.js` | All 12 notes + just intonation ratios + animals |
| `src/data/ragas.js` | 12 ragas with aaroha/avaroha + metadata |
| `src/data/thaats.js` | 10 Bhatkhande thaats |
| `src/data/stages.js` | Stage definitions + unlock conditions |

---

## Keyboard Map (Desktop)

| Key | Note |
|-----|------|
| s | Sa |
| r | Re |
| g | Ga |
| m | Ma |
| p | Pa |
| d | Dha |
| n | Ni |
| M | tivra Ma |
| R | komal Re |
| G | komal Ga |
| D | komal Dha |
| N | komal Ni |

iPad/tablet: touch-only mode, key labels hidden automatically.
