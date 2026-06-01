import * as Tone from 'tone';
import { noteFreq } from '../data/notes';

const droneReverb = new Tone.Reverb({ decay: 3.5, wet: 0.45 }).toDestination();

const droneSynth = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: 'triangle' },
  envelope: { attack: 0.8, decay: 0.1, sustain: 0.9, release: 2.0 },
  volume: -22,
}).connect(droneReverb);

export const tanpura = {
  part: null,

  async start() {
    await Tone.start();
    Tone.Transport.bpm.value = 55;
    this.part = new Tone.Sequence(
      (time, freq) => {
        droneSynth.triggerAttackRelease(freq, '1n', time, 0.04);
      },
      [noteFreq('Sa'), noteFreq('Pa'), noteFreq('Sa2'), noteFreq('Sa')],
      '1n'
    );
    this.part.start(0);
    Tone.Transport.start();
  },

  stop() {
    this.part?.stop();
    this.part?.dispose();
    this.part = null;
    Tone.Transport.stop();
  },

  get isPlaying() {
    return this.part !== null;
  },
};
