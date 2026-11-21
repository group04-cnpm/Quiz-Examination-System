from datetime import datetime
from pathlib import Path

from flask import Blueprint, current_app, jsonify, redirect, render_template, request, session

from auth_controller import AuthController
from database import get_connection
from exam_controller import ExamController
from teacher_controller import TeacherController


api = Blueprint("api", __name__)


def _error(message, status):
    return jsonify({"success": False, "error": message}), status


def _require_role(role):
    user = session.get("user")
    if not user:
        return None, _error("Vui lòng đăng nhập.", 401)
    if user.get("role") != role:
        return None, _error("Bạn không có quyền truy cập.", 403)
    return user, None


def _page(role, page):
    user = session.get("user")
    if not user or user.get("role") != role.capitalize():
        return redirect("/")

    template_root = (Path(current_app.root_path) / "templates" / role).resolve()
    template_path = (template_root / page).resolve()
    if not template_path.is_relative_to(template_root) or not template_path.is_file():
        return "Không tìm thấy trang.", 404
    return render_template(f"{role}/{page}")


def _format_datetime(value):
    if not value:
        return "Chưa có lịch"
    try:
        return datetime.strptime(value, "%Y-%m-%d %H:%M:%S").strftime("%d/%m/%Y · %H:%M")
    except (TypeError, ValueError):
        return value


def _stat(label, number, note, icon):
    return {"label": label, "number": str(number), "note": note, "icon": icon}


@api.post("/api/login")
def login_api():
    payload = request.get_json(silent=True) or {}
    identifier = (payload.get("username") or payload.get("email") or "").strip()
    password = payload.get("password", "")
    if not identifier or not password:
        return _error("Tên đăng nhập và mật khẩu là bắt buộc.", 400)

    connection = get_connection()
    try:
        account = connection.execute(
            "SELECT email FROM users WHERE email = ? OR student_code = ?",
            (identifier, identifier),
        ).fetchone()
    finally:
        connection.close()

    user = AuthController.login(account["email"], password) if account else None
    if not user:
        return _error("Tên đăng nhập hoặc mật khẩu không chính xác.", 401)

    session["user"] = user
    return jsonify({"success": True, "user": user})


@api.get("/api/student/dashboard")
def student_dashboard_api():
    user, error = _require_role("Student")
    if error:
        return error

    exams = ExamController.get_open_exams()
    history = ExamController.get_student_history(user["user_id"])
    connection = get_connection()
    try:
        profile = connection.execute(
            "SELECT full_name, email, student_code, class_name FROM users WHERE user_id = ?",
            (user["user_id"],),
        ).fetchone()
        scheduled_count = connection.execute(
            "SELECT COUNT(*) FROM exam_schedules es JOIN exams e ON e.exam_id = es.exam_id WHERE e.status = 'Open' AND es.start_time > CURRENT_TIMESTAMP"
        ).fetchone()[0]
    finally:
        connection.close()

    average = sum(row["total_score"] for row in history) / len(history) if history else 0
    stats = [
        _stat("Kỳ thi đang mở", len(exams), "Có thể tham gia", "bi-journal-text"),
        _stat("Kỳ thi sắp diễn ra", scheduled_count, "Theo lịch hiện tại", "bi-calendar-event"),
        _stat("Bài thi đã hoàn thành", len(history), "Tất cả lượt thi", "bi-check-circle"),
        _stat("Điểm trung bình", f"{average:.1f}".replace(".", ","), "Trên thang điểm 10", "bi-bar-chart"),
    ]

    featured_exams = [
        {
            "name": exam["title"],
            "subject": f"{exam['subject_name']} · Giảng viên: {exam['teacher_name']}",
            "time": f"{_format_datetime(exam.get('start_time'))} · {exam['q_count']} câu · {exam['duration_minutes']} phút",
            "status": "Đang mở",
            "buttonText": "Xem kỳ thi",
        }
        for exam in exams[:3]
    ]
    recent_results = [
        {
            "exam": row["title"],
            "date": _format_datetime(row.get("submitted_at")),
            "score": f"{row['total_score']:.1f} / 10".replace(".", ","),
            "result": "Đạt" if row["is_passed"] else "Chưa đạt",
        }
        for row in history[:5]
    ]
    academic_info = [
        {"label": "Họ và tên", "value": profile["full_name"]},
        {"label": "MSSV", "value": profile["student_code"] or "Chưa cập nhật"},
        {"label": "Lớp", "value": profile["class_name"] or "Chưa cập nhật"},
        {"label": "Email", "value": profile["email"]},
    ]
    return jsonify({
        "stats": stats,
        "featuredExams": featured_exams,
        "academicInfo": academic_info,
        "recentResults": recent_results,
    })


@api.get("/api/teacher/dashboard")
def teacher_dashboard_api():
    user, error = _require_role("Teacher")
    if error:
        return error

    data = TeacherController.get_dashboard_data(user["user_id"])
    connection = get_connection()
    try:
        result_stats = connection.execute(
            "SELECT COUNT(*) AS submitted, AVG(er.total_score) AS average FROM exam_results er JOIN exam_attempts ea ON ea.attempt_id = er.attempt_id JOIN exam_schedules es ON es.schedule_id = ea.schedule_id JOIN exams e ON e.exam_id = es.exam_id WHERE e.created_by = ?",
            (user["user_id"],),
        ).fetchone()
    finally:
        connection.close()

    return jsonify({
        "stats": [
            _stat("Câu hỏi trong ngân hàng", data["total_questions"], "Do bạn tạo", "bi-journal-bookmark"),
            _stat("Kỳ thi", data["total_exams"], "Do bạn tạo", "bi-clipboard-check"),
            _stat("Lượt thi đã nộp", result_stats["submitted"], "Các kỳ thi của bạn", "bi-inbox"),
            _stat("Điểm trung bình", f"{(result_stats['average'] or 0):.1f}".replace(".", ","), "Trên thang điểm 10", "bi-bar-chart"),
        ]
    })


@api.get("/api/admin/dashboard")
def admin_dashboard_api():
    user, error = _require_role("Admin")
    if error:
        return error

    connection = get_connection()
    try:
        users = connection.execute("SELECT COUNT(*) FROM users").fetchone()[0]
        exams = connection.execute("SELECT COUNT(*) FROM exams").fetchone()[0]
        questions = connection.execute("SELECT COUNT(*) FROM questions").fetchone()[0]
        results = connection.execute("SELECT COUNT(*) FROM exam_results").fetchone()[0]
    finally:
        connection.close()

    return jsonify({
        "stats": [
            _stat("Tổng người dùng", users, "Tài khoản trong hệ thống", "bi-people"),
            _stat("Kỳ thi", exams, "Tất cả kỳ thi", "bi-clipboard-check"),
            _stat("Câu hỏi", questions, "Trong ngân hàng câu hỏi", "bi-journal-bookmark"),
            _stat("Lượt thi đã nộp", results, "Có kết quả", "bi-inbox"),
        ]
    })


@api.get("/student/<path:page>")
def student_page(page):
    return _page("student", page)


@api.get("/teacher/<path:page>")
def teacher_page(page):
    return _page("teacher", page)


@api.get("/admin/<path:page>")
def admin_page(page):
    return _page("admin", page)
