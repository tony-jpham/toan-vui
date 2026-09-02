const HISTORY_KEY = 'toanvui_history';
const HISTORY_RETENTION_DAYS = 14;

const HISTORY_MODULE_LABELS = {
  'cuu-chuong': 'Cửu chương',
  'cong-tru': 'Cộng trừ',
  'thu-thach-toc-do': 'Thử Thách Tốc Độ',
  'xem-gio': 'Xem giờ',
};

function pruneHistory(entries) {
  const cutoff = Date.now() - HISTORY_RETENTION_DAYS * 24 * 60 * 60 * 1000;
  return entries.filter((e) => e.timestamp >= cutoff);
}

function getHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const entries = raw ? JSON.parse(raw) : [];
    const fresh = pruneHistory(entries);
    if (fresh.length !== entries.length) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(fresh));
    }
    return fresh;
  } catch (e) {
    return [];
  }
}

function saveHistoryEntry({ module, levelLabel, score, total, scaledScore }) {
  const entries = getHistory();
  entries.push({
    timestamp: Date.now(),
    module,
    levelLabel: levelLabel || '',
    score,
    total,
    scaledScore,
  });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
}

function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

function formatHistoryDate(timestamp) {
  const d = new Date(timestamp);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes} - ${day}/${month}`;
}
