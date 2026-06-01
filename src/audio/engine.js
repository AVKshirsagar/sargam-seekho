import * as Tone from 'tone';
import { noteFreq } from '../data/notes';

const reverb = new Tone.Reverb({ decay: 2.0, wet: 0.25 }).toDestination();

const sampler = new Tone.Sampler({
  urls: {
    A2: 'A2.mp3',  A3: 'A3.mp3',  A4: 'A4.mp3',
    'A#2': 'As2.mp3', 'A#3': 'As3.mp3', 'A#4': 'As4.mp3',
    B2: 'B2.mp3',  B3: 'B3.mp3',  B4: 'B4.mp3',
    C3: 'C3.mp3',  C4: 'C4.mp3',  C5: 'C5.mp3',
    'C#3': 'Cs3.mp3', 'C#4': 'Cs4.mp3', 'C#5': 'Cs5.mp3',
    D3: 'D3.mp3',  D4: 'D4.mp3',  D5: 'D5.mp3',
    'D#3': 'Ds3.mp3', 'D#4': 'Ds4.mp3',
    E3: 'E3.mp3',  E4: 'E4.mp3',
    F3: 'F3.mp3',  F4: 'F4.mp3',
    'F#3': 'Fs3.mp3',
    G3: 'G3.mp3',  G4: 'G4.mp3',
    'G#3': 'Gs3.mp3', 'G#4': 'Gs4.mp3',
  },
  baseUrl: 'https://cdn.jsdelivr.net/npm/tonejs-instrument-harmonium-mp3/',
  release: 1.2,
}).connect(reverb);

// Export a promise that resolves when all samples have loaded
export const samplerLoaded = Tone.loaded();

export async function playNote(note, octave = 'madhya', duration = '2n') {
  await Tone.start();
  if (!sampler.loaded) return;
  const freq = noteFreq(note, octave);
  sampler.triggerAttackRelease(freq, duration);
}

export function stopAll() {
  sampler.releaseAll();
}
