const KEYS = {
  stage: 'ss_stage',
  stats: 'ss_stats',
  stars: 'ss_stars',
};

export function getStage() {
  return parseInt(localStorage.getItem(KEYS.stage) || '1', 10);
}

export function getStats() {
  return JSON.parse(localStorage.getItem(KEYS.stats) || '{}');
}

export function recordAnswer(stage, correct) {
  const stats = getStats();
  if (!stats[stage]) stats[stage] = { correct: 0, total: 0 };
  stats[stage].total += 1;
  if (correct) stats[stage].correct += 1;
  localStorage.setItem(KEYS.stats, JSON.stringify(stats));
  checkAndUnlock(stage, stats);
}

function checkAndUnlock(stage, stats) {
  const s = stats[stage];
  if (s.total >= 20 && s.correct / s.total >= 0.8) {
    const current = getStage();
    if (stage === current && current < 5) {
      localStorage.setItem(KEYS.stage, String(current + 1));
    }
  }
}

export function getAccuracy(stage) {
  const stats = getStats();
  const s = stats[stage];
  if (!s || s.total === 0) return 0;
  return Math.round((s.correct / s.total) * 100);
}

export function resetProgress() {
  localStorage.removeItem(KEYS.stage);
  localStorage.removeItem(KEYS.stats);
  localStorage.removeItem(KEYS.stars);
}
