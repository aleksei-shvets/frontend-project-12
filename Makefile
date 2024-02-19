install:
	npm ci

start:
	npx start-server

run_frontend:
	make -C frontend start

build_frontend:
	make -C frontend build

run_backend:
	npx start-server
