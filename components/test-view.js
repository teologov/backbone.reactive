/*!
 * Reactive test view
 * @author Andrew Teologov <teologov.and@gmail.com>
 * @date 2/8/15
 */

var Reactive = require("../backbone.reactive.js");
var React = require("react");


var view = new Reactive({
    render: function() {
        return (
            <div>
                <span>{this.getModel().get('name')}</span>
            </div>
        );
    }
});


module.exports = view;