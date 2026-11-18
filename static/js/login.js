/* 
    - Xử lý trang đăng nhập
   */

/* ---------- Dữ liệu giả: 3 tài khoản để test 3 vai trò ---------- */
const mockAccounts = [
    { username: "079205002627", password: "123456789", role: "Student", fullName: "Lưu Nguyễn Hồng Phúc" },
    { username: "GV012",        password: "123456789", role: "Teacher", fullName: "Trần Thị Mỹ Tiên" },
    { username: "QT001",        password: "123456789", role: "Admin",   fullName: "Lê Đức Danh" }
];

/* ---------- Nút con mắt xem mật khẩu ---------- */
document.getElementById("showPasswordBtn").onclick = function () {
    const input = document.getElementById("password");
    const icon = document.getElementById("eyeIcon");

    if (input.type === "password") {
        input.type = "text";
        icon.className = "bi bi-eye";
    } else {
        input.type = "password";
        icon.className = "bi bi-eye-slash";
    }
};

/* ---------- Hiện thông báo lỗi ---------- */
function showError(message) {
    document.getElementById("errorText").innerText = message;
    document.getElementById("errorBox").style.display = "flex";
}

function hideError() {
    document.getElementById("errorBox").style.display = "none";
}

/* ---------- Bấm nút Đăng nhập ---------- */
document.getElementById("loginForm").onsubmit = async function (e) {
    e.preventDefault();
    hideError();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // Kiểm tra bỏ trống trước khi gọi server
    if (username === "" || password === "") {
        showError("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
        return;
    }

    const button = document.getElementById("submitBtn");
    button.disabled = true;
    button.innerText = "Đang đăng nhập...";

    // Gọi API đăng nhập của TV3 (controllers/auth_controller.py)
    let result;
    try {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username, password: password })
        });
        result = await res.json();
    } catch (err) {
        // Backend chưa có thì kiểm tra tạm bằng danh sách tài khoản giả
        console.warn("Chưa gọi được /api/login -> kiểm tra bằng dữ liệu giả.");
        result = checkMockCredentials(username, password);
    }

    button.disabled = false;
    button.innerText = "Đăng nhập";

    if (result && result.success) {
        // Lưu lại để các trang sau hiện tên người dùng
        localStorage.setItem("currentUser", JSON.stringify(result.user));

        // Chuyển trang theo vai trò
        if (result.user.role === "Student") {
            window.location.href = "student/student_dashboard.html";
        } else if (result.user.role === "Teacher") {
            window.location.href = "teacher/teacher_dashboard.html";
        } else {
            window.location.href = "admin/admin_dashboard.html";
        }
    } else {
        showError("Tên đăng nhập hoặc mật khẩu không chính xác!");
    }
};

/* ---------- Kiểm tra bằng dữ liệu giả ---------- */
function checkMockCredentials(username, password) {
    for (let i = 0; i < mockAccounts.length; i++) {
        if (mockAccounts[i].username === username && mockAccounts[i].password === password) {
            return { success: true, user: mockAccounts[i] };
        }
    }
    return { success: false };
}