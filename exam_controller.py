# controllers/exam_controller.py
import time
from database import get_connection
from models import Exam, Question

class ExamEngineController:
    @staticmethod
    def get_exam_details(exam_id: int) -> Exam:
        """Lấy thông tin đề thi và danh sách câu hỏi kèm theo"""
        conn = get_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT * FROM Exams WHERE exam_id = ?", (exam_id,))
        exam_row = cursor.fetchone()
        if not exam_row:
            conn.close()
            return None
        
        exam = Exam(exam_row['exam_id'], exam_row['title'], exam_row['duration_minutes'])
        
        # Join lấy danh sách câu hỏi của đề thi
        cursor.execute('''
            SELECT q.* FROM Questions q
            JOIN Exam_Questions eq ON q.question_id = eq.question_id
            WHERE eq.exam_id = ?
        ''', (exam_id,))
        q_rows = cursor.fetchall()
        conn.close()
        
        exam.questions = [
            Question(
                r['question_id'], r['content'], 
                r['option_a'], r['option_b'], r['option_c'], r['option_d'], 
                r['correct_option']
            ) for r in q_rows
        ]
        return exam

    @staticmethod
    def submit_and_score(student_id: int, exam_id: int, total_questions: int, correct_count: int) -> float:
        """Thuật toán chấm điểm tự động (Thang điểm 10) và lưu vào CSDL"""
        if total_questions > 0:
            score = round((correct_count / total_questions) * 10, 2)
        else:
            score = 0.0

        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO Exam_Results (student_id, exam_id, score, total_questions, correct_answers)
            VALUES (?, ?, ?, ?, ?)
        ''', (student_id, exam_id, score, total_questions, correct_count))
        conn.commit()
        conn.close()
        
        return score