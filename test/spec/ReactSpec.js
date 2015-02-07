/*!
 * Backbone.Reactive spec
 * @author Andrew Teologov <teologov.and@gmail.com>
 * @date 2/5/15
 */

var Backbone = require("backbone"),
    _ = require("underscore");

/* global basePath */
describe("Testing Backbone.Reactive Plugin", function() {

    "use strict";

    var Reactive;
    beforeEach(function() {

        Reactive = require(basePath + "backbone.reactive");

    });

    afterEach(function() {

        Reactive = null;

    });

    it("Should load plugin as CommonJS module", function() {

        assert.isFunction(Reactive, "Reactive plugin should be loaded");

    });

    it("Should create new instance of reactive view", function() {

        var reactive = new Reactive();

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

});
