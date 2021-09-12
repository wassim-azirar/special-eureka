# Build command for Chrome Extension

.PHONY: help build

help:
	$(info ${HELP_MESSAGE})
	@exit 0

fileName = $(shell date '+%Y_%m_%d_%H_%M')

build:
	@echo '#1/6 removing prior release...'
	@rm -rf dist/*

	@echo "\n"
	@echo '#2/6 preparing new extension build...'
	@export INLINE_RUNTIME_CHUNK=false; \
	export GENERATE_SOURCEMAP=false; \
	yarn build

	@echo "\n"
	@echo '#3/6 copying build folder content to dist folder...'
	@mkdir -p dist
	@cp -r build/* dist

	@echo "\n"
	@echo '#4/6 delete build folder...'
	@rm -rf build

	@echo "\n"
	@echo '#5/6 renaming index.html to popup.html...'
	@mv dist/index.html dist/popup.html

	@echo "\n"
	@echo '#6/6 zipping dist files for upload...'
	@zip -r -X releases/release_$(fileName).zip dist/*

	@echo "\n"
	@echo '🏆🏁 a extension release is ready for upload 🏁🏆'
	@exit 0

define HELP_MESSAGE

	--- Run this command to prepare the build for upload ---
	$ make build

endef