lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	cd frontend && make start

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	make start-backend && make start-frontend

build:
	rm frontend/build -rf
	make -C frontend build

