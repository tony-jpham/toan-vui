function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickUniqueFrom(pool, count, excludeSet) {
  const result = [];
  const seen = new Set(excludeSet || []);
  const shuffled = shuffleArray(pool);
  for (const val of shuffled) {
    if (result.length >= count) break;
    if (seen.has(val)) continue;
    seen.add(val);
    result.push(val);
  }
  return result;
}

/**
 * QuizEngine drives a multiple-choice quiz: rendering, scoring, and the
 * end-of-quiz result screen. `questions` is an array of
 * { prompt, options: [{label, correct}], onAnswered? }.
 */
const AUTO_ADVANCE_MS = 1500;

class QuizEngine {
  constructor({ questions, containerIds, onFinish, onAnswered, resultMessages }) {
    this.questions = questions;
    this.containerIds = containerIds;
    this.onFinish = onFinish;
    this.onAnswered = onAnswered;
    this.resultMessages = resultMessages || defaultResultMessages;
    this.currentIndex = 0;
    this.score = 0;
    this.locked = false;
    this.advanceTimer = null;

    this.progressFill = document.getElementById(containerIds.progressFill);
    this.currentEl = document.getElementById(containerIds.current);
    this.totalEl = document.getElementById(containerIds.total);
    this.promptEl = document.getElementById(containerIds.prompt);
    this.answersEl = document.getElementById(containerIds.answers);
    this.feedbackEl = document.getElementById(containerIds.feedback);

    if (this.totalEl) this.totalEl.textContent = this.questions.length;
  }

  start() {
    this.renderQuestion();
  }

  renderQuestion() {
    this.locked = false;
    const q = this.questions[this.currentIndex];
    if (this.currentEl) this.currentEl.textContent = this.currentIndex + 1;
    if (this.progressFill) {
      const pct = (this.currentIndex / this.questions.length) * 100;
      this.progressFill.style.width = pct + '%';
    }
    if (this.feedbackEl) {
      this.feedbackEl.style.display = 'none';
      this.feedbackEl.textContent = '';
    }
    this.promptEl.textContent = q.prompt;
    this.answersEl.innerHTML = '';

    const shuffledOptions = shuffleArray(q.options);
    shuffledOptions.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.textContent = opt.label;
      btn.addEventListener('click', () => this.handleAnswer(btn, opt));
      this.answersEl.appendChild(btn);
    });
  }

  handleAnswer(btn, opt) {
    if (this.locked) return;
    this.locked = true;

    const allBtns = this.answersEl.querySelectorAll('.answer-btn');
    allBtns.forEach((b) => (b.disabled = true));

    if (opt.correct) {
      this.score++;
      btn.classList.add('correct');
      this.showFeedback(true);
      ToanVuiSound.playCorrect();
    } else {
      btn.classList.add('wrong');
      allBtns.forEach((b) => {
        if (b.textContent === String(this.questions[this.currentIndex].options.find((o) => o.correct).label)) {
          b.classList.add('correct');
        }
      });
      this.showFeedback(false);
      ToanVuiSound.playWrong();
    }

    if (this.onAnswered) this.onAnswered(opt.correct);

    this.advanceTimer = setTimeout(() => this.next(), AUTO_ADVANCE_MS);
  }

  stop() {
    clearTimeout(this.advanceTimer);
  }

  showFeedback(isCorrect) {
    if (!this.feedbackEl) return;
    this.feedbackEl.style.display = 'block';
    this.feedbackEl.className = 'feedback-banner ' + (isCorrect ? 'correct' : 'wrong');
    const messages = isCorrect
      ? ['Chính xác! ⭐', 'Giỏi quá! 🎉', 'Đúng rồi đó! 👏']
      : ['Chưa đúng, cố lên nhé! 💪', 'Gần đúng rồi, thử câu sau nha! 🌟'];
    this.feedbackEl.textContent = messages[randomInt(0, messages.length - 1)];
  }

  next() {
    this.currentIndex++;
    if (this.currentIndex >= this.questions.length) {
      if (this.progressFill) this.progressFill.style.width = '100%';
      ToanVuiSound.playFinish();
      this.onFinish(this.score, this.questions.length);
    } else {
      this.renderQuestion();
    }
  }
}

function defaultResultMessages(score, total) {
  const pct = score / total;
  if (pct === 1) return 'Xuất sắc! Bạn làm đúng hết luôn nè! 🏆';
  if (pct >= 0.8) return 'Giỏi quá! Bạn làm rất tốt! 🎉';
  if (pct >= 0.5) return 'Khá lắm! Cố gắng thêm chút nữa nhé! 🌟';
  return 'Không sao đâu, luyện thêm chút là bạn sẽ giỏi hơn! 💪';
}

function renderResultScreen({ score, total, scaledScore, containerIds, message }) {
  const scoreEl = document.getElementById(containerIds.score);
  const detailEl = document.getElementById(containerIds.detail);
  const msgEl = document.getElementById(containerIds.message);
  if (scoreEl) scoreEl.textContent = `${scaledScore ?? score} điểm`;
  if (detailEl) detailEl.textContent = `Đúng ${score}/${total} câu`;
  if (msgEl) msgEl.textContent = message || defaultResultMessages(score, total);
}
