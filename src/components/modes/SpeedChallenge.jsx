import { useState, useEffect, useRef, useCallback } from 'react';
import { getStageNotes } from '../../data/stages';
import { playNote } from '../../audio/engine';
import MascotPeacock from '../ui/MascotPeacock';

const DURATION = 60;

function pickQuestion(notes) {
  const correct = notes[Math.floor(Math.random() * notes.length)];
  const distractors = notes.filter(n => n.id !== correct.id)
    .sort(() => Math.random() - 0.5).slice(0, 3);
  return { correct, choices: [...distractors, correct].sort(() => Math.random() - 0.5) };
}

function getMultiplier(streak) {
  if (streak >= 20) return 5;
  if (streak >= 10) return 3;
  if (streak >= 5) return 2;
  return 1;
}

export default function SpeedChallenge({ stage }) {
  const notes = getStageNotes(stage);
  const [phase, setPhase] = useState('idle'); // idle | playing | done
  const [question, setQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [bounce, setBounce] = useState(false);
  const [personalBest, setPersonalBest] = useState(() => parseInt(localStorage.getItem('ss_speed_pb') || '0', 10));
  const timerRef = useRef(null);

  const advance = useCallback(() => {
    const q = pickQuestion(notes);
    setQuestion(q);
    playNote(q.correct.sargam);
  }, [notes]);

  useEffect(() => {
    if (phase === 'playing') {
      advance();
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            setPhase('done');
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [phase, advance]);

  function start() {
    setPhase('playing');
    setTimeLeft(DURATION);
    setScore(0); setStreak(0); setTotal(0); setCorrect(0);
  }

  function handleChoice(note) {
    if (!question) return;
    const isCorrect = note.id === question.correct.id;
    setTotal(t => t + 1);
    if (isCorrect) {
      const newStreak = streak + 1;
      const mult = getMultiplier(newStreak);
      setStreak(newStreak);
      setScore(s => s + mult);
      setCorrect(c => c + 1);
      setBounce(true);
      setTimeout(() => setBounce(false), 300);
    } else {
      setStreak(0);
    }
    advance();
  }

  useEffect(() => {
    if (phase === 'done' && score > personalBest) {
      setPersonalBest(score);
      localStorage.setItem('ss_speed_pb', String(score));
    }
  }, [phase, score, personalBest]);

  if (phase === 'idle') {
    return (
      <div className="mode mode--speed">
        <div className="speed-intro">
          <h2>⚡ Speed Challenge</h2>
          <p>60 seconds. Identify notes as fast as you can!</p>
          <p>Streak bonus: ×2 at 5, ×3 at 10, ×5 at 20</p>
          <p>Personal Best: {personalBest}</p>
          <button className="start-btn" onClick={start}>Start!</button>
        </div>
      </div>
    );
  }

  if (phase === 'done') {
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    const npm = total > 0 ? Math.round((correct / DURATION) * 60) : 0;
    return (
      <div className="mode mode--speed">
        <div className="speed-results">
          <h2>Time's up!</h2>
          <p>Score: {score} {score > personalBest ? '🏆 New Best!' : ''}</p>
          <p>Accuracy: {accuracy}%</p>
          <p>Notes/min: {npm}</p>
          <p>Personal Best: {personalBest}</p>
          <button className="start-btn" onClick={start}>Play Again</button>
        </div>
      </div>
    );
  }

  const mult = getMultiplier(streak);

  return (
    <div className="mode mode--speed">
      <MascotPeacock bounce={bounce} />
      <div className="speed-hud">
        <span className="speed-timer">{timeLeft}s</span>
        <span className="speed-score">Score: {score}</span>
        {mult > 1 && <span className="speed-mult">×{mult}</span>}
        <span className="speed-streak">Streak: {streak}</span>
      </div>

      {question && (
        <>
          <button className="play-btn" onClick={() => playNote(question.correct.sargam)}>▶ Replay</button>
          <div className="choices">
            {question.choices.map(note => (
              <button key={note.id} className="choice-btn" onClick={() => handleChoice(note)}>
                <span>{note.animal.emoji}</span>
                <span>{note.hindi}</span>
                <span>{note.sargam}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
