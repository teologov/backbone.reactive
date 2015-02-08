TESTS = test/specs/*.js
REPORTER = spec

test:
	@NODE_ENV=test NODE_TLS_REJECT_UNAUTHORIZED=0 ./node_modules/.bin/mocha \
	 --require ./test/common.js \
        --reporter $(REPORTER) \
        --ui bdd \
        --recursive \
        --colors \
        --timeout 5000 \
        --slow 300 \

test-w:
	@NODE_ENV=test NODE_TLS_REJECT_UNAUTHORIZED=0 ./node_modules/.bin/mocha \
	--require ./test/common.js \
        --reporter $(REPORTER) \
        --ui bdd \
        --recursive \
        --colors \
        --timeout 5000 \
        --slow 300 \
        --watch

jsx:
	./node_modules/.bin/jsx test/components/ test/build/

.PHONY: test test-w
