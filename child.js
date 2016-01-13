var React = require('react');
var {div, p, a} = React.DOM;

var HelloWorld = React.createClass({
    render() {
        return div({className: 'foo', style: {color: 'red'}},
                   p(null, 'Hello'),
                   p(null, 'World and ' + this.props.name),
                   a({href: 'http://react.parts'}, 'A sample link'));

    }
});

module.exports = HelloWorld;
