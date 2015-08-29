default: build jquery

build:
	@./node_modules/.bin/browserify index.js -t babelify --standalone perfectLayout -o dist/perfectLayout.js
	@./node_modules/.bin/browserify index.js -t babelify -t uglifyify --standalone perfectLayout -o dist/perfectLayout.min.js

jquery:
	@./node_modules/.bin/browserify jqueryPlugin.js -t babelify -o dist/jquery.perfectLayout.js
	@./node_modules/.bin/browserify jqueryPlugin.js -t babelify -t uglifyify -o dist/jquery.perfectLayout.min.js

.PHONY: default
