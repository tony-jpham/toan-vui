const BADGES_KEY = 'toanvui_badges';
const ALL_MODULES = ['cuu-chuong', 'cong-tru', 'thu-thach-toc-do', 'xem-gio'];

/**
 * Streak lưu độc lập với history.js (không bị dọn theo hạn 14 ngày) vì mục đích
 * theo dõi thành tích lâu dài khác với mục đích xem lại kết quả gần đây.
 */
function getBadgeStats() {
  try {
    const raw = localStorage.getItem(BADGES_KEY);
    return raw ? JSON.parse(raw) : defaultBadgeStats();
  } catch (e) {
    return defaultBadgeStats();
  }
}

function defaultBadgeStats() {
  return {
    totalSessions: 0,
    perfectScores: 0,
    modulesPlayed: [],
    currentStreak: 0,
    bestStreak: 0,
    lastActiveDay: null, // 'YYYY-MM-DD'
  };
}

function dayKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
}

function updateStreak(stats) {
  const today = dayKey(Date.now());
  if (stats.lastActiveDay === today) return; // đã tính ngày hôm nay rồi

  const yesterday = dayKey(Date.now() - 24 * 60 * 60 * 1000);
  stats.currentStreak = stats.lastActiveDay === yesterday ? stats.currentStreak + 1 : 1;
  stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);
  stats.lastActiveDay = today;
}

const BADGE_DEFINITIONS = [
  { id: 'first-session', icon: '🌱', name: 'Bước chân đầu tiên', check: (s) => s.totalSessions >= 1 },
  { id: 'sessions-5', icon: '📚', name: '5 bài luyện tập', check: (s) => s.totalSessions >= 5 },
  { id: 'sessions-20', icon: '🎓', name: '20 bài luyện tập', check: (s) => s.totalSessions >= 20 },
  { id: 'first-perfect', icon: '⭐', name: 'Điểm 10 đầu tiên', check: (s) => s.perfectScores >= 1 },
  { id: 'perfect-5', icon: '🏆', name: '5 lần đạt 10 điểm', check: (s) => s.perfectScores >= 5 },
  { id: 'all-modules', icon: '🗺️', name: 'Thử hết mọi thử thách', check: (s) => ALL_MODULES.every((m) => s.modulesPlayed.includes(m)) },
  { id: 'streak-3', icon: '🔥', name: 'Streak 3 ngày', check: (s) => s.bestStreak >= 3 },
  { id: 'streak-7', icon: '💎', name: 'Streak 7 ngày', check: (s) => s.bestStreak >= 7 },
];

function unlockedIds(stats) {
  return BADGE_DEFINITIONS.filter((def) => def.check(stats)).map((def) => def.id);
}

/**
 * Gọi mỗi khi hoàn thành 1 bài. Cập nhật bộ đếm vĩnh viễn dùng để mở khoá huy hiệu.
 * Trả về { stats, newlyUnlocked } để nơi gọi có thể hiện toast mừng huy hiệu mới.
 */
function recordBadgeProgress({ module, scaledScore }) {
  const stats = getBadgeStats();
  const beforeIds = unlockedIds(stats);

  stats.totalSessions++;
  if (scaledScore === 10) stats.perfectScores++;
  if (!stats.modulesPlayed.includes(module)) stats.modulesPlayed.push(module);
  updateStreak(stats);
  localStorage.setItem(BADGES_KEY, JSON.stringify(stats));

  const afterIds = unlockedIds(stats);
  const newlyUnlocked = BADGE_DEFINITIONS.filter(
    (def) => afterIds.includes(def.id) && !beforeIds.includes(def.id)
  );

  return { stats, newlyUnlocked };
}

function getBadgeProgress() {
  const stats = getBadgeStats();
  return BADGE_DEFINITIONS.map((def) => ({
    ...def,
    unlocked: def.check(stats),
  }));
}

/**
 * Toast nổi tự ẩn, dùng để mừng huy hiệu vừa mở khoá ngay tại màn kết quả bài làm.
 */
function showBadgeToast(badge) {
  const toast = document.createElement('div');
  toast.className = 'badge-toast';
  toast.innerHTML = `
    <div class="badge-toast-icon">${badge.icon}</div>
    <div>
      <div class="badge-toast-title">Huy hiệu mới!</div>
      <div class="badge-toast-name">${badge.name}</div>
    </div>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
