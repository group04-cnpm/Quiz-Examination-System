/* 
   PHẦN 1: DỮ LIỆU GIẢ
    */

const adminMockData = {

    // 4 ô số liệu màn Tổng quan
    stats: [
        { label: "Tổng người dùng",        number: "1.248", note: "1.180 sinh viên · 64 giảng viên · 4 quản trị", icon: "bi-people" },
        { label: "Kỳ thi trong học kỳ",    number: "86",    note: "12 đang mở · 18 sắp diễn ra", icon: "bi-clipboard-check" },
        { label: "Câu hỏi trong hệ thống", number: "3.642", note: "36 môn học",                  icon: "bi-journal-bookmark" },
        { label: "Lượt thi đã nộp",        number: "2.816", note: "Học kỳ N • 2026–2027",        icon: "bi-inbox" }
    ],

    // Tình trạng hệ thống
    systemStatus: [
        { label: "Năm học hiện tại",  value: "2026–2027 · Học kỳ N" },
        { label: "Cơ cấu đào tạo",    value: "36 môn học · 12 khóa học · 32 lớp · 4 khối lớp" },
        { label: "Thời gian hệ thống", value: "12/11/2026 · 09:30 · UTC+7" },
        { label: "Phiên bản",         value: "Hệ thống thi trắc nghiệm 1.0" }
    ],

    // Lịch sử hoạt động
    activityLogs: [
        { time: "12/11 · 09:20", user: "Lê Đức Danh",           role: "Quản trị viên", action: "Cập nhật lớp CNTT K25",              result: "Thành công" },
        { time: "12/11 · 09:05", user: "Trần Thị Mỹ Tiên",      role: "Giảng viên",    action: "Xuất báo cáo kỳ thi CNPM-2026-GK",   result: "Thành công" },
        { time: "12/11 · 08:55", user: "Lê Đức Danh",           role: "Quản trị viên", action: "Tạo tài khoản sinh viên 0703020100", result: "Thành công" },
        { time: "12/11 · 08:42", user: "Lưu Nguyễn Hồng Phúc",  role: "Sinh viên",     action: "Nộp bài thi CNPM-2026-GK",           result: "Thành công" },
        { time: "12/11 · 08:15", user: "Lê Đức Danh",           role: "Quản trị viên", action: "Gán vai trò Giảng viên cho GV065",   result: "Thành công" },
        { time: "11/11 · 16:30", user: "Trần Thị Mỹ Tiên",      role: "Giảng viên",    action: "Công bố kỳ thi CNPM-2026-GK",        result: "Thành công" },
        { time: "11/11 · 15:10", user: "Lê Đức Danh",           role: "Quản trị viên", action: "Cập nhật thông tin năm học 2026–2027", result: "Thành công" }
    ],

    // Danh sách người dùng
    userList: [
        { code: "23011234", name: "Lưu Nguyễn Hồng Phúc", email: "phuclnh1234@ut.edu.vn", role: "Sinh viên",     unit: "CNTT K25",     status: "Hoạt động" },
        { code: "23011235", name: "Trần Đức Huy",         email: "huytd1234@ut.edu.vn",   role: "Sinh viên",     unit: "CNTT K25",     status: "Hoạt động" },
        { code: "23011236", name: "Lê Thu Hương",         email: "huonglt1234@ut.edu.vn", role: "Sinh viên",     unit: "CNTT K25",     status: "Hoạt động" },
        { code: "GV012",    name: "Trần Thị Mỹ Tiên",     email: "tien.tran@ut.edu.vn",   role: "Giảng viên",    unit: "Khoa CNTT",    status: "Hoạt động" },
        { code: "GV018",    name: "Nguyễn Thu Hà",        email: "hnt1234@ut.edu.vn",     role: "Giảng viên",    unit: "Khoa CNTT",    status: "Hoạt động" },
        { code: "QT001",    name: "Lê Đức Danh",          email: "nld1234@ut.edu.vn",     role: "Quản trị viên", unit: "Phòng Đào tạo", status: "Hoạt động" }
    ],

    // 3 thẻ vai trò
    roles: [
        { name: "Sinh viên",     count: "1.180 tài khoản", description: "Chỉ dự thi và xem dữ liệu thi của bản thân." },
        { name: "Giảng viên",    count: "64 tài khoản",    description: "Quản lý câu hỏi, kỳ thi, kết quả trong môn học phụ trách." },
        { name: "Quản trị viên", count: "4 tài khoản",     description: "Kế thừa quyền giảng viên và quản trị hệ thống." }
    ],

    // Bảng phân quyền (1 = cho phép, 0 = không)
    permissions: [
        { feature: "Xem danh sách & thông tin kỳ thi",      student: 1, teacher: 0, admin: 0 },
        { feature: "Tham gia thi, trả lời & nộp bài",       student: 1, teacher: 0, admin: 0 },
        { feature: "Xem kết quả & đáp án",                  student: 1, teacher: 1, admin: 0 },
        { feature: "Xem lịch sử thi",                       student: 0, teacher: 1, admin: 0 },
        { feature: "Quản lý câu hỏi & nhập / xuất Excel, Word", student: 0, teacher: 1, admin: 1 },
        { feature: "Tạo, chỉnh sửa & cấu hình kỳ thi",      student: 0, teacher: 1, admin: 1 },
        { feature: "Xem kết quả & thống kê kỳ thi",         student: 0, teacher: 1, admin: 1 },
        { feature: "Xuất báo cáo Excel / PDF",              student: 0, teacher: 1, admin: 1 },
        { feature: "Quản lý tài khoản người dùng",          student: 0, teacher: 0, admin: 1 },
        { feature: "Quản lý vai trò & phân quyền",          student: 0, teacher: 0, admin: 1 },
        { feature: "Quản lý môn học, khóa học, lớp & khối lớp", student: 0, teacher: 0, admin: 1 },
        { feature: "Cấu hình hệ thống",                     student: 0, teacher: 0, admin: 1 },
        { feature: "Xem lịch sử hoạt động hệ thống",        student: 0, teacher: 0, admin: 1 }
    ],

    // Môn học
    subjectList: [
        { code: "CSDL",  name: "Cơ sở dữ liệu",             credits: 3, department: "Công nghệ thông tin", status: "Đang sử dụng" },
        { code: "LTHDT", name: "Lập trình hướng đối tượng", credits: 3, department: "Công nghệ thông tin", status: "Đang sử dụng" },
        { code: "MMT",   name: "Mạng máy tính",             credits: 3, department: "Công nghệ thông tin", status: "Đang sử dụng" },
        { code: "HDH",   name: "Hệ điều hành",              credits: 3, department: "Công nghệ thông tin", status: "Đang sử dụng" },
        { code: "CNPM",  name: "Công nghệ phần mềm",        credits: 3, department: "Công nghệ thông tin", status: "Đang sử dụng" }
    ],

    // Khóa học
    cohortList: [
        { name: "CNTT K25", academicYear: "2025–2029" },
        { name: "CNTT K24", academicYear: "2024–2028" },
        { name: "QTKD K23", academicYear: "2023–2027" }
    ],

    // Lớp học
    classList: [
        { name: "CNTT K25", grade: "Năm 2", size: 62 },
        { name: "CNTT K23", grade: "Năm 4", size: 60 },
        { name: "CNTT K24", grade: "Năm 3", size: 55 }
    ],

    // Khối lớp
    gradeList: [
        { name: "Năm 1", details: "N1 · 8 lớp" },
        { name: "Năm 2", details: "N2 · 8 lớp" },
        { name: "Năm 3", details: "N3 · 9 lớp" },
        { name: "Năm 4", details: "N4 · 7 lớp" }
    ]
};

/*
   PHẦN 2: CÁC HÀM VẼ GIAO DIỆN
   */

/* Vẽ 4 ô số liệu */
function renderAdminStats(containerId, list) {
    let html = "";

    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        html += '<div class="col-6 col-lg-3">' +
            '<div class="stat-card">' +
            '<div class="label"><span>' + item.label + '</span><i class="bi ' + item.icon + '"></i></div>' +
            '<div class="number">' + item.number + "</div>" +
            '<div class="note">' + item.note + "</div>" +
            "</div></div>";
    }

    getEl(containerId).innerHTML = html;
}

/* Vẽ danh sách "nhãn - giá trị" */
function renderAdminRows(containerId, list) {
    let html = "";

    for (let i = 0; i < list.length; i++) {
        html += '<div class="admin-row">' +
            '<span class="label">' + list[i].label + "</span>" +
            '<span class="value">' + list[i].value + "</span></div>";
    }

    getEl(containerId).innerHTML = html;
}

/* Vẽ bảng lịch sử hoạt động */
function renderActivityLogs() {
    const list = adminMockData.activityLogs;
    let html = "";

    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        html += "<tr>" +
            '<td data-label="Thời gian">' + item.time + "</td>" +
            '<td data-label="Người thực hiện" class="primary-name">' + item.user + "</td>" +
            '<td data-label="Vai trò">' + item.role + "</td>" +
            '<td data-label="Hoạt động">' + item.action + "</td>" +
            '<td data-label="Kết quả">' + renderStatusBadge(item.result) + "</td>" +
            "</tr>";
    }

    getEl("activityLogTable").innerHTML = html;
}

/* Vẽ bảng người dùng */
function renderUserTable(filter, keyword) {
    const list = adminMockData.userList;
    let html = "";

    for (let i = 0; i < list.length; i++) {
        const user = list[i];

        if (filter && filter !== "Tất cả" && user.role !== filter) continue;

        if (keyword) {
            const searchStr = (user.code + " " + user.name + " " + user.email).toLowerCase();
            if (searchStr.indexOf(keyword.toLowerCase()) === -1) continue;
        }

        html += "<tr>" +
            '<td data-label="Mã tài khoản">' + user.code + "</td>" +
            '<td data-label="Họ tên"><div class="primary-name">' + user.name + "</div>" +
            '<div class="sub-line">' + user.email + "</div></td>" +
            '<td data-label="Vai trò">' + user.role + "</td>" +
            '<td data-label="Lớp / Đơn vị">' + user.unit + "</td>" +
            '<td data-label="Trạng thái">' + renderStatusBadge(user.status) + "</td>" +
            '<td data-label="Thao tác" class="actions">' +
            "<a href=\"#\" onclick=\"selectAccountToEdit('" + user.code + "','" + user.name + "');return false;\">Sửa</a>" +
            "<span>·</span><a href=\"#\" onclick=\"deleteAccount();return false;\">Xóa</a></td>" +
            "</tr>";
    }

    if (html === "") {
        html = '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:24px;">' +
            "Không tìm thấy tài khoản nào.</td></tr>";
    }

    getEl("userTable").innerHTML = html;
}

/* Bấm "Sửa" thì đổ dữ liệu xuống form bên dưới */
function selectAccountToEdit(code, name) {
    getEl("editingAccountText").innerText = "Tài khoản đang chọn: " + code + " - " + name;
    getEl("editFullName").value = name;
    getEl("editUsername").value = code;

    // cuộn xuống form cho dễ nhìn
    getEl("editingAccountText").scrollIntoView({ behavior: "smooth" });
}

function deleteAccount() {
    if (confirm("Bạn có chắc muốn xóa tài khoản này không?")) {
        alert("Đã xóa tài khoản (dữ liệu giả).");
    }
}

/* Vẽ 3 thẻ vai trò */
function renderRoleCards() {
    const list = adminMockData.roles;
    let html = "";

    for (let i = 0; i < list.length; i++) {
        html += '<div class="col-md-4">' +
            '<div class="role-card">' +
            '<div class="name">' + list[i].name + "</div>" +
            '<div class="account-count">' + list[i].count + "</div>" +
            '<div class="description">' + list[i].description + "</div>" +
            "</div></div>";
    }

    getEl("roleCards").innerHTML = html;
}

/* Vẽ bảng phân quyền */
function renderPermissionTable() {
    const list = adminMockData.permissions;
    let html = "";

    for (let i = 0; i < list.length; i++) {
        const perm = list[i];
        html += "<tr>" +
            '<td data-label="Chức năng" class="primary-name">' + perm.feature + "</td>" +
            '<td data-label="Sinh viên">' + renderPermissionCell(perm.student) + "</td>" +
            '<td data-label="Giảng viên">' + renderPermissionCell(perm.teacher) + "</td>" +
            '<td data-label="Quản trị viên">' + renderPermissionCell(perm.admin) + "</td>" +
            "</tr>";
    }

    getEl("permissionTable").innerHTML = html;
}

/* 1 ô trong bảng phân quyền */
function renderPermissionCell(isAllowed) {
    if (isAllowed === 1) {
        return '<span class="allowed"><i class="bi bi-check-circle"></i> Cho phép</span>';
    }
    return '<span class="denied">— Không</span>';
}

/* Vẽ bảng môn học */
function renderSubjectTable(keyword) {
    const list = adminMockData.subjectList;
    let html = "";

    for (let i = 0; i < list.length; i++) {
        const subject = list[i];

        if (keyword) {
            const searchStr = (subject.code + " " + subject.name).toLowerCase();
            if (searchStr.indexOf(keyword.toLowerCase()) === -1) continue;
        }

        html += "<tr>" +
            '<td data-label="Mã môn" class="primary-name">' + subject.code + "</td>" +
            '<td data-label="Tên môn học">' + subject.name + "</td>" +
            '<td data-label="Số tín chỉ">' + subject.credits + "</td>" +
            '<td data-label="Khoa">' + subject.department + "</td>" +
            '<td data-label="Trạng thái">' + renderStatusBadge(subject.status) + "</td>" +
            '<td data-label="Thao tác" class="actions">' +
            '<a href="#" onclick="return false;">Sửa</a><span>·</span>' +
            '<a href="#" onclick="return false;">Xóa</a></td>' +
            "</tr>";
    }

    if (html === "") {
        html = '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:24px;">' +
            "Không tìm thấy môn học nào.</td></tr>";
    }

    getEl("subjectTable").innerHTML = html;
}

/* Vẽ bảng khóa học */
function renderCohortTable() {
    const list = adminMockData.cohortList;
    let html = "";

    for (let i = 0; i < list.length; i++) {
        html += "<tr>" +
            '<td data-label="Khóa học" class="primary-name">' + list[i].name + "</td>" +
            '<td data-label="Niên khóa">' + list[i].academicYear + "</td>" +
            '<td data-label="Thao tác" class="actions">' +
            '<a href="#" onclick="return false;">Sửa</a><span>·</span>' +
            '<a href="#" onclick="return false;">Xóa</a></td>' +
            "</tr>";
    }

    getEl("cohortTable").innerHTML = html;
}

/* Vẽ bảng lớp học */
function renderClassTable() {
    const list = adminMockData.classList;
    let html = "";

    for (let i = 0; i < list.length; i++) {
        html += "<tr>" +
            '<td data-label="Lớp" class="primary-name">' + list[i].name + "</td>" +
            '<td data-label="Khối lớp">' + list[i].grade + "</td>" +
            '<td data-label="Sĩ số">' + list[i].size + "</td>" +
            '<td data-label="Thao tác" class="actions">' +
            '<a href="#" onclick="return false;">Sửa</a><span>·</span>' +
            '<a href="#" onclick="return false;">Xóa</a></td>' +
            "</tr>";
    }

    getEl("classTable").innerHTML = html;
}

/* Vẽ 4 ô khối lớp */
function renderGradeList() {
    const list = adminMockData.gradeList;
    let html = "";

    for (let i = 0; i < list.length; i++) {
        html += '<div class="col-6 col-lg-3">' +
            '<div class="grade-box">' +
            '<div class="name">' + list[i].name + "</div>" +
            '<div class="details">' + list[i].details + "</div>" +
            '<div class="actions">' +
            '<a href="#" onclick="return false;">Sửa</a><span>·</span>' +
            '<a href="#" onclick="return false;">Xóa</a></div>' +
            "</div></div>";
    }

    getEl("gradeListContainer").innerHTML = html;
}

/* 
   PHẦN 3: GẮN SỰ KIỆN + TẢI DỮ LIỆU
  */

/* Tab lọc vai trò người dùng */
function bindUserTabs() {
    const buttons = document.querySelectorAll("#userTabs button");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            for (let j = 0; j < buttons.length; j++) {
                buttons[j].classList.remove("active");
            }
            this.classList.add("active");
            renderUserTable(this.getAttribute("data-filter"), getEl("searchUser").value);
        };
    }
}

/* Tab cơ cấu đào tạo (chỉ đổi màu, nội dung mẫu bên dưới) */
function bindStructureTabs() {
    const buttons = document.querySelectorAll("#structureTabs button");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            for (let j = 0; j < buttons.length; j++) {
                buttons[j].classList.remove("active");
            }
            this.classList.add("active");
        };
    }
}

async function loadAdminPage() {
    // Gọi API của TV3 (auth_controller.py), chưa có thì dùng dữ liệu giả
    const dashboardData = await callAPI("/api/admin/dashboard", adminMockData);

    renderAdminStats("adminStatsContainer", dashboardData.stats);
    renderAdminRows("systemStatusContainer", adminMockData.systemStatus);
    renderActivityLogs();

    renderUserTable("Tất cả", "");

    renderRoleCards();
    renderPermissionTable();

    renderSubjectTable("");
    renderCohortTable();
    renderClassTable();
    renderGradeList();
}

document.addEventListener("DOMContentLoaded", function () {
    loadAdminPage();
    bindUserTabs();
    bindStructureTabs();

    getEl("searchUser").oninput = function () {
        const activeTab = document.querySelector("#userTabs button.active");
        renderUserTable(activeTab.getAttribute("data-filter"), this.value);
    };

    getEl("searchSubject").oninput = function () {
        renderSubjectTable(this.value);
    };

    // Lưu tài khoản
    getEl("saveAccountBtn").onclick = async function () {
        const fullName = getEl("editFullName").value.trim();
        const email = getEl("editEmail").value.trim();

        if (fullName === "") {
            alert("Họ và tên không được để trống!");
            return;
        }
        if (email.indexOf("@") === -1) {
            alert("Email không đúng định dạng!");
            return;
        }

        await postAPI("/api/admin/save-user", { full_name: fullName, email: email });
        alert("Đã lưu tài khoản thành công!");
    };

    getEl("addUserBtn").onclick = function () {
        alert("Mở biểu mẫu thêm người dùng mới (dữ liệu giả).");
    };

    getEl("addSubjectBtn").onclick = function () {
        alert("Mở biểu mẫu thêm môn học mới (dữ liệu giả).");
    };

    getEl("savePermissionsBtn").onclick = async function () {
        await postAPI("/api/admin/save-roles", {});
        alert("Đã lưu phân quyền!");
    };

    // Lưu cấu hình hệ thống
    getEl("saveConfigBtn").onclick = async function () {
        const systemName = getEl("systemName").value.trim();
        const duration = parseInt(getEl("defaultDuration").value);
        const attempts = parseInt(getEl("defaultAttempts").value);

        if (systemName === "") {
            alert("Tên hệ thống không được để trống!");
            return;
        }
        if (isNaN(duration) || duration <= 0) {
            alert("Thời lượng mặc định phải lớn hơn 0 phút!");
            return;
        }
        if (isNaN(attempts) || attempts <= 0) {
            alert("Số lượt thi mặc định phải lớn hơn 0!");
            return;
        }

        await postAPI("/api/admin/save-config", { name: systemName, duration: duration, attempts: attempts });
        alert("Đã lưu cấu hình hệ thống!");
    };
});