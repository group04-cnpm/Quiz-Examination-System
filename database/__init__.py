import os
import sqlite3
from pathlib import Path


_DEFAULT_DATABASE_PATH = Path(__file__).with_name("quiz.db")


def _get_database_path(database_path=None):
    configured_path = database_path or os.environ.get("QUIZ_DATABASE_PATH")
    if configured_path == ":memory:":
        return configured_path

    path = Path(configured_path) if configured_path else _DEFAULT_DATABASE_PATH
    path = path.expanduser().resolve()
    path.parent.mkdir(parents=True, exist_ok=True)
    return str(path)


def get_connection(database_path=None):
    connection = sqlite3.connect(_get_database_path(database_path), timeout=30)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    connection.execute("PRAGMA busy_timeout = 30000")
    return connection


def init_db(database_path=None):
    schema_path = Path(__file__).with_name("schema.sql")
    schema = schema_path.read_text(encoding="utf-8")

    connection = get_connection(database_path)
    try:
        connection.executescript(schema)
        connection.commit()
    finally:
        connection.close()
