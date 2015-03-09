'use strict';

// var $ = jQuery;
var React  = require('react/addons');
var Reflux = require('reflux');

var Hello = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

React.render(<Hello name="World" />, document.body);
