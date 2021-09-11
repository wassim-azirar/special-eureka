# Build chrome Extension

.PHONY: help build

help:
	$(info ${HELP_MESSAGE})
	@exit 0

build:
	@echo '#1 removing old build...'
	@rm -rf dist/*
	@rm -f latestBuild.zip

	@echo '#2 preparing new extension build ...'
	@export INLINE_RUNTIME_CHUNK=false; \
	export GENERATE_SOURCEMAP=false; \
	yarn build

	@echo '#3 copy build to dist folder'
	@mkdir -p dist
	@cp -r build/* dist

	@echo '#4 renaming index.html popup.html ...'
	@mv dist/index.html dist/popup.html

	@echo '#5 zipping up build files for upload ...\n'
	@zip -r -X latestBuild.zip dist/*

	@echo 'new extension build ready.'
	@exit 0

define HELP_MESSAGE

	--- Run this command to prepare the build for upload ---
	$ make build

endef

