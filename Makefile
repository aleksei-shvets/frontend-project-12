install:
	npm ci

run_frontend:
	make -C frontend start

build:
	make -C frontend build

run_backend:
	npx start-server
