# Binary file names.
BINARY_NAME=lc-kit-web
export BASE_DIR := $(shell pwd)

# Build parameters.
DIST_PATH=${BASE_DIR}/.dist

.PHONY: build
build: build-web build-go


build-web:
	pnpm i
	pnpm run build
	cp -r dist server/ui

build-go:
	rm -rf ${DIST_PATH}
	cd server && \
	go mod tidy && \
	GO111MODULE=on CGO_ENABLED=0 go build -trimpath -mod=readonly -v -o $(DIST_PATH)/${BINARY_NAME} main.go


