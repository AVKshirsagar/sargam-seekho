import { useState } from 'react';
import { tanpura } from '../../audio/tanpura';

export default function TanpuraDrone() {
  const [playing, setPlaying] = useState(false);

  async function toggle() {
    if (playing) {
      tanpura.stop();
      setPlaying(false);
    } else {
      await tanpura.start();
      setPlaying(true);
    }
  }

  return (
    <button className={`tanpura-btn ${playing ? 'tanpura-btn--on' : ''}`} onClick={toggle}>
      🎵 Tanpura {playing ? 'On' : 'Off'}
    </button>
  );
}
