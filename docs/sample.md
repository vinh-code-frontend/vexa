## Giai đoạn 1 — Nền tảng (làm trước tiên, gần như không phụ thuộc bảng nào)

| Bảng | Mô tả | Độ khó |
| --- | --- | --- |
| categories | Danh mục: Điện thoại, Laptop, Phụ kiện, Tai nghe... (có thể đệ quy cha-con) | Dễ |
| brands | Apple, Samsung, Dell, Asus... | Dễ |
| users | Khách hàng: tên, sđt, email, mật khẩu | Dễ |
| admins / staff | Tài khoản quản trị (nếu tách riêng khỏi users) | Dễ |
| addresses | Địa chỉ giao hàng của user | Dễ |
| stores | Danh sách chi nhánh cửa hàng (TGDĐ có tính năng "xem hàng ở cửa hàng nào") | Dễ |

→ Đây là các bảng danh mục tra cứu (lookup), cấu trúc đơn giản, không có logic phức tạp, nên code CRUD admin cho các bảng này trước để có dữ liệu test cho các bảng sau.

## Giai đoạn 2 — Lõi sản phẩm (trái tim của hệ thống)

| Bảng | Mô tả | Độ khó |
| --- | --- | --- |
| products | Sản phẩm gốc: tên, category_id, brand_id, mô tả, specs chung | Trung bình |
| product_images | Ảnh sản phẩm (nhiều ảnh/sản phẩm) | Dễ |
| product_variants | Biến thể: RAM/ROM/Màu, giá, SKU, tồn kho | Trung bình |
| variant_options + variant_option_values | Định nghĩa loại thuộc tính biến thể (nếu muốn linh hoạt theo từng category) | Khó hơn — có thể bỏ qua ban đầu, để cột cứng ram_gb, color trên variant cho nhanh |
| spec_groups + spec_attributes + product_specs (EAV) | Thông số kỹ thuật chi tiết, khác nhau theo loại sản phẩm | Khó — có thể thay bằng cột JSON specs_detail trên products lúc đầu, nâng cấp EAV sau khi cần lọc nâng cao |

→ Đây là phần quan trọng nhất và nên đầu tư kỹ thiết kế nhất, vì sau này sửa schema sản phẩm khi đã có dữ liệu thật rất mất công. Lời khuyên: bắt đầu với specs_detail JSON đơn giản, chỉ tách sang EAV khi thực sự cần tính năng lọc theo thông số.

## Giai đoạn 3 — Giỏ hàng & Đặt hàng

| Bảng | Mô tả | Độ khó |
| --- | --- | --- |
| carts + cart_items | Giỏ hàng (có thể lưu tạm ở session/localStorage thay vì DB nếu MVP đơn giản) | Dễ–Trung bình |
| orders | Đơn hàng: user_id, tổng tiền, trạng thái, địa chỉ giao | Trung bình |
| order_items | Chi tiết sản phẩm trong đơn (snapshot giá tại thời điểm mua — không tham chiếu giá hiện tại của variant) | Trung bình |
| payments | Thông tin thanh toán: phương thức, trạng thái, mã giao dịch | Trung bình |
| inventory / store_stock | Tồn kho theo từng chi nhánh (nếu cần tính năng "còn hàng ở cửa hàng nào") | Khó |

→ Điểm quan trọng: order_items phải lưu lại giá, tên, cấu hình tại thời điểm đặt hàng (đừng chỉ lưu variant_id rồi join giá hiện tại), vì giá sản phẩm thay đổi theo thời gian nhưng đơn hàng cũ phải giữ nguyên giá lúc mua.

## Giai đoạn 4 — Khuyến mãi & Marketing

| Bảng | Mô tả | Độ khó |
| --- | --- | --- |
| vouchers / coupons | Mã giảm giá | Trung bình |
| promotions / flash_sales | Chương trình khuyến mãi theo thời gian | Trung bình |
| banners | Banner trang chủ | Dễ |

## Giai đoạn 5 — Tương tác người dùng (làm sau khi có traffic thật)

| Bảng | Mô tả | Độ khó |
| --- | --- | --- |
| reviews | Đánh giá sao + bình luận sản phẩm | Trung bình |
| questions / answers | Mục hỏi đáp dưới sản phẩm (TGDĐ có mục này) | Trung bình |
| wishlist | Sản phẩm yêu thích | Dễ |
| product_views | Lịch sử xem gần đây | Dễ |
| product_comparisons | Danh sách sản phẩm để so sánh | Dễ |

## Giai đoạn 6 — Hậu mãi & nội dung (thường làm cuối)

| Bảng | Mô tả | Độ khó |
| --- | --- | --- |
| warranty_requests | Yêu cầu bảo hành/đổi trả | Khó — logic nghiệp vụ phức tạp |
| support_tickets | Hỗ trợ khách hàng | Trung bình |
| articles | Blog/tin công nghệ (nếu định làm content marketing) | Dễ |
| notifications | Thông báo cho user | Trung bình |

## Gợi ý lộ trình MVP

Nếu bạn build một mình / team nhỏ và muốn ra sản phẩm chạy được sớm, thứ tự thực tế nên là:

- categories, brands, users → có dữ liệu nền
- products, product_images, specs_detail (JSON) → hiển thị được trang danh sách + chi tiết sản phẩm
- product_variants → xử lý được chọn RAM/màu/giá
- carts_items, orders, order_items, payments → luồng mua hàng hoàn chỉnh

Sau đó mới quay lại làm reviews, vouchers, EAV specs nâng cao, tồn kho theo chi nhánh...

---

# Bổ sung — Sample cho bán hàng cũ / pre-owned

Phần này bổ sung vào schema hàng mới hiện có, không thay thế các bảng `products`, `product_variants`, `orders` và `inventory` hiện tại.

## Giai đoạn 7 — Nhập và kiểm định hàng cũ

| Bảng | Mô tả | Độ khó |
| --- | --- | --- |
| preowned_items | Một thiết bị vật lý cụ thể, liên kết với `product_variants`, có serial/IMEI, giá vốn, giá bán và trạng thái riêng | Khó |
| condition_grades | Grade tình trạng như A/B/C và tiêu chí tương ứng | Trung bình |
| item_condition_reports | Checklist kiểm định, lỗi, ghi chú, grade đề xuất và grade được duyệt | Khó |
| item_accessories | Phụ kiện đi kèm từng thiết bị: hộp, sạc, cáp, tai nghe, thiếu/hỏng | Trung bình |
| item_images | Ảnh thực tế của thiết bị và ảnh lỗi | Trung bình |
| audit_logs | Lịch sử nhập, kiểm định, thay grade, đổi giá và đổi trạng thái | Trung bình |

### Các trường gợi ý cho `preowned_items`

```text
id
product_variant_id
serial_number                 nullable, unique when present
imei_1_hash                   nullable, unique when present
imei_2_hash                   nullable, unique when present
imei_display_masked           giá trị đã che để hiển thị trong admin
condition_grade_id
battery_health_percent        nullable
acquisition_cost
selling_price
status                        received | inspecting | approved | listed | reserved | sold | returned | quarantined | rejected
store_id
received_at
listed_at
sold_at
warranty_months
return_window_days
created_at
updated_at
```

IMEI/serial là dữ liệu nhạy cảm. Dùng hash để kiểm tra trùng, mã hóa nếu cần tra cứu chính xác, và không trả full identifier trong API thông thường.

### Checklist kiểm định tối thiểu

- Identity: serial/IMEI hợp lệ, không blacklist, khớp thiết bị nhận vào.
- Power: bật máy, sạc, tình trạng pin.
- Display: điểm chết, sọc, cảm ứng, kính nứt.
- Camera: camera trước/sau, flash, lấy nét.
- Audio: loa, mic, rung.
- Connectivity: Wi-Fi, Bluetooth, SIM, 4G/5G, GPS.
- Ports: cổng sạc và jack nếu có.
- Biometrics: Face ID/vân tay nếu có.
- Cosmetics: xước, móp, thay vỏ, dấu hiệu vào nước.
- Accessories: đủ, thiếu hoặc hỏng phụ kiện.

## Giai đoạn 8 — Tồn kho theo từng thiết bị và publish

Bổ sung các bảng sau bên cạnh `inventory / store_stock` hiện có:

| Bảng | Mô tả | Độ khó |
| --- | --- | --- |
| item_status_history | Lịch sử chuyển trạng thái của từng thiết bị | Trung bình |
| item_reservations | Giữ đúng một `preowned_item` cho cart/order, có thời hạn | Khó |
| inventory_movements | Nhập, chuyển kho, điều chỉnh, quarantine, bán, trả về | Khó |
| price_histories | Lịch sử giá vốn, giá niêm yết, markdown và người thay đổi | Trung bình |
| warranty_policies | Chính sách bảo hành theo grade/thời hạn | Trung bình |
| listing_disclosures | Lỗi, phụ kiện thiếu, điều kiện đổi trả và thông tin phải công khai | Trung bình |

Một item chỉ được chuyển sang `listed` khi đã kiểm định và duyệt grade, có ảnh thực tế, giá bán, thông tin bảo hành/đổi trả, vị trí tồn kho và identifier không bị trùng hoặc blacklist.

Reservation phải cập nhật trong transaction. Một thiết bị chỉ có một reservation còn hiệu lực; request đầu tiên giữ thành công, request sau nhận lỗi hết hàng hoặc đã được giữ.

## Giai đoạn 9 — Đơn hàng, bàn giao và hậu mãi hàng cũ

Bổ sung hoặc điều chỉnh các bảng hiện có:

| Bảng | Bổ sung cho hàng cũ |
| --- | --- |
| cart_items | Tham chiếu tới đúng `preowned_item_id`, không chỉ `product_variant_id` |
| order_items | Snapshot tên, grade, serial/IMEI đã che, giá, lỗi, phụ kiện và bảo hành tại lúc mua |
| handover_checks | Kiểm tra đúng thiết bị, phụ kiện và tình trạng trước khi giao |
| return_item_checks | Kiểm tra thiết bị trả về có đúng serial/IMEI và đúng tình trạng không |
| warranty_requests | Yêu cầu bảo hành theo item đã bán |
| repair_records | Lịch sử sửa chữa, chi phí, linh kiện và kỹ thuật viên |

`order_items` vẫn phải lưu snapshot, không chỉ join về `preowned_items`, vì giá, grade, ảnh, phụ kiện hoặc chính sách có thể thay đổi sau này. Thiết bị đã bán hoặc đã phát sinh bảo hành không được xóa cứng.

## Giai đoạn 10 — Trade-in / Buyback (làm sau bán hàng cũ)

Trade-in là workflow riêng, không gộp vào CRUD sản phẩm: khách gửi thiết bị để định giá, xác minh quyền sở hữu, rồi nhận tiền hoặc store credit.

| Bảng | Mô tả | Độ khó |
| --- | --- | --- |
| trade_in_submissions | Model, serial/IMEI che, ảnh và mô tả tình trạng khách cung cấp | Trung bình |
| trade_in_inspections | Kiểm tra thực tế, blacklist/ownership check, grade và khoản khấu trừ | Khó |
| trade_in_quotes | Báo giá sơ bộ/cuối, thời hạn và trạng thái khách duyệt | Khó |
| trade_in_settlements | Tiền mặt hoặc store credit, người duyệt, mã giao dịch và thời điểm trả | Khó |
| trade_in_handover_records | Biên bản nhận thiết bị và xác nhận của khách | Trung bình |

Quy tắc chính:

- Không thanh toán trước khi kiểm định cuối và xác minh quyền sở hữu hoàn tất.
- Báo giá cuối phải được khách chấp thuận trước khi settlement.
- Không settlement hai lần cho cùng một submission.
- Thiết bị blacklist hoặc nghi ngờ trộm cắp phải chuyển `rejected`/`quarantined`.
- Lưu lịch sử từ submission đến payout/store credit để xử lý tranh chấp.

## Sample data bổ sung

```text
products
- id: p-iphone-13
  name: iPhone 13
  product_type: pre_owned
  brand: Apple
  category: Phone

product_variants
- id: v-iphone-13-128-midnight
  product_id: p-iphone-13
  storage: 128GB
  color: Midnight

preowned_items
- id: item-iphone-13-001
  product_variant_id: v-iphone-13-128-midnight
  serial_number: F2LXXXXXXX
  imei_display_masked: 35******1234
  condition_grade: B
  battery_health_percent: 87
  acquisition_cost: 7200000
  selling_price: 8990000
  status: listed
  warranty_months: 3
  return_window_days: 7
```

## Lộ trình bổ sung

1. Hoàn thành các bảng sản phẩm và CRUD hàng mới hiện có.
2. Thêm `preowned_items`, kiểm định, ảnh thực tế, grade và publish readiness.
3. Thêm item-level inventory, reservation, order snapshot và handover check.
4. Thêm warranty/return có kiểm tra đúng thiết bị.
5. Sau khi luồng bán hàng cũ ổn định mới làm trade-in, valuation và settlement.
