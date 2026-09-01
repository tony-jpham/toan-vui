const MINUTE_STEPS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

function formatTimeLabel(hour, minute) {
  const h = hour === 0 ? 12 : hour;
  const m = minute.toString().padStart(2, '0');
  return `${h} giờ ${minute === 0 ? '' : m + ' phút'}`.trim();
}

function buildClockQuestion() {
  const hour = randomInt(1, 12);
  const minute = MINUTE_STEPS[randomInt(0, MINUTE_STEPS.length - 1)];
  const correct = formatTimeLabel(hour, minute);

  const distractorPool = new Set();
  // Lệch giờ ±1 (dễ nhầm khi phút gần cuối/đầu giờ)
  distractorPool.add(formatTimeLabel(hour === 12 ? 1 : hour + 1, minute));
  distractorPool.add(formatTimeLabel(hour === 1 ? 12 : hour - 1, minute));
  // Đọc nhầm 5 phút liền kề
  const minuteIdx = MINUTE_STEPS.indexOf(minute);
  const nextMinute = MINUTE_STEPS[(minuteIdx + 1) % MINUTE_STEPS.length];
  const prevMinute = MINUTE_STEPS[(minuteIdx - 1 + MINUTE_STEPS.length) % MINUTE_STEPS.length];
  distractorPool.add(formatTimeLabel(hour, nextMinute));
  distractorPool.add(formatTimeLabel(hour, prevMinute));
  // Đọc nhầm kim giờ/kim phút (hoán đổi vai trò, xấp xỉ)
  const swappedHour = Math.max(1, Math.min(12, Math.round(minute / 5)));
  if (swappedHour !== hour) {
    distractorPool.add(formatTimeLabel(swappedHour, minute));
  }

  distractorPool.delete(correct);
  const distractors = pickUniqueFrom([...distractorPool], 3, [correct]);
  while (distractors.length < 3) {
    const h = randomInt(1, 12);
    const m = MINUTE_STEPS[randomInt(0, MINUTE_STEPS.length - 1)];
    const label = formatTimeLabel(h, m);
    if (label !== correct && !distractors.includes(label)) distractors.push(label);
  }

  return {
    hour,
    minute,
    prompt: '',
    clockSVG: renderClockSVG(hour, minute),
    options: [
      { label: correct, correct: true },
      ...distractors.map((d) => ({ label: d, correct: false })),
    ],
  };
}

function buildClockQuiz(count) {
  return Array.from({ length: count }, () => buildClockQuestion());
}
