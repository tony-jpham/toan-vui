/**
 * Độ khó kết hợp 3 tiêu chí: phạm vi số, có nhớ/không nhớ, dạng phép tính.
 *   Dễ:  số ≤ 50, không nhớ (không qua hàng chục)
 *   Vừa: số ≤ 100, có nhớ 1 lần, đôi khi tìm số hạng còn thiếu
 *   Khó: số ≤ 200, có nhớ nhiều lần, thêm dạng tìm số hạng còn thiếu
 */
const DIFFICULTY_CONFIG = {
  de: { max: 50, missingTermChance: 0 },
  vua: { max: 100, missingTermChance: 0.2 },
  kho: { max: 200, missingTermChance: 0.35 },
};

function digitsCarry(a, b, isAddition) {
  // "Có nhớ" nếu tổng các chữ số hàng đơn vị >= 10 (cộng) hoặc số bị trừ hàng đơn vị < số trừ hàng đơn vị (trừ).
  const aUnits = a % 10;
  const bUnits = b % 10;
  return isAddition ? aUnits + bUnits >= 10 : aUnits < bUnits;
}

function generateAdditionPair(level) {
  const cfg = DIFFICULTY_CONFIG[level];
  let a, b;
  let attempts = 0;
  do {
    a = randomInt(1, cfg.max - 1);
    b = randomInt(1, cfg.max - a);
    attempts++;
  } while (attempts < 30 && level === 'de' && digitsCarry(a, b, true));
  do {
    a = randomInt(1, cfg.max - 1);
    b = randomInt(1, cfg.max - a);
    attempts++;
  } while (attempts < 60 && (level === 'vua' || level === 'kho') && !digitsCarry(a, b, true));
  return { a, b, sum: a + b };
}

function generateSubtractionPair(level) {
  const cfg = DIFFICULTY_CONFIG[level];
  let a, b;
  let attempts = 0;
  do {
    a = randomInt(2, cfg.max);
    b = randomInt(1, a - 1);
    attempts++;
  } while (attempts < 30 && level === 'de' && digitsCarry(a, b, false));
  do {
    a = randomInt(2, cfg.max);
    b = randomInt(1, a - 1);
    attempts++;
  } while (attempts < 60 && (level === 'vua' || level === 'kho') && !digitsCarry(a, b, false));
  return { a, b, diff: a - b };
}

function buildAddQuestion(level) {
  const { a, b, sum } = generateAdditionPair(level);
  const distractors = buildNumericDistractors(sum, [sum - 10, sum + 10, sum - 1, sum + 1, a - b]);
  return {
    prompt: `${a} + ${b} = ?`,
    options: [{ label: sum, correct: true }, ...distractors.map((d) => ({ label: d, correct: false }))],
  };
}

function buildSubtractQuestion(level) {
  const { a, b, diff } = generateSubtractionPair(level);
  const distractors = buildNumericDistractors(diff, [diff - 10, diff + 10, diff - 1, diff + 1, a + b]);
  return {
    prompt: `${a} − ${b} = ?`,
    options: [{ label: diff, correct: true }, ...distractors.map((d) => ({ label: d, correct: false }))],
  };
}

function buildMissingAddendQuestion(level) {
  const { a, b, sum } = generateAdditionPair(level);
  const distractors = buildNumericDistractors(b, [b - 10, b + 10, b - 1, b + 1, sum]);
  return {
    prompt: `${a} + ? = ${sum}`,
    options: [{ label: b, correct: true }, ...distractors.map((d) => ({ label: d, correct: false }))],
  };
}

function buildMissingMinuendPartQuestion(level) {
  const { a, b, diff } = generateSubtractionPair(level);
  return {
    prompt: `? − ${b} = ${diff}`,
    options: (() => {
      const distractors = buildNumericDistractors(a, [a - 10, a + 10, a - 1, a + 1, diff]);
      return [{ label: a, correct: true }, ...distractors.map((d) => ({ label: d, correct: false }))];
    })(),
  };
}

function buildNumericDistractors(correct, candidates) {
  const pool = candidates.filter((v) => v >= 0 && v !== correct);
  const picked = pickUniqueFrom(pool, 3, [correct]);
  while (picked.length < 3) {
    const candidate = correct + randomInt(-15, 15);
    if (candidate >= 0 && candidate !== correct && !picked.includes(candidate)) {
      picked.push(candidate);
    }
  }
  return picked;
}

function buildCongTruQuiz(level, count) {
  const cfg = DIFFICULTY_CONFIG[level];
  const questions = [];
  for (let i = 0; i < count; i++) {
    const useMissingTerm = Math.random() < cfg.missingTermChance;
    if (useMissingTerm) {
      questions.push(Math.random() < 0.5 ? buildMissingAddendQuestion(level) : buildMissingMinuendPartQuestion(level));
    } else {
      questions.push(Math.random() < 0.5 ? buildAddQuestion(level) : buildSubtractQuestion(level));
    }
  }
  return questions;
}

const SPEED_CHALLENGE_SECONDS = {
  vua: 15 * 15, // 15 giây/câu × 15 câu = 3 phút 45 giây
  kho: 12 * 15, // 12 giây/câu × 15 câu = 3 phút
};
