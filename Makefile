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

