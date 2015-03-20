'use strict';

var React = require("react");

module.exports = React.createClass({
  render: function() {
    return (
      <h1>Hello, to you {this.props.text}.</h1>
    );
  }
});
