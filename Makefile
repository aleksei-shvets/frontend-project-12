install:
	npm ci

start:
	npx start-server

run_frontend:
	make -C frontend start

lint_frontend:
	make -C frontend lint