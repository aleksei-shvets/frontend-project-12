install:
	npm ci

start:
	npx start-server

run_frontend:
	make -C frontend start

build_frontend:
	make -C frontend && make build

run_backend:
	npx start-server
