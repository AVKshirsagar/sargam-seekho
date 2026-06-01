import { ALL_TWELVE_NOTES } from '../../data/notes';
import NoteKey from './NoteKey';

export default function Keyboard({ activeNoteIds, highlights = {}, disabledNoteIds = [], onNoteClick }) {
  return (
    <div className="keyboard">
      {ALL_TWELVE_NOTES.map(note => (
        <NoteKey
          key={note.id}
          note={note}
          active={activeNoteIds?.includes(note.id)}
          highlight={highlights[note.id]}
          disabled={disabledNoteIds.includes(note.id)}
          onClick={onNoteClick}
        />
      ))}
    </div>
  );
}
