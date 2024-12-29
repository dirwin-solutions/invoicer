VERSION=`cat ./version`

compile:
	npx tsc

build_docker:
	docker build -t null-solutions/invoicer:$(VERSION) .

build: compile build_docker

start:
	docker compose up -d

refresh: build start

stop:
	docker compose down

migrations:
	npm run migrate up
