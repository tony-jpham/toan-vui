const OPPONENT_NICKNAMES = [
  'Heo hăng hái', 'Voi vui vẻ', 'Thỏ thảnh thơi', 'Gấu gan dạ',
  'Cáo lanh lợi', 'Sóc siêng năng', 'Nai nhí nhảnh', 'Khỉ khéo léo',
  'Hổ hào hứng', 'Mèo mưu mẹo',
];

function pickOpponentNickname() {
  return OPPONENT_NICKNAMES[randomInt(0, OPPONENT_NICKNAMES.length - 1)];
}

/**
 * Trộn câu hỏi cộng trừ (Dễ+Vừa+Khó) và xem giờ cho trò Đua xe.
 * Câu xem giờ có thêm clockSVG; câu cộng trừ thì không — quiz-engine
 * cần biết để quyết định có vẽ đồng hồ hay không khi render.
 */
function buildDuaXeQuestions(count) {
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
