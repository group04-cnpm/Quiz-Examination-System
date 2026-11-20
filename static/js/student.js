/* 
 Xử lý giao diện sinh viên
   */

/* 
   PHẦN 1: DỮ LIỆU GIẢ 
    */

const studentMockData = {

    // 4 ô số liệu màn Tổng quan
    stats: [
        { label: "Kỳ thi đang mở",        number: "03",  note: "Bạn có thể tham gia ngay",   icon: "bi-journal-text" },
        { label: "Kỳ thi sắp diễn ra",    number: "02",  note: "Trong 7 ngày tới",           icon: "bi-calendar-event" },
        { label: "Bài thi đã hoàn thành", number: "08",  note: "Học kỳ I • 2026–2027",       icon: "bi-check-circle" },
        { label: "Điểm trung bình",       number: "8,2", note: "Trên thang điểm 10",         icon: "bi-bar-chart" }
    ],

    // Kỳ thi nổi bật ở màn Tổng quan
    featuredExams: [
        {
            name: "Kiểm tra giữa kỳ Cơ sở dữ liệu", subject: "Cơ sở dữ liệu · Giảng viên: Nguyễn Văn Diệu",
            time: "Hôm nay, 08:00–09:00 · 30 câu · 45 phút", status: "Đang mở", buttonText: "Xem kỳ thi"
        },
        {
            name: "Kiểm tra chương 2 - Lập trình Java", subject: "Lập trình hướng đối tượng · Giảng viên: Lê Quốc Anh",
            time: "Hôm nay, 08:00–17:00 · 20 câu · 30 phút", status: "Đang mở", buttonText: "Xem kỳ thi"
        },
        {
            name: "Kiểm tra chương 3 - Mạng máy tính", subject: "Mạng máy tính · Giảng viên: Phan Thị Hồng Nhung",
            time: "16/11/2026, 09:00–10:00 · 20 câu · 30 phút", status: "Sắp diễn ra", buttonText: "Chưa đến giờ"
        }
    ],

    // Thông tin học tập
    academicInfo: [
        { label: "Họ và tên", value: "Lưu Nguyễn Hồng Phúc" },
        { label: "MSSV",      value: "079205002627" },
        { label: "Lớp",       value: "CNTT K25" },
        { label: "Khóa",      value: "2025–2029" },
        { label: "Khoa",      value: "Công nghệ thông tin" }
    ],

    // Kết quả gần đây
    recentResults: [
        { exam: "Kiểm tra chương 2 - Cơ sở dữ liệu", date: "05/11/2026", score: "8,5 / 10", result: "Đạt" },
        { exam: "Kiểm tra chương 1 - Lập trình Java", date: "29/10/2026", score: "8,0 / 10", result: "Đạt" }
    ],

    // Danh sách kỳ thi đầy đủ
    examList: [
        { name: "Kiểm tra giữa kỳ Cơ sở dữ liệu",    subject: "Cơ sở dữ liệu",             time: "12/11/2026 · 08:00–09:00", scale: "30 câu · 45 phút", attempts: "0 / 1", status: "Đang mở",       actionText: "Vào thi" },
        { name: "Kiểm tra chương 2 - Lập trình Java", subject: "Lập trình Java",            time: "12/11/2026 · 08:00–17:00", scale: "20 câu · 30 phút", attempts: "0 / 2", status: "Đang mở",       actionText: "Vào thi" },
        { name: "Ôn tập chương 1 - Cấu trúc rời rạc", subject: "Cấu trúc rời rạc",          time: "11–13/11/2026 · Cả ngày",  scale: "20 câu · 30 phút", attempts: "1 / 2", status: "Đang mở",       actionText: "Thi lại" },
        { name: "Kiểm tra giữa kỳ - Hệ điều hành",    subject: "Hệ điều hành",              time: "18/11/2026 · 13:00–14:00", scale: "30 câu · 45 phút", attempts: "0 / 1", status: "Sắp diễn ra",   actionText: "Xem thông tin" },
        { name: "Kiểm tra chương 3 - Mạng máy tính",  subject: "Mạng máy tính",             time: "16/11/2026 · 09:00–10:00", scale: "20 câu · 30 phút", attempts: "0 / 1", status: "Sắp diễn ra",   actionText: "Xem thông tin" },
        { name: "Kiểm tra chương 2 - Cơ sở dữ liệu",  subject: "Cơ sở dữ liệu",             time: "05/11/2026 · 08:00–10:00", scale: "20 câu · 30 phút", attempts: "1 / 1", status: "Đã hoàn thành", actionText: "Xem kết quả" },
        { name: "Kiểm tra chương 1 - Lập trình Java", subject: "Lập trình Java",            time: "29/10/2026 · 09:00–11:00", scale: "20 câu · 30 phút", attempts: "1 / 1", status: "Đã hoàn thành", actionText: "Xem kết quả" },
        { name: "Kiểm tra chương 1 - Mạng máy tính",  subject: "Mạng máy tính",             time: "22/10/2026 · 08:00–10:00", scale: "20 câu · 30 phút", attempts: "0 / 1", status: "Đã đóng",       actionText: "Xem thông tin" }
    ],

    // Lịch thi & đối tượng (màn Thông tin kỳ thi)
    examSchedule: [
        { label: "Thời gian mở",   value: "12/11/2026 · 08:00" },
        { label: "Thời gian đóng", value: "12/11/2026 · 09:00" },
        { label: "Lớp dự thi",     value: "CNTT K25 · Khóa 2025–2029" },
        { label: "Giảng viên",     value: "Trần Thị Mỹ Tiên" },
        { label: "Lượt đã sử dụng", value: "0 / 1 lượt" },
        { label: "Cách tính điểm", value: "Thang điểm 10 · Các câu có trọng số bằng nhau" }
    ],

    // Thông tin lượt thi (màn Kết quả)
    attemptInfo: [
        { label: "Sinh viên",      value: "Lưu Nguyễn Hồng Phúc · 079205002627" },
        { label: "Mã kỳ thi",      value: "CNPM-2026-GK" },
        { label: "Thời gian làm bài", value: "42 phút / 45 phút" },
        { label: "Bắt đầu / Nộp bài", value: "12/11/2026 · 08:00 / 08:42" },
        { label: "Lượt thi",       value: "1 / 1 · Không còn lượt thi" }
    ],

    // 4 ô thống kê đáp án
    answerStats: [
        { label: "Câu trả lời đúng", number: "24 / 30", note: "80% tổng số câu hỏi",   icon: "bi-check-circle" },
        { label: "Câu trả lời sai",  number: "04",      note: "Xem đáp án bên dưới",   icon: "bi-x-circle" },
        { label: "Câu chưa trả lời", number: "02",      note: "Không tính điểm",       icon: "bi-dash-circle" },
        { label: "Tổng số câu",      number: "30",      note: "Mỗi câu có trọng số bằng nhau", icon: "bi-list-ol" }
    ],

    // Xem lại đáp án
    answerReview: [
        {
            index: 1, question: "UML được sử dụng chủ yếu để làm gì trong phát triển phần mềm?",
            yourAnswer: "A. Mô hình hóa và biểu diễn thiết kế hệ thống.",
            correctAnswer: "A. Mô hình hóa và biểu diễn thiết kế hệ thống.", result: "Đúng"
        },
        {
            index: 2, question: "Mô hình phát triển phần mềm Waterfall có đặc điểm nào?",
            yourAnswer: "A. Các giai đoạn được thực hiện song song.",
            correctAnswer: "C. Các giai đoạn được thực hiện tuần tự.", result: "Sai"
        },
        {
            index: 3, question: "Mục đích chính của kiểm thử phần mềm (Software Testing) là gì?",
            yourAnswer: "B. Phát hiện lỗi và xác minh phần mềm đáp ứng yêu cầu.",
            correctAnswer: "B. Phát hiện lỗi và xác minh phần mềm đáp ứng yêu cầu.", result: "Đúng"
        }
    ],

    // 4 ô số liệu màn Lịch sử
    historyStats: [
        { label: "Lượt thi hoàn thành", number: "09",  note: "Học kỳ I • 2026–2027",  icon: "bi-check2-square" },
        { label: "Điểm trung bình",     number: "8,2", note: "Tất cả các lượt thi",   icon: "bi-bar-chart" },
        { label: "Điểm cao nhất",       number: "9,0", note: "Toán rời rạc",          icon: "bi-trophy" },
        { label: "Kết quả đạt",         number: "9 / 9", note: "Điểm từ 5,0 trở lên", icon: "bi-check-circle" }
    ],

    // Bảng lịch sử thi
    examHistory: [
        { name: "Kiểm tra giữa kỳ Công nghệ phần mềm", code: "CNPM-2026-KTGK", submittedAt: "12/11/2026 · 08:42", attempt: 1, duration: "42 phút", correctCount: "24 / 30", score: "8,0", result: "Đạt" },
        { name: "Kiểm tra chương 2 - Cơ sở dữ liệu",   code: "CSDL-2026-KTC2", submittedAt: "05/11/2026 · 08:27", attempt: 1, duration: "27 phút", correctCount: "17 / 20", score: "8,5", result: "Đạt" },
        { name: "Kiểm tra chương 1 - Lập trình Java",  code: "JAVA-2026-KTC1", submittedAt: "29/10/2026 · 09:28", attempt: 1, duration: "28 phút", correctCount: "16 / 20", score: "8,0", result: "Đạt" },
        { name: "Ôn tập chương 1 - Công nghệ phần mềm", code: "CNPM-2026-OTC1", submittedAt: "26/10/2026 · 14:24", attempt: 1, duration: "24 phút", correctCount: "18 / 20", score: "9,0", result: "Đạt" },
        { name: "Kiểm tra chương 1 - Cơ sở dữ liệu",   code: "CSDL-2026-KTC1", submittedAt: "19/10/2026 · 08:26", attempt: 1, duration: "26 phút", correctCount: "15 / 20", score: "7,5", result: "Đạt" },
        { name: "Kiểm tra chương 1 - Hệ điều hành",    code: "HDH-2026-KTC1",  submittedAt: "15/10/2026 · 10:25", attempt: 1, duration: "25 phút", correctCount: "17 / 20", score: "8,5", result: "Đạt" },
        { name: "Ôn tập nhập môn - Mạng máy tính",     code: "MMT-2026-OTMM",  submittedAt: "08/10/2026 · 09:22", attempt: 1, duration: "22 phút", correctCount: "16 / 20", score: "8,0", result: "Đạt" },
        { name: "Kiểm tra chương 1 - Cấu trúc rời rạc", code: "CTRR-2026-CTC1", submittedAt: "01/10/2026 · 14:20", attempt: 1, duration: "20 phút", correctCount: "18 / 20", score: "9,0", result: "Đạt" }
    ]
};

/* 
   PHẦN 2: CÁC HÀM VẼ GIAO DIỆN
   */

/* Vẽ 4 ô số liệu */
function renderStatCards(containerId, list) {
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

/* Vẽ danh sách kỳ thi nổi bật */
function renderFeaturedExams(list) {
    let html = "";

    for (let i = 0; i < list.length; i++) {
        const exam = list[i];
        const isOpen = exam.status === "Đang mở";

        html += '<div class="mini-exam-card">' +
            '<div class="d-flex justify-content-between align-items-start gap-2">' +
            '<div><div class="name">' + exam.name + "</div>" +
            '<div class="subject">' + exam.subject + "</div></div>" +
            renderStatusBadge(exam.status) +
            "</div>" +
            '<div class="d-flex justify-content-between align-items-center gap-2 flex-wrap">' +
            '<div class="time"><i class="bi bi-clock"></i> ' + exam.time + "</div>" +
            (isOpen
                ? '<button class="btn btn-outline-custom btn-sm" onclick="location.href=\'student_exam_info.html\'">' + exam.buttonText + "</button>"
                : '<span style="font-size:12px;color:var(--text-muted);">' + exam.buttonText + "</span>") +
            "</div></div>";
    }

    getEl("featuredExamsContainer").innerHTML = html;
}

/* Vẽ danh sách dạng "nhãn - giá trị" */
function renderInfoRows(containerId, list) {
    let html = "";

    for (let i = 0; i < list.length; i++) {
        html += '<div class="info-row">' +
            '<span class="label">' + list[i].label + "</span>" +
            '<span class="value">' + list[i].value + "</span></div>";
    }

    getEl(containerId).innerHTML = html;
}

/* Vẽ bảng kết quả gần đây */
function renderRecentResults(list) {
    let html = "";

    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        html += "<tr>" +
            '<td data-label="Kỳ thi" class="primary-name">' + item.exam + "</td>" +
            '<td data-label="Ngày thi">' + item.date + "</td>" +
            '<td data-label="Điểm"><b>' + item.score + "</b></td>" +
            '<td data-label="Kết quả">' + renderStatusBadge(item.result) + "</td>" +
            '<td data-label="Thao tác" class="actions">' +
            '<a href="#" onclick="location.href=\'student_result.html\';return false;">Xem kết quả</a></td>' +
            "</tr>";
    }

    getEl("recentResultsTable").innerHTML = html;
}

/* Vẽ bảng danh sách kỳ thi (có lọc theo tab và ô tìm kiếm) */
function renderExamTable(filter, keyword) {
    const list = studentMockData.examList;
    let html = "";

    for (let i = 0; i < list.length; i++) {
        const exam = list[i];

        // lọc theo tab
        if (filter && filter !== "Tất cả" && exam.status !== filter) continue;

        // lọc theo từ khóa
        if (keyword && exam.name.toLowerCase().indexOf(keyword.toLowerCase()) === -1) continue;

        html += "<tr>" +
            '<td data-label="Kỳ thi"><div class="primary-name">' + exam.name + "</div>" +
            '<div class="sub-line">' + exam.subject + "</div></td>" +
            '<td data-label="Thời gian mở thi">' + exam.time + "</td>" +
            '<td data-label="Quy mô">' + exam.scale + "</td>" +
            '<td data-label="Lượt thi">' + exam.attempts + "</td>" +
            '<td data-label="Trạng thái">' + renderStatusBadge(exam.status) + "</td>" +
            '<td data-label="Thao tác" class="actions">' +
            '<a href="#" onclick="' +
            (exam.actionText === "Xem kết quả" ? "location.href='student_result.html'" : "location.href='student_exam_info.html'") +
            ';return false;">' + exam.actionText + "</a></td>" +
            "</tr>";
    }

    if (html === "") {
        html = '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:24px;">' +
            "Không tìm thấy kỳ thi nào.</td></tr>";
    }

    getEl("examTable").innerHTML = html;
}

/* Vẽ phần xem lại đáp án (có lọc theo tab) */
function renderAnswerReview(filter) {
    const list = studentMockData.answerReview;
    let html = "";

    for (let i = 0; i < list.length; i++) {
        const item = list[i];

        if (filter && filter !== "Tất cả" && item.result !== filter) continue;

        html += '<div class="question-card">' +
            '<div class="question-text">Câu ' + item.index + ". " + item.question + renderStatusBadge(item.result) + "</div>" +
            '<div class="answer-row">' +
            '<div class="answer-box ' + (item.result === "Đúng" ? "correct" : "wrong") + '">' +
            '<div class="label">Đáp án của bạn</div>' +
            '<div class="content">' + item.yourAnswer + "</div></div>" +
            '<div class="answer-box correct">' +
            '<div class="label">Đáp án đúng</div>' +
            '<div class="content">' + item.correctAnswer + "</div></div>" +
            "</div></div>";
    }

    if (html === "") {
        html = '<div style="text-align:center;color:var(--text-muted);padding:24px;font-size:13px;">' +
            "Không có câu hỏi nào trong mục này.</div>";
    }

    getEl("answerReviewContainer").innerHTML = html;
}

/* Vẽ bảng lịch sử thi */
function renderHistoryTable(keyword) {
    const list = studentMockData.examHistory;
    let html = "";

    for (let i = 0; i < list.length; i++) {
        const item = list[i];

        if (keyword) {
            const searchStr = (item.name + " " + item.code).toLowerCase();
            if (searchStr.indexOf(keyword.toLowerCase()) === -1) continue;
        }

        html += "<tr>" +
            '<td data-label="Kỳ thi"><div class="primary-name">' + item.name + "</div>" +
            '<div class="sub-line">' + item.code + "</div></td>" +
            '<td data-label="Thời điểm nộp">' + item.submittedAt + "</td>" +
            '<td data-label="Lượt">' + item.attempt + "</td>" +
            '<td data-label="Thời gian">' + item.duration + "</td>" +
            '<td data-label="Số câu đúng">' + item.correctCount + "</td>" +
            '<td data-label="Điểm"><b style="color:var(--dark-blue);">' + item.score + "</b></td>" +
            '<td data-label="Kết quả">' + renderStatusBadge(item.result) + "</td>" +
            '<td data-label="Thao tác" class="actions">' +
            '<a href="#" onclick="location.href=\'student_result.html\';return false;">Xem kết quả</a></td>' +
            "</tr>";
    }

    if (html === "") {
        html = '<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:24px;">' +
            "Không tìm thấy lượt thi nào.</td></tr>";
    }

    getEl("historyTable").innerHTML = html;
}

/* Đổi lời chào theo giờ trong ngày */
function setGreeting() {
    const hour = new Date().getHours();
    let greeting = "Chào buổi sáng";

    if (hour >= 12 && hour < 18) {
        greeting = "Chào buổi chiều";
    } else if (hour >= 18) {
        greeting = "Chào buổi tối";
    }

    getEl("greetingText").innerText = greeting + ", Hồng Phúc!";

    const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    const d = new Date();
    getEl("dateLine").innerText =
        daysOfWeek[d.getDay()] + ", " + d.getDate() + " tháng " + (d.getMonth() + 1) + " năm " + d.getFullYear() +
        " · Chúc bạn có một buổi thi thật tốt.";
}

/* 
   PHẦN 3: GẮN SỰ KIỆN + TẢI DỮ LIỆU
    */

/* Tab lọc kỳ thi */
function bindExamTabs() {
    const buttons = document.querySelectorAll("#examTabs button");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            for (let j = 0; j < buttons.length; j++) {
                buttons[j].classList.remove("active");
            }
            this.classList.add("active");
            renderExamTable(this.getAttribute("data-filter"), getEl("searchExam").value);
        };
    }
}

/* Tab lọc đáp án */
function bindAnswerTabs() {
    const buttons = document.querySelectorAll("#answerTabs button");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            for (let j = 0; j < buttons.length; j++) {
                buttons[j].classList.remove("active");
            }
            this.classList.add("active");
            renderAnswerReview(this.getAttribute("data-filter"));
        };
    }
}

/* Tải toàn bộ dữ liệu cho trang sinh viên */
async function loadStudentPage() {
    setGreeting();

    // Gọi API của TV1 (exam_controller.py), chưa có thì dùng dữ liệu giả
    const dashboardData = await callAPI("/api/student/dashboard", studentMockData);

    renderStatCards("studentStatsContainer", dashboardData.stats);
    renderFeaturedExams(dashboardData.featuredExams);
    renderInfoRows("academicInfoContainer", dashboardData.academicInfo);
    renderRecentResults(dashboardData.recentResults);

    renderExamTable("Tất cả", "");
    renderInfoRows("examScheduleContainer", studentMockData.examSchedule);

    renderInfoRows("attemptInfoContainer", studentMockData.attemptInfo);
    renderStatCards("answerStatsContainer", studentMockData.answerStats);
    renderAnswerReview("Tất cả");

    renderStatCards("historyStatsContainer", studentMockData.historyStats);
    renderHistoryTable("");
}

document.addEventListener("DOMContentLoaded", function () {
    loadStudentPage();
    bindExamTabs();
    bindAnswerTabs();

    // Ô tìm kiếm kỳ thi
    getEl("searchExam").oninput = function () {
        const activeTab = document.querySelector("#examTabs button.active");
        renderExamTable(activeTab.getAttribute("data-filter"), this.value);
    };

    // Ô tìm kiếm lịch sử
    getEl("searchHistory").oninput = function () {
        renderHistoryTable(this.value);
    };

    // Nút xác nhận vào thi -> sang trang làm bài của TV4
    getEl("startExamBtn").onclick = function () {
        const password = getEl("examPassword").value;
        const agreed = getEl("agreeTerms").checked;

        if (password === "") {
            alert("Vui lòng nhập mật khẩu kỳ thi!");
            return;
        }
        if (!agreed) {
            alert("Bạn cần xác nhận đã đọc hướng dẫn trước khi vào thi!");
            return;
        }

       
        window.location.href = "take_exam.html";
    };

});