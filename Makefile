install:
	npm ci

start:
	npx start-server

run_app:
	make run_server && cd ./frontend && make run_frontend

lint_frontend:
	make -C frontend lint