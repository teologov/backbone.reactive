/*!
 * Backbone.Reactive plugin
 * ----------------------------
 * @author Andrew Teologov <teologov.and@gmail.com>
 * @date 2/5/15
 * @licence MIT
 */

(function(root, factory) {
    // AMD module
    if (typeof define === "function" && define.amd) {
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

    var viewMixin = {
        render: function() {}
    };

    /**
     * Storage mixin
     * @param {String} name
     * @param {Object} updateOptions :: options helps to subscribe on updates
     * @constructor
     */
    function GenericStorageMixin(name, updateOptions) {

        var self = this;

        /**
         * Type (name) of the storage. Expecting 'model' or 'collection'
         * @type string
         */
        this.name = name;

        /**
         * Update options object
         * @type {{events: String, binder: Function}}
         */
        this.updateOptions = {
            events: updateOptions.events,
            binder: _.debounce
        };

        /**
         * Subscriber
         * @param context
         */
        this.subscribe = function(context) {
            var storage = this.getStorage(context.props);

            if (_.isUndefined(storage)) {
                return;
            }

            var callback = this.updateOptions.binder(function() {
                if (this.isMounted()) {
                    this.forceUpdate();
                }
            }.bind(context));

            storage.on(this.updateOptions.events, callback, context);
        };

        /**
         * Unsubscriber
         * @param context
         */
        this.unsubscribe = function(context) {
            var storage = this.getStorage(context.props);

            if (_.isUndefined(storage)) {
                return;
            }

            storage.off(null, null, context);
        };

        this.getStorage = function(props) {
            return props[this.name]
        };

        // api ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ----
        return {
            componentDidMount: function() { // subscribe here
                self.subscribe(this);
            },
            componentWillUnmount: function() {  // unsubscribe
                self.unsubscribe(this);
            },
            componentWillReceiveProps: function(nextProps) { // new props were added
                if (self.getStorage(this.props) == self.getStorage(nextProps)) {
                    return;
                }

                self.unsubscribe(this);
                self.subscribe(nextProps);
            }
        }
    }

    /**
     * Backbone.Reactive
     * @param attributes :: react attributes
     * @type {Function}
     */
    var Reactive = Backbone.Reactive = function(attributes) {

        (!_.isObject(attributes) ? (attributes = {}) : attributes);

        attributes.mixins = ((!_.isArray(attributes.mixins) ? (attributes.mixins = []) : attributes.mixins)).concat([
            new GenericStorageMixin("model", {
                events: "change sync"
            }),
            new GenericStorageMixin("collection", {
                events: "add remove reset sort sync"
            }),
            viewMixin
        ]);

        return React.createClass(attributes);

    };

    Reactive.GenericStorageMixin = GenericStorageMixin;

    Backbone.React = React;

    return Backbone.Reactive;

}));