# Use the official Python image as the base image
FROM python:3.9

# Install netcat
RUN apt-get update && \
    apt install -y netcat-traditional

RUN mkdir /app

WORKDIR /app

# Copy the Django project files into the container
COPY requirements.txt .

# Install dependencies
RUN pip install -r requirements.txt

# COPY init.sql /var/

COPY . .

COPY entrypoint.sh /

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh" ]