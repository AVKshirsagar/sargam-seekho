import { useState, useEffect } from 'react';
import { getStage } from './store/progression';
import { registerKeyHandler } from './utils/keyboard';
import { playNote, samplerLoaded } from './audio/engine';
import { getStageNotes } from './data/stages';
import StageMap from './components/ui/StageMap';
import TanpuraDrone from './components/ui/TanpuraDrone';
import HearIdentify from './components/modes/HearIdentify';
import FindOnKeyboard from './components/modes/FindOnKeyboard';
import AarohaAvaroha from './components/modes/AarohaAvaroha';
import FillTheGap from './components/modes/FillTheGap';
import RagaExplorer from './components/modes/RagaExplorer';
import SpeedChallenge from './components/modes/SpeedChallenge';

const MODES = [
  { id: 'hear',    label: 'Hear & Identify', minStage: 1 },
  { id: 'find',    label: 'Find on Keyboard', minStage: 1 },
  { id: 'aaroha',  label: 'Sequence',         minStage: 1 },
  { id: 'gap',     label: 'Fill the Gap',     minStage: 2 },
  { id: 'raga',    label: 'Raga Explorer',    minStage: 2 },
  { id: 'speed',   label: 'Speed Challenge',  minStage: 3 },
];

export default function App() {
  const [screen, setScreen] = useState('map'); // 'map' | 'play'
  const [stage, setStage] = useState(getStage());
  const [mode, setMode] = useState('hear');
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    samplerLoaded.then(() => setAudioReady(true)).catch(() => setAudioReady(true));
  }, []);

  useEffect(() => {
    const stageNotes = getStageNotes(stage);
    const cleanup = registerKeyHandler((noteId) => {
      const note = stageNotes.find(n => n.id === noteId);
      if (note) playNote(note.sargam);
    });
    return cleanup;
  }, [stage]);

  if (!audioReady) {
    return (
      <div className="loading-screen">
        <div className="loading-screen__inner">
          <div className="loading-screen__emoji">🎵</div>
          <h1>Sargam Seekho</h1>
          <p>Loading harmonium samples…</p>
          <div className="loading-bar"><div className="loading-bar__fill" /></div>
        </div>
      </div>
    );
  }

  function handleSelectStage(stageNum) {
    setStage(stageNum);
    setScreen('play');
  }

  const availableModes = MODES.filter(m => m.minStage <= stage);

  function renderMode() {
    const props = { stage, key: `${stage}-${mode}` };
    switch (mode) {
      case 'hear':   return <HearIdentify {...props} />;
      case 'find':   return <FindOnKeyboard {...props} />;
      case 'aaroha': return <AarohaAvaroha {...props} />;
      case 'gap':    return <FillTheGap {...props} />;
      case 'raga':   return <RagaExplorer {...props} />;
      case 'speed':  return <SpeedChallenge {...props} />;
      default:       return <HearIdentify {...props} />;
    }
  }

  if (screen === 'map') {
    return (
      <div className="app">
        <header className="app-header">
          <h1>🎵 Sargam Seekho</h1>
          <TanpuraDrone />
        </header>
        <StageMap onSelectStage={handleSelectStage} />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <button className="back-btn" onClick={() => setScreen('map')}>← Stage Map</button>
        <h1>Stage {stage}</h1>
        <TanpuraDrone />
      </header>
      <nav className="mode-tabs">
        {availableModes.map(m => (
          <button
            key={m.id}
            className={`mode-tab ${mode === m.id ? 'mode-tab--active' : ''}`}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </nav>
      <main className="mode-content">
        {renderMode()}
      </main>
    </div>
  );
}
