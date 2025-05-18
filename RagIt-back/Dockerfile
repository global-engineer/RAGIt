# backend/Dockerfile
FROM python:3.13-slim

WORKDIR /code

# COPY ./requirements.txt /code/requirements.txt

COPY . /code/app

RUN pip install --no-cache-dir --upgrade -r /code/app/requirements.txt


# Expose FastApi port
EXPOSE 8000

CMD ["fastapi", "run", "app/starter.py", "--port", "8000"]