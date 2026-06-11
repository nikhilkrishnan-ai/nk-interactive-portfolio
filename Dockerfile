FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8080
CMD ["sh", "-c", "exec functions-framework --target=hello_http --source=python_gps_webhook.py --port=${PORT:-8080} --host=0.0.0.0"]
