/**
 * Vẽ mặt đồng hồ kim SVG cho giờ/phút cho trước.
 * hour: 1-12, minute: 0-55 (bội số của 5)
 */
function renderClockSVG(hour, minute) {
  const hourAngle = ((hour % 12) + minute / 60) * 30; // 360/12
  const minuteAngle = minute * 6; // 360/60

  const ticks = [];
  for (let i = 0; i < 12; i++) {
    const angle = i * 30;
    const isHour = true;
    const outer = polarToXY(100, 100, 90, angle);
    const inner = polarToXY(100, 100, isHour ? 78 : 84, angle);
    ticks.push(`<line x1="${inner.x}" y1="${inner.y}" x2="${outer.x}" y2="${outer.y}" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" />`);
  }

  const numbers = [];
  for (let n = 1; n <= 12; n++) {
    const angle = n * 30;
    const pos = polarToXY(100, 100, 65, angle);
    numbers.push(`<text x="${pos.x}" y="${pos.y}" font-size="14" font-weight="700" font-family="Baloo 2, sans-serif" fill="var(--ink)" text-anchor="middle" dominant-baseline="middle">${n}</text>`);
  }

  const hourTip = polarToXY(100, 100, 45, hourAngle);
  const minuteTip = polarToXY(100, 100, 68, minuteAngle);

  return `
<svg class="clock-face" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="95" fill="#fff" stroke="var(--primary)" stroke-width="6" />
  ${ticks.join('')}
  ${numbers.join('')}
  <line x1="100" y1="100" x2="${hourTip.x}" y2="${hourTip.y}" stroke="var(--ink)" stroke-width="6" stroke-linecap="round" />
  <line x1="100" y1="100" x2="${minuteTip.x}" y2="${minuteTip.y}" stroke="var(--secondary-dark)" stroke-width="4" stroke-linecap="round" />
  <circle cx="100" cy="100" r="5" fill="var(--primary-dark)" />
</svg>`;
}

function polarToXY(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
