compile:
	npx tsc

build_docker:
	docker compose build

build: compile build_docker

start:
	docker compose up -d

refresh: build start

stop:
	docker compose down
