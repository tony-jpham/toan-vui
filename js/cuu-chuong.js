/**
 * Sinh câu hỏi nhân "n × i = ?" với đáp án nhiễu là các lỗi thường gặp:
 * nhầm bảng liền kề, lệch 1 đơn vị của tích, nhầm phép cộng thay vì nhân.
 */
function buildMultiplyQuestion(n, i) {
  const correct = n * i;
  const distractorPool = new Set([
    (n - 1) * i,
    (n + 1) * i,
    correct + i,
    correct - i,
    correct + 1,
    correct - 1,
    n + i,
  ]);
  distractorPool.delete(correct);
  const distractors = pickUniqueFrom(
    [...distractorPool].filter((v) => v > 0),
    3,
    [correct]
  );
  while (distractors.length < 3) {
    const candidate = correct + randomInt(-5, 5);
    if (candidate > 0 && candidate !== correct && !distractors.includes(candidate)) {
      distractors.push(candidate);
    }
  }
  return {
    prompt: `${n} × ${i} = ?`,
    options: [
      { label: correct, correct: true },
      ...distractors.map((d) => ({ label: d, correct: false })),
    ],
  };
}

/**
 * Sinh câu hỏi chia "n × i ÷ n = ?" (dựa trên phép nhân tương ứng),
 * hiển thị dạng "correct ÷ n = ?" để luyện phép chia trong bảng.
 */
function buildDivideQuestion(n, i) {
  const dividend = n * i;
  const correct = i;
  const distractorPool = new Set([i - 1, i + 1, i - 2, i + 2, n]);
  distractorPool.delete(correct);
  const distractors = pickUniqueFrom(
    [...distractorPool].filter((v) => v > 0 && v <= 10),
    3,
    [correct]
  );
  while (distractors.length < 3) {
    const candidate = randomInt(1, 10);
    if (candidate !== correct && !distractors.includes(candidate)) {
      distractors.push(candidate);
    }
  }
  return {
    prompt: `${dividend} ÷ ${n} = ?`,
    options: [
      { label: correct, correct: true },
      ...distractors.map((d) => ({ label: d, correct: false })),
    ],
  };
}

function buildSingleTableQuiz(n) {
  const positions = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  return positions.map((i) => buildMultiplyQuestion(n, i));
}

function buildMixedTablesQuiz(tables, totalQuestions) {
  const perTable = Math.floor(totalQuestions / tables.length);
  let remainder = totalQuestions - perTable * tables.length;

  const counts = tables.map(() => perTable);
  const extraIndices = shuffleArray(tables.map((_, idx) => idx)).slice(0, remainder);
  extraIndices.forEach((idx) => counts[idx]++);

  const questions = [];
  tables.forEach((n, idx) => {
    const count = counts[idx];
    const positions = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, count);
    positions.forEach((i, qIdx) => {
      const isDivide = qIdx % 2 === 1;
      questions.push(isDivide ? buildDivideQuestion(n, i) : buildMultiplyQuestion(n, i));
    });
  });

  return shuffleArray(questions);
}
