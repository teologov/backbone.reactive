/*!
 * Backbone.Reactive plugin
 * ----------------------------
 * @author Andrew Teologov <teologov.and@gmail.com>
 * @date 2/5/15
 * @licence MIT
 */

(function(root, factory) {
    // AMD module
    if (typeof define === 'function' && define.amd) {
        define(["underscore", "backbone", "react"], function(_, Backbone, React) {
            return factory(_, Backbone, React);
        });
    }
    // CommonJS
    else if (typeof exports !== "undefined") {
        var _ = require("underscore");
        var Backbone = require("backbone");
        var React = require("react");
        module.exports = factory(_, Backbone, React);
    }
    // As browser global
    else {
        root.Reactive = factory(root._, root.Backbone, root.React);
    }

}(this, function(_, Backbone, React) {

    "use strict";

    var Reactive = function() {

    };

    Backbone.Reactive = Reactive;

    return Backbone.Reactive;

}));