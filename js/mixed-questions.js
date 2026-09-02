const OPPONENT_NICKNAMES = [
  'Heo hăng hái', 'Voi vui vẻ', 'Thỏ thảnh thơi', 'Gấu gan dạ',
  'Cáo lanh lợi', 'Sóc siêng năng', 'Nai nhí nhảnh', 'Khỉ khéo léo',
  'Hổ hào hứng', 'Mèo mưu mẹo',
];

function pickOpponentNickname() {
  return OPPONENT_NICKNAMES[randomInt(0, OPPONENT_NICKNAMES.length - 1)];
}

/**
 * Trộn câu hỏi cộng trừ (Dễ+Vừa+Khó) và xem giờ — dùng chung cho mọi trò chơi
 * trong tro-choi/ (Đua xe, Leo núi, ...). Câu xem giờ có thêm clockSVG; câu
 * cộng trừ thì không — attachMixedQuestionRenderer() dựa vào đó để quyết định
 * hiển thị đồng hồ SVG hay text phép tính.
 *
 * Yêu cầu load trước (không dùng module/import, dựa vào thứ tự <script> tag):
 *   quiz-engine.js (randomInt) → cong-tru.js (buildAddQuestion, buildSubtractQuestion)
 *   → xem-gio.js (buildClockQuestion) → mixed-questions.js
 */
function buildMixedQuestions(count) {
  const congTruLevels = ['de', 'vua', 'kho'];
  const questions = [];
  for (let i = 0; i < count; i++) {
    const useClock = Math.random() < 0.3;
    if (useClock) {
      questions.push(buildClockQuestion());
    } else {
      const level = congTruLevels[randomInt(0, congTruLevels.length - 1)];
      questions.push(Math.random() < 0.5 ? buildAddQuestion(level) : buildSubtractQuestion(level));
    }
  }
  return questions;
}

/**
 * Gắn vào 1 QuizEngine đã tạo để hiển thị đúng dạng câu hỏi trộn: đồng hồ SVG
 * cho câu xem giờ, text phép tính cho câu cộng trừ. Dùng chung cho Đua xe và
 * Leo núi — tránh lặp lại đoạn override renderQuestion giống hệt nhau.
 */
function attachMixedQuestionRenderer(engine, { clockHolderId, promptDisplayId }) {
  const originalRender = engine.renderQuestion.bind(engine);
  engine.renderQuestion = function () {
    originalRender();
    const q = this.questions[this.currentIndex];
    const clockHolder = document.getElementById(clockHolderId);
    const promptDisplay = document.getElementById(promptDisplayId);
    if (q.clockSVG) {
      clockHolder.style.display = 'block';
      clockHolder.innerHTML = q.clockSVG;
      promptDisplay.style.display = 'none';
    } else {
      clockHolder.style.display = 'none';
      promptDisplay.style.display = 'block';
      promptDisplay.textContent = q.prompt;
    }
  };
}
