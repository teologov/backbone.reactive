/*!
 * Backbone.Reactive spec
 * @author Andrew Teologov <teologov.and@gmail.com>
 * @date 2/5/15
 */

/* global basePath */
describe("Testing Backbone.Reactive Plugin", function() {

    "use strict";

    it("Should load plugin as CommonJS module", function() {

        var Reactive = require(basePath + "backbone.reactive");

        assert.isFunction(Reactive, "Reactive plugin should be loaded");

    });

});
