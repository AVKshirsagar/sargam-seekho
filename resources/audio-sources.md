# Audio Sample Sources for Sargam Seekho

## Phase 1: Tone.js Synthesis (current)
AMSynth harmonium timbre — no real samples needed. Tuned to just intonation.

---

## Phase 2: Real Harmonium Samples (recommended for production)

### 1. DhakadG/web-harmonium ⭐ Best for samples
**URL:** https://github.com/DhakadG/web-harmonium  
**License:** Check repo (open source)  
**Key file:** `harmonium-kannan-orig.wav` — real recorded harmonium, loop root D4  
**Strategy:** Load with `Tone.Player`, pitch-shift for all 12 notes using `Tone.PitchShift`  
**Also includes:** `reverb.wav` (impulse response for convolution reverb)  

```bash
git clone https://github.com/DhakadG/web-harmonium.git /tmp/web-harmonium
cp /tmp/web-harmonium/harmonium-kannan-orig.wav public/audio/harmonium.wav
cp /tmp/web-harmonium/reverb.wav public/audio/reverb.wav
```

### 2. devchauhann/harmoniumweb
**URL:** https://github.com/devchauhann/harmoniumweb  
**License:** Open source  
**Key file:** `harmonium.wav` — real sampled Indian harmonium  
**Also includes:** `reverb.wav`  

```bash
git clone https://github.com/devchauhann/harmoniumweb.git /tmp/harmoniumweb
cp /tmp/harmoniumweb/harmonium.wav public/audio/harmonium-alt.wav
```

### 3. MrAkbari91/web-harmonium ⭐ Full app with professional samples
**URL:** https://github.com/MrAkbari91/web-harmonium  
**Tech:** Next.js + Web Audio API + MIDI support  
**Notes:** Professional harmonium recordings, dual Sargam/Western notation  
**Use for:** Reference implementation + audio quality benchmark  

### 4. hemanth/sa-ri-ga-ma (cited in resource pack)
**URL:** https://github.com/hemanth/sa-ri-ga-ma  
**Notes:** Indian Musical Notes using WebAudio APIs — original reference  

---

## Research / ML Datasets (for advanced raga identification features)

### 5. MTG/saraga
**URL:** https://github.com/MTG/saraga  
**Content:** 108 HCM recordings in 61 unique ragas, 43.6 hours  
**License:** Research use — check CompMusic terms  
**Use for:** Future ML raga identification module  

### 6. DAP-Lab/hindustani_raga_dataset_processing
**URL:** https://github.com/DAP-Lab/hindustani_raga_dataset_processing  
**Content:** Source-separated Hindustani raga audio, pitch contours  
**Use for:** Raga pattern analysis, future pitch detection feature  

### 7. ParampreetSingh97/PIM_v1_ExAI
**URL:** https://github.com/ParampreetSingh97/PIM_v1_ExAI  
**Content:** HCM dataset with 501 songs, 144 ragas, CNN-LSTM raga classifier  
**Use for:** Future "can you identify this raga?" game mode  

### 8. KushBhakkad/Raga-Identification
**URL:** https://github.com/KushBhakkad/Raga-Identification  
**Content:** Python ML pipeline for raga ID from audio, includes sample .wav files  
**Use for:** Backend raga identification feature  

---

## How to Use in Tone.js (Phase 2)

```javascript
// src/audio/samples.js
import * as Tone from 'tone';

const player = new Tone.Player('public/audio/harmonium.wav').toDestination();
const shifter = new Tone.PitchShift().toDestination();
player.connect(shifter);

// Root note is D4 (293.66 Hz). To play Sa (240 Hz):
// pitch shift = 12 * log2(240 / 293.66) = -3.5 semitones
export function playSampleNote(targetFreqHz) {
  const rootFreq = 293.66; // D4
  const semitones = 12 * Math.log2(targetFreqHz / rootFreq);
  shifter.pitch = semitones;
  player.start();
}
```

---

## Download Script

Run `bash scripts/download-samples.sh` to fetch all audio files automatically.
Files are placed in `public/audio/` which is git-ignored.
