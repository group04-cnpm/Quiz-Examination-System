from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from database import init_db, get_connection
from controllers.auth_controller import AuthController
from controllers.exam_controller import ExamController
from controllers.teacher_controller import TeacherController

app = Flask(__name__)
app.secret_key = "group04_quiz_secret_key"

@app.route("/", methods=["GET", "POST"])
def login():
    error = None
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        user = AuthController.login(email, password)
        if user:
            session["user"] = user
            if user["role"] == "Student":
                return redirect(url_for("student_dashboard"))
            elif user["role"] == "Teacher":
                return redirect(url_for("teacher_dashboard"))
            elif user["role"] == "Admin":
                return redirect(url_for("admin_dashboard"))
        else:
            error = "Tên đăng nhập hoặc mật khẩu không chính xác!"
    return render_template("login.html", error=error)

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))

# ================= SINH VIÊN =================
@app.route("/student")
def student_dashboard():
    if "user" not in session or session["user"]["role"] != "Student":
        return redirect(url_for("login"))
    exams = ExamController.get_open_exams()
    history = ExamController.get_student_history(session["user"]["user_id"])
    return render_template("student_dashboard.html", user=session["user"], exams=exams, history=history)

@app.route("/student/exam/<int:exam_id>/<int:schedule_id>")
def take_exam(exam_id, schedule_id):
    if "user" not in session or session["user"]["role"] != "Student":
        return redirect(url_for("login"))
    conn = get_connection()
    exam = dict(conn.execute("SELECT * FROM exams WHERE exam_id = ?", (exam_id,)).fetchone())
    conn.close()
    
    attempt = ExamController.start_or_resume_attempt(session["user"]["user_id"], schedule_id)
    paper = ExamController.get_exam_paper(exam_id, attempt["attempt_id"])
    return render_template("take_exam.html", user=session["user"], exam=exam, attempt=attempt, paper=paper)

@app.route("/api/autosave", methods=["POST"])
def api_autosave():
    data = request.json
    ExamController.auto_save_answer(data["attempt_id"], data["question_id"], data["option_id"], data.get("is_flagged", 0))
    return jsonify({"status": "saved"})

@app.route("/student/submit/<int:attempt_id>/<int:exam_id>", methods=["POST"])
def submit_exam(attempt_id, exam_id):
    score, is_passed = ExamController.submit_and_grade(attempt_id, exam_id)
    return redirect(url_for("student_dashboard"))

# ================= GIẢNG VIÊN =================
@app.route("/teacher")
def teacher_dashboard():
    if "user" not in session or session["user"]["role"] != "Teacher":
        return redirect(url_for("login"))
    data = TeacherController.get_dashboard_data(session["user"]["user_id"])
    return render_template("teacher_dashboard.html", user=session["user"], data=data)

@app.route("/teacher/add_question", methods=["POST"])
def add_question():
    TeacherController.add_question(
        session["user"]["user_id"],
        int(request.form["subject_id"]),
        request.form["content"],
        request.form["difficulty"],
        [request.form["opt_a"], request.form["opt_b"], request.form["opt_c"], request.form["opt_d"]],
        int(request.form["correct_idx"]),
        request.form.get("explanation", "")
    )
    return redirect(url_for("teacher_dashboard"))

@app.route("/teacher/create_exam", methods=["POST"])
def create_exam():
    q_ids = [int(x) for x in request.form.getlist("question_ids")]
    if q_ids:
        TeacherController.create_exam(
            session["user"]["user_id"],
            int(request.form["subject_id"]),
            request.form["title"],
            int(request.form["duration"]),
            float(request.form["pass_score"]),
            q_ids
        )
    return redirect(url_for("teacher_dashboard"))

# ================= QUẢN TRỊ VIÊN =================
@app.route("/admin")
def admin_dashboard():
    if "user" not in session or session["user"]["role"] != "Admin":
        return redirect(url_for("login"))
    conn = get_connection()
    users = [dict(u) for u in conn.execute("SELECT * FROM users").fetchall()]
    logs = [dict(l) for l in conn.execute("SELECT * FROM activity_logs ORDER BY log_id DESC LIMIT 10").fetchall()]
    stats = {
        "users": len(users),
        "exams": conn.execute("SELECT COUNT(*) FROM exams").fetchone()[0],
        "questions": conn.execute("SELECT COUNT(*) FROM questions").fetchone()[0],
        "results": conn.execute("SELECT COUNT(*) FROM exam_results").fetchone()[0]
    }
    conn.close()
    return render_template("admin_dashboard.html", user=session["user"], users=users, logs=logs, stats=stats)

if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)
