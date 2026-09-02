/**
 * Gắn nút thoát bài + popup xác nhận. Khi bấm "Thoát", dừng engine (nếu có)
 * và mọi timer đang chạy trước khi điều hướng, tránh callback chạy sau khi rời trang.
 */
function setupExitConfirm({ exitBtnId, redirectUrl, onConfirmExit }) {
  const exitBtn = document.getElementById(exitBtnId);
  if (!exitBtn) return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box">
      <div class="icon">🤔</div>
      <h2>Bạn muốn thoát bài không?</h2>
      <p class="subtitle">Kết quả bài đang làm sẽ không được lưu lại đâu nha.</p>
      <div class="btn-row">
        <button class="btn btn-outline" id="exit-cancel-btn">Làm tiếp</button>
        <button class="btn btn-primary" id="exit-confirm-btn">Thoát bài</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const closeModal = () => overlay.classList.remove('open');

  exitBtn.addEventListener('click', () => overlay.classList.add('open'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  overlay.querySelector('#exit-cancel-btn').addEventListener('click', closeModal);
  overlay.querySelector('#exit-confirm-btn').addEventListener('click', () => {
    if (onConfirmExit) onConfirmExit();
    window.location.href = redirectUrl;
  });
}
