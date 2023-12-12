start:
	sudo docker compose up --build

migrate:
	sudo docker exec -it django  python manage.py migrate

migrations:
	sudo docker exec -it django  python manage.py makemigrations

attach:
	sudo docker attach django

shell:
	sudo docker exec -it django sh

superuser:
	sudo docker exec -it django python manage.py createsuperuser

test:
	sudo docker exec -it django  python manage.py test


