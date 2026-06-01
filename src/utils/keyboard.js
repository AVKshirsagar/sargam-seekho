import { KEY_MAP } from '../data/notes';

export const isTouch = navigator.maxTouchPoints > 0;

let _onNote = null;

function handleKeyDown(e) {
  if (e.repeat || !_onNote) return;
  const note = KEY_MAP[e.key];
  if (note) _onNote(note);
}

export function registerKeyHandler(onNote) {
  _onNote = onNote;
  window.addEventListener('keydown', handleKeyDown);
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    _onNote = null;
  };
}
