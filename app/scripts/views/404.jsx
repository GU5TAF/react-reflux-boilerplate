'use strict';

// Components
var Link = require('react-router').Link;

var uhOh = React.createClass({
  render: function () {
    return (
      <h1>{ 'That Page Doesn\'t Exist' }</h1>
      <p><Link to="home">Return to the homepage</Link></p>
    );
  }
});

module.exports = uhOh;
