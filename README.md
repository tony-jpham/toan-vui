# Toán Vui 🧮✨

Website ôn tập môn Toán cho học sinh tiểu học Việt Nam (lớp 1 → lớp 5). Chạy hoàn toàn trên trình duyệt (HTML/CSS/JS thuần, không build tool), triển khai trên **GitHub Pages**.

Đối tượng dùng chính: học sinh tiểu học thao tác trên **iPad / điện thoại** — ưu tiên nút bấm to, chữ rõ, thao tác chạm, hạn chế gõ bàn phím.

- **Repo**: [github.com/tony-jpham/toan-vui](https://github.com/tony-jpham/toan-vui)
- **Live**: https://tony-jpham.github.io/toan-vui/

## Tính năng

1. **Bảng cửu chương** — luyện tập trắc nghiệm nhân/chia trong phạm vi 1–9 (1 bảng hoặc trộn nhiều bảng).
2. **Cộng trừ trong phạm vi 200** (không số âm) — luyện tính nhẩm trắc nghiệm, 3 mức độ khó, có bài không giới hạn thời gian và bài giới hạn thời gian ("Thử Thách Tốc Độ").
3. **Xem giờ đồng hồ kim** — trắc nghiệm đọc giờ, phút chẵn.
4. **Hồ sơ người dùng** — nhập tên, tuổi, chọn avatar trước khi học; xem/sửa lại bất kỳ lúc nào; lưu `localStorage`, dùng để cá nhân hoá lời chào.
5. **Lịch sử luyện tập** — mỗi bài hoàn thành được lưu lại 7 ngày, xem lại điểm số và số câu đúng/sai của từng lần làm bài để theo dõi tiến độ.

**Ngoài phạm vi hiện tại**: đăng nhập/tài khoản, đồng bộ dữ liệu giữa nhiều thiết bị, backend/server.

## Công nghệ

- HTML5 + CSS3 + JavaScript (ES6+), không framework, không bundler.
- Kiến trúc **multi-page**: mỗi màn hình là một file `.html`, dùng chung `css/` và `js/` qua `<link>`/`<script>`.
- Lưu trữ: `localStorage` (hồ sơ người dùng: tên, tuổi, avatar; lịch sử luyện tập: 7 ngày gần nhất).
- Triển khai: GitHub Pages, nhánh `main`, thư mục gốc.
- Thống kê: Google Analytics (GA4).

## Cấu trúc thư mục

```
toan-vui/
├── index.html                    # Trang chào — nhập tên/tuổi/avatar
├── menu.html                     # Menu chính, điều hướng tới 4 chế độ luyện tập
├── profile.html                  # Xem & sửa hồ sơ người dùng (tên, tuổi, avatar)
├── history.html                  # Xem lịch sử luyện tập 7 ngày gần nhất
├── cuu-chuong/
│   └── luyen-tap.html             # Trắc nghiệm 1 bảng / trộn nhiều bảng
├── cong-tru/
│   ├── luyen-tap.html             # 15 câu, Dễ/Vừa/Khó, không giới hạn giờ
│   └── thu-thach-toc-do.html      # 15 câu, Vừa/Khó, có đếm giờ tổng cho cả bài
├── xem-gio/
│   └── luyen-tap.html             # 10 câu xem giờ, phút chẵn
├── css/
│   ├── style.css                  # Biến màu, layout, typography dùng chung
│   └── components.css             # Quiz UI, modal, kết quả, đồng hồ
├── js/
│   ├── profile.js                 # Quản lý hồ sơ người dùng trong localStorage
│   ├── quiz-engine.js             # Engine trắc nghiệm dùng chung: render câu hỏi, chấm điểm, auto-advance, kết quả
│   ├── exit-confirm.js            # Nút thoát bài + popup xác nhận, dùng chung cho mọi trang quiz
│   ├── sound.js                   # Âm thanh đúng/sai/hoàn thành, sinh bằng Web Audio API
│   ├── history.js                 # Lưu/đọc/tự dọn lịch sử luyện tập (7 ngày) trong localStorage
│   ├── cuu-chuong.js              # Sinh câu hỏi nhân/chia + đáp án nhiễu
│   ├── cong-tru.js                # Sinh câu hỏi cộng/trừ theo độ khó + đáp án nhiễu
│   ├── xem-gio.js                 # Sinh câu hỏi đọc giờ + đáp án nhiễu
│   └── clock-render.js            # Vẽ mặt đồng hồ kim bằng SVG
└── README.md
```

## Chi tiết chức năng

### I. Bảng cửu chương

- **Luyện tập — 1 bảng** (`cuu-chuong/luyen-tap.html`): 10 câu trắc nghiệm 4 đáp án, lấy đúng 10 phép tính của bảng đã chọn, xáo trộn thứ tự.
- **Luyện tập — trộn nhiều bảng**: chọn ≥ 3 bảng, 15 câu, gồm cả phép nhân và phép chia tương ứng, chia đều số câu cho mỗi bảng đã chọn.
- **Đáp án nhiễu có chủ đích**: ví dụ đúng là `7 × 8 = 56` → đáp án nhiễu gồm các lỗi thường gặp: nhầm bảng liền kề (`7×7=49`, `7×9=63`), lệch một đơn vị của tích (`57`), nhầm phép cộng thay vì nhân (`15`).

### II. Cộng trừ trong phạm vi 200 (không số âm)

- **Bài luyện tập chuẩn** (`cong-tru/luyen-tap.html`): 15 câu ngẫu nhiên, không giới hạn thời gian, chọn 1 trong 3 mức độ khó trước khi bắt đầu.
- **Thử Thách Tốc Độ ⚡** (`cong-tru/thu-thach-toc-do.html`): 15 câu, chỉ mức Vừa/Khó, có đồng hồ đếm ngược cho cả bài.

**Định nghĩa độ khó** (`js/cong-tru.js`, kết hợp 3 tiêu chí):

| Mức | Phạm vi số | Có nhớ? | Dạng phép tính |
|---|---|---|---|
| Dễ | ≤ 50 | Không nhớ (không qua hàng chục) | `a + b = ?`, `a − b = ?` |
| Vừa | ≤ 100 | Có nhớ 1 lần (qua hàng chục) | `a + b = ?`, `a − b = ?`, thỉnh thoảng tìm số hạng còn thiếu |
| Khó | ≤ 200 | Có nhớ nhiều lần / số lớn gần 200 | Thêm dạng tìm số hạng còn thiếu `a + ? = c`, `? − b = c` |

**Giới hạn thời gian cho Thử Thách Tốc Độ**: tính theo giây/câu rồi cộng dồn thành một mốc thời gian tổng cho cả bài (không đếm ngược riêng từng câu) — **Vừa: 15s/câu × 15 câu = 3 phút 45 giây**; **Khó: 12s/câu × 15 câu = 3 phút**. Đồng hồ hiển thị tổng thời gian còn lại, người dùng tự phân bổ cho từng câu.

Căn cứ: nghiên cứu về fact fluency khuyến nghị ~2–4 giây/phép tính đơn giản đã thuộc lòng, nhưng phép cộng trừ có nhớ trong phạm vi 200 phức tạp hơn nhiều so với fact đơn thuần nên mốc thời gian được nới rộng hơn tương ứng.

**Đáp án nhiễu có chủ đích**: lỗi cộng/trừ thiếu nhớ (VD `47 + 28` đúng là `75`, nhiễu `65` do quên nhớ 1), lệch ±10, lệch ±1, hoán đổi phép tính.

### III. Xem giờ đồng hồ kim

- 10 câu trắc nghiệm (`xem-gio/luyen-tap.html`), hiển thị mặt đồng hồ kim vẽ bằng SVG (`js/clock-render.js`), kim giờ/phút đúng góc độ.
- Giờ ngẫu nhiên, phút chỉ rơi vào mốc chẵn: `00, 05, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55`.
- Đáp án nhiễu: lệch giờ ±1, đọc nhầm kim giờ/kim phút, đọc nhầm 5 phút liền kề.

### IV. Hồ sơ người dùng

- `index.html`: form nhập **tên** + **số tuổi** + chọn **avatar** (12 emoji động vật dễ thương: 🐻🐰🐱🐶🦊🐼🦁🐸🐵🦄🐷🐨), nút "Bắt đầu học" → lưu `localStorage` (key `toanvui_profile = { name, age, avatar }`).
- `profile.html`: xem lại và sửa hồ sơ (tên, tuổi, avatar) bất kỳ lúc nào, có preview avatar lớn ở đầu trang. Truy cập qua badge avatar ở góc phải header của `menu.html`.
- Lần sau mở lại `index.html`: chào bằng tên, có nút "Đổi người khác" để xoá hồ sơ và nhập lại từ đầu (cũng có ở `profile.html`).
- Mọi trang luyện tập đều gọi `requireProfileOrRedirect()` — chưa có hồ sơ sẽ tự chuyển về `index.html`.

### V. Trải nghiệm làm bài (dùng chung qua `quiz-engine.js`)

- **Âm thanh phản hồi** (`sound.js`): sinh bằng Web Audio API, không dùng file audio ngoài — 2 nốt đi lên khi trả lời đúng, 1 nốt trầm ngắn khi trả lời sai, chuỗi 4 nốt fanfare khi hoàn thành bài.
- **Auto-advance**: sau khi chọn đáp án, tự động chuyển câu tiếp theo sau **1.5 giây** — không có nút thao tác thêm, giữ nhịp làm bài liền mạch.
- **Lưới đáp án 2×2**: 4 lựa chọn luôn xếp cố định 2 cột × 2 dòng, tiết kiệm không gian hiển thị trên điện thoại.
- **Thoát bài** (`exit-confirm.js`): nút ✕ trong thanh trạng thái mở popup xác nhận "Bạn muốn thoát bài không?" — chọn "Làm tiếp" để đóng popup, hoặc "Thoát bài" để dừng mọi timer và quay về menu chính.
- **Kết quả**: hiển thị điểm số theo thang 10 (làm tròn từ tỉ lệ đúng/tổng) làm nội dung chính, kèm dòng phụ nhỏ "Đúng X/Y câu", và lời động viên thay đổi theo mức điểm.

### VI. Lịch sử luyện tập

- Mỗi khi hoàn thành một bài (ở cả 4 module), kết quả được lưu vào `localStorage` (key `toanvui_history`) qua `saveHistoryEntry()`: module, độ khó (nếu có), điểm số, số câu đúng/tổng, thời điểm làm bài.
- **Không** lưu chi tiết từng câu hỏi/đáp án đã chọn — chỉ lưu tổng kết mỗi lần làm bài, đủ để theo dõi tiến độ mà không phình dữ liệu.
- **Tự động hết hạn sau 7 ngày**: mỗi lần đọc lịch sử (`getHistory()`), các bản ghi cũ hơn 7 ngày bị lọc bỏ và ghi đè lại vào `localStorage` — dữ liệu không tích luỹ vô hạn.
- `history.html`: liệt kê các lần làm bài trong 7 ngày qua, mới nhất lên đầu, mỗi dòng gồm tên module + độ khó, giờ/ngày làm bài, số câu đúng/tổng, và điểm số nổi bật. Có trạng thái rỗng khi chưa làm bài nào. Truy cập qua nút "Xem lịch sử luyện tập" trong `profile.html`.

## UI/UX

- **Giọng điệu**: ứng dụng đóng vai một người bạn thân của người dùng — xưng "mình", gọi người dùng là "bạn" (không dùng "bé"/"con"), gần gũi, dễ thương vừa phải, emoji điểm xuyết, tránh la hét/quá lố.
- **Màu sắc**: bảng màu tươi sáng, pastel (`css/style.css` biến `--primary`, `--secondary`, ...), tương phản đủ để đọc trên iPad ngoài trời.
- **Vùng chạm**: nút bấm tối thiểu ~44×44px, chữ số phép tính cỡ lớn.
- **Phản hồi tức thời**: chọn đáp án → đổi màu đúng/sai ngay, hiện banner động viên, không có cảm giác bị chê khi sai.
- **Responsive**: layout dọc ưu tiên cho điện thoại, lưới linh hoạt cho iPad.

## Google Analytics

Mỗi trang `.html` tải GA4 (`gtag.js`) có điều kiện — chỉ chạy khi hostname/path khớp domain production thật, để không track khi mở file local hay môi trường dev:

```html
<!-- Google tag (gtag.js): chỉ tải trên website production. -->
<script>
  if (
    location.hostname === 'tony-jpham.github.io' &&
    location.pathname.startsWith('/toan-vui/')
  ) {
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){window.dataLayer.push(arguments);};
    window.gtag('js', new Date());
    window.gtag('config', 'G-XXXXXXXXXX');
  }
</script>
```

ID GA4 thật được cấu hình trực tiếp trong từng file `.html` (không lưu trong README công khai). Property GA4 của toan-vui tách riêng, không dùng chung với các site khác.

**Không** gửi tên, tuổi, hay bất kỳ dữ liệu định danh nào của bé vào GA4 — chỉ dùng `gtag('config', ...)` mặc định. Đây là quyết định có chủ đích: GA cấm gửi PII (personally identifiable information) trong Điều khoản dịch vụ, và tên trẻ em là dữ liệu nhạy cảm không cần thiết cho mục đích thống kê sản phẩm.

## Quyết định thiết kế đã chốt

- Kiến trúc multi-page HTML thuần, không framework/build tool.
- Đáp án nhiễu trong mọi module đều có chủ đích (mô phỏng lỗi tư duy thường gặp), không random hoàn toàn.
- Độ khó cộng trừ kết hợp 3 tiêu chí: phạm vi số, có nhớ/không nhớ, dạng phép tính.
- Lưu lịch sử điểm mỗi lần làm bài trong 7 ngày (chỉ tổng kết, không lưu chi tiết từng câu) — đủ để theo dõi tiến độ mà không phình `localStorage`.
- Bảng cửu chương MVP chỉ 1–9.
- Không có màn hình chọn lớp (1→5) — người dùng tự chọn độ khó theo từng module.
- Repo GitHub công khai (`public`) để chạy GitHub Pages miễn phí, deploy trực tiếp từ nhánh `main`.

## Việc cần làm tiếp (backlog)

- [ ] Kiểm thử trên thiết bị iPad/điện thoại thật (ngoài trình duyệt giả lập).
- [ ] Rà soát lại mốc thời gian Thử Thách Tốc Độ sau khi có phản hồi thực tế từ người dùng thử.
