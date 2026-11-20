CREATE TABLE IF NOT EXISTS users (
	user_id INTEGER PRIMARY KEY AUTOINCREMENT,
	full_name TEXT NOT NULL,
	email TEXT NOT NULL COLLATE NOCASE UNIQUE,
	password_hash TEXT NOT NULL,
	role TEXT NOT NULL CHECK (role IN ('Student', 'Teacher', 'Admin')),
	status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Locked')),
	student_code TEXT,
	phone TEXT,
	class_name TEXT,
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subjects (
	subject_id INTEGER PRIMARY KEY AUTOINCREMENT,
	subject_name TEXT NOT NULL UNIQUE,
	description TEXT,
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS questions (
	question_id INTEGER PRIMARY KEY AUTOINCREMENT,
	subject_id INTEGER NOT NULL,
	content TEXT NOT NULL,
	difficulty TEXT NOT NULL DEFAULT 'Medium',
	explanation TEXT NOT NULL DEFAULT '',
	created_by INTEGER NOT NULL,
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
	FOREIGN KEY (created_by) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS question_options (
	option_id INTEGER PRIMARY KEY AUTOINCREMENT,
	question_id INTEGER NOT NULL,
	option_text TEXT NOT NULL,
	is_correct INTEGER NOT NULL DEFAULT 0 CHECK (is_correct IN (0, 1)),
	FOREIGN KEY (question_id) REFERENCES questions(question_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS exams (
	exam_id INTEGER PRIMARY KEY AUTOINCREMENT,
	title TEXT NOT NULL,
	subject_id INTEGER NOT NULL,
	created_by INTEGER NOT NULL,
	duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
	pass_score REAL NOT NULL DEFAULT 5.0 CHECK (pass_score BETWEEN 0 AND 10),
	status TEXT NOT NULL DEFAULT 'Draft',
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
	FOREIGN KEY (created_by) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS exam_questions (
	exam_id INTEGER NOT NULL,
	question_id INTEGER NOT NULL,
	points REAL NOT NULL DEFAULT 1.0 CHECK (points >= 0),
	order_no INTEGER NOT NULL,
	PRIMARY KEY (exam_id, question_id),
	UNIQUE (exam_id, order_no),
	FOREIGN KEY (exam_id) REFERENCES exams(exam_id) ON DELETE CASCADE,
	FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

CREATE TABLE IF NOT EXISTS exam_schedules (
	schedule_id INTEGER PRIMARY KEY AUTOINCREMENT,
	exam_id INTEGER NOT NULL,
	start_time TEXT NOT NULL,
	end_time TEXT NOT NULL,
	FOREIGN KEY (exam_id) REFERENCES exams(exam_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS exam_attempts (
	attempt_id INTEGER PRIMARY KEY AUTOINCREMENT,
	schedule_id INTEGER NOT NULL,
	student_id INTEGER NOT NULL,
	started_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	submitted_at TEXT,
	status TEXT NOT NULL DEFAULT 'In_Progress',
	FOREIGN KEY (schedule_id) REFERENCES exam_schedules(schedule_id),
	FOREIGN KEY (student_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS attempt_answers (
	attempt_id INTEGER NOT NULL,
	question_id INTEGER NOT NULL,
	selected_option_id INTEGER,
	is_flagged INTEGER NOT NULL DEFAULT 0 CHECK (is_flagged IN (0, 1)),
	is_correct INTEGER NOT NULL DEFAULT 0 CHECK (is_correct IN (0, 1)),
	earned_points REAL NOT NULL DEFAULT 0 CHECK (earned_points >= 0),
	PRIMARY KEY (attempt_id, question_id),
	FOREIGN KEY (attempt_id) REFERENCES exam_attempts(attempt_id) ON DELETE CASCADE,
	FOREIGN KEY (question_id) REFERENCES questions(question_id),
	FOREIGN KEY (selected_option_id) REFERENCES question_options(option_id)
);

CREATE TABLE IF NOT EXISTS exam_results (
	result_id INTEGER PRIMARY KEY AUTOINCREMENT,
	attempt_id INTEGER NOT NULL UNIQUE,
	total_score REAL NOT NULL DEFAULT 0,
	max_score REAL NOT NULL DEFAULT 10,
	is_passed INTEGER NOT NULL DEFAULT 0 CHECK (is_passed IN (0, 1)),
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (attempt_id) REFERENCES exam_attempts(attempt_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activity_logs (
	log_id INTEGER PRIMARY KEY AUTOINCREMENT,
	user_id INTEGER,
	action TEXT NOT NULL,
	details TEXT,
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_questions_subject ON questions(subject_id);
CREATE INDEX IF NOT EXISTS idx_exams_status ON exams(status);
CREATE INDEX IF NOT EXISTS idx_schedules_exam ON exam_schedules(exam_id);
CREATE INDEX IF NOT EXISTS idx_attempts_student_schedule ON exam_attempts(student_id, schedule_id, status);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON activity_logs(created_at);
