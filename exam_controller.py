from datetime import datetime
from database import get_connection

class ExamController:
    @staticmethod
    def get_open_exams():
        conn = get_connection()
        rows = conn.execute('''
            SELECT e.*, s.subject_name, u.full_name as teacher_name, es.schedule_id,
                   (SELECT COUNT(*) FROM exam_questions eq WHERE eq.exam_id = e.exam_id) as q_count
            FROM exams e
            JOIN subjects s ON e.subject_id = s.subject_id
            JOIN users u ON e.created_by = u.user_id
            LEFT JOIN exam_schedules es ON es.exam_id = e.exam_id
            WHERE e.status = 'Open'
        ''').fetchall()
        conn.close()
        return [dict(r) for r in rows]

    @staticmethod
    def start_or_resume_attempt(student_id, schedule_id):
        """Hỗ trợ khôi phục bài thi nếu thí sinh bị rớt mạng/thoát trình duyệt (NFR Reliability)"""
        conn = get_connection()
        attempt = conn.execute('''
            SELECT * FROM exam_attempts 
            WHERE student_id = ? AND schedule_id = ? AND status = 'In_Progress'
        ''', (student_id, schedule_id)).fetchone()

        if not attempt:
            c = conn.cursor()
            c.execute("INSERT INTO exam_attempts (schedule_id, student_id) VALUES (?, ?)", (schedule_id, student_id))
            attempt_id = c.lastrowid
            conn.commit()
            attempt = conn.execute("SELECT * FROM exam_attempts WHERE attempt_id = ?", (attempt_id,)).fetchone()
        
        conn.close()
        return dict(attempt)

    @staticmethod
    def get_exam_paper(exam_id, attempt_id):
        """Lấy câu hỏi (KHÔNG gửi is_correct về frontend để chống gian lận - NFR Security)"""
        conn = get_connection()
        questions = conn.execute('''
            SELECT q.question_id, q.content, eq.points, eq.order_no
            FROM questions q
            JOIN exam_questions eq ON q.question_id = eq.question_id
            WHERE eq.exam_id = ? ORDER BY eq.order_no
        ''', (exam_id,)).fetchall()

        paper = []
        for q in questions:
            q_dict = dict(q)
            opts = conn.execute("SELECT option_id, option_text FROM question_options WHERE question_id = ?", (q['question_id'],)).fetchall()
            q_dict['options'] = [dict(o) for o in opts]
            
            # Lấy đáp án đã lưu nháp (nếu có)
            saved = conn.execute("SELECT selected_option_id, is_flagged FROM attempt_answers WHERE attempt_id = ? AND question_id = ?",
                                 (attempt_id, q['question_id'])).fetchone()
            q_dict['saved_option_id'] = saved['selected_option_id'] if saved else None
            q_dict['is_flagged'] = saved['is_flagged'] if saved else 0
            paper.append(q_dict)
            
        conn.close()
        return paper

    @staticmethod
    def auto_save_answer(attempt_id, question_id, option_id, is_flagged=0):
        """Lưu nháp tự động mỗi khi chọn đáp án hoặc đánh dấu cờ"""
        conn = get_connection()
        conn.execute('''
            INSERT INTO attempt_answers (attempt_id, question_id, selected_option_id, is_flagged)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(attempt_id, question_id) DO UPDATE SET
                selected_option_id = excluded.selected_option_id,
                is_flagged = excluded.is_flagged
        ''', (attempt_id, question_id, option_id, is_flagged))
        conn.commit()
        conn.close()

    @staticmethod
    def submit_and_grade(attempt_id, exam_id):
        """Khóa bài thi, chấm điểm tự động và tính Pass/Fail"""
        conn = get_connection()
        exam = conn.execute("SELECT * FROM exams WHERE exam_id = ?", (exam_id,)).fetchone()
        eq_rows = conn.execute("SELECT question_id, points FROM exam_questions WHERE exam_id = ?", (exam_id,)).fetchall()

        total_score = 0.0
        max_score = sum(r['points'] for r in eq_rows)

        for eq in eq_rows:
            q_id = eq['question_id']
            pts = eq['points']
            ans = conn.execute("SELECT selected_option_id FROM attempt_answers WHERE attempt_id = ? AND question_id = ?",
                               (attempt_id, q_id)).fetchone()
            if ans and ans['selected_option_id']:
                opt = conn.execute("SELECT is_correct FROM question_options WHERE option_id = ?", (ans['selected_option_id'],)).fetchone()
                if opt and opt['is_correct'] == 1:
                    total_score += pts
                    conn.execute("UPDATE attempt_answers SET is_correct = 1, earned_points = ? WHERE attempt_id = ? AND question_id = ?",
                                 (pts, attempt_id, q_id))

        # Quy đổi thang điểm 10
        final_score = round((total_score / max_score) * 10, 2) if max_score > 0 else 0.0
        is_passed = 1 if final_score >= exam['pass_score'] else 0

        conn.execute("UPDATE exam_attempts SET status = 'Submitted', submitted_at = CURRENT_TIMESTAMP WHERE attempt_id = ?", (attempt_id,))
        conn.execute('''
            INSERT OR REPLACE INTO exam_results (attempt_id, total_score, max_score, is_passed)
            VALUES (?, ?, 10.0, ?)
        ''', (attempt_id, final_score, is_passed))

        conn.commit()
        conn.close()
        return final_score, bool(is_passed)

    @staticmethod
    def get_student_history(student_id):
        conn = get_connection()
        rows = conn.execute('''
            SELECT er.*, e.title, ea.submitted_at, ea.attempt_id
            FROM exam_results er
            JOIN exam_attempts ea ON er.attempt_id = ea.attempt_id
            JOIN exam_schedules es ON ea.schedule_id = es.schedule_id
            JOIN exams e ON es.exam_id = e.exam_id
            WHERE ea.student_id = ?
            ORDER BY ea.submitted_at DESC
        ''', (student_id,)).fetchall()
        conn.close()
        return [dict(r) for r in rows]