FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
	PYTHONUNBUFFERED=1 \
	QUIZ_DATABASE_PATH=/data/quiz.db

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN useradd --create-home app && mkdir -p /data && chown -R app:app /data
USER app

EXPOSE 5000

CMD ["python", "main.py"]
