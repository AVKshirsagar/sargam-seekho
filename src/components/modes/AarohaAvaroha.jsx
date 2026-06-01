import { useState, useEffect } from 'react';
import { getStageNotes, getStageDef } from '../../data/stages';
import { playNote } from '../../audio/engine';
import { recordAnswer } from '../../store/progression';
import MascotPeacock from '../ui/MascotPeacock';

function buildSequence(notes, length) {
  const shuffled = [...notes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, length);
}

async function playSequence(notes, delay = 700) {
  for (const note of notes) {
    playNote(note.sargam);
    await new Promise(r => setTimeout(r, delay));
  }
}

export default function AarohaAvaroha({ stage }) {
  const notes = getStageNotes(stage);
  const def = getStageDef(stage);
  const seqLen = def.sequenceLength;

  const [sequence, setSequence] = useState(() => buildSequence(notes, seqLen));
  const [boxes, setBoxes] = useState(Array(seqLen).fill(null));
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => { handlePlay(); }, [sequence]);

  async function handlePlay() {
    setPlaying(true);
    await playSequence(sequence);
    setPlaying(false);
  }

  function selectTile(note) {
    setSelected(note.id === selected ? null : note.id);
    playNote(note.sargam);
  }

  function placeInBox(idx) {
    if (!selected || checked) return;
    const note = notes.find(n => n.id === selected);
    if (!note) return;
    const newBoxes = [...boxes];
    // Return existing note in that box to tray
    newBoxes[idx] = note;
    setBoxes(newBoxes);
    setSelected(null);
  }

  function removeFromBox(idx) {
    if (checked) return;
    const newBoxes = [...boxes];
    newBoxes[idx] = null;
    setBoxes(newBoxes);
  }

  function check() {
    setChecked(true);
    const allCorrect = sequence.every((n, i) => boxes[i]?.id === n.id);
    recordAnswer(stage, allCorrect);
    if (allCorrect) {
      setBounce(true);
      setTimeout(() => setBounce(false), 600);
    }
    playSequence(sequence, 600);
  }

  function reset() {
    setSequence(buildSequence(notes, seqLen));
    setBoxes(Array(seqLen).fill(null));
    setSelected(null);
    setChecked(false);
  }

  const placed = boxes.filter(Boolean);
  const trayNotes = notes.filter(n => !boxes.find(b => b?.id === n.id));
  const allFilled = boxes.every(Boolean);

  return (
    <div className="mode mode--aaroha">
      <MascotPeacock bounce={bounce} />

      <button className="play-btn" onClick={handlePlay} disabled={playing}>
        {playing ? '♪ Playing…' : '▶ Play Sequence'}
      </button>

      <div className="answer-boxes">
        {boxes.map((note, i) => (
          <div
            key={i}
            className={[
              'answer-box',
              note ? 'answer-box--filled' : '',
              checked && note ? (note.id === sequence[i].id ? 'answer-box--correct' : 'answer-box--wrong') : '',
            ].filter(Boolean).join(' ')}
            onClick={() => note ? removeFromBox(i) : placeInBox(i)}
          >
            {note ? (
              <>
                <span>{note.animal.emoji}</span>
                <span>{note.sargam}</span>
                {checked && note.id !== sequence[i].id && (
                  <span className="answer-box__correct-label">{sequence[i].sargam}</span>
                )}
              </>
            ) : (
              <span className="answer-box__empty">{i + 1}</span>
            )}
          </div>
        ))}
      </div>

      <div className="tile-tray">
        {trayNotes.map(note => (
          <button
            key={note.id}
            className={`tile ${selected === note.id ? 'tile--selected' : ''}`}
            onClick={() => selectTile(note)}
          >
            <span>{note.animal.emoji}</span>
            <span>{note.hindi}</span>
            <span>{note.sargam}</span>
          </button>
        ))}
      </div>

      {allFilled && !checked && (
        <button className="check-btn" onClick={check}>Check!</button>
      )}

      {checked && (
        <button className="next-btn" onClick={reset}>Try Again →</button>
      )}
    </div>
  );
}
