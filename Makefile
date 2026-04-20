.PHONY: help build up down restart logs shell seed migrate fresh rollback

help:
	@echo "Available commands:"
	@echo "  make build     - Build Docker images"
	@echo "  make up        - Start all services in background"
	@echo "  make down      - Stop and remove containers"
	@echo "  make restart   - Restart the app container"
	@echo "  make logs      - Tail app container logs"
	@echo "  make shell     - Open a shell inside the app container"
	@echo "  make migrate   - Run pending database migrations"
	@echo "  make rollback  - Roll back the last batch of migrations"
	@echo "  make seed      - Run database seeders (run manually, not on startup)"
	@echo "  make fresh     - Drop tables, re-run migrations and seeders"

build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart app

logs:
	docker compose logs -f app

shell:
	docker compose exec app sh

migrate:
	docker compose exec app node ace migration:run

rollback:
	docker compose exec app node ace migration:rollback

seed:
	docker compose exec app node ace db:seed

fresh:
	docker compose exec app node ace migration:fresh --seed
