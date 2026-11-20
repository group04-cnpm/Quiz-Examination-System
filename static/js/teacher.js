/* ============================================
   teacher.js - Xử lý giao diện giảng viên
   ============================================ */

/* =========================================================
   PHẦN 1: DỮ LIỆU GIẢ
   ========================================================= */

const teacherMockData = {

    // 4 ô số liệu màn Tổng quan
    stats: [
        { label: "Câu hỏi trong ngân hàng", number: "248", note: "3 môn học phụ trách",      icon: "bi-journal-bookmark" },
        { label: "Kỳ thi trong học kỳ",     number: "12",  note: "3 đang mở · 2 sắp diễn ra", icon: "bi-clipboard-check" },
        { label: "Lượt thi đã nộp",         number: "386", note: "Từ đầu học kỳ I",          icon: "bi-inbox" },
        { label: "Điểm trung bình",         number: "7,4", note: "Trên thang điểm 10",       icon: "bi-bar-chart" }
    ],

    // Kỳ thi gần đây
    recentExams: [
        { name: "Kiểm tra giữa kỳ Cơ sở dữ liệu",    classInfo: "CSDL2026-GK · CNTT K23A", schedule: "12/11 · 08:00–09:00", submitted: "38 / 42", status: "Đã kết thúc", actionsText: "Kết quả · Cấu hình" },
        { name: "Kiểm tra chương 2 - Lập trình Java", classInfo: "Lập trình Java",          schedule: "12/11 · 08:00–17:00", submitted: "24 / 40", status: "Đang mở",     actionsText: "Kết quả · Cấu hình" },
        { name: "Ôn tập chương 1 - Cấu trúc rời rạc", classInfo: "Cấu trúc rời rạc",        schedule: "11–13/11 · Cả ngày",  submitted: "31 / 42", status: "Đang mở",     actionsText: "Kết quả · Cấu hình" },
        { name: "Kiểm tra chương 3 - Mạng máy tính",  classInfo: "Mạng máy tính",           schedule: "16/11 · 09:00–10:00", submitted: "0 / 42",  status: "Sắp diễn ra", actionsText: "Sửa · Cấu hình" },
        { name: "Kiểm tra cuối chương - Cơ sở dữ liệu", classInfo: "Cơ sở dữ liệu",         schedule: "20/11 · Chưa đặt giờ", submitted: "—",      status: "Bản nháp",    actionsText: "Sửa · Xóa" }
    ],

    // Ngân hàng theo môn học
    subjectBanks: [
        { subject: "Cơ sở dữ liệu",               count: 104, percentage: 100 },
        { subject: "Lập trình hướng đối tượng",   count: 86,  percentage: 83 },
        { subject: "Mạng máy tính",               count: 58,  percentage: 56 }
    ],

    // Danh sách câu hỏi trong ngân hàng
    questionList: [
        { code: "CH104", content: "Trong quy trình phát triển phần mềm, giai đoạn nào dùng để xác định nhu cầu của khách hàng?", topic: "Phân tích yêu cầu", type: "Một đáp án", difficulty: "Trung bình" },
        { code: "CH103", content: "UML được sử dụng để mô hình hóa và thiết kế hệ thống phần mềm.", topic: "UML", type: "Đúng / Sai", difficulty: "Dễ" },
        { code: "CH102", content: "Trong kiến trúc MVC, thành phần chịu trách nhiệm xử lý yêu cầu từ người dùng là ______.", topic: "Kiến trúc phần mềm", type: "Điền khuyết", difficulty: "Dễ" },
        { code: "CH101", content: "Mô hình phát triển phần mềm nào thực hiện các giai đoạn theo trình tự tuần tự?", topic: "Mô hình phát triển", type: "Một đáp án", difficulty: "Trung bình" },
        { code: "CH100", content: "Kiểm thử đơn vị (Unit Testing) tập trung kiểm tra thành phần nào?", topic: "Kiểm thử phần mềm", type: "Một đáp án", difficulty: "Khó" },
        { code: "CH099", content: "Git là công cụ hỗ trợ quản lý phiên bản mã nguồn trong quá trình phát triển phần mềm.", topic: "Quản lý phiên bản", type: "Đúng / Sai", difficulty: "Dễ" },
        { code: "CH098", content: "Hoạt động kiểm tra tính đúng đắn của chương trình được gọi là ______ Testing.", topic: "Kiểm thử phần mềm", type: "Điền khuyết", difficulty: "Dễ" },
        { code: "CH097", content: "Use Case Diagram chủ yếu mô tả nội dung nào?", topic: "UML", type: "Một đáp án", difficulty: "Trung bình" }
    ],

    // Đáp án của câu hỏi đang sửa
    question104Answers: [
        { letter: "A", content: "Model" },
        { letter: "B", content: "Controller" },
        { letter: "C", content: "View" },
        { letter: "D", content: "Database" }
    ],
    correctAnswerIndex: 1, // vị trí đáp án đúng (bắt đầu từ 0)

    // Tóm tắt câu hỏi đang sửa
    questionSummary: [
        { label: "Mã",        value: "CH104" },
        { label: "Người tạo", value: "Nguyễn Văn Diệu" },
        { label: "Môn",       value: "Cơ sở dữ liệu" },
        { label: "Chủ đề",    value: "Truy vấn SQL" }
    ],

    // Câu hỏi chọn vào đề thi
    examQuestionPool: [
        { code: "CH104", content: "Use Case Diagram dùng để mô tả điều gì?",                topic: "UML",                 difficulty: "Trung bình", selected: true },
        { code: "CH101", content: "Kiểm thử phần mềm nhằm mục đích gì?",                    topic: "Kiểm thử phần mềm",   difficulty: "Trung bình", selected: true },
        { code: "CH100", content: "Prototype trong phát triển phần mềm có vai trò gì?",     topic: "Thiết kế phần mềm",   difficulty: "Khó",        selected: true },
        { code: "CH097", content: "Mục đích của việc sử dụng Git trong phát triển phần mềm là gì?", topic: "Quản lý phiên bản", difficulty: "Trung bình", selected: true },
        { code: "CH095", content: "Yêu cầu chức năng (Functional Requirement) mô tả điều gì?", topic: "Phân tích yêu cầu", difficulty: "Dễ",        selected: true }
    ],

    // Bảng phân bổ chọn ngẫu nhiên
    distribution: [
        { topic: "UML",                easy: 4, medium: 8, hard: 3, total: 15 },
        { topic: "Quy trình phần mềm", easy: 4, medium: 4, hard: 0, total: 8 },
        { topic: "Thiết kế phần mềm",  easy: 2, medium: 3, hard: 2, total: 7 }
    ],

    // Tóm tắt kỳ thi (bước 2)
    examSummary: [
        { label: "Mã kỳ thi",  value: "CSDL2026-GK" },
        { label: "Lớp",        value: "CNTT K25" },
        { label: "Số câu",     value: "30 câu" },
        { label: "Thời lượng", value: "45 phút" },
        { label: "Số lượt",    value: "1 lượt" },
        { label: "Thang điểm", value: "10 điểm" },
        { label: "Giảng viên", value: "Trần Thị Mỹ Tiên" }
    ],

    // 4 ô số liệu màn Thống kê
    statisticsMetrics: [
        { label: "Bài thi đã nộp",      number: "38 / 42", note: "4 sinh viên chưa dự thi",      icon: "bi-inbox" },
        { label: "Điểm trung bình",     number: "7,4",     note: "Cao nhất 9,7 · Thấp nhất 3,0", icon: "bi-bar-chart" },
        { label: "Tỷ lệ đạt",           number: "89,5%",   note: "34/38 bài đạt từ 5,0 điểm",    icon: "bi-check-circle" },
        { label: "Thời gian trung bình", number: "39 phút", note: "Thời lượng tối đa 45 phút",   icon: "bi-clock" }
    ],

    // Biểu đồ phân bố điểm
    scoreDistribution: [
        { range: "Dưới 5,0", count: 4,  isRed: true },
        { range: "5,0–6,9",  count: 8,  isRed: false },
        { range: "7,0–8,4",  count: 16, isRed: false },
        { range: "8,5–10",   count: 10, isRed: false }
    ],

    // Tình hình tham gia
    participation: [
        { label: "Đã nộp bài",   value: "38 sinh viên" },
        { label: "Chưa dự thi",  value: "4 sinh viên" },
        { label: "Chưa đạt",     value: "4 bài" }
    ],

    // Kết quả sinh viên
    studentResults: [
        { studentId: "077207003136", name: "Lê Đức An",            attempt: 1, duration: "42 phút", correctCount: "24 / 30", score: "8,0", result: "Đạt" },
        { studentId: "075207018120", name: "Lê Đức Danh",          attempt: 1, duration: "39 phút", correctCount: "27 / 30", score: "9,0", result: "Đạt" },
        { studentId: "042207000286", name: "Nguyễn Anh Dũng",      attempt: 1, duration: "45 phút", correctCount: "21 / 30", score: "7,0", result: "Đạt" },
        { studentId: "079206032698", name: "Nguyễn Hà Phương Lâm", attempt: 1, duration: "40 phút", correctCount: "26 / 30", score: "8,7", result: "Đạt" },
        { studentId: "079205002627", name: "Lưu Nguyễn Hồng Phúc", attempt: 1, duration: "44 phút", correctCount: "23 / 30", score: "7,7", result: "Đạt" },
        { studentId: "080206005119", name: "Nguyễn Minh Hưng",     attempt: 1, duration: "45 phút", correctCount: "12 / 30", score: "4,0", result: "Chưa đạt" }
    ]
};

/* =========================================================
   PHẦN 2: CÁC HÀM VẼ GIAO DIỆN
   ========================================================= */

/* Vẽ 4 ô số liệu */
function renderTeacherStats(containerId, list) {
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

/* Vẽ bảng kỳ thi gần đây */
function renderRecentExams() {
    const list = teacherMockData.recentExams;
    let html = "";

    for (let i = 0; i < list.length; i++) {
        const exam = list[i];
        html += "<tr>" +
            '<td data-label="Kỳ thi"><div class="primary-name">' + exam.name + "</div>" +
            '<div class="sub-line">' + exam.classInfo + "</div></td>" +
            '<td data-label="Lịch thi">' + exam.schedule + "</td>" +
            '<td data-label="Đã nộp">' + exam.submitted + "</td>" +
            '<td data-label="Trạng thái">' + renderStatusBadge(exam.status) + "</td>" +
            '<td data-label="Thao tác" class="actions">' + createActionLinks(exam.actionsText) + "</td>" +
            "</tr>";
    }

    getEl("recentExamsTable").innerHTML = html;
}

/* Đổi chuỗi "Kết quả · Cấu hình" thành các link */
function createActionLinks(text) {
    const parts = text.split("·");
    let html = "";

    for (let i = 0; i < parts.length; i++) {
        if (i > 0) html += "<span>·</span>";
        html += '<a href="#" onclick="return false;">' + parts[i].trim() + "</a>";
    }

    return html;
}

/* Vẽ ngân hàng theo môn học (có thanh tiến trình) */
function renderSubjectBanks() {
    const list = teacherMockData.subjectBanks;
    let html = "";

    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        html += '<div class="subject-row">' +
            '<div class="top-line"><span>' + item.subject + "</span>" +
            '<span class="question-count">' + item.count + " câu</span></div>" +
            '<div class="progress"><div class="progress-bar" style="width:' + item.percentage + '%;"></div></div>' +
            "</div>";
    }

    getEl("bankBySubjectContainer").innerHTML = html;
}

/* Vẽ bảng câu hỏi trong ngân hàng */
function renderQuestionTable(filter, keyword) {
    const list = teacherMockData.questionList;
    let html = "";

    for (let i = 0; i < list.length; i++) {
        const q = list[i];

        if (filter && filter !== "Tất cả" && q.type !== filter) continue;

        if (keyword) {
            const searchStr = (q.code + " " + q.content).toLowerCase();
            if (searchStr.indexOf(keyword.toLowerCase()) === -1) continue;
        }

        html += "<tr>" +
            '<td data-label="Mã" class="primary-name">' + q.code + "</td>" +
            '<td data-label="Nội dung" style="max-width:380px;">' + q.content + "</td>" +
            '<td data-label="Chủ đề">' + q.topic + "</td>" +
            '<td data-label="Dạng">' + q.type + "</td>" +
            '<td data-label="Độ khó">' + renderStatusBadge(q.difficulty) + "</td>" +
            '<td data-label="Thao tác" class="actions">' +
            '<a href="#" onclick="location.href=\'teacher_question_edit.html\';return false;">Xem</a><span>·</span>' +
            '<a href="#" onclick="location.href=\'teacher_question_edit.html\';return false;">Sửa</a><span>·</span>' +
            '<a href="#" onclick="deleteQuestion();return false;">Xóa</a></td>' +
            "</tr>";
    }

    if (html === "") {
        html = '<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:24px;">' +
            "Không tìm thấy câu hỏi nào.</td></tr>";
    }

    getEl("questionTable").innerHTML = html;
}

function deleteQuestion() {
    if (confirm("Bạn có chắc muốn xóa câu hỏi này không?")) {
        alert("Đã xóa câu hỏi (dữ liệu giả).");
    }
}

/* Vẽ khung đáp án A B C D ở màn Chỉnh sửa câu hỏi */
function renderAnswerContainer() {
    const list = teacherMockData.question104Answers;
    let html = "";

    for (let i = 0; i < list.length; i++) {
        const isCorrect = (i === teacherMockData.correctAnswerIndex);

        html += '<div class="edit-answer-row ' + (isCorrect ? "is-correct" : "") + '">' +
            '<input class="form-check-input" type="radio" name="answerOption" ' +
            (isCorrect ? "checked" : "") + ' onclick="selectCorrectAnswer(' + i + ')">' +
            '<span class="letter">' + list[i].letter + "</span>" +
            '<input type="text" class="form-control" value="' + list[i].content + '">' +
            "</div>";
    }

    getEl("answerContainer").innerHTML = html;
}

/* Chọn đáp án đúng khác */
function selectCorrectAnswer(index) {
    teacherMockData.correctAnswerIndex = index;
    renderAnswerContainer();

    const ans = teacherMockData.question104Answers[index];
    getEl("correctAnswerText").innerText =
        "Đáp án đúng: " + ans.letter + ". " + ans.content;
}

/* Vẽ danh sách dạng "nhãn - giá trị" */
function renderSummaryRows(containerId, list) {
    let html = "";

    for (let i = 0; i < list.length; i++) {
        html += '<div class="summary-row">' +
            '<span class="label">' + list[i].label + "</span>" +
            '<span class="value">' + list[i].value + "</span></div>";
    }

    getEl(containerId).innerHTML = html;
}

/* Vẽ bảng chọn câu hỏi vào đề thi */
function renderQuestionSelectionTable() {
    const list = teacherMockData.examQuestionPool;
    let html = "";

    for (let i = 0; i < list.length; i++) {
        const q = list[i];
        html += "<tr>" +
            '<td data-label="Chọn"><input class="form-check-input" type="checkbox" ' +
            (q.selected ? "checked" : "") + ' onchange="countSelectedQuestions()"></td>' +
            '<td data-label="Câu hỏi"><span class="primary-name">' + q.code + "</span> - " + q.content + "</td>" +
            '<td data-label="Chủ đề">' + q.topic + "</td>" +
            '<td data-label="Độ khó">' + renderStatusBadge(q.difficulty) + "</td>" +
            "</tr>";
    }

    getEl("selectQuestionTable").innerHTML = html;
}

/* Đếm số câu đã tick */
function countSelectedQuestions() {
    const checkboxes = document.querySelectorAll("#selectQuestionTable input[type=checkbox]");
    let count = 0;

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) count++;
    }

    // 25 câu còn lại coi như đã chọn sẵn từ các trang trước
    getEl("selectedCountBadge").innerText = "Đã chọn " + (count + 25) + " / 30 câu";
}

/* Vẽ bảng phân bổ chọn ngẫu nhiên */
function renderDistributionTable() {
    const list = teacherMockData.distribution;
    let html = "";

    for (let i = 0; i < list.length; i++) {
        const d = list[i];
        html += "<tr>" +
            '<td data-label="Chủ đề" class="primary-name">' + d.topic + "</td>" +
            '<td data-label="Dễ">' + d.easy + "</td>" +
            '<td data-label="Trung bình">' + d.medium + "</td>" +
            '<td data-label="Khó">' + d.hard + "</td>" +
            '<td data-label="Tổng"><b>' + d.total + "</b></td>" +
            "</tr>";
    }

    getEl("distributionTable").innerHTML = html;
}

/* Đổi giữa chọn thủ công và chọn ngẫu nhiên */
function changeSelectionMethod(method) {
    const boxes = document.querySelectorAll(".option-box");

    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].getAttribute("data-method") === method) {
            boxes[i].classList.add("active");
            boxes[i].querySelector("input").checked = true;
        } else {
            boxes[i].classList.remove("active");
            boxes[i].querySelector("input").checked = false;
        }
    }

    if (method === "manual") {
        getEl("manualSelectionContainer").style.display = "block";
        getEl("randomSelectionContainer").style.display = "none";
    } else {
        getEl("manualSelectionContainer").style.display = "none";
        getEl("randomSelectionContainer").style.display = "block";
    }
}

/* Vẽ biểu đồ cột phân bố điểm */
function renderScoreChart() {
    const list = teacherMockData.scoreDistribution;
    let html = "";

    // tìm số lớn nhất để tính chiều cao cột
    let maxCount = 0;
    for (let i = 0; i < list.length; i++) {
        if (list[i].count > maxCount) maxCount = list[i].count;
    }

    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const heightPercent = Math.round((item.count / maxCount) * 100);

        html += '<div class="chart-column">' +
            '<div class="submission-count">' + item.count + " bài</div>" +
            '<div class="bar ' + (item.isRed ? "red" : "") + '" style="height:' + heightPercent + '%;"></div>' +
            '<div class="bar-label">' + item.range + "</div>" +
            "</div>";
    }

    getEl("scoreChart").innerHTML = html;
}

/* Vẽ bảng kết quả sinh viên */
function renderStudentResultsTable(keyword) {
    const list = teacherMockData.studentResults;
    let html = "";

    for (let i = 0; i < list.length; i++) {
        const student = list[i];

        if (keyword) {
            const searchStr = (student.studentId + " " + student.name).toLowerCase();
            if (searchStr.indexOf(keyword.toLowerCase()) === -1) continue;
        }

        html += "<tr>" +
            '<td data-label="MSSV">' + student.studentId + "</td>" +
            '<td data-label="Họ và tên" class="primary-name">' + student.name + "</td>" +
            '<td data-label="Lượt">' + student.attempt + "</td>" +
            '<td data-label="Thời gian">' + student.duration + "</td>" +
            '<td data-label="Câu đúng">' + student.correctCount + "</td>" +
            '<td data-label="Điểm"><b style="color:var(--dark-blue);">' + student.score + "</b></td>" +
            '<td data-label="Kết quả">' + renderStatusBadge(student.result) + "</td>" +
            '<td data-label="Thao tác" class="actions">' +
            '<a href="#" onclick="return false;">Xem bài thi</a></td>' +
            "</tr>";
    }

    if (html === "") {
        html = '<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:24px;">' +
            "Không tìm thấy sinh viên nào.</td></tr>";
    }

    getEl("studentResultsTable").innerHTML = html;
}

/* =========================================================
   PHẦN 3: GẮN SỰ KIỆN + TẢI DỮ LIỆU
   ========================================================= */

/* Tab lọc dạng câu hỏi */
function bindQuestionTabs() {
    const buttons = document.querySelectorAll("#questionTabs button");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            for (let j = 0; j < buttons.length; j++) {
                buttons[j].classList.remove("active");
            }
            this.classList.add("active");
            renderQuestionTable(this.getAttribute("data-filter"), getEl("searchQuestion").value);
        };
    }
}

async function loadTeacherPage() {
    // Gọi API của TV2 (teacher_controller.py), chưa có thì dùng dữ liệu giả
    const dashboardData = await callAPI("/api/teacher/dashboard", teacherMockData);

    renderTeacherStats("teacherStatsContainer", dashboardData.stats);
    renderRecentExams();
    renderSubjectBanks();

    renderQuestionTable("Tất cả", "");

    renderAnswerContainer();
    renderSummaryRows("questionSummaryContainer", teacherMockData.questionSummary);

    renderQuestionSelectionTable();
    renderDistributionTable();
    renderSummaryRows("examSummaryContainer", teacherMockData.examSummary);

    renderTeacherStats("statisticsStatsContainer", teacherMockData.statisticsMetrics);
    renderScoreChart();
    renderSummaryRows("participationStatusContainer", teacherMockData.participation);
    renderStudentResultsTable("");
}

document.addEventListener("DOMContentLoaded", function () {
    loadTeacherPage();
    bindQuestionTabs();

    getEl("searchQuestion").oninput = function () {
        const activeTab = document.querySelector("#questionTabs button.active");
        renderQuestionTable(activeTab.getAttribute("data-filter"), this.value);
    };

    getEl("searchStudent").oninput = function () {
        renderStudentResultsTable(this.value);
    };

    // Lưu câu hỏi
    getEl("saveQuestionBtn").onclick = async function () {
        const content = getEl("questionContent").value.trim();

        if (content === "") {
            alert("Nội dung câu hỏi không được để trống!");
            return;
        }

        // Gửi lên API của TV2
        await postAPI("/api/teacher/save-question", { content: content });
        alert("Đã lưu câu hỏi thành công!");
        location.href = "teacher_questions.html";
    };

    // Công bố kỳ thi
    getEl("publishExamBtn").onclick = async function () {
        const duration = parseInt(getEl("examDuration").value);
        const attempts = parseInt(getEl("examAttempts").value);

        if (isNaN(duration) || duration <= 0) {
            alert("Thời lượng làm bài phải lớn hơn 0 phút!");
            return;
        }
        if (isNaN(attempts) || attempts <= 0) {
            alert("Số lượt thi tối đa phải lớn hơn 0!");
            return;
        }

        await postAPI("/api/teacher/create-exam", { duration: duration, attempts: attempts });
        alert("Đã lưu và công bố kỳ thi!");
        location.href = "teacher_dashboard.html";
    };
});