import { isTouch } from '../../utils/keyboard';

export default function NoteKey({ note, active, highlight, disabled, onClick }) {
  const cls = [
    'note-key',
    note.variant === 'komal' ? 'note-key--komal' : '',
    note.variant === 'tivra' ? 'note-key--tivra' : '',
    active ? 'note-key--active' : '',
    highlight === 'correct' ? 'note-key--correct' : '',
    highlight === 'wrong' ? 'note-key--wrong' : '',
    disabled ? 'note-key--disabled' : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={cls}
      style={{ '--note-color': note.uiColor }}
      onClick={() => !disabled && onClick?.(note)}
      aria-label={`${note.hindi} ${note.sargam}`}
    >
      <span className="note-key__animal">{note.animal.emoji}</span>
      <span className="note-key__devanagari">{note.hindi}</span>
      <span className="note-key__roman">{note.sargam}</span>
      {!isTouch && note.keyCode && (
        <span className="note-key__label">{note.keyCode}</span>
      )}
    </button>
  );
}
