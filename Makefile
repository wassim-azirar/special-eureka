# Build command for Chrome Extension

.PHONY: help build

help:
	$(info ${HELP_MESSAGE})
	@exit 0

build:
	@echo 'removing prior build...'
	@rm -rf dist/*
	@rm -f latestBuild.zip

	@echo 'preparing new extension build...'
	@export INLINE_RUNTIME_CHUNK=false; \
	export GENERATE_SOURCEMAP=false; \
	yarn build

	@echo 'copying build to dist...'
	@mkdir -p dist
	@cp -r build/* dist

	@echo 'renaming files...'
	@mv dist/index.html dist/popup.html

	@echo 'zipping up build files for upload...'
	@zip -r -X latestBuild.zip dist/*

	@echo 'new extension build ready for upload!'
	@exit 0

define HELP_MESSAGE

	--- Run this command to prepare the build for upload ---
	$ make build

endef