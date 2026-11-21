include .env
export

export PROJECT_ROOT=$(shell pwd)

env-up:
	docker compose up -d bug-tracker-postgres

env-down:
	docker compose down bug-tracker-postgres

env-cleanup:
	@read -p "Очистить все volume файлы окружения? [y/n]: " ans; \
	if [ "$$ans" = "y" ]; then \
		docker compose down -v && \
		echo "Файлы окружения очищены"; \
	else \
		echo "Очистка файлов окружения отменена"; \
	fi

migrate-create:
	@if [ -z "$(seq)" ]; then \
		echo "Отсутствует необходимый параметр seq. Пример: make migrate-create seq=init"; \
		exit 1; \
	fi; \
	docker compose run --rm bug-tracker-migrate \
		create \
		-ext sql \
		-dir /migrations \
		-seq "$(seq)"

migrate-up:
	@make migrate-action action=up

migrate-down:
	@make migrate-action action=down

migrate-action:
	@if [ -z "$(action)" ]; then \
		echo "Отсутствует необходимый параметр action"; \
		exit 1; \
	fi; \
	docker compose run --rm bug-tracker-migrate \
		-path /migrations \
		-database postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@bug-tracker-postgres:${POSTGRES_PORT}/${POSTGRES_DATABASE}?sslmode=disable \
		$(action)
