import { useState, useEffect } from 'react';
import { getStageNotes, getStageDef } from '../../data/stages';
import { RAGAS } from '../../data/ragas';
import { playNote } from '../../audio/engine';
import { recordAnswer } from '../../store/progression';
import { ALL_TWELVE_NOTES } from '../../data/notes';
import MascotPeacock from '../ui/MascotPeacock';

function buildQuestion(stage, notes) {
  const def = getStageDef(stage);
  const available = RAGAS.filter(r => def.ragaNames.includes(r.name));
  const raga = available[Math.floor(Math.random() * available.length)];
  const scale = [...raga.aaroha];
  const gapIdx = Math.floor(Math.random() * scale.length);
  const correctNote = scale[gapIdx];
  const noteObj = ALL_TWELVE_NOTES.find(n => n.sargam === correctNote);

  const distractors = notes
    .filter(n => n.sargam !== correctNote)
    .sort(() => Math.random() - 0.5).slice(0, 3);
  const choices = [...distractors, noteObj].sort(() => Math.random() - 0.5);

  return { raga, scale, gapIdx, correctNote, noteObj, choices };
}

async function playGappedScale(scale, gapIdx, delay = 600) {
  for (let i = 0; i < scale.length; i++) {
    if (i !== gapIdx) {
      const noteObj = ALL_TWELVE_NOTES.find(n => n.sargam === scale[i]);
      if (noteObj) playNote(noteObj.sargam);
    }
    await new Promise(r => setTimeout(r, delay));
  }
}

export default function FillTheGap({ stage }) {
  const notes = getStageNotes(stage);
  const [question, setQuestion] = useState(() => buildQuestion(stage, notes));
  const [answered, setAnswered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [bounce, setBounce] = useState(false);

  useEffect(() => { playGappedScale(question.scale, question.gapIdx); }, [question]);

  function handleChoice(note) {
    if (answered) return;
    const isCorrect = note.sargam === question.correctNote;
    setSelected(note.id);
    setAnswered(isCorrect ? 'correct' : 'wrong');
    recordAnswer(stage, isCorrect);
    playNote(question.correctNote);
    if (isCorrect) {
      setBounce(true);
      setTimeout(() => setBounce(false), 600);
    }
  }

  function next() {
    setQuestion(buildQuestion(stage, notes));
    setAnswered(null);
    setSelected(null);
  }

  return (
    <div className="mode mode--gap">
      <MascotPeacock bounce={bounce} />

      <div className="gap-raga-name">{question.raga.name}</div>

      <div className="gap-scale">
        {question.scale.map((n, i) => (
          <div
            key={i}
            className={`gap-box ${i === question.gapIdx ? 'gap-box--gap' : ''} ${answered && i === question.gapIdx ? `gap-box--${answered}` : ''}`}
          >
            {i === question.gapIdx ? '?' : n}
          </div>
        ))}
      </div>

      <button className="play-btn" onClick={() => playGappedScale(question.scale, question.gapIdx)}>
        ▶ Play Scale
      </button>

      <div className="choices">
        {question.choices.map(note => {
          if (!note) return null;
          let cls = 'choice-btn';
          if (answered && note.sargam === question.correctNote) cls += ' choice-btn--correct';
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
        <button className="next-btn" onClick={next}>Next →</button>
      )}
    </div>
  );
}
