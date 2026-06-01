import { useState } from 'react';
import { RAGAS } from '../../data/ragas';
import { getStageDef } from '../../data/stages';
import { ALL_TWELVE_NOTES } from '../../data/notes';
import { playNote } from '../../audio/engine';
import { tanpura } from '../../audio/tanpura';
import Keyboard from '../ui/Keyboard';

async function playScale(noteNames, delay = 500) {
  for (const name of noteNames) {
    const n = ALL_TWELVE_NOTES.find(x => x.sargam === name);
    if (n) playNote(n.sargam);
    await new Promise(r => setTimeout(r, delay));
  }
}

export default function RagaExplorer({ stage }) {
  const def = getStageDef(stage);
  const ragas = RAGAS.filter(r => def.ragaNames.includes(r.name));
  const [tab, setTab] = useState('ear');
  const [selectedRaga, setSelectedRaga] = useState(ragas[0]);
  const [droneOn, setDroneOn] = useState(false);
  const [buildAaroha, setBuildAaroha] = useState([]);
  const [buildAvaroha, setBuildAvaroha] = useState([]);
  const [buildChecked, setBuildChecked] = useState(false);

  const ragaNoteIds = selectedRaga.notes.map(n => {
    const obj = ALL_TWELVE_NOTES.find(x => x.sargam === n);
    return obj?.id;
  }).filter(Boolean);

  const allNoteIds = ALL_TWELVE_NOTES.map(n => n.id);
  const disabledIds = allNoteIds.filter(id => !ragaNoteIds.includes(id));

  async function toggleDrone() {
    if (droneOn) { tanpura.stop(); setDroneOn(false); }
    else { await tanpura.start(); setDroneOn(true); }
  }

  function handleFreePlayClick(note) {
    if (ragaNoteIds.includes(note.id)) {
      playNote(note.sargam);
    }
  }

  function addToBuild(noteId, row) {
    const note = ALL_TWELVE_NOTES.find(n => n.id === noteId);
    if (!note) return;
    if (row === 'aaroha') setBuildAaroha(a => [...a, note.sargam]);
    else setBuildAvaroha(a => [...a, note.sargam]);
  }

  function checkBuild() {
    setBuildChecked(true);
  }

  function resetBuild() {
    setBuildAaroha([]); setBuildAvaroha([]); setBuildChecked(false);
  }

  return (
    <div className="mode mode--raga">
      <div className="raga-selector">
        {ragas.map(r => (
          <button
            key={r.name}
            className={`raga-btn ${selectedRaga.name === r.name ? 'raga-btn--active' : ''}`}
            onClick={() => { setSelectedRaga(r); resetBuild(); }}
          >
            {r.name}
          </button>
        ))}
      </div>

      <div className="raga-info">
        <strong>{selectedRaga.name}</strong> — {selectedRaga.character}
        <span className="raga-time">{selectedRaga.time}</span>
      </div>

      <div className="sub-tabs">
        {['ear', 'free', 'build'].map(t => (
          <button key={t} className={`sub-tab ${tab === t ? 'sub-tab--active' : ''}`} onClick={() => setTab(t)}>
            {t === 'ear' ? 'Ear Training' : t === 'free' ? 'Free Play' : 'Build Mode'}
          </button>
        ))}
      </div>

      {tab === 'ear' && (
        <div className="raga-ear">
          <button className="play-btn" onClick={() => playScale(selectedRaga.aaroha)}>▶ Aaroha</button>
          <button className="play-btn" onClick={() => playScale([...selectedRaga.avaroha])}>▶ Avaroha</button>
          <div className="scale-display">
            <div>↑ {selectedRaga.aaroha.join(' - ')}</div>
            <div>↓ {selectedRaga.avaroha.join(' - ')}</div>
          </div>
        </div>
      )}

      {tab === 'free' && (
        <div className="raga-free">
          <button className={`tanpura-btn ${droneOn ? 'tanpura-btn--on' : ''}`} onClick={toggleDrone}>
            🎵 Drone {droneOn ? 'On' : 'Off'}
          </button>
          <Keyboard
            activeNoteIds={ragaNoteIds}
            disabledNoteIds={disabledIds}
            onNoteClick={handleFreePlayClick}
          />
        </div>
      )}

      {tab === 'build' && (
        <div className="raga-build">
          <p>Place notes in the correct order:</p>
          <div className="build-row">
            <span>↑ Aaroha:</span>
            {buildAaroha.map((n, i) => (
              <div key={i} className={buildChecked ? (n === selectedRaga.aaroha[i] ? 'build-box--correct' : 'build-box--wrong') : 'build-box'}>{n}</div>
            ))}
          </div>
          <div className="build-row">
            <span>↓ Avaroha:</span>
            {buildAvaroha.map((n, i) => (
              <div key={i} className={buildChecked ? (n === selectedRaga.avaroha[i] ? 'build-box--correct' : 'build-box--wrong') : 'build-box'}>{n}</div>
            ))}
          </div>
          <div className="tile-tray">
            {ragaNoteIds.map(id => {
              const note = ALL_TWELVE_NOTES.find(n => n.id === id);
              return (
                <div key={id} className="tile-group">
                  <button className="tile" onClick={() => addToBuild(id, 'aaroha')}>{note?.sargam} ↑</button>
                  <button className="tile" onClick={() => addToBuild(id, 'avaroha')}>{note?.sargam} ↓</button>
                </div>
              );
            })}
          </div>
          <div className="build-actions">
            <button className="check-btn" onClick={checkBuild}>Check</button>
            <button className="next-btn" onClick={resetBuild}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}
