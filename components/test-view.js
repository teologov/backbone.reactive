/*!
 * Reactive test view
 * @author Andrew Teologov <teologov.and@gmail.com>
 * @date 2/8/15
 */

var Reactive = require("../backbone.reactive.js");
var React = require("react");


var modelView = new Reactive({
    render: function() {
        return (
            <div>
                <span className="getModel">{this.getModel().get('name')}</span>
                <span className="props">{this.props.model.get('surname')}</span>
            </div>
        );
    }
});

var collectionView = new Reactive({
    render: function() {
        var singers = this.props.collection.map(function(model) {
            return <div className="singer">{model.get("name")} {model.get("surname")}</div>
        });
        return (
            <div>
                <div className="singers">{ singers }</div>
            </div>
        );
    }
});


module.exports = {
    modelView: modelView,
    collectionView: collectionView
};