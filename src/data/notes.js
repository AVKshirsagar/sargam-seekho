// src/data/notes.js — generated from sargam_app_resource_pack.json
// Tuning: Just intonation (NOT equal temperament)

export const BASE_SA_HZ = 240;

export const JUST_INTONATION_RATIOS = {
  'Sa': 1/1, 'komal Re': 16/15, 'Re': 9/8, 'komal Ga': 6/5,
  'Ga': 5/4, 'Ma': 4/3, 'tivra Ma': 45/32, 'Pa': 3/2,
  'komal Dha': 8/5, 'Dha': 5/3, 'komal Ni': 9/5, 'Ni': 15/8, 'Sa2': 2/1,
};

export function noteFreq(note, octave = 'madhya', baseSa = BASE_SA_HZ) {
  const ratio = JUST_INTONATION_RATIOS[note];
  if (!ratio) throw new Error(`Unknown note: ${note}`);
  return baseSa * ratio * ({ mandra: 0.5, madhya: 1, taara: 2 }[octave] ?? 1);
}

// From resource pack culturalSymbolism.animals — authoritative animal mnemonics
// NOTE: Re = Bull (NOT skylark/chick), Pa = Cuckoo (NOT parrot)
export const ANIMALS = {
  Sa:  { name: 'Peacock',  emoji: '🦚', colour: 'Green'  },
  Re:  { name: 'Bull',     emoji: '🐂', colour: 'Red'    },
  Ga:  { name: 'Goat',     emoji: '🐐', colour: 'Golden' },
  Ma:  { name: 'Heron',    emoji: '🦢', colour: 'White'  },
  Pa:  { name: 'Cuckoo',   emoji: '🐦', colour: 'Blue'   },
  Dha: { name: 'Horse',    emoji: '🐎', colour: 'Yellow' },
  Ni:  { name: 'Elephant', emoji: '🐘', colour: 'Multi'  },
};

// All 12 chromatic notes — keyboard map from resource pack keyboardMap
export const ALL_TWELVE_NOTES = [
  { id:'Sa',        sargam:'Sa',        hindi:'सा',  variant:'shuddha', semitone:0,  western:'C',  keyCode:'s', achal:true,  animal:ANIMALS.Sa,  uiColor:'#E24B4A' },
  { id:'komal_Re',  sargam:'komal Re',  hindi:'रे॒', variant:'komal',   semitone:1,  western:'Db', keyCode:'R', achal:false, animal:ANIMALS.Re,  uiColor:'#D85A30' },
  { id:'Re',        sargam:'Re',        hindi:'रे',  variant:'shuddha', semitone:2,  western:'D',  keyCode:'r', achal:false, animal:ANIMALS.Re,  uiColor:'#D85A30' },
  { id:'komal_Ga',  sargam:'komal Ga',  hindi:'ग॒',  variant:'komal',   semitone:3,  western:'Eb', keyCode:'G', achal:false, animal:ANIMALS.Ga,  uiColor:'#BA7517' },
  { id:'Ga',        sargam:'Ga',        hindi:'गा',  variant:'shuddha', semitone:4,  western:'E',  keyCode:'g', achal:false, animal:ANIMALS.Ga,  uiColor:'#BA7517' },
  { id:'Ma',        sargam:'Ma',        hindi:'म',   variant:'shuddha', semitone:5,  western:'F',  keyCode:'m', achal:false, animal:ANIMALS.Ma,  uiColor:'#3B6D11' },
  { id:'tivra_Ma',  sargam:'tivra Ma',  hindi:'म॑',  variant:'tivra',   semitone:6,  western:'F#', keyCode:'M', achal:false, animal:ANIMALS.Ma,  uiColor:'#3B6D11' },
  { id:'Pa',        sargam:'Pa',        hindi:'प',   variant:'shuddha', semitone:7,  western:'G',  keyCode:'p', achal:true,  animal:ANIMALS.Pa,  uiColor:'#0F6E56' },
  { id:'komal_Dha', sargam:'komal Dha', hindi:'ध॒',  variant:'komal',   semitone:8,  western:'Ab', keyCode:'D', achal:false, animal:ANIMALS.Dha, uiColor:'#185FA5' },
  { id:'Dha',       sargam:'Dha',       hindi:'ध',   variant:'shuddha', semitone:9,  western:'A',  keyCode:'d', achal:false, animal:ANIMALS.Dha, uiColor:'#185FA5' },
  { id:'komal_Ni',  sargam:'komal Ni',  hindi:'नि॒', variant:'komal',   semitone:10, western:'Bb', keyCode:'N', achal:false, animal:ANIMALS.Ni,  uiColor:'#534AB7' },
  { id:'Ni',        sargam:'Ni',        hindi:'नि',  variant:'shuddha', semitone:11, western:'B',  keyCode:'n', achal:false, animal:ANIMALS.Ni,  uiColor:'#534AB7' },
];

export const KEY_MAP = {
  ...Object.fromEntries(ALL_TWELVE_NOTES.map(n => [n.keyCode, n.id])),
  'S': 'Sa2',
};

export const SHUDDHA_NOTES = ALL_TWELVE_NOTES.filter(n => n.variant === 'shuddha');
