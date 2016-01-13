var React = require('react');
var {div} = React.DOM;

var Child = React.createFactory(require('./child'));

var Parent = React.createClass({
    render() {
        return div(null,
                   Child({name: 'John'}),
                   Child({name: 'Mary'}));
    }

});

module.exports = Parent;
