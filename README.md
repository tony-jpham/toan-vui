# Toán Vui 🌈✨

Website ôn tập môn Toán cho học sinh tiểu học Việt Nam (lớp 1 → lớp 5). Chạy hoàn toàn trên trình duyệt (HTML/CSS/JS thuần, không build tool), triển khai trên **GitHub Pages**.

Đối tượng dùng chính: học sinh tiểu học thao tác trên **iPad / điện thoại** — ưu tiên nút bấm to, chữ rõ, thao tác chạm, hạn chế gõ bàn phím.

- **Repo**: [github.com/tony-jpham/toan-vui](https://github.com/tony-jpham/toan-vui)
- **Live**: https://tony-jpham.github.io/toan-vui/

## Tính năng

1. **Bảng cửu chương** — luyện tập trắc nghiệm nhân/chia trong phạm vi 1–9 (1 bảng hoặc trộn nhiều bảng).
2. **Cộng trừ trong phạm vi 200** (không số âm) — luyện tính nhẩm trắc nghiệm, 3 mức độ khó, có bài không giới hạn thời gian và bài giới hạn thời gian ("Thử Thách Tốc Độ").
3. **Xem giờ đồng hồ kim** — trắc nghiệm đọc giờ, phút chẵn.
4. **Hồ sơ người dùng** — nhập tên, tuổi, chọn avatar trước khi học; xem/sửa lại bất kỳ lúc nào; lưu `localStorage`, dùng để cá nhân hoá lời chào.
5. **Lịch sử luyện tập** — mỗi bài hoàn thành được lưu lại 14 ngày, xem lại điểm số và số câu đúng/sai của từng lần làm bài để theo dõi tiến độ.
6. **Streak & huy hiệu** — đếm số ngày luyện tập liên tiếp, mở khoá huy hiệu theo mốc thành tích (số bài đã làm, số lần đạt điểm tuyệt đối, số ngày streak), lưu vĩnh viễn để theo dõi tiến bộ lâu dài.
7. **Trò chơi** — cùng câu hỏi cộng trừ/xem giờ trộn lẫn, khoác giao diện mini-game trực quan hoá tiến trình: Đua xe (thi với đối thủ máy) và Leo núi (hành trình cá nhân).

**Ngoài phạm vi hiện tại**: đăng nhập/tài khoản, đồng bộ dữ liệu giữa nhiều thiết bị, backend/server.

## Công nghệ

- HTML5 + CSS3 + JavaScript (ES6+), không framework, không bundler.
- Kiến trúc **multi-page**: mỗi màn hình là một file `.html`, dùng chung `css/` và `js/` qua `<link>`/`<script>`.
- Lưu trữ: `localStorage` (hồ sơ người dùng: tên, tuổi, avatar; lịch sử luyện tập: 14 ngày gần nhất; streak & huy hiệu: vĩnh viễn).
- Triển khai: GitHub Pages, nhánh `main`, thư mục gốc.
- Thống kê: Google Analytics (GA4).

## Cấu trúc thư mục

```
toan-vui/
├── index.html                    # Trang chào — nhập tên/tuổi/avatar
├── menu.html                     # Menu chính, điều hướng tới 4 module luyện tập + Trò chơi
├── profile.html                  # Xem & sửa hồ sơ người dùng (tên, tuổi, avatar)
├── badges.html                   # Streak + huy hiệu thành tích
├── history.html                  # Xem lịch sử luyện tập 14 ngày gần nhất
├── cuu-chuong/
│   └── luyen-tap.html             # Trắc nghiệm 1 bảng / trộn nhiều bảng
├── cong-tru/
│   ├── luyen-tap.html             # 15 câu, Dễ/Vừa/Khó, không giới hạn giờ
│   └── thu-thach-toc-do.html      # 15 câu, Vừa/Khó, có đếm giờ tổng cho cả bài
├── xem-gio/
│   └── luyen-tap.html             # 10 câu xem giờ, phút chẵn
├── tro-choi/
│   ├── menu.html               # Chọn trò chơi
│   ├── dua-xe.html             # 10 câu, đua với đối thủ máy (biệt danh ngẫu nhiên)
│   └── leo-nui.html            # 10 câu, leo núi theo tiến độ cá nhân
├── css/
│   ├── style.css                  # Biến màu, layout, typography dùng chung
│   └── components.css             # Quiz UI, modal, kết quả, đồng hồ
├── js/
│   ├── profile.js                 # Quản lý hồ sơ người dùng trong localStorage
│   ├── quiz-engine.js             # Engine trắc nghiệm dùng chung: render câu hỏi, chấm điểm, auto-advance, kết quả
│   ├── exit-confirm.js            # Nút thoát bài + popup xác nhận, dùng chung cho mọi trang quiz
│   ├── sound.js                   # Âm thanh đúng/sai/hoàn thành, sinh bằng Web Audio API
│   ├── history.js                 # Lưu/đọc/tự dọn lịch sử luyện tập (14 ngày) trong localStorage
│   ├── badges.js                  # Streak ngày liên tiếp + huy hiệu thành tích, lưu vĩnh viễn
│   ├── layout.js                  # Header/footer dùng chung, lắp qua JS vào slot rỗng ở mỗi trang
│   ├── bottom-nav.js              # Thanh điều hướng dưới, dùng ở menu/badges/history/profile
│   ├── cuu-chuong.js              # Sinh câu hỏi nhân/chia + đáp án nhiễu
│   ├── cong-tru.js                # Sinh câu hỏi cộng/trừ theo độ khó + đáp án nhiễu
│   ├── xem-gio.js                 # Sinh câu hỏi đọc giờ + đáp án nhiễu
│   ├── clock-render.js            # Vẽ mặt đồng hồ kim bằng SVG
│   └── mixed-questions.js         # Trộn câu hỏi cộng trừ + xem giờ, biệt danh đối thủ, render dùng chung cho các trò chơi
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
- `profile.html`: xem lại và sửa hồ sơ (tên, tuổi, avatar) bất kỳ lúc nào, có preview avatar lớn ở đầu trang. Truy cập qua badge avatar ở góc phải header của `menu.html`, hoặc qua bottom nav.
- Lần sau mở lại `index.html`: chào bằng tên, có nút "Đổi người khác" để xoá hồ sơ và nhập lại từ đầu (cũng có ở `profile.html`).
- Mọi trang luyện tập đều gọi `requireProfileOrRedirect()` — chưa có hồ sơ sẽ tự chuyển về `index.html`.

### V. Trải nghiệm làm bài (dùng chung qua `quiz-engine.js`)

- **Âm thanh phản hồi** (`sound.js`): sinh bằng Web Audio API, không dùng file audio ngoài — 2 nốt đi lên khi trả lời đúng, 1 nốt trầm ngắn khi trả lời sai, chuỗi 4 nốt fanfare khi hoàn thành bài.
- **Auto-advance**: sau khi chọn đáp án, tự động chuyển câu tiếp theo sau **1.5 giây** — không có nút thao tác thêm, giữ nhịp làm bài liền mạch.
- **Lưới đáp án 2×2**: 4 lựa chọn luôn xếp cố định 2 cột × 2 dòng, tiết kiệm không gian hiển thị trên điện thoại.
- **Thoát bài** (`exit-confirm.js`): nút ✕ trong thanh trạng thái mở popup xác nhận "Bạn muốn thoát bài không?" — chọn "Làm tiếp" để đóng popup, hoặc "Thoát bài" để dừng mọi timer và quay về menu chính.
- **Kết quả**: hiển thị điểm số theo thang 10 (làm tròn từ tỉ lệ đúng/tổng) làm nội dung chính, kèm dòng phụ nhỏ "Đúng X/Y câu", và lời động viên thay đổi theo mức điểm.
- **`QuizEngine` dùng `containerIds` mặc định** khi không truyền — mọi trang quiz đều dùng chung 1 bộ id (`progress-fill`, `q-current`, `q-total`, `q-prompt`, `q-answers`, `q-feedback`), nên phần lớn lời gọi `new QuizEngine({questions, onFinish})` không cần lặp lại object 6 dòng đó. `renderResultScreen()` cũng có id mặc định tương tự.
- **`showResultSection()` + `recordQuizCompletion()`** (`quiz-engine.js`): gộp phần luôn giống nhau ở cuối mỗi bài — ẩn quiz-section/hiện result-section, và lưu lịch sử + cập nhật huy hiệu + xếp hàng toast mừng huy hiệu mới. Mỗi trang chỉ còn viết phần thật sự khác biệt (tuỳ chỉnh UI riêng như bảng xếp hạng đua xe, tóm tắt leo núi) trước khi gọi 2 hàm này.

### VI. Lịch sử luyện tập

- Mỗi khi hoàn thành một bài (ở cả 4 module + 2 trò chơi), kết quả được lưu vào `localStorage` (key `toanvui_history`) qua `saveHistoryEntry()` (gọi gián tiếp qua `recordQuizCompletion()`): module, độ khó (nếu có), điểm số, số câu đúng/tổng, thời điểm làm bài.
- **Không** lưu chi tiết từng câu hỏi/đáp án đã chọn — chỉ lưu tổng kết mỗi lần làm bài, đủ để theo dõi tiến độ mà không phình dữ liệu.
- **Tự động hết hạn sau 14 ngày**: mỗi lần đọc lịch sử (`getHistory()`), các bản ghi cũ hơn 14 ngày bị lọc bỏ và ghi đè lại vào `localStorage` — dữ liệu không tích luỹ vô hạn.
- `history.html`: liệt kê các lần làm bài trong 14 ngày qua, mới nhất lên đầu, mỗi dòng gồm tên module + độ khó, giờ/ngày làm bài, số câu đúng/tổng, và điểm số nổi bật. Có trạng thái rỗng khi chưa làm bài nào. Truy cập qua bottom nav.

### VII. Streak & huy hiệu

- Lưu **độc lập** với lịch sử 14 ngày, trong key `localStorage` riêng (`toanvui_badges`) qua `js/badges.js` — không bị dọn dẹp theo thời gian, vì mục đích là thành tích lâu dài chứ không phải xem lại gần đây.
- **Streak**: mỗi khi hoàn thành 1 bài, `recordBadgeProgress()` so sánh ngày hiện tại với ngày hoạt động gần nhất — nếu là hôm qua thì streak +1, nếu đã tính hôm nay thì giữ nguyên, nếu bỏ lỡ ≥1 ngày thì reset về 1. Lưu cả `currentStreak` (đang chạy) và `bestStreak` (kỷ lục).
- **Huy hiệu** (`BADGE_DEFINITIONS`): mở khoá dựa trên 3 loại mốc — số bài đã làm (1, 5, 20 bài), số lần đạt điểm 10/10 (1, 5 lần), và số ngày streak (3, 7 ngày) — cộng thêm huy hiệu "thử hết mọi thử thách" khi đã chơi cả 4 module ít nhất 1 lần.
- Hiển thị ở `badges.html` (trang riêng, tách khỏi `profile.html`): thẻ streak nổi bật (🔥 số ngày liên tiếp) và lưới huy hiệu — huy hiệu đã mở khoá hiển thị đầy màu, chưa mở khoá hiển thị mờ xám (`.locked`).
- **Gợi nhắc streak ở `menu.html`**: dòng nhỏ dưới tiêu đề, chỉ hiện khi `currentStreak ≥ 1` — "Bạn vừa bắt đầu streak hôm nay..." nếu streak = 1, hoặc "Streak N ngày — làm 1 bài nữa để giữ lửa nhé!" nếu ≥ 2. Ẩn hoàn toàn nếu chưa từng làm bài, tránh cảm giác nhắc nhở tiêu cực.
- **Toast mừng huy hiệu mới**: `recordBadgeProgress()` trả về `newlyUnlocked` (huy hiệu vừa đạt được so với trước khi cập nhật, bằng cách so sánh trạng thái mở khoá trước/sau). Ở màn kết quả mỗi bài, các huy hiệu mới được hiện lần lượt bằng `showBadgeToast()` — toast nổi ở đáy màn hình, tự ẩn sau 3.2 giây, cách nhau 3.4 giây nếu đạt nhiều huy hiệu cùng lúc.

### VIII. Điều hướng dưới (bottom nav)

- `js/bottom-nav.js`: 4 mục cố định — Menu (🏠), Thành tích (🏆 → `badges.html`), Lịch sử (⌛️ → `history.html`), Hồ sơ (🐣 → `profile.html`) — icon cố định, không dùng avatar thật của người dùng.
- Chỉ xuất hiện ở 4 trang gốc này (`menu.html`, `badges.html`, `history.html`, `profile.html`) — **không** có ở `index.html` (màn hình nhập liệu ban đầu, chưa có gì để điều hướng tới) và **không** có ở các trang làm bài/trò chơi (luồng tuyến tính riêng, không gian đáy màn hình đã dùng cho lưới đáp án).
- Mục tương ứng trang hiện tại được tô đậm màu cam (`.active`) để định hướng người dùng đang ở đâu.
- Trang gọi `renderBottomNav('<tên-file>.html')` sẽ tự thêm class `has-bottom-nav` vào `main.container` để tăng padding-bottom, tránh nội dung cuối trang bị thanh nav che khuất.

### IX. Trò chơi

- `tro-choi/menu.html`: màn chọn trò chơi, mở rộng thêm được khi có trò mới.
- **Câu hỏi dùng chung** (`js/mixed-questions.js`): trộn ngẫu nhiên câu cộng trừ (mix Dễ+Vừa+Khó, tái dùng `cong-tru.js`) và câu xem giờ (tái dùng `xem-gio.js`), 10 câu mỗi lượt chơi. Cũng chứa `attachMixedQuestionRenderer()` — gắn vào 1 `QuizEngine` để tự hiển thị đúng dạng câu hỏi (đồng hồ SVG hay text phép tính), dùng chung cho Đua xe và Leo núi thay vì mỗi trang tự override `renderQuestion`.
- **Đua xe** (`dua-xe.html`): người chơi đua với 1 đối thủ máy mang biệt danh ngẫu nhiên (ví dụ "Heo hăng hái", chọn từ `OPPONENT_NICKNAMES`). Mỗi câu đúng xe người chơi tiến lên; xe đối thủ tự chạy đều mỗi câu bất kể đúng/sai (mô phỏng tốc độ trung bình, không phụ thuộc người chơi) để tạo cảm giác thi đua. Kết thúc so vị trí 2 xe để xác định ai về nhất.
- **Leo núi** (`leo-nui.html`): hành trình cá nhân, không có đối thủ. Mỗi câu đúng nhân vật leo lên 1 bậc trên sườn núi; câu sai thì đứng yên (không tụt lại), tránh cảm giác bị phạt. Kết thúc hiển thị đã leo được bao nhiêu bậc, có lên đến đỉnh (cắm cờ 🚩) hay chưa.
- Cả 2 trò đều tái dùng `QuizEngine` nguyên vẹn cho phần câu hỏi/đáp án/chấm điểm; điểm khác biệt là callback `onAnswered(isCorrect)` mới trong `quiz-engine.js` — bắn ngay sau mỗi câu trả lời (trước khi tự động chuyển câu) để cập nhật vị trí xe/nhân vật theo thời gian thực.
- Kết quả lưu vào lịch sử và huy hiệu như các module khác (`module: 'dua-xe'` / `'leo-nui'`), có nhãn hiển thị riêng trong `history.html` qua `HISTORY_MODULE_LABELS`.

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
- Lưu lịch sử điểm mỗi lần làm bài trong 14 ngày (chỉ tổng kết, không lưu chi tiết từng câu) — đủ để theo dõi tiến độ mà không phình `localStorage`.
- Bảng cửu chương MVP chỉ 1–9.
- Không có màn hình chọn lớp (1→5) — người dùng tự chọn độ khó theo từng module.
- Repo GitHub công khai (`public`) để chạy GitHub Pages miễn phí, deploy trực tiếp từ nhánh `main`.
- Header/footer lắp qua JS (`layout.js`) vào slot rỗng ở mỗi trang, cùng pattern với `bottom-nav.js` — tránh lặp HTML ở 12 trang mà vẫn giữ kiến trúc multi-page không build tool. Sửa cấu trúc header/footer chỉ cần đổi 1 file.
- Huy hiệu "Thử hết mọi thử thách" (`badges.js`) chỉ tính 4 module luyện tập chính (`CORE_LEARNING_MODULES`), không tính trò chơi — 2 khái niệm khác mục đích (đo việc học vs. đo việc chơi) nên cố tình không dùng chung danh sách với `HISTORY_MODULE_LABELS`.

## Việc cần làm tiếp (backlog)

- [ ] Kiểm thử trên thiết bị iPad/điện thoại thật (ngoài trình duyệt giả lập).
- [ ] Rà soát lại mốc thời gian Thử Thách Tốc Độ sau khi có phản hồi thực tế từ người dùng thử.
