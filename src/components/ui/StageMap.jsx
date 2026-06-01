import { getStage, getAccuracy } from '../../store/progression';
import { getStageDef } from '../../data/stages';

const STAGE_LABELS = ['Shuddha Swaras', '+ Tivra Ma', '+ Komal Re/Dha', 'Full Chromatic', 'Three Saptaks'];

export default function StageMap({ onSelectStage }) {
  const currentStage = getStage();

  return (
    <div className="stage-map">
      <h2 className="stage-map__title">Your Journey</h2>
      <div className="stage-map__stages">
        {STAGE_LABELS.map((label, i) => {
          const stageNum = i + 1;
          const unlocked = stageNum <= currentStage;
          const active = stageNum === currentStage;
          const accuracy = getAccuracy(stageNum);
          const def = getStageDef(stageNum);

          return (
            <button
              key={stageNum}
              className={[
                'stage-card',
                unlocked ? 'stage-card--unlocked' : 'stage-card--locked',
                active ? 'stage-card--active' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => unlocked && onSelectStage(stageNum)}
              disabled={!unlocked}
            >
              <span className="stage-card__num">Stage {stageNum}</span>
              <span className="stage-card__label">{label}</span>
              <span className="stage-card__notes">{def.noteIds.length} notes</span>
              {unlocked && stageNum < currentStage && (
                <span className="stage-card__accuracy">{accuracy}% ✓</span>
              )}
              {!unlocked && <span className="stage-card__lock">🔒</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
