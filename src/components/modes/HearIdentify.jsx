import { useState, useEffect, useCallback } from 'react';
import { getStageNotes } from '../../data/stages';
import { playNote } from '../../audio/engine';
import { recordAnswer } from '../../store/progression';
import MascotPeacock from '../ui/MascotPeacock';
import ProgressDots from '../ui/ProgressDots';

function pickQuestion(notes) {
  const correct = notes[Math.floor(Math.random() * notes.length)];
  const distractors = notes.filter(n => n.id !== correct.id)
    .sort(() => Math.random() - 0.5).slice(0, 3);
  const choices = [...distractors, correct].sort(() => Math.random() - 0.5);
  return { correct, choices };
}

export default function HearIdentify({ stage }) {
  const notes = getStageNotes(stage);
  const [question, setQuestion] = useState(() => pickQuestion(notes));
  const [answered, setAnswered] = useState(null); // null | 'correct' | 'wrong'
  const [selected, setSelected] = useState(null);
  const [bounce, setBounce] = useState(false);
  const [round, setRound] = useState({ current: 0, correct: 0 });

  const playQuestion = useCallback(() => {
    playNote(question.correct.sargam);
  }, [question]);

  useEffect(() => { playQuestion(); }, [playQuestion]);

  function handleChoice(note) {
    if (answered) return;
    const isCorrect = note.id === question.correct.id;
    setSelected(note.id);
    setAnswered(isCorrect ? 'correct' : 'wrong');
    recordAnswer(stage, isCorrect);
    if (isCorrect) {
      setBounce(true);
      setTimeout(() => setBounce(false), 600);
    } else {
      playNote(question.correct.sargam);
    }
    setRound(r => ({ current: r.current + 1, correct: r.correct + (isCorrect ? 1 : 0) }));
  }

  function next() {
    setQuestion(pickQuestion(notes));
    setAnswered(null);
    setSelected(null);
  }

  return (
    <div className="mode mode--hear">
      <MascotPeacock bounce={bounce} />
      <ProgressDots total={8} current={round.current % 8} correct={round.correct % 8} />

      <button className="play-btn" onClick={playQuestion}>▶ Play Note</button>

      <div className="choices">
        {question.choices.map(note => {
          let cls = 'choice-btn';
          if (answered && note.id === question.correct.id) cls += ' choice-btn--correct';
          else if (answered && note.id === selected) cls += ' choice-btn--wrong';
          return (
            <button key={note.id} className={cls} onClick={() => handleChoice(note)}>
              <span>{note.animal.emoji}</span>
              <span>{note.hindi}</span>
              <span>{note.sargam}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`feedback ${answered === 'correct' ? 'feedback--correct' : 'feedback--wrong'}`}>
          {answered === 'correct' ? '✓ Correct!' : `✗ That was ${question.correct.sargam}`}
          <button className="next-btn" onClick={next}>Next →</button>
        </div>
      )}
    </div>
  );
}
