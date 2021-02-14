FROM python:3.9-slim

LABEL "maintainer" "Anderson Banihirwe"
LABEL "repository" "https://github.com/andersy005/gh-action-py-licensed"
LABEL "homepage" "https://github.com/andersy005/gh-action-py-licensed"

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /app/requirements.txt
COPY ./examples /app/examples

RUN pip install -r /app/requirements.txt

ENV PYTHONPATH=/app
WORKDIR /app

ENTRYPOINT ["python", "-m", "liccheck"]
