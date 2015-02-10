# Backbone.Reactive 
Meet plugin for Backbone.js family, which allows to combine powerful Backbone.js with React.js views.   

Plugin supports AMD, as well as CommonJS. So feel free to use it with require.js

### Usage

```javascript
define(["react", "backbone", "backbone.reactive"], function(React, Backbone, Reactive) {
  "use strict";
  
  var model = new Backbone.Model({name: "Andrew"});
  var MyReactiveComponent = new Backbone.Reactive({
    render: function() {
        return (
            <div>
                <span>{this.getModel().get('name')}</span>
            </div>
        );
    }
  });
  
  var ReactiveView = React.createFactory(MyReactiveComponent);

  var view = ReactiveView({
      model: model
  });

  var renderTarget = document.getElementById('myEl');
  
  // render view
  React.render(view, renderTarget);

```

### How to install
This package can be installed both, via `npm` or `bower`.

##### NPM
Please, use `npm install --save backbone.reactive` for `npm`.
##### Bower
Alternatively, use `bower install --save backbone.reactive` for `bower`.
