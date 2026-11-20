# 📝 Quiz Examination Systems
**Nền tảng quản lý ngân hàng câu hỏi, tổ chức kỳ thi và thi trắc nghiệm trực tuyến**

## 📋 Giới Thiệu
**Quiz Examination Systems** là hệ thống hỗ trợ tổ chức kiểm tra, đánh giá trực tuyến dành cho môi trường giáo dục, đáp ứng hiệu năng ổn định cho tối đa **1.000 thí sinh** truy cập và làm bài đồng thời:

- 📚 **Quản Lý Ngân Hàng Câu Hỏi**: Hỗ trợ đa dạng loại câu hỏi (trắc nghiệm nhiều lựa chọn, đúng/sai, điền từ), phân loại theo môn học, chủ đề, mức độ khó (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao) và nhập/xuất hàng loạt qua file Excel/Word.
- 🗂️ **Tạo & Cấu Hình Đề Thi Linh Hoạt**: Hỗ trợ tạo đề thủ công hoặc sinh đề ngẫu nhiên từ ngân hàng câu hỏi; thiết lập lịch thi, thời lượng làm bài, số lần thi tối đa, mật khẩu phòng thi và trộn câu hỏi/đáp án.
- ⏱️ **Thi Trực Tuyến Thời Gian Thực**: Giao diện làm bài tập trung, đồng hồ đếm ngược, bảng điều hướng câu hỏi đã làm/chưa làm, tự động lưu đáp án (`< 2 giây`) và tự động nộp bài khi hết giờ.
- 📊 **Chấm Điểm Tự Động & Thống Kê**: Chấm điểm tức thì ngay sau khi nộp bài, hỗ trợ xem điểm số và đáp án chi tiết, lưu lịch sử thi và xuất báo cáo thống kê ra file Excel/PDF.

## 👥 Vai Trò Người Dùng
| Role | Mô tả |
|------|-------|
| **Admin** *(Quản trị viên)* | Kế thừa toàn bộ quyền của Teacher; quản lý tài khoản, phân quyền người dùng, quản lý danh mục (môn học, khóa học, lớp học, khối lớp) và cấu hình hệ thống |
| **Teacher** *(Giáo viên / Người ra đề)* | Quản lý ngân hàng câu hỏi (thêm, sửa, xóa, import/export), tạo và cấu hình đề thi/ca thi, xem thống kê kết quả và xuất báo cáo |
| **Student** *(Học sinh / Thí sinh)* | Đăng nhập, xác nhận thông tin phòng thi, làm bài thi trực tuyến, theo dõi điểm số, đáp án và lịch sử các lần thi |