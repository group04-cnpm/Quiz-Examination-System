/* 
 Xử lý giao diện sinh viên
   */

/* 
   PHẦN 1: DỮ LIỆU GIẢ 
    */

const duLieuGiaSV = {

    // 4 ô số liệu màn Tổng quan
    soLieu: [
        { nhan: "Kỳ thi đang mở",        so: "03",  ghiChu: "Bạn có thể tham gia ngay",   icon: "bi-journal-text" },
        { nhan: "Kỳ thi sắp diễn ra",    so: "02",  ghiChu: "Trong 7 ngày tới",           icon: "bi-calendar-event" },
        { nhan: "Bài thi đã hoàn thành", so: "08",  ghiChu: "Học kỳ I • 2026–2027",       icon: "bi-check-circle" },
        { nhan: "Điểm trung bình",       so: "8,2", ghiChu: "Trên thang điểm 10",         icon: "bi-bar-chart" }
    ],

    // Kỳ thi nổi bật ở màn Tổng quan
    kyThiNoiBat: [
        {
            ten: "Kiểm tra giữa kỳ Cơ sở dữ liệu", mon: "Cơ sở dữ liệu · Giảng viên: Nguyễn Văn Diệu",
            gio: "Hôm nay, 08:00–09:00 · 30 câu · 45 phút", trangThai: "Đang mở", nut: "Xem kỳ thi"
        },
        {
            ten: "Kiểm tra chương 2 - Lập trình Java", mon: "Lập trình hướng đối tượng · Giảng viên: Lê Quốc Anh",
            gio: "Hôm nay, 08:00–17:00 · 20 câu · 30 phút", trangThai: "Đang mở", nut: "Xem kỳ thi"
        },
        {
            ten: "Kiểm tra chương 3 - Mạng máy tính", mon: "Mạng máy tính · Giảng viên: Phan Thị Hồng Nhung",
            gio: "16/11/2026, 09:00–10:00 · 20 câu · 30 phút", trangThai: "Sắp diễn ra", nut: "Chưa đến giờ"
        }
    ],

    // Thông tin học tập
    thongTinHocTap: [
        { nhan: "Họ và tên", giaTri: "Lưu Nguyễn Hồng Phúc" },
        { nhan: "MSSV",      giaTri: "079205002627" },
        { nhan: "Lớp",       giaTri: "CNTT K25" },
        { nhan: "Khóa",      giaTri: "2025–2029" },
        { nhan: "Khoa",      giaTri: "Công nghệ thông tin" }
    ],

    // Kết quả gần đây
    ketQuaGanDay: [
        { kyThi: "Kiểm tra chương 2 - Cơ sở dữ liệu", ngay: "05/11/2026", diem: "8,5 / 10", kq: "Đạt" },
        { kyThi: "Kiểm tra chương 1 - Lập trình Java", ngay: "29/10/2026", diem: "8,0 / 10", kq: "Đạt" }
    ],

    // Danh sách kỳ thi đầy đủ
    dsKyThi: [
        { ten: "Kiểm tra giữa kỳ Cơ sở dữ liệu",    mon: "Cơ sở dữ liệu",             gio: "12/11/2026 · 08:00–09:00", quyMo: "30 câu · 45 phút", luot: "0 / 1", tt: "Đang mở",       tt2: "Vào thi" },
        { ten: "Kiểm tra chương 2 - Lập trình Java", mon: "Lập trình Java",            gio: "12/11/2026 · 08:00–17:00", quyMo: "20 câu · 30 phút", luot: "0 / 2", tt: "Đang mở",       tt2: "Vào thi" },
        { ten: "Ôn tập chương 1 - Cấu trúc rời rạc", mon: "Cấu trúc rời rạc",          gio: "11–13/11/2026 · Cả ngày",  quyMo: "20 câu · 30 phút", luot: "1 / 2", tt: "Đang mở",       tt2: "Thi lại" },
        { ten: "Kiểm tra giữa kỳ - Hệ điều hành",    mon: "Hệ điều hành",              gio: "18/11/2026 · 13:00–14:00", quyMo: "30 câu · 45 phút", luot: "0 / 1", tt: "Sắp diễn ra",   tt2: "Xem thông tin" },
        { ten: "Kiểm tra chương 3 - Mạng máy tính",  mon: "Mạng máy tính",             gio: "16/11/2026 · 09:00–10:00", quyMo: "20 câu · 30 phút", luot: "0 / 1", tt: "Sắp diễn ra",   tt2: "Xem thông tin" },
        { ten: "Kiểm tra chương 2 - Cơ sở dữ liệu",  mon: "Cơ sở dữ liệu",             gio: "05/11/2026 · 08:00–10:00", quyMo: "20 câu · 30 phút", luot: "1 / 1", tt: "Đã hoàn thành", tt2: "Xem kết quả" },
        { ten: "Kiểm tra chương 1 - Lập trình Java", mon: "Lập trình Java",            gio: "29/10/2026 · 09:00–11:00", quyMo: "20 câu · 30 phút", luot: "1 / 1", tt: "Đã hoàn thành", tt2: "Xem kết quả" },
        { ten: "Kiểm tra chương 1 - Mạng máy tính",  mon: "Mạng máy tính",             gio: "22/10/2026 · 08:00–10:00", quyMo: "20 câu · 30 phút", luot: "0 / 1", tt: "Đã đóng",       tt2: "Xem thông tin" }
    ],

    // Lịch thi & đối tượng (màn Thông tin kỳ thi)
    lichThi: [
        { nhan: "Thời gian mở",   giaTri: "12/11/2026 · 08:00" },
        { nhan: "Thời gian đóng", giaTri: "12/11/2026 · 09:00" },
        { nhan: "Lớp dự thi",     giaTri: "CNTT K25 · Khóa 2025–2029" },
        { nhan: "Giảng viên",     giaTri: "Trần Thị Mỹ Tiên" },
        { nhan: "Lượt đã sử dụng", giaTri: "0 / 1 lượt" },
        { nhan: "Cách tính điểm", giaTri: "Thang điểm 10 · Các câu có trọng số bằng nhau" }
    ],

    // Thông tin lượt thi (màn Kết quả)
    luotThi: [
        { nhan: "Sinh viên",      giaTri: "Lưu Nguyễn Hồng Phúc · 079205002627" },
        { nhan: "Mã kỳ thi",      giaTri: "CNPM-2026-GK" },
        { nhan: "Thời gian làm bài", giaTri: "42 phút / 45 phút" },
        { nhan: "Bắt đầu / Nộp bài", giaTri: "12/11/2026 · 08:00 / 08:42" },
        { nhan: "Lượt thi",       giaTri: "1 / 1 · Không còn lượt thi" }
    ],

    // 4 ô thống kê đáp án
    thongKeDapAn: [
        { nhan: "Câu trả lời đúng", so: "24 / 30", ghiChu: "80% tổng số câu hỏi",   icon: "bi-check-circle" },
        { nhan: "Câu trả lời sai",  so: "04",      ghiChu: "Xem đáp án bên dưới",   icon: "bi-x-circle" },
        { nhan: "Câu chưa trả lời", so: "02",      ghiChu: "Không tính điểm",       icon: "bi-dash-circle" },
        { nhan: "Tổng số câu",      so: "30",      ghiChu: "Mỗi câu có trọng số bằng nhau", icon: "bi-list-ol" }
    ],

    // Xem lại đáp án
    xemLaiDapAn: [
        {
            stt: 1, de: "UML được sử dụng chủ yếu để làm gì trong phát triển phần mềm?",
            cuaBan: "A. Mô hình hóa và biểu diễn thiết kế hệ thống.",
            dung: "A. Mô hình hóa và biểu diễn thiết kế hệ thống.", kq: "Đúng"
        },
        {
            stt: 2, de: "Mô hình phát triển phần mềm Waterfall có đặc điểm nào?",
            cuaBan: "A. Các giai đoạn được thực hiện song song.",
            dung: "C. Các giai đoạn được thực hiện tuần tự.", kq: "Sai"
        },
        {
            stt: 3, de: "Mục đích chính của kiểm thử phần mềm (Software Testing) là gì?",
            cuaBan: "B. Phát hiện lỗi và xác minh phần mềm đáp ứng yêu cầu.",
            dung: "B. Phát hiện lỗi và xác minh phần mềm đáp ứng yêu cầu.", kq: "Đúng"
        }
    ],

    // 4 ô số liệu màn Lịch sử
    soLieuLichSu: [
        { nhan: "Lượt thi hoàn thành", so: "09",  ghiChu: "Học kỳ I • 2026–2027",  icon: "bi-check2-square" },
        { nhan: "Điểm trung bình",     so: "8,2", ghiChu: "Tất cả các lượt thi",   icon: "bi-bar-chart" },
        { nhan: "Điểm cao nhất",       so: "9,0", ghiChu: "Toán rời rạc",          icon: "bi-trophy" },
        { nhan: "Kết quả đạt",         so: "9 / 9", ghiChu: "Điểm từ 5,0 trở lên", icon: "bi-check-circle" }
    ],

    // Bảng lịch sử thi
    lichSuThi: [
        { ten: "Kiểm tra giữa kỳ Công nghệ phần mềm", ma: "CNPM-2026-KTGK", nop: "12/11/2026 · 08:42", luot: 1, tg: "42 phút", dung: "24 / 30", diem: "8,0", kq: "Đạt" },
        { ten: "Kiểm tra chương 2 - Cơ sở dữ liệu",   ma: "CSDL-2026-KTC2", nop: "05/11/2026 · 08:27", luot: 1, tg: "27 phút", dung: "17 / 20", diem: "8,5", kq: "Đạt" },
        { ten: "Kiểm tra chương 1 - Lập trình Java",  ma: "JAVA-2026-KTC1", nop: "29/10/2026 · 09:28", luot: 1, tg: "28 phút", dung: "16 / 20", diem: "8,0", kq: "Đạt" },
        { ten: "Ôn tập chương 1 - Công nghệ phần mềm", ma: "CNPM-2026-OTC1", nop: "26/10/2026 · 14:24", luot: 1, tg: "24 phút", dung: "18 / 20", diem: "9,0", kq: "Đạt" },
        { ten: "Kiểm tra chương 1 - Cơ sở dữ liệu",   ma: "CSDL-2026-KTC1", nop: "19/10/2026 · 08:26", luot: 1, tg: "26 phút", dung: "15 / 20", diem: "7,5", kq: "Đạt" },
        { ten: "Kiểm tra chương 1 - Hệ điều hành",    ma: "HDH-2026-KTC1",  nop: "15/10/2026 · 10:25", luot: 1, tg: "25 phút", dung: "17 / 20", diem: "8,5", kq: "Đạt" },
        { ten: "Ôn tập nhập môn - Mạng máy tính",     ma: "MMT-2026-OTMM",  nop: "08/10/2026 · 09:22", luot: 1, tg: "22 phút", dung: "16 / 20", diem: "8,0", kq: "Đạt" },
        { ten: "Kiểm tra chương 1 - Cấu trúc rời rạc", ma: "CTRR-2026-CTC1", nop: "01/10/2026 · 14:20", luot: 1, tg: "20 phút", dung: "18 / 20", diem: "9,0", kq: "Đạt" }
    ]
};

/* 
   PHẦN 2: CÁC HÀM VẼ GIAO DIỆN
   */

/* Vẽ 4 ô số liệu */
function veOSoLieu(idKhung, danhSach) {
    let html = "";

    for (let i = 0; i < danhSach.length; i++) {
        const o = danhSach[i];
        html += '<div class="col-6 col-lg-3">' +
            '<div class="the-so-lieu">' +
            '<div class="nhan"><span>' + o.nhan + '</span><i class="bi ' + o.icon + '"></i></div>' +
            '<div class="so">' + o.so + "</div>" +
            '<div class="ghi-chu">' + o.ghiChu + "</div>" +
            "</div></div>";
    }

    lay(idKhung).innerHTML = html;
}

/* Vẽ danh sách kỳ thi nổi bật */
function veKyThiNoiBat(danhSach) {
    let html = "";

    for (let i = 0; i < danhSach.length; i++) {
        const k = danhSach[i];
        const nutMo = k.trangThai === "Đang mở";

        html += '<div class="the-ky-thi-nho">' +
            '<div class="d-flex justify-content-between align-items-start gap-2">' +
            '<div><div class="ten">' + k.ten + "</div>" +
            '<div class="mon">' + k.mon + "</div></div>" +
            nhanTrangThai(k.trangThai) +
            "</div>" +
            '<div class="d-flex justify-content-between align-items-center gap-2 flex-wrap">' +
            '<div class="gio"><i class="bi bi-clock"></i> ' + k.gio + "</div>" +
            (nutMo
                ? '<button class="btn btn-vien btn-sm" onclick="location.href=\'student_exam_info.html\'">' + k.nut + "</button>"
                : '<span style="font-size:12px;color:var(--chu-mo);">' + k.nut + "</span>") +
            "</div></div>";
    }

    lay("dsKyThiNoiBat").innerHTML = html;
}

/* Vẽ danh sách dạng "nhãn - giá trị" */
function veHangThongTin(idKhung, danhSach) {
    let html = "";

    for (let i = 0; i < danhSach.length; i++) {
        html += '<div class="hang-thong-tin">' +
            '<span class="nhan">' + danhSach[i].nhan + "</span>" +
            '<span class="gia-tri">' + danhSach[i].giaTri + "</span></div>";
    }

    lay(idKhung).innerHTML = html;
}

/* Vẽ bảng kết quả gần đây */
function veKetQuaGanDay(danhSach) {
    let html = "";

    for (let i = 0; i < danhSach.length; i++) {
        const d = danhSach[i];
        html += "<tr>" +
            '<td data-nhan="Kỳ thi" class="ten-chinh">' + d.kyThi + "</td>" +
            '<td data-nhan="Ngày thi">' + d.ngay + "</td>" +
            '<td data-nhan="Điểm"><b>' + d.diem + "</b></td>" +
            '<td data-nhan="Kết quả">' + nhanTrangThai(d.kq) + "</td>" +
            '<td data-nhan="Thao tác" class="thao-tac">' +
            '<a href="#" onclick="location.href=\'student_result.html\';return false;">Xem kết quả</a></td>' +
            "</tr>";
    }

    lay("bangKetQuaGanDay").innerHTML = html;
}

/* Vẽ bảng danh sách kỳ thi (có lọc theo tab và ô tìm kiếm) */
function veBangKyThi(loc, tuKhoa) {
    const ds = duLieuGiaSV.dsKyThi;
    let html = "";

    for (let i = 0; i < ds.length; i++) {
        const k = ds[i];

        // lọc theo tab
        if (loc && loc !== "Tất cả" && k.tt !== loc) continue;

        // lọc theo từ khóa
        if (tuKhoa && k.ten.toLowerCase().indexOf(tuKhoa.toLowerCase()) === -1) continue;

        html += "<tr>" +
            '<td data-nhan="Kỳ thi"><div class="ten-chinh">' + k.ten + "</div>" +
            '<div class="dong-phu">' + k.mon + "</div></td>" +
            '<td data-nhan="Thời gian mở thi">' + k.gio + "</td>" +
            '<td data-nhan="Quy mô">' + k.quyMo + "</td>" +
            '<td data-nhan="Lượt thi">' + k.luot + "</td>" +
            '<td data-nhan="Trạng thái">' + nhanTrangThai(k.tt) + "</td>" +
            '<td data-nhan="Thao tác" class="thao-tac">' +
            '<a href="#" onclick="' +
            (k.tt2 === "Xem kết quả" ? "location.href='student_result.html'" : "location.href='student_exam_info.html'") +
            ';return false;">' + k.tt2 + "</a></td>" +
            "</tr>";
    }

    if (html === "") {
        html = '<tr><td colspan="6" style="text-align:center;color:var(--chu-mo);padding:24px;">' +
            "Không tìm thấy kỳ thi nào.</td></tr>";
    }

    lay("bangKyThi").innerHTML = html;
}

/* Vẽ phần xem lại đáp án (có lọc theo tab) */
function veXemLaiDapAn(loc) {
    const ds = duLieuGiaSV.xemLaiDapAn;
    let html = "";

    for (let i = 0; i < ds.length; i++) {
        const c = ds[i];

        if (loc && loc !== "Tất cả" && c.kq !== loc) continue;

        html += '<div class="the-cau-hoi">' +
            '<div class="de-bai">Câu ' + c.stt + ". " + c.de + nhanTrangThai(c.kq) + "</div>" +
            '<div class="hang-dap-an">' +
            '<div class="o-dap-an ' + (c.kq === "Đúng" ? "dung" : "sai") + '">' +
            '<div class="nhan">Đáp án của bạn</div>' +
            '<div class="noi-dung">' + c.cuaBan + "</div></div>" +
            '<div class="o-dap-an dung">' +
            '<div class="nhan">Đáp án đúng</div>' +
            '<div class="noi-dung">' + c.dung + "</div></div>" +
            "</div></div>";
    }

    if (html === "") {
        html = '<div style="text-align:center;color:var(--chu-mo);padding:24px;font-size:13px;">' +
            "Không có câu hỏi nào trong mục này.</div>";
    }

    lay("dsXemLaiDapAn").innerHTML = html;
}

/* Vẽ bảng lịch sử thi */
function veBangLichSu(tuKhoa) {
    const ds = duLieuGiaSV.lichSuThi;
    let html = "";

    for (let i = 0; i < ds.length; i++) {
        const l = ds[i];

        if (tuKhoa) {
            const chuoi = (l.ten + " " + l.ma).toLowerCase();
            if (chuoi.indexOf(tuKhoa.toLowerCase()) === -1) continue;
        }

        html += "<tr>" +
            '<td data-nhan="Kỳ thi"><div class="ten-chinh">' + l.ten + "</div>" +
            '<div class="dong-phu">' + l.ma + "</div></td>" +
            '<td data-nhan="Thời điểm nộp">' + l.nop + "</td>" +
            '<td data-nhan="Lượt">' + l.luot + "</td>" +
            '<td data-nhan="Thời gian">' + l.tg + "</td>" +
            '<td data-nhan="Số câu đúng">' + l.dung + "</td>" +
            '<td data-nhan="Điểm"><b style="color:var(--xanh-dam);">' + l.diem + "</b></td>" +
            '<td data-nhan="Kết quả">' + nhanTrangThai(l.kq) + "</td>" +
            '<td data-nhan="Thao tác" class="thao-tac">' +
            '<a href="#" onclick="location.href=\'student_result.html\';return false;">Xem kết quả</a></td>' +
            "</tr>";
    }

    if (html === "") {
        html = '<tr><td colspan="8" style="text-align:center;color:var(--chu-mo);padding:24px;">' +
            "Không tìm thấy lượt thi nào.</td></tr>";
    }

    lay("bangLichSu").innerHTML = html;
}

/* Đổi lời chào theo giờ trong ngày */
function datLoiChao() {
    const gio = new Date().getHours();
    let chao = "Chào buổi sáng";

    if (gio >= 12 && gio < 18) {
        chao = "Chào buổi chiều";
    } else if (gio >= 18) {
        chao = "Chào buổi tối";
    }

    lay("loiChao").innerText = chao + ", Hồng Phúc!";

    const thu = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    const d = new Date();
    lay("dongNgay").innerText =
        thu[d.getDay()] + ", " + d.getDate() + " tháng " + (d.getMonth() + 1) + " năm " + d.getFullYear() +
        " · Chúc bạn có một buổi thi thật tốt.";
}

/* 
   PHẦN 3: GẮN SỰ KIỆN + TẢI DỮ LIỆU
    */

/* Tab lọc kỳ thi */
function ganTabKyThi() {
    const cacNut = document.querySelectorAll("#tabKyThi button");

    for (let i = 0; i < cacNut.length; i++) {
        cacNut[i].onclick = function () {
            for (let j = 0; j < cacNut.length; j++) {
                cacNut[j].classList.remove("dang-chon");
            }
            this.classList.add("dang-chon");
            veBangKyThi(this.getAttribute("data-loc"), lay("timKyThi").value);
        };
    }
}

/* Tab lọc đáp án */
function ganTabDapAn() {
    const cacNut = document.querySelectorAll("#tabDapAn button");

    for (let i = 0; i < cacNut.length; i++) {
        cacNut[i].onclick = function () {
            for (let j = 0; j < cacNut.length; j++) {
                cacNut[j].classList.remove("dang-chon");
            }
            this.classList.add("dang-chon");
            veXemLaiDapAn(this.getAttribute("data-loc"));
        };
    }
}

/* Tải toàn bộ dữ liệu cho trang sinh viên */
async function taiTrangSinhVien() {
    datLoiChao();

    // Gọi API của TV1 (exam_controller.py), chưa có thì dùng dữ liệu giả
    const tongQuan = await goiAPI("/api/student/dashboard", duLieuGiaSV);

    veOSoLieu("oSoLieuSV", tongQuan.soLieu);
    veKyThiNoiBat(tongQuan.kyThiNoiBat);
    veHangThongTin("thongTinHocTap", tongQuan.thongTinHocTap);
    veKetQuaGanDay(tongQuan.ketQuaGanDay);

    veBangKyThi("Tất cả", "");
    veHangThongTin("lichThiDoiTuong", duLieuGiaSV.lichThi);

    veHangThongTin("thongTinLuotThi", duLieuGiaSV.luotThi);
    veOSoLieu("oThongKeDapAn", duLieuGiaSV.thongKeDapAn);
    veXemLaiDapAn("Tất cả");

    veOSoLieu("oSoLieuLichSu", duLieuGiaSV.soLieuLichSu);
    veBangLichSu("");
}

document.addEventListener("DOMContentLoaded", function () {
    taiTrangSinhVien();
    ganTabKyThi();
    ganTabDapAn();

    // Ô tìm kiếm kỳ thi
    lay("timKyThi").oninput = function () {
        const tabDangChon = document.querySelector("#tabKyThi button.dang-chon");
        veBangKyThi(tabDangChon.getAttribute("data-loc"), this.value);
    };

    // Ô tìm kiếm lịch sử
    lay("timLichSu").oninput = function () {
        veBangLichSu(this.value);
    };

    // Nút xác nhận vào thi -> sang trang làm bài của TV4
    lay("nutVaoThi").onclick = function () {
        const mk = lay("matKhauKyThi").value;
        const dongY = lay("dongYDieuKhoan").checked;

        if (mk === "") {
            alert("Vui lòng nhập mật khẩu kỳ thi!");
            return;
        }
        if (!dongY) {
            alert("Bạn cần xác nhận đã đọc hướng dẫn trước khi vào thi!");
            return;
        }

       
        window.location.href = "take_exam.html";
    };

});
