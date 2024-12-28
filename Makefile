VERSION=`cat ./version`

compile:
	npx tsc

build:
	docker build -t null-solutions/invoicer:$(VERSION) .

start:
	docker compose up -d

stop:
	docker compose down

migrations:
	npm run migrate up
