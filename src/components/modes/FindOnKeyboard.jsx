import { useState, useEffect } from 'react';
import { getStageNotes } from '../../data/stages';
import { playNote } from '../../audio/engine';
import { recordAnswer } from '../../store/progression';
import Keyboard from '../ui/Keyboard';
import MascotPeacock from '../ui/MascotPeacock';
import ProgressDots from '../ui/ProgressDots';

function pickNote(notes) {
  return notes[Math.floor(Math.random() * notes.length)];
}

export default function FindOnKeyboard({ stage }) {
  const notes = getStageNotes(stage);
  const [target, setTarget] = useState(() => pickNote(notes));
  const [highlights, setHighlights] = useState({});
  const [answered, setAnswered] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [round, setRound] = useState({ current: 0, correct: 0 });

  useEffect(() => { setHighlights({}); setAnswered(false); }, [target]);

  function handleNoteClick(note) {
    if (answered) return;
    const isCorrect = note.id === target.id;
    recordAnswer(stage, isCorrect);
    setAnswered(true);
    playNote(note.sargam);

    if (isCorrect) {
      setHighlights({ [note.id]: 'correct' });
      setBounce(true);
      setTimeout(() => setBounce(false), 600);
    } else {
      setHighlights({ [note.id]: 'wrong', [target.id]: 'correct' });
    }
    setRound(r => ({ current: r.current + 1, correct: r.correct + (isCorrect ? 1 : 0) }));
  }

  function next() {
    setTarget(pickNote(notes));
    setHighlights({});
    setAnswered(false);
  }

  const stageNoteIds = notes.map(n => n.id);

  return (
    <div className="mode mode--find">
      <MascotPeacock bounce={bounce} />
      <ProgressDots total={8} current={round.current % 8} correct={round.correct % 8} />

      <div className="target-display">
        <span className="target-display__emoji">{target.animal.emoji}</span>
        <span className="target-display__hindi">{target.hindi}</span>
        <span className="target-display__sargam">{target.sargam}</span>
        <p>Find this note on the keyboard</p>
      </div>

      <Keyboard
        activeNoteIds={stageNoteIds}
        highlights={highlights}
        disabledNoteIds={[]}
        onNoteClick={handleNoteClick}
      />

      {answered && (
        <div className={`feedback ${highlights[target.id] === 'correct' && !highlights[Object.keys(highlights).find(k => highlights[k] === 'wrong')] ? 'feedback--correct' : 'feedback--wrong'}`}>
          <button className="next-btn" onClick={next}>Next →</button>
        </div>
      )}
    </div>
  );
}
