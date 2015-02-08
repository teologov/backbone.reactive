/*!
 * Reactive test view
 * @author Andrew Teologov <teologov.and@gmail.com>
 * @date 2/8/15
 */

var Reactive = require(basePath + "backbone.reactive");

var view = new Reactive({
    render: function() {
    return (
        <label>
            <input ref="done" type="checkbox" />
            {this.props.name}
        </label>
        );
    }
});

module.exports = view;