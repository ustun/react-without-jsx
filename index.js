var React = require('react');
var {renderToString} = require('react-dom/server');
var Parent = React.createFactory(require('./parent'));


console.log(renderToString(Parent()));
