/**
 * Âm thanh phản hồi sinh bằng Web Audio API — không cần file audio, không lo bản quyền.
 * AudioContext chỉ được tạo ở lần phát đầu tiên (thường ngay sau cú chạm đầu tiên của người dùng),
 * vì trình duyệt mobile chặn autoplay audio nếu chưa có tương tác người dùng.
 */
const ToanVuiSound = (() => {
  let ctx = null;

  function getContext() {
    if (!ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      ctx = new AudioContextClass();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function playTone({ freq, start, duration, type = 'sine', gain = 0.2 }) {
    const audioCtx = getContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, start);

    gainNode.gain.setValueAtTime(gain, start);
    gainNode.gain.exponentialRampToValueAtTime(0.001, start + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start(start);
    oscillator.stop(start + duration);
  }

  function playCorrect() {
    const audioCtx = getContext();
    const now = audioCtx.currentTime;
    // Hai nốt đi lên nhanh, giống tiếng "ting" thưởng điểm trong game.
    playTone({ freq: 880, start: now, duration: 0.12, type: 'sine', gain: 0.18 });
    playTone({ freq: 1318.5, start: now + 0.1, duration: 0.18, type: 'sine', gain: 0.18 });
  }

  function playWrong() {
    const audioCtx = getContext();
    const now = audioCtx.currentTime;
    // Một nốt trầm ngắn, nhẹ nhàng — báo sai mà không gây giật mình.
    playTone({ freq: 180, start: now, duration: 0.22, type: 'sine', gain: 0.15 });
  }

  function playFinish() {
    const audioCtx = getContext();
    const now = audioCtx.currentTime;
    // Chuỗi 4 nốt đi lên, giống fanfare ăn mừng ngắn khi hoàn thành bài.
    const notes = [523.25, 659.25, 783.99, 1046.5]; // Do-Mi-Sol-Do
    notes.forEach((freq, i) => {
      playTone({ freq, start: now + i * 0.12, duration: 0.2, type: 'triangle', gain: 0.16 });
    });
  }

  return { playCorrect, playWrong, playFinish };
})();
