VERSION=`cat ./version`

build:
	docker build -t null-solutions/invoicer:$(VERSION) .

start:
	docker compose up -d

stop:
	docker compose down
