install:
	npm ci

start:
	npx start-server

build:
	make -C frontend && make build