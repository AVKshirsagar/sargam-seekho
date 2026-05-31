// src/data/stages.js — 5-stage progressive curriculum
// Unlock condition: 80% accuracy over 20 questions in previous stage

import { ALL_TWELVE_NOTES } from './notes.js';

export const STAGE_DEFINITIONS = [
  {
    stage: 1,
    name: 'Shuddha Swaras',
    subtitle: 'The 7 pure notes',
    color: '#3B6D11',
    bgColor: '#EAF3DE',
    noteIds: ['Sa','Re','Ga','Ma','Pa','Dha','Ni'],
    desktopKeys: 's r g m p d n',
    newKeys: ['s','r','g','m','p','d','n'],
    ragaNames: ['Bhupali','Durga'],
    sequenceLength: 3,
    unlockCondition: { minQuestions: 20, minAccuracy: 0.8 },
    unlockedByDefault: true,
  },
  {
    stage: 2,
    name: '+ Tivra Ma',
    subtitle: 'The raised fourth',
    color: '#0F6E56',
    bgColor: '#E1F5EE',
    noteIds: ['Sa','Re','Ga','Ma','tivra Ma','Pa','Dha','Ni'],
    desktopKeys: '+ M for tivra Ma',
    newKeys: ['M'],
    ragaNames: ['Bhupali','Durga','Yaman','Bilaval'],
    sequenceLength: 3,
    unlockCondition: { minQuestions: 20, minAccuracy: 0.8 },
    unlockedByDefault: false,
  },
  {
    stage: 3,
    name: '+ Komal Re, Dha',
    subtitle: 'The flat second and sixth',
    color: '#854F0B',
    bgColor: '#FAEEDA',
    noteIds: ['Sa','komal Re','Re','Ga','Ma','tivra Ma','Pa','komal Dha','Dha','Ni'],
    desktopKeys: '+ R (komal Re), D (komal Dha)',
    newKeys: ['R','D'],
    ragaNames: ['Bhupali','Durga','Yaman','Bilaval','Bhairav','Poorvi'],
    sequenceLength: 4,
    unlockCondition: { minQuestions: 20, minAccuracy: 0.8 },
    unlockedByDefault: false,
  },
  {
    stage: 4,
    name: 'Full Chromatic',
    subtitle: 'All 12 notes',
    color: '#534AB7',
    bgColor: '#EEEDFE',
    noteIds: ['Sa','komal Re','Re','komal Ga','Ga','Ma','tivra Ma','Pa','komal Dha','Dha','komal Ni','Ni'],
    desktopKeys: '+ G (komal Ga), N (komal Ni)',
    newKeys: ['G','N'],
    ragaNames: ['Bhupali','Durga','Yaman','Bilaval','Bhairav','Poorvi',
                'Kafi','Bhairavi','Khamaj','Darbari Kanada','Malkauns','Todi','Marwa'],
    sequenceLength: 4,
    unlockCondition: { minQuestions: 20, minAccuracy: 0.8 },
    unlockedByDefault: false,
  },
  {
    stage: 5,
    name: 'Three Saptaks',
    subtitle: 'Low, mid, high octaves',
    color: '#185FA5',
    bgColor: '#E6F1FB',
    noteIds: ['Sa','komal Re','Re','komal Ga','Ga','Ma','tivra Ma','Pa','komal Dha','Dha','komal Ni','Ni'],
    octaves: ['mandra','madhya','taara'],
    desktopKeys: 'Octave toggle button in top bar',
    newKeys: [],
    ragaNames: ['Bhupali','Durga','Yaman','Bilaval','Bhairav','Poorvi',
                'Kafi','Bhairavi','Khamaj','Darbari Kanada','Malkauns','Todi','Marwa'],
    sequenceLength: 5,
    unlockCondition: { minQuestions: 20, minAccuracy: 0.8 },
    unlockedByDefault: false,
  },
];

export function getStageNotes(stage) {
  const def = STAGE_DEFINITIONS[stage - 1];
  if (!def) return [];
  return ALL_TWELVE_NOTES.filter(n => def.noteIds.includes(n.sargam));
}

export function getStageDef(stage) {
  return STAGE_DEFINITIONS[stage - 1] ?? STAGE_DEFINITIONS[0];
}
