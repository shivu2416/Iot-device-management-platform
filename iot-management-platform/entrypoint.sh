#!/bin/bash

if [ "$POSTGRES_DB" = "testing" ]
then
    echo "Waiting for postgres..."
    while ! nc -z $PGHOST $POSTGRES_PORT; do
      sleep 0.1
    done

    while ! nc -z $TIMESCALE_HOST $TIMESCALE_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python manage.py makemigrations
python manage.py migrate --database=timescala
python manage.py migrate
python manage.py runserver 0.0.0.0:8000

exec "$@"