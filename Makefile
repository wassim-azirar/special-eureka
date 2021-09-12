# Build command for Chrome Extension

.PHONY: help build

help:
	$(info ${HELP_MESSAGE})
	@exit 0

fileName = $(shell date '+%Y_%m_%d_%H_%M')

build:
	@echo '#1/5 removing prior release...'
	@rm -rf dist/*

	@echo '#2/5 preparing new extension build...'
	@export INLINE_RUNTIME_CHUNK=false; \
	export GENERATE_SOURCEMAP=false; \
	yarn build

	@echo "\n"
	@echo '#3/5 copying build to dist...'
	@mkdir -p dist
	@cp -r build/* dist

	@echo '#4/5 renaming files...'
	@mv dist/index.html dist/popup.html

	@echo '#5/5 zipping up build files for upload...'
	@zip -r -X releases/release_$(fileName).zip dist/*

	@echo "\n"
	@echo '🏆🏁 new extension build ready for upload 🏁🏆'
	@exit 0

define HELP_MESSAGE

	--- Run this command to prepare the build for upload ---
	$ make build

endef