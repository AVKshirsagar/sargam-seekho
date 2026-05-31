// src/data/thaats.js — 10 Bhatkhande thaats from resource pack
// Notation: uppercase=shuddha, lowercase=komal, M'=tivra Ma

export const THAATS = [
  { name:'Bilaval',  notes:'S R G M P D N',  semitones:[0,2,4,5,7,9,11],  western:'Ionian (Major)',         character:'All shuddha, bright, peaceful' },
  { name:'Kalyan',   notes:'S R G M\' P D N', semitones:[0,2,4,6,7,9,11],  western:'Lydian',                 character:'Tivra Ma, evening, devotional' },
  { name:'Khamaj',   notes:'S R G M P D n',  semitones:[0,2,4,5,7,9,10],  western:'Mixolydian',             character:'Komal Ni, light classical, thumri' },
  { name:'Bhairav',  notes:'S r G M P d N',  semitones:[0,1,4,5,7,8,11],  western:'Double Harmonic',        character:'Komal Re+Dha, morning, meditative' },
  { name:'Kafi',     notes:'S R g M P D n',  semitones:[0,2,3,5,7,9,10],  western:'Dorian',                 character:'Komal Ga+Ni, devotional, Holi' },
  { name:'Asavari',  notes:'S R g M P d n',  semitones:[0,2,3,5,7,8,10],  western:'Aeolian (Natural Minor)', character:'Komal Ga+Dha+Ni, morning, pathos' },
  { name:'Bhairavi', notes:'S r g M P d n',  semitones:[0,1,3,5,7,8,10],  western:'Phrygian',               character:'4 komal notes, valedictory, expressive' },
  { name:'Poorvi',   notes:'S r G M\' P d N', semitones:[0,1,4,6,7,8,11],  western:'Double Harmonic #4',     character:'Tivra Ma+Komal Re+Dha, twilight' },
  { name:'Marva',    notes:'S r G M\' P D N', semitones:[0,1,4,6,7,9,11],  western:'Lydian b2',              character:'Tivra Ma+Komal Re, evening, restless' },
  { name:'Todi',     notes:'S r g M\' P d N', semitones:[0,1,3,6,7,8,11],  western:'Phrygian #4 #7',         character:'Tivra Ma+3 komal, morning, introspective' },
];

export const getThaat = (name) => THAATS.find(t => t.name === name);
