import * as Tone from 'tone';
import { noteFreq } from '../data/notes';

const harmonium = new Tone.AMSynth({
  harmonicity: 2,
  oscillator: { type: 'sine' },
  envelope: { attack: 0.05, decay: 0.2, sustain: 0.65, release: 1.4 },
  modulation: { type: 'sine' },
  modulationEnvelope: { attack: 0.1, decay: 0.2, sustain: 0.8, release: 0.6 },
  volume: -6,
}).toDestination();

export async function playNote(note, octave = 'madhya', duration = '2n') {
  await Tone.start();
  const freq = noteFreq(note, octave);
  harmonium.triggerAttackRelease(freq, duration);
}

export function stopAll() {
  harmonium.triggerRelease();
}
