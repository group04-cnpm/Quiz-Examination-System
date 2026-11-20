
from datetime import datetime, timedelta
from database import get_connection


class TeacherController:

    @staticmethod
    def add_question(teacher_id, subject_id, content, difficulty,
                     options, correct_idx, explanation=""):

        if not isinstance(content, str) or not content.strip():
            raise ValueError("Question content cannot be empty")

        if not isinstance(options, (list, tuple)) or len(options) != 4:
            raise ValueError("A question must have 4 options")

        for option in options:
            if not isinstance(option, str) or not option.strip():
                raise ValueError("Options cannot be empty")

        if type(correct_idx) != int or correct_idx not in range(4):
            raise ValueError("Correct answer must be from 0 to 3")

        conn = get_connection()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                SELECT subject_id FROM subjects
                WHERE subject_id = ?
            """, (subject_id,))

            if cursor.fetchone() is None:
                raise ValueError("Subject does not exist")

            cursor.execute("""
                INSERT INTO questions
                (subject_id, content, difficulty, explanation, created_by)
                VALUES (?, ?, ?, ?, ?)
            """, (subject_id, content, difficulty, explanation, teacher_id))

            question_id = cursor.lastrowid

            for i in range(len(options)):
                if i == correct_idx:
                    correct = 1
                else:
                    correct = 0

                cursor.execute("""
                    INSERT INTO question_options
                    (question_id, option_text, is_correct)
                    VALUES (?, ?, ?)
                """, (question_id, options[i], correct))

            conn.commit()
            return question_id

        except Exception:
            conn.rollback()
            raise

        finally:
            conn.close()

    @staticmethod
    def create_exam(teacher_id, subject_id, title,
                    duration, pass_score, q_ids):

        if not isinstance(title, str) or not title.strip():
            raise ValueError("Exam title cannot be empty")

        if type(duration) != int or duration <= 0:
            raise ValueError("Duration must be greater than 0")

        if type(pass_score) not in (int, float) or not 0 <= pass_score <= 10:
            raise ValueError("Pass score must be from 0 to 10")

        if not isinstance(q_ids, (list, tuple)) or len(q_ids) == 0:
            raise ValueError("Exam must have at least one question")

        for question_id in q_ids:
            if type(question_id) != int or question_id <= 0:
                raise ValueError("Invalid question ID")

        if len(q_ids) != len(set(q_ids)):
            raise ValueError("Duplicate questions are not allowed")

        conn = get_connection()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                SELECT subject_id FROM subjects
                WHERE subject_id = ?
            """, (subject_id,))

            if cursor.fetchone() is None:
                raise ValueError("Subject does not exist")

            placeholders = ",".join(["?"] * len(q_ids))

            cursor.execute(f"""
                SELECT question_id FROM questions
                WHERE subject_id = ?
                AND question_id IN ({placeholders})
            """, [subject_id] + list(q_ids))

            valid_questions = cursor.fetchall()

            if len(valid_questions) != len(q_ids):
                raise ValueError(
                    "Some questions do not exist or belong to another subject"
                )

            cursor.execute("""
                INSERT INTO exams
                (title, subject_id, created_by, duration_minutes,
                 pass_score, status)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (title, subject_id, teacher_id, duration, pass_score, "Open"))

            exam_id = cursor.lastrowid

            for i in range(len(q_ids)):
                cursor.execute("""
                    INSERT INTO exam_questions
                    (exam_id, question_id, points, order_no)
                    VALUES (?, ?, ?, ?)
                """, (exam_id, q_ids[i], 1, i + 1))

            start_time = datetime.now()
            end_time = start_time + timedelta(days=3650)

            cursor.execute("""
                INSERT INTO exam_schedules
                (exam_id, start_time, end_time)
                VALUES (?, ?, ?)
            """, (
                exam_id,
                start_time.strftime("%Y-%m-%d %H:%M:%S"),
                end_time.strftime("%Y-%m-%d %H:%M:%S")
            ))

            conn.commit()
            return exam_id

        except Exception:
            conn.rollback()
            raise

        finally:
            conn.close()

    @staticmethod
    def get_dashboard_data(teacher_id):

        conn = get_connection()
        cursor = conn.cursor()

        try:
            cursor.execute("""
                SELECT COUNT(*) FROM questions
                WHERE created_by = ?
            """, (teacher_id,))
            total_questions = cursor.fetchone()[0]

            cursor.execute("""
                SELECT COUNT(*) FROM exams
                WHERE created_by = ?
            """, (teacher_id,))
            total_exams = cursor.fetchone()[0]

            cursor.execute("""
                SELECT subject_id, subject_name
                FROM subjects
            """)
            subjects = [dict(row) for row in cursor.fetchall()]

            cursor.execute("""
                SELECT * FROM questions
                WHERE created_by = ?
                ORDER BY question_id DESC
                LIMIT 10
            """, (teacher_id,))
            questions = [dict(row) for row in cursor.fetchall()]

            cursor.execute("""
                SELECT * FROM exams
                WHERE created_by = ?
                ORDER BY exam_id DESC
                LIMIT 10
            """, (teacher_id,))
            exams = [dict(row) for row in cursor.fetchall()]

            data = {
                "total_questions": total_questions,
                "total_exams": total_exams,
                "subjects": subjects,
                "latest_questions": questions,
                "latest_exams": exams
            }

            return data

        finally:
            conn.close()
