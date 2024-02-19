install:
	npm ci

start:
	npx start-server

run_frontend:
	make -C frontend start

start-backend:
	npx start-server
