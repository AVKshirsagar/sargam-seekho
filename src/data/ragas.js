// src/data/ragas.js — from sargam_app_resource_pack.json popularRagas
// notation: uppercase=shuddha, lowercase=komal, M'=tivra Ma

export const RAGAS = [
  // STAGE 1 (shuddha only)
  {
    name: 'Bhupali', thaat: 'Kalyan', time: 'Evening',
    notes: ['Sa','Re','Ga','Pa','Dha'],
    aaroha:  ['Sa','Re','Ga','Pa','Dha','Sa2'],
    avaroha: ['Sa2','Dha','Pa','Ga','Re','Sa'],
    difficulty: 'beginner', stage: 1,
    type: 'pentatonic',
    character: 'Sweet, devotional, peaceful',
    vadi: 'Ga', samvadi: 'Dha',
  },
  {
    name: 'Durga', thaat: 'Bilaval', time: 'Any',
    notes: ['Sa','Re','Ma','Pa','Dha'],
    aaroha:  ['Sa','Re','Ma','Pa','Dha','Sa2'],
    avaroha: ['Sa2','Dha','Pa','Ma','Re','Sa'],
    difficulty: 'beginner', stage: 1,
    type: 'pentatonic',
    character: 'Bright, auspicious, energetic',
    vadi: 'Re', samvadi: 'Pa',
  },
  // STAGE 2 (+ tivra Ma)
  {
    name: 'Yaman', thaat: 'Kalyan', time: 'Evening',
    notes: ['Sa','Re','Ga','tivra Ma','Pa','Dha','Ni'],
    aaroha:  ['Sa','Re','Ga','tivra Ma','Pa','Dha','Ni','Sa2'],
    avaroha: ['Sa2','Ni','Dha','Pa','tivra Ma','Ga','Re','Sa'],
    difficulty: 'beginner', stage: 2,
    character: 'Peaceful, romantic, evening raga',
    vadi: 'Ga', samvadi: 'Ni',
  },
  {
    name: 'Bilaval', thaat: 'Bilaval', time: 'Morning',
    notes: ['Sa','Re','Ga','Ma','Pa','Dha','Ni'],
    aaroha:  ['Sa','Re','Ga','Ma','Pa','Dha','Ni','Sa2'],
    avaroha: ['Sa2','Ni','Dha','Pa','Ma','Ga','Re','Sa'],
    difficulty: 'intermediate', stage: 2,
    character: 'All shuddha, bright, joyful (equivalent to major scale)',
    vadi: 'Ga', samvadi: 'Ni',
  },
  // STAGE 3 (+ komal Re, komal Dha)
  {
    name: 'Bhairav', thaat: 'Bhairav', time: 'Dawn',
    notes: ['Sa','komal Re','Ga','Ma','Pa','komal Dha','Ni'],
    aaroha:  ['Sa','komal Re','Ga','Ma','Pa','komal Dha','Ni','Sa2'],
    avaroha: ['Sa2','Ni','komal Dha','Pa','Ma','Ga','komal Re','Sa'],
    difficulty: 'intermediate', stage: 3,
    character: 'Meditative, serious, morning — komal Re and Dha give characteristic heaviness',
    vadi: 'Ga', samvadi: 'Dha',
  },
  {
    name: 'Poorvi', thaat: 'Poorvi', time: 'Twilight',
    notes: ['Sa','komal Re','Ga','tivra Ma','Pa','komal Dha','Ni'],
    aaroha:  ['Sa','komal Re','Ga','tivra Ma','Pa','komal Dha','Ni','Sa2'],
    avaroha: ['Sa2','Ni','komal Dha','Pa','tivra Ma','Ga','komal Re','Sa'],
    difficulty: 'intermediate', stage: 3,
    character: 'Twilight, intense, yearning — tivra Ma with komal Re and Dha',
    vadi: 'Ga', samvadi: 'Ni',
  },
  // STAGE 4 (full chromatic)
  {
    name: 'Kafi', thaat: 'Kafi', time: 'Midnight',
    notes: ['Sa','Re','komal Ga','Ma','Pa','Dha','komal Ni'],
    aaroha:  ['Sa','Re','komal Ga','Ma','Pa','Dha','komal Ni','Sa2'],
    avaroha: ['Sa2','komal Ni','Dha','Pa','Ma','komal Ga','Re','Sa'],
    difficulty: 'intermediate', stage: 4,
    character: 'Devotional, used in Holi — komal Ga and Ni (Dorian mode)',
    vadi: 'Pa', samvadi: 'Sa',
  },
  {
    name: 'Bhairavi', thaat: 'Bhairavi', time: 'Morning',
    notes: ['Sa','komal Re','komal Ga','Ma','Pa','komal Dha','komal Ni'],
    aaroha:  ['Sa','komal Re','komal Ga','Ma','Pa','komal Dha','komal Ni','Sa2'],
    avaroha: ['Sa2','komal Ni','komal Dha','Pa','Ma','komal Ga','komal Re','Sa'],
    difficulty: 'intermediate', stage: 4,
    character: 'Valedictory — 4 komal notes, expressive, emotional',
    vadi: 'Ma', samvadi: 'Sa',
  },
  {
    name: 'Khamaj', thaat: 'Khamaj', time: 'Night',
    notes: ['Sa','Re','Ga','Ma','Pa','Dha','komal Ni'],
    aaroha:  ['Sa','Re','Ga','Ma','Pa','Dha','komal Ni','Sa2'],
    avaroha: ['Sa2','Ni','komal Ni','Dha','Pa','Ma','Ga','Re','Sa'],
    difficulty: 'intermediate', stage: 4,
    character: 'Light classical, thumri — komal Ni (Mixolydian)',
    vadi: 'Ga', samvadi: 'Ni',
  },
  {
    name: 'Darbari Kanada', thaat: 'Asavari', time: 'Midnight',
    notes: ['Sa','Re','komal Ga','Ma','Pa','komal Dha','komal Ni'],
    aaroha:  ['Sa','Re','komal Ga','Ma','Pa','komal Dha','komal Ni','Sa2'],
    avaroha: ['Sa2','komal Ni','komal Dha','Pa','Ma','komal Ga','Re','Sa'],
    difficulty: 'advanced', stage: 4,
    character: 'Regal, serious — slow andolita (oscillation) on komal Ga, Dha, Ni',
    vadi: 'Re', samvadi: 'Pa',
  },
  {
    name: 'Malkauns', thaat: 'Bhairavi', time: 'Midnight',
    notes: ['Sa','komal Ga','Ma','komal Dha','komal Ni'],
    aaroha:  ['Sa','komal Ga','Ma','komal Dha','komal Ni','Sa2'],
    avaroha: ['Sa2','komal Ni','komal Dha','Ma','komal Ga','Sa'],
    difficulty: 'advanced', stage: 4,
    type: 'pentatonic',
    character: 'Ancient, mystical — no Re or Pa, all komal, pentatonic',
    vadi: 'Ma', samvadi: 'Sa',
  },
  {
    name: 'Todi', thaat: 'Todi', time: 'Morning',
    notes: ['Sa','komal Re','komal Ga','tivra Ma','Pa','komal Dha','Ni'],
    aaroha:  ['Sa','komal Re','komal Ga','tivra Ma','Pa','komal Dha','Ni','Sa2'],
    avaroha: ['Sa2','Ni','komal Dha','Pa','tivra Ma','komal Ga','komal Re','Sa'],
    difficulty: 'advanced', stage: 4,
    character: 'Introspective, deeply emotional — tivra Ma + 3 komal notes',
    vadi: 'Dha', samvadi: 'Re',
  },
  {
    name: 'Marwa', thaat: 'Marva', time: 'Sunset',
    notes: ['Sa','komal Re','Ga','tivra Ma','Dha','Ni'],
    aaroha:  ['Sa','komal Re','Ga','tivra Ma','Dha','Ni','Sa2'],
    avaroha: ['Sa2','Ni','Dha','tivra Ma','Ga','komal Re','Sa'],
    difficulty: 'advanced', stage: 4,
    character: 'Restless, anxious — no Pa, tivra Ma + komal Re create strong tension',
    vadi: 'Re', samvadi: 'Dha',
  },
];

export const getRagasByStage = (stage) => RAGAS.filter(r => r.stage <= stage);
export const getRagasByDifficulty = (d) => RAGAS.filter(r => r.difficulty === d);
export const getRaga = (name) => RAGAS.find(r => r.name === name);
