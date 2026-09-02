const BOTTOM_NAV_ITEMS = [
  { page: 'menu.html', icon: '🏠', label: 'Menu' },
  { page: 'badges.html', icon: '🏆', label: 'Thành tích' },
  { page: 'history.html', icon: '⌛️', label: 'Lịch sử' },
  { page: 'profile.html', icon: '🐣', label: 'Hồ sơ' },
];

/**
 * Chỉ dùng ở các trang gốc (menu, badges, history, profile) — không dùng ở
 * index.html hay các trang làm bài, vì đó là màn hình flow tuyến tính khác mục đích.
 */
function renderBottomNav(currentPage) {
  const container = document.querySelector('main.container');
  if (container) container.classList.add('has-bottom-nav');

  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';
  nav.innerHTML = BOTTOM_NAV_ITEMS.map((item) => `
    <a href="${item.page}" class="bottom-nav-item${item.page === currentPage ? ' active' : ''}">
      <span class="icon">${item.icon}</span>
      <span class="label">${item.label}</span>
    </a>
  `).join('');
  document.body.appendChild(nav);
}
