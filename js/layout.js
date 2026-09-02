/**
 * Header/footer dùng chung cho mọi trang, theo cùng pattern với bottom-nav.js:
 * trang chừa 1 slot rỗng, gọi hàm render để JS lắp ráp nội dung.
 *
 * renderAppHeader options:
 *   logoHref        — đường dẫn logo (mặc định 'menu.html', trang gốc dùng '../menu.html' v.v.)
 *   showGreeting     — hiện span chào tên người dùng (id="greeting")
 *   showAvatarLink   — hiện badge avatar dẫn tới hồ sơ (chỉ menu.html dùng)
 */
function renderAppHeader({ logoHref = 'menu.html', showGreeting = false, showAvatarLink = false } = {}) {
  const slot = document.getElementById('app-header-slot');
  if (!slot) return;

  const rightParts = [];
  if (showGreeting) rightParts.push('<span class="greeting" id="greeting"></span>');
  if (showAvatarLink) rightParts.push('<a href="profile.html" class="avatar-link" id="avatar-link" aria-label="Hồ sơ của bạn"></a>');

  const rightHtml = rightParts.length === 0
    ? ''
    : showAvatarLink
      ? `<div class="header-right">${rightParts.join('')}</div>`
      : rightParts.join('');

  slot.outerHTML = `
    <header class="app-header">
      <a href="${logoHref}" class="logo">🌈 Toán Vui</a>
      ${rightHtml}
    </header>
  `;
}

function renderAppFooter() {
  const slot = document.getElementById('app-footer-slot');
  if (!slot) return;
  slot.outerHTML = '<footer class="app-footer">Toán Vui 🌈 — Học mà chơi, chơi mà học</footer>';
}
