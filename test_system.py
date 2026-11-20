
import pytest
from controllers.teacher_controller import TeacherController


def test_tc02_add_question_empty_content(monkeypatch):
    with pytest.raises(ValueError):
        TeacherController.add_question(
            1, 1, "", "Easy",
            ["A", "B", "C", "D"], 0
        )


def test_tc02_add_question_not_enough_options(monkeypatch):
    with pytest.raises(ValueError):
        TeacherController.add_question(
            1, 1, "What is Python?", "Easy",
            ["A", "B", "C"], 0
        )


def test_tc02_add_question_empty_option(monkeypatch):
    with pytest.raises(ValueError):
        TeacherController.add_question(
            1, 1, "What is Python?", "Easy",
            ["A", "B", "", "D"], 0
        )


def test_tc02_add_question_invalid_correct_answer(monkeypatch):
    with pytest.raises(ValueError):
        TeacherController.add_question(
            1, 1, "What is Python?", "Easy",
            ["A", "B", "C", "D"], 5
        )


def test_tc02_create_exam_empty_title(monkeypatch):
    with pytest.raises(ValueError):
        TeacherController.create_exam(
            1, 1, "", 60, 5, [1, 2]
        )


def test_tc02_create_exam_invalid_duration(monkeypatch):
    with pytest.raises(ValueError):
        TeacherController.create_exam(
            1, 1, "Python Test", 0, 5, [1, 2]
        )


def test_tc02_create_exam_empty_questions(monkeypatch):
    with pytest.raises(ValueError):
        TeacherController.create_exam(
            1, 1, "Python Test", 60, 5, []
        )


def test_tc02_create_exam_duplicate_questions(monkeypatch):
    with pytest.raises(ValueError):
        TeacherController.create_exam(
            1, 1, "Python Test", 60, 5, [1, 2, 1]
        )


def test_tc02_create_exam_invalid_question_id(monkeypatch):
    with pytest.raises(ValueError):
        TeacherController.create_exam(
            1, 1, "Python Test", 60, 5, [1, -2]
        )


def test_tc02_create_exam_invalid_pass_score(monkeypatch):
    with pytest.raises(ValueError):
        TeacherController.create_exam(
            1, 1, "Python Test", 60, 11, [1, 2]
        )
