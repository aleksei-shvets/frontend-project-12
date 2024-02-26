lint-frontend:
	make -C frontend lint

install:
	npm ci

start-backend:
	npx start-server -s ./frontend/build

deploy:
	git push heroku main

start:
	make start-backend

build:
	rm frontend/build -rf
	make -C frontend build

