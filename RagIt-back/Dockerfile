# backend/Dockerfile
FROM python:3.13-slim

COPY requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

WORKDIR /app

# Copy Python dependencies from the builder stage
# COPY --from=builder /root/.local /root/.local

# Ensure the Python environment is accessible
# ENV PATH="/root/.local/bin:$PATH"

COPY . /app

EXPOSE 8000

CMD ["fastapi", "run", "starter.py", "--port", "8000"]