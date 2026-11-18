/*
   Hàm dùng chung cho các trang
   */

/* Gọi API bằng fetch.
   Nếu backend chưa chạy xong thì lấy tạm dữ liệu giả
   để test giao diện . */
async function callAPI(url, mockData) {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Lỗi " + res.status);
        }
        return await res.json();
    } catch (err) {
        console.warn("Chưa gọi được " + url + " -> dùng dữ liệu giả.", err.message);
        // giả độ trễ mạng một chút cho giống thật
        await new Promise(r => setTimeout(r, 150));
        return mockData;
    }
}

/* Gửi dữ liệu lên server (POST) */
async function postAPI(url, data) {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return await res.json();
    } catch (err) {
        console.warn("Chưa gửi được " + url, err.message);
        return { status: "ok", note: "dữ liệu giả" };
    }
}

/* Lấy thẻ theo id.
    */
function getEl(id) {
    return document.getElementById(id) || {};
}

/* Mở / đóng menu bên trái trên điện thoại */
function initMenu() {
    const button = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    if (!button) return;

    button.onclick = function () {
        sidebar.classList.add("open");
        overlay.classList.add("show");
    };

    overlay.onclick = function () {
        sidebar.classList.remove("open");
        overlay.classList.remove("show");
    };

    // bấm vào menu thì đóng luôn (trên điện thoại)
    const links = document.querySelectorAll(".menu a");
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function () {
            if (window.innerWidth < 992) {
                sidebar.classList.remove("open");
                overlay.classList.remove("show");
            }
        });
    }
}


/* Đổi số thành dạng có dấu chấm: 1248 -> 1.248 */
function formatNumber(number) {
    return number.toLocaleString("vi-VN");
}

/* Tạo nhãn trạng thái (badge) theo tên trạng thái */
function renderStatusBadge(status) {
    let colorClass = "badge-gray";

    if (status === "Đang mở" || status === "Hoạt động" || status === "Cho phép") {
        colorClass = "badge-blue";
    } else if (status === "Đã kết thúc" || status === "Đạt" || status === "Dễ"
        || status === "Thành công" || status === "Đã hoàn thành" || status === "Đang sử dụng") {
        colorClass = "badge-green";
    } else if (status === "Sắp diễn ra" || status === "Trung bình" || status === "Chưa công bố") {
        colorClass = "badge-orange";
    } else if (status === "Chưa đạt" || status === "Khó" || status === "Sai") {
        colorClass = "badge-red";
    }

    return '<span class="status-badge ' + colorClass + '">' + status + "</span>";
}

/* Chạy khi trang vừa tải xong */
document.addEventListener("DOMContentLoaded", function () {
    initMenu();
});