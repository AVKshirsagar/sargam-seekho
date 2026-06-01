import * as Tone from 'tone';
import { noteFreq } from '../data/notes';

const droneSynth = new Tone.PolySynth(Tone.AMSynth, { volume: -18 }).toDestination();

export const tanpura = {
  part: null,

  async start() {
    await Tone.start();
    Tone.Transport.bpm.value = 60;
    this.part = new Tone.Sequence(
      (time, freq) => {
        droneSynth.triggerAttackRelease(freq, '1n', time, 0.035);
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
