# Toán Vui 🧮✨

Website ôn tập môn Toán cho học sinh tiểu học Việt Nam (lớp 1 → lớp 5). Chạy hoàn toàn trên trình duyệt (HTML/CSS/JS thuần, không build tool), triển khai miễn phí trên **GitHub Pages**.

Đối tượng dùng chính: bé thao tác trên **iPad / điện thoại**, nên ưu tiên nút bấm to, chữ rõ, không cần gõ bàn phím nhiều.

## Mục tiêu MVP

1. **Bảng cửu chương** — học bảng nhân 1–9, luyện tập trắc nghiệm (1 bảng hoặc trộn nhiều bảng).
2. **Cộng trừ trong phạm vi 200** — luyện tính nhẩm trắc nghiệm, 3 mức độ khó, có bài không giới hạn thời gian và bài giới hạn thời gian ("Thử thách tốc độ").
3. **Xem giờ đồng hồ kim** — trắc nghiệm đọc giờ-phút chẵn.
4. **Hồ sơ bé** — nhập tên + tuổi trước khi học, lưu `localStorage`, dùng để cá nhân hoá lời chào/xưng hô.

Không làm ở MVP: đăng nhập/tài khoản, lưu lịch sử điểm nhiều lần làm bài, backend/server, âm thanh phức tạp (có thể để hiệu ứng nhẹ bằng CSS/emoji là đủ).

## Công nghệ

- HTML5 + CSS3 + JavaScript (ES6+), không framework, không bundler.
- Kiến trúc **multi-page**: mỗi màn hình chính là một file `.html`, dùng chung `css/` và `js/` qua thẻ `<link>`/`<script>`.
- Lưu trữ: `localStorage` (hồ sơ bé: tên, tuổi).
- Triển khai: GitHub Pages (nhánh `main` hoặc thư mục `/docs`).

## Cấu trúc thư mục dự kiến

```
toan-vui/
├── index.html                  # Trang chào — nhập tên/tuổi, menu chính
├── cuu-chuong/
│   ├── hoc.html                 # Xem bảng cửu chương 1–9
│   └── luyen-tap.html           # Trắc nghiệm 1 bảng / trộn nhiều bảng
├── cong-tru/
│   ├── luyen-tap.html           # 15 câu, Dễ/Vừa/Khó, không giới hạn giờ
│   └── thu-thach-toc-do.html    # 15 câu, Vừa/Khó, có đếm giờ
├── xem-gio/
│   └── luyen-tap.html           # 10 câu xem giờ, phút chẵn
├── css/
│   ├── style.css                # Biến màu, layout, typography dùng chung
│   └── components.css           # Nút, thẻ, thanh điểm, hiệu ứng
├── js/
│   ├── profile.js               # Quản lý hồ sơ bé trong localStorage
│   ├── quiz-engine.js            # Logic dùng chung: chấm điểm, xáo trộn, hiển thị kết quả
│   ├── cuu-chuong.js
│   ├── cong-tru.js
│   ├── xem-gio.js
│   └── clock-render.js           # Vẽ mặt đồng hồ kim bằng SVG/Canvas
├── assets/
│   ├── icons/                    # Icon, hình minh hoạ (SVG ưu tiên, nhẹ)
│   └── sounds/                   # (tuỳ chọn) hiệu ứng đúng/sai ngắn
└── README.md
```

## Chi tiết chức năng

### I. Bảng cửu chương

- **Học bảng**: chọn 1 bảng (1–9) → hiển thị đầy đủ 10 phép nhân (`n × 1` đến `n × 10`).
- **Luyện tập — 1 bảng**: 10 câu trắc nghiệm 4 đáp án, lấy đúng 10 phép tính của bảng đã chọn, xáo trộn thứ tự. Thang điểm 10 (mỗi câu đúng = 1 điểm).
- **Luyện tập — trộn nhiều bảng**: chọn ≥ 3 bảng, 15 câu, gồm cả phép nhân và phép chia tương ứng, chia đều số câu cho mỗi bảng đã chọn (dùng phép chia làm tròn + phân phối phần dư ngẫu nhiên để tổng luôn = 15).
- **Đáp án nhiễu có chủ đích**: ví dụ đúng là `7 × 8 = 56` → đáp án nhiễu gồm các lỗi thường gặp: nhầm bảng liền kề (`7×7=49`, `7×9=63`), lệch một đơn vị của tích (`57`), nhầm phép cộng thay vì nhân (`15`).

### II. Cộng trừ trong phạm vi 200 (không số âm)

- **Bài luyện tập chuẩn**: 15 câu ngẫu nhiên, không giới hạn thời gian, chọn 1 trong 3 mức độ khó trước khi bắt đầu.
- **Thử thách tốc độ** *(tên hiển thị dạng dễ thương nhưng rõ là bài khó, ví dụ: "Đại Chiến Tốc Độ ⏱️" hoặc "Thử Thách Chớp Nhoáng")*: 15 câu, chỉ mức Vừa/Khó, có đồng hồ đếm ngược.

**Định nghĩa độ khó** (kết hợp 3 tiêu chí đã thống nhất):

| Mức | Phạm vi số | Có nhớ? | Dạng phép tính |
|---|---|---|---|
| Dễ | Kết quả/số hạng ≤ 50 | Không nhớ (không qua hàng chục) | `a + b = ?`, `a − b = ?` |
| Vừa | ≤ 100 | Có nhớ 1 lần (qua hàng chục) | `a + b = ?`, `a − b = ?`, thỉnh thoảng tìm số hạng còn thiếu `a + ? = c` |
| Khó | ≤ 200 | Có nhớ nhiều lần / số lớn gần 200 | Thêm dạng tìm số hạng còn thiếu `a + ? = c`, `? − b = c` |

**Giới hạn thời gian cho "Thử Thách Tốc Độ ⚡":**
Nghiên cứu về fluency các phép tính cơ bản (fact fluency) khuyến nghị khoảng **2–4 giây/phép tính đơn giản đã thuộc lòng** (ví dụ bảng cộng trừ trong phạm vi 10–20). Tuy nhiên bài của mình là phép cộng trừ **có nhớ, phạm vi đến 200** — phức tạp hơn nhiều so với fact đơn thuần, đòi hỏi thao tác đặt tính nhẩm nhiều bước.
→ Đã chốt: tính theo **giây/câu rồi cộng dồn thành một mốc thời gian tổng cho cả bài** (không đếm ngược riêng từng câu) — **Vừa: 15s/câu × 15 câu = 3 phút 45 giây**; **Khó: 12s/câu × 15 câu = 3 phút**. Đồng hồ đếm ngược hiển thị tổng thời gian còn lại của cả bài, bé tự phân bổ thời gian cho từng câu, không bị ép nhịp từng câu — phù hợp tâm lý tiểu học hơn.

**Tên bài & giọng điệu**: hiển thị là **"Thử Thách Tốc Độ ⚡"**, mô tả ngắn kèm emoji phù hợp để bé hiểu đây là bài khó nhưng vẫn thấy hào hứng chứ không sợ, ví dụ: *"Bé đã sẵn sàng tăng tốc chưa? Thời gian đang chạy đó nha! ⚡🏃"*.

**Đáp án nhiễu có chủ đích**: lỗi cộng/trừ thiếu nhớ (VD `47 + 28`, đúng `75`, nhiễu `65` do quên nhớ 1), lệch ±10, lệch ±1, hoán đổi phép tính (cộng nhầm thành trừ).

### III. Xem giờ đồng hồ kim

- 10 câu trắc nghiệm, hiển thị mặt đồng hồ kim (vẽ bằng SVG, kim giờ/phút chính xác góc độ).
- Giờ ngẫu nhiên, phút chỉ rơi vào các mốc chẵn: `00, 05, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55`.
- Đáp án nhiễu: lệch giờ ±1 (dễ nhầm khi phút gần cuối/đầu giờ), đọc nhầm kim giờ/kim phút, đọc nhầm 5 phút liền kề.

### IV. Hồ sơ bé

- Màn hình đầu tiên (`index.html`): form nhập **tên** + **số tuổi**, nút "Bắt đầu học".
- Lưu vào `localStorage` (key ví dụ `toanvui_profile = { name, age }`).
- Lần sau mở lại: nếu đã có hồ sơ → chào bằng tên bé, cho phép bấm "Đổi bé khác" để nhập lại.
- Tuổi dùng để gợi ý mức độ khó mặc định (không bắt buộc), ví dụ 6–7 tuổi → gợi ý Dễ, 9–11 tuổi → gợi ý Vừa/Khó — bé vẫn có thể tự chọn khác.

## Định hướng UI/UX

- **Giọng điệu**: gần gũi, dễ thương vừa phải — xưng "bé", dùng emoji điểm xuyết (⭐🎈🧮), tránh la hét/quá lố ("SIÊU ĐỈNH", nhiều dấu chấm than liên tiếp).
- **Màu sắc**: bảng màu tươi sáng, pastel, độ tương phản đủ để dễ đọc trên iPad ngoài trời.
- **Cỡ chữ & nút bấm**: tối thiểu 44×44px cho vùng chạm (theo chuẩn accessibility cho thiết bị cảm ứng), chữ số phép tính cỡ lớn, dễ đọc.
- **Phản hồi tức thời**: chọn đáp án → hiệu ứng đúng/sai nhẹ nhàng (đổi màu, rung nhẹ animation, icon ⭐ hoặc 💡), không có màn hình "Sai rồi" gây nản.
- **Kết thúc bài**: màn hình tổng kết điểm /10, lời động viên thay đổi theo mức điểm (điểm thấp vẫn khích lệ, không chê).
- **Không giới hạn thời gian** (bài thường): không có đồng hồ đếm để bé thoải mái suy nghĩ.
- **Có giới hạn thời gian** (thử thách tốc độ): thanh tiến trình thời gian hiển thị rõ nhưng không quá gấp gáp, có âm thanh/hiệu ứng nhẹ khi sắp hết giờ.
- **Responsive**: ưu tiên layout dọc (portrait) cho điện thoại, lưới linh hoạt cho iPad ngang/dọc.

## Kế hoạch triển khai (theo giai đoạn)

**Giai đoạn 0 — Khung sườn**
- Tạo cấu trúc thư mục, `index.html` + form hồ sơ bé + `profile.js`.
- Thiết lập `style.css` (biến màu, font, layout chung), header/menu điều hướng dùng lại trên mọi trang.

**Giai đoạn 1 — Bảng cửu chương**
- Trang học bảng (`hoc.html`).
- Engine trắc nghiệm dùng chung (`quiz-engine.js`): sinh câu hỏi, xáo trộn, chấm điểm, hiển thị kết quả — thiết kế để tái dùng cho cả 3 module.
- Trang luyện tập 1 bảng + trộn nhiều bảng.

**Giai đoạn 2 — Cộng trừ ≤200**
- Bộ sinh đề theo 3 mức độ khó + logic đáp án nhiễu.
- Trang luyện tập chuẩn (không giới hạn giờ).
- Trang thử thách tốc độ (có đếm giờ tổng, mức Vừa/Khó).

**Giai đoạn 3 — Xem giờ đồng hồ kim**
- Component vẽ đồng hồ SVG (`clock-render.js`) nhận giờ/phút → vẽ kim chính xác.
- Trang luyện tập 10 câu.

**Giai đoạn 4 — Hoàn thiện UI/UX & triển khai**
- Rà soát responsive trên khung hình iPad/điện thoại thực tế.
- Thêm hiệu ứng, âm thanh nhẹ (tuỳ chọn), polish lời văn.
- Cấu hình GitHub Pages, kiểm thử trên thiết bị thật.

## Quyết định đã chốt (cập nhật)

1. **Thời gian "Thử Thách Tốc Độ"**: tính giây/câu rồi cộng dồn thành mốc thời gian tổng cho cả bài (Vừa: 3 phút 45s, Khó: 3 phút) — xem chi tiết ở mục II.
2. **Tên bài thử thách**: **"Thử Thách Tốc Độ ⚡"**.
3. **Repo GitHub**: tạo mới repo `toan-vui`, deploy qua nhánh `main` (GitHub Pages đọc trực tiếp từ `main` / thư mục gốc). Username dự kiến: `tony-jpham` (giống repo `vuon-va-nang`) → URL cuối: `https://tony-jpham.github.io/toan-vui/`. *Sẽ xác nhận lại username chính xác khi tạo repo qua `gh`.*
4. **Bảng cửu chương**: MVP chỉ 1–9, không cần 10/11/12.
5. **Không** có màn hình chọn lớp (1→5) ở MVP — bé tự chọn độ khó theo module, không phụ thuộc "lớp mấy".

## Google Analytics

Áp dụng đúng pattern đã dùng ở `vuon-va-nang`: chỉ tải script GA khi chạy trên domain production thật (tránh track khi mở file local hoặc môi trường dev), dùng GA4 (`gtag.js`), tạo **property GA4 mới riêng** cho toan-vui (không dùng chung ID với vuon-va-nang).

```html
<!-- Google tag (gtag.js): chỉ tải trên website production. -->
<script>
  if (
    location.hostname === 'tony-jpham.github.io' &&
    location.pathname.startsWith('/toan-vui/')
  ) {
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-WPFRJK3EH4';
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){window.dataLayer.push(arguments);};
    window.gtag('js', new Date());
    window.gtag('config', 'G-WPFRJK3EH4');
  }
</script>
```

Đặt snippet này ở đầu `<head>` của **mọi trang `.html`** (giống cách vuon-va-nang làm ở `index.html` và `san-pham.html`).

ID GA4 property của toan-vui: **`G-WPFRJK3EH4`**. Username GitHub: **`tony-jpham`** → URL cuối: `https://tony-jpham.github.io/toan-vui/`.

## Việc cần bạn xác nhận trước khi push lên GitHub

- [ ] Xác nhận đồng ý để tôi tạo repo mới `toan-vui` trên GitHub (public, để chạy được GitHub Pages miễn phí) và đẩy code lên nhánh `main` khi code xong — đây là hành động công khai nên sẽ xin xác nhận lại ở bước đó.
