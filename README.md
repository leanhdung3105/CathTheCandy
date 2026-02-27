# Bắt Kẹo

## Tổng Quan Dự Án
Bắt Kẹo là một trò chơi được phát triển bằng công cụ Cocos Creator. Mục tiêu của trò chơi là bắt những viên kẹo rơi xuống bằng cách điều khiển giỏ.

## Cấu Trúc Dự Án
Dự án được tổ chức như sau:

```
CatchTheCandy/
├── assets/
│   ├── Audio/                # Chứa các tệp âm thanh như nhạc nền và hiệu ứng âm thanh.
│   ├── Prefabs/              # Chứa các prefab như đối tượng Kẹo.
│   ├── Scripts/              # Chứa các script TypeScript cho logic trò chơi.
│   ├── Textures/             # Chứa hình ảnh và spritesheet cho giao diện trò chơi.
├── library/                  # Các tệp được tạo tự động bởi Cocos Creator.
├── profiles/                 # Hồ sơ cấu hình cho dự án.
├── settings/                 # Cài đặt dự án.
├── temp/                     # Các tệp tạm thời được tạo trong quá trình phát triển.
├── package.json              # Các phụ thuộc Node.js và script.
├── tsconfig.json             # Cấu hình TypeScript.
```

### Thư Mục Chính

#### `assets/`
- **Audio/**: Chứa các tệp âm thanh như `bg.mp3`, `pop.mp3`, và `ting.mp3`.
- **Prefabs/**: Bao gồm tệp `Candy.prefab`, định nghĩa đối tượng kẹo.
- **Scripts/**: Chứa logic chính của trò chơi:
  - `BasketController.ts`: Xử lý chuyển động và tương tác của giỏ.
  - `Candy.ts`: Quản lý hành vi của kẹo.
  - `GameManager.ts`: Điều phối logic tổng thể của trò chơi.
- **Textures/**: Lưu trữ hình ảnh và spritesheet cho giao diện trò chơi.

#### `library/`
- Chứa các tệp được tạo tự động bởi công cụ Cocos Creator. Không nên chỉnh sửa thủ công.

#### `settings/`
- Lưu trữ cài đặt và cấu hình dự án.

#### `temp/`
- Các tệp tạm thời được tạo trong quá trình phát triển. Không nên commit vào hệ thống kiểm soát phiên bản.

## Cài Đặt

1. Clone repository:
   ```bash
   git clone <repository-url>
   ```

2. Di chuyển vào thư mục dự án:
   ```bash
   cd CatchTheCandy
   ```

3. Cài đặt các phụ thuộc:
   ```bash
   npm install
   ```

## Phát Triển

### Yêu Cầu
- [Cocos Creator](https://www.cocos.com/en/creator) (phiên bản 3.8.3 hoặc cao hơn).
- Node.js và npm được cài đặt trên hệ thống của bạn.

### Chạy Dự Án
1. Mở dự án trong Cocos Creator.
2. Nhấn nút **Play** để chạy trò chơi trong trình chỉnh sửa.

### Build Dự Án
1. Mở bảng **Build** trong Cocos Creator.
2. Chọn nền tảng mục tiêu (ví dụ: Web, Android, iOS).
3. Nhấn **Build** để tạo các tệp build.

## Tính Năng

- **Chuyển Động Giỏ**: Người chơi có thể di chuyển giỏ để bắt kẹo rơi.
- **Cơ Chế Kẹo**: Cơ chế rơi kẹo thực tế.
- **Hiệu Ứng Âm Thanh**: Nhạc nền và hiệu ứng âm thanh sống động.
- **Sprites và Textures**: Hình ảnh chất lượng cao sử dụng spritesheet.

## Cơ Chế Trò Chơi

- Kẹo rơi ngẫu nhiên từ trên xuống.
- Người chơi điều khiển giỏ di chuyển trái phải để hứng kẹo.
- Mỗi lần hứng được kẹo, người chơi được cộng 1 điểm.
- Nếu kẹo rơi chạm nền 3 lần, trò chơi kết thúc (game over).
- Khi game over, hiển thị popup thông báo điểm số và nút chơi lại.

## Tổng Quan Scripts

### `BasketController.ts`
Xử lý chuyển động của giỏ và tương tác với kẹo.

### `Candy.ts`
Định nghĩa hành vi của kẹo, bao gồm cơ chế rơi và phát hiện va chạm.

### `GameManager.ts`
Quản lý trạng thái tổng thể của trò chơi, bao gồm theo dõi điểm số và điều kiện kết thúc trò chơi.

## Tài Nguyên

### Âm Thanh
- `bg.mp3`: Nhạc nền.
- `pop.mp3`: Hiệu ứng âm thanh khi bắt được kẹo.
- `ting.mp3`: Hiệu ứng âm thanh khi bỏ lỡ kẹo.

### Textures
- `background.jpg`: Hình nền của trò chơi.
- `basket.png`: Hình ảnh của giỏ.
- `candy_spritesheet.png`: Spritesheet cho hoạt ảnh kẹo.

## Đóng Góp

1. Fork repository.
2. Tạo một nhánh mới:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit thay đổi của bạn:
   ```bash
   git commit -m "Thêm tính năng mới"
   ```
4. Push lên nhánh:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Mở pull request.

## Giấy Phép
Dự án này được cấp phép theo [MIT License](LICENSE).

## Ghi Nhận
- [Cocos Creator](https://www.cocos.com/en/creator) cho công cụ phát triển trò chơi.
- Các thư viện và công cụ mã nguồn mở được sử dụng trong dự án.