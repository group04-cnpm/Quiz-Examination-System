from database import get_connection
from werkzeug.security import generate_password_hash, check_password_hash

class AuthController:
    @staticmethod
    def login(email, password):
        """
        Xác thực đăng nhập cho các vai trò (Student, Teacher, Admin).
        Khớp hoàn toàn với cách gọi trong main.py: AuthController.login(email, password)
        """
        if not isinstance(email, str) or not email.strip():
            return None
        if not isinstance(password, str) or not password.strip():
            return None

        conn = get_connection()
        cursor = conn.cursor()

        try:
            # Truy vấn thông tin người dùng dựa theo email
            cursor.execute("""
                SELECT user_id, full_name, email, password_hash, role, status 
                FROM users 
                WHERE email = ?
            """, (email.strip(),))
            
            user = cursor.fetchone()
            if not user:
                return None

            user_dict = dict(user)

            # Kiểm tra trạng thái tài khoản (nếu bị khóa thì từ chối đăng nhập)
            if user_dict.get('status') == 'Locked':
                return None

            stored_password = user_dict['password_hash']
            is_valid = False

            # Hỗ trợ kiểm tra mật khẩu đã băm (Werkzeug hash) hoặc chuỗi thuần (dữ liệu cũ/mẫu)
            if stored_password.startswith('pbkdf2:') or stored_password.startswith('scrypt:'):
                is_valid = check_password_hash(stored_password, password)
            else:
                is_valid = (stored_password == password)

            if is_valid:
                # Trả về từ điển thông tin user khớp với cấu trúc lưu session trong main.py
                return {
                    "user_id": user_dict["user_id"],
                    "full_name": user_dict["full_name"],
                    "email": user_dict["email"],
                    "role": user_dict["role"]
                }
            
            return None

        finally:
            conn.close()

    @staticmethod
    def register_student(full_name, email, password, student_id=None, phone=None, class_name=None):
        """
        Đăng ký tài khoản mới dành cho Sinh viên (Vai trò: Student, Trạng thái: Active).
        """
        if not isinstance(full_name, str) or not full_name.strip():
            raise ValueError("Full name cannot be empty")
        if not isinstance(email, str) or not email.strip():
            raise ValueError("Email cannot be empty")
        if not isinstance(password, str) or len(password) < 6:
            raise ValueError("Password must be at least 6 characters long")

        conn = get_connection()
        cursor = conn.cursor()

        try:
            # Kiểm tra xem email (UQ email) đã tồn tại trong hệ thống chưa
            cursor.execute("SELECT user_id FROM users WHERE email = ?", (email.strip(),))
            if cursor.fetchone() is not None:
                raise ValueError("Email already exists in the system")

            # Mã hóa mật khẩu an toàn trước khi lưu xuống cơ sở dữ liệu
            password_hash = generate_password_hash(password)

            cursor.execute("""
                INSERT INTO users (full_name, email, password_hash, role, status)
                VALUES (?, ?, ?, 'Student', 'Active')
            """, (full_name.strip(), email.strip(), password_hash))

            conn.commit()
            return cursor.lastrowid

        except Exception:
            conn.rollback()
            raise

        finally:
            conn.close()

    @staticmethod
    def get_all_users():
        """Lấy toàn bộ danh sách người dùng phục vụ cho trang quản trị Admin"""
        conn = get_connection()
        cursor = conn.cursor()
        try:
            cursor.execute("SELECT user_id, full_name, email, role, status FROM users")
            users = [dict(row) for row in cursor.fetchall()]
            return users
        finally:
            conn.close()

    @staticmethod
    def update_user_status(user_id, new_status):
        """Cập nhật trạng thái tài khoản (Khóa / Mở khóa tài khoản)"""
        if new_status not in ('Active', 'Locked'):
            raise ValueError("Invalid account status")

        conn = get_connection()
        cursor = conn.cursor()
        try:
            cursor.execute("UPDATE users SET status = ? WHERE user_id = ?", (new_status, user_id))
            conn.commit()
        except Exception:
            conn.rollback()
            raise
        finally:
            conn.close()