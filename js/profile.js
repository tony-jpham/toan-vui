const PROFILE_KEY = 'toanvui_profile';

function getProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function saveProfile(name, age) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify({ name, age }));
}

function clearProfile() {
  localStorage.removeItem(PROFILE_KEY);
}

function requireProfileOrRedirect() {
  const profile = getProfile();
  if (!profile) {
    window.location.href = getRootPath() + 'index.html';
    return null;
  }
  return profile;
}

function getRootPath() {
  const depth = window.location.pathname.split('/').filter(Boolean);
  const isSubfolder = /\.(html)$/.test(depth[depth.length - 1] || '') && depth.length > 1 &&
    ['cuu-chuong', 'cong-tru', 'xem-gio'].includes(depth[depth.length - 2]);
  return isSubfolder ? '../' : '';
}

function renderGreeting(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const profile = getProfile();
  el.textContent = profile ? `Chào bé ${profile.name}! 👋` : '';
}
