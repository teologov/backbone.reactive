/*!
 * Backbone.Reactive spec
 * @author Andrew Teologov <teologov.and@gmail.com>
 * @date 2/5/15
 */

var Backbone = require("backbone"),
    _ = require("underscore"),
    jsdom = require('jsdom').jsdom,
    TestView = require('../../build/test-view'),
    Reactive = require("../../backbone.reactive");

var TestFactory, React, TestUtils;


/* global basePath, describe */
describe("Testing Backbone.Reactive Plugin", function() {

    "use strict";

    it("Should load plugin as CommonJS module", function() {

        assert.isFunction(Reactive, "Reactive plugin should be loaded");

    });

    it("Should create new instance of reactive view", function() {

        var reactive = new Reactive({render: function() {}});

        assert.isFunction(reactive, "Function should be returned after instance create");

    });

    describe("Testing Backbone.Reactive.GenericStorageMixin", function() {

        var mixin,
            name = "model",
            updateOptions = {
                events: "sync"
            };

        beforeEach(function() {

            mixin = new Reactive.GenericStorageMixin(name, updateOptions);

        });

        afterEach(function() {

            mixin = null;

        });

        it("Should create new instance of class", function() {

            assert.isTrue(mixin instanceof Object, "API object should be returned");

        });

        it.skip("Should subscribe to the context events", function() {

            var context = mixin.getContext(),
                mock = {
                    model: new Backbone.Model(),
                    // mock
                    isMounted: function() {
                        return true;
                    },
                    forceUpdate: function() {

                    }
                };

            // mock
            context.isMounted = function() {
                return true;
            };

            context.forceUpdate = function() {
                return false;
            };

            var storageGetterSpy = sinon.stub(context, "getStorage", function() { return mock.model; });
            var subscribeSpy = sinon.spy(context, "subscribe");

            mixin.componentDidMount();

            assert.isTrue(storageGetterSpy.calledOnce, "Storage getter should be called");
            assert.isTrue(subscribeSpy.calledOnce, "Subscriber should be called");

            storageGetterSpy.restore();
            subscribeSpy.restore();

        });

    });

    describe("Testing Backbone.Reactive Plugin View", function() {

        var component, renderTarget, renderedComponent, inputComponent, element, model;

        beforeEach(function(done) {

            var html = "<!doctype html><html><body></body></html>";

            jsdom.env(html, function (err, window) {
                // TODO: react should be loaded after jdom is initialised (!)
                // temporary monkey patch to allow usage of jsdom
                require('react/lib/ExecutionEnvironment').canUseDOM = true;

                global.window = window;
                global.document = global.window.document;
                global.navigator = global.window.navigator;

                model = new Backbone.Model({name: "myName"});

                React = require('react/addons');
                TestUtils = React.addons.TestUtils;
                // Because we're not using "*.jsx" here, we need to wrap the component in a factory
                // manually. See https://gist.github.com/sebmarkbage/ae327f2eda03bf165261
                TestFactory = React.createFactory(TestView);

                // create component
                component = TestFactory({
                    model: model
                });

                renderTarget = global.document.getElementsByTagName('body')[0];

                renderedComponent = React.render(component, renderTarget);

                // searching for <input> tag within rendered React component
                // it throws an exception if not found
                inputComponent = TestUtils.findRenderedDOMComponentWithTag(
                    renderedComponent,
                    'span'
                );

                element = inputComponent.getDOMNode();

                done(err);
            });
        });

        afterEach(function() {

            component = null;
            renderTarget = null;
            renderedComponent = null;
            inputComponent = null;
            element = null;
            model = null;

        });

        it("Should render checkbox input", function() {

            assert.equal(element._localName, "span", "Span should be rendered");

        });

        it("Should update html on model change event", function() {

            model.set("name", "Andrew");

            assert.equal(element.textContent, "Andrew", "Model change should be reflected in the dom element");

        })

    });

});
