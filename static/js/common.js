/*
   Hàm dùng chung cho các trang
   */

/* Gọi API bằng fetch.
   Nếu backend chưa chạy xong thì lấy tạm dữ liệu giả
   để test giao diện . */
async function goiAPI(duongDan, duLieuGia) {
    try {
        const res = await fetch(duongDan);
        if (!res.ok) {
            throw new Error("Lỗi " + res.status);
        }
        return await res.json();
    } catch (err) {
        console.warn("Chưa gọi được " + duongDan + " -> dùng dữ liệu giả.", err.message);
        // giả độ trễ mạng một chút cho giống thật
        await new Promise(r => setTimeout(r, 150));
        return duLieuGia;
    }
}

/* Gửi dữ liệu lên server (POST) */
async function guiAPI(duongDan, duLieu) {
    try {
        const res = await fetch(duongDan, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(duLieu)
        });
        return await res.json();
    } catch (err) {
        console.warn("Chưa gửi được " + duongDan, err.message);
        return { status: "ok", ghi_chu: "dữ liệu giả" };
    }
}

/* Lấy thẻ theo id.
    */
function lay(id) {
    return document.getElementById(id) || {};
}

/* Mở / đóng menu bên trái trên điện thoại */
function batMenu() {
    const nut = document.getElementById("nutMenu");
    const sidebar = document.getElementById("sidebar");
    const lopPhu = document.getElementById("lopPhu");

    if (!nut) return;

    nut.onclick = function () {
        sidebar.classList.add("mo");
        lopPhu.classList.add("hien");
    };

    lopPhu.onclick = function () {
        sidebar.classList.remove("mo");
        lopPhu.classList.remove("hien");
    };

    // bấm vào menu thì đóng luôn (trên điện thoại)
    const cacLink = document.querySelectorAll(".menu a");
    for (let i = 0; i < cacLink.length; i++) {
        cacLink[i].addEventListener("click", function () {
            if (window.innerWidth < 992) {
                sidebar.classList.remove("mo");
                lopPhu.classList.remove("hien");
            }
        });
    }
}


/* Đổi số thành dạng có dấu chấm: 1248 -> 1.248 */
function dinhDangSo(so) {
    return so.toLocaleString("vi-VN");
}

/* Tạo nhãn trạng thái (badge) theo tên trạng thái */
function nhanTrangThai(trangThai) {
    let mau = "nhan-xam";

    if (trangThai === "Đang mở" || trangThai === "Hoạt động" || trangThai === "Cho phép") {
        mau = "nhan-duong";
    } else if (trangThai === "Đã kết thúc" || trangThai === "Đạt" || trangThai === "Dễ"
        || trangThai === "Thành công" || trangThai === "Đã hoàn thành" || trangThai === "Đang sử dụng") {
        mau = "nhan-xanh";
    } else if (trangThai === "Sắp diễn ra" || trangThai === "Trung bình" || trangThai === "Chưa công bố") {
        mau = "nhan-cam";
    } else if (trangThai === "Chưa đạt" || trangThai === "Khó" || trangThai === "Sai") {
        mau = "nhan-do";
    }

    return '<span class="nhan-tt ' + mau + '">' + trangThai + "</span>";
}

/* Chạy khi trang vừa tải xong */
document.addEventListener("DOMContentLoaded", function () {
    batMenu();
});
