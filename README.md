# Using React without JSX

This is a sample repo showing how to use React without JSX.

Disclaimer: I'm actually still using in the main product I'm developing right
now, and probably won't switch due to huge existing base, but I'm considering
giving JSX-less React a go for new code.

## Why?


Using JSX is mostly a preference, but you should consider not using it for a
number of reasons (or at least give not using it a try):

- Editor support: This is personal, but Emacs' JS2 mode still doesn't have a very good support for JSX.
- I think JSX is a step back from the functional nature of React. Just using the underlying functions might make it clearer especially for people learning React.
- I also think JSX is a step back from the JS-embracing nature of React. Just using plain JS makes me feel more at home.
- Being a Clojure lover, this makes it easier to transition people to ClojureScript :)


## How?

It is actually pretty simple to use React without JSX and also pretty
convenient thanks to the destructuring operator in ES6. This repo presents
nothing new, but given that there have been a flux of new comers recently to
React, most people might not know React is this convenient even without JSX.

## Technique 1: Using React.DOM and React.createFactory

Note: This is the initial technique, but not the preferred one. See Technique 2 below for a better approach. But this one is easier to grasp initially.

Two rules:

- Require DOM elements using destructuring assignment and use them like normal functions.
```js
var {a, div, li, ul} = React.DOM;
```

The first argument is an object containing props (or null if empty), the rest are the children.

```js
var MyElement = React.createClass({
    render() {
        return div({style: {color: 'red'}},
                   h1(null, 'Hello ' + this.props.name),
                   ul(null,
                      li(null, a({href: "http://cnn.com"}, "CNN")),
                      li(null, a({href: "http://bbc.com"}, "BBC"))));
   }
});
```

So, the full file is the following:
```js
var React = require('react');
var {div, h1, ul, li, a} = React.DOM;

var MyElement = React.createClass({
    render() {
        return div({style: {color: 'red'}},
                   h1(null, 'Hello ' + this.props.name),
                   ul(null,
                      li(null, a({href: "http://cnn.com"}, "CNN")),
                      li(null, a({href: "http://bbc.com"}, "BBC"))));
   }
});

module.exports = MyElement;
```


- When using custom React elements, immediately transform them via `React.createFactory` before using.

```js
var MyElement = React.createFactory(require('./MyElement'));

var MyParentElement = React.createClass({
    render() {
        return div(null,
                   MyElement({name: 'John'}),
                   MyElement({name: 'Mary'}));

    }

});
```

The full file is the following:

```js
var React = require('react');

var MyElement = React.createFactory(require('./MyElement'));
var {div} = React.DOM;

var MyParentElement = React.createClass({
    render() {
        return div(null,
                   MyElement({name: 'John'}),
                   MyElement({name: 'Mary'}));

    }

});


module.exports = MyParentElement;

```

## Technique 2: Using React.createElement as h

This was suggested by https://github.com/jacksonrayhamilton and I actually think it is superior, just use React.createElement. To save typing, give it a short name like h.

React.createElement allows you to create DOM elements and components using the same interface.

Also, a nice little hack: If you use 2-space indentation and a single letter abbreviation (like `h`, nested elements are indented as you intend.

```js
var React = require('react');
var ReactDOM = require('react-dom');
var h = React.createElement;

var OtherComponent = React.createClass({
  render: function () {
    return h('div', {className: 'example'}, 'Greetings.');
  }
});

var ExampleComponent = React.createClass({
  render: function () {
    return h('div', {className: 'example', style: {color: 'red'}},
             h('h1', null, 'Example Component'),
             h('ul', null,
               h('li', null, 'One item'),
               h('li', null, 'Another item')),
             h(OtherComponent));
  }
});

```

Or, using ES6:

```js
import {createElement as h, createClass } from 'react';

const OtherComponent = createClass({
  render() {
    return h('div', {className: 'example'}, 'Greetings.');
  }
});

const ExampleComponent = createClass({
  render() {
    return h('div', {className: 'example', style: {color: 'red'}},
      h('h1', null, 'Example Component'),
      h('ul', null,
      h('li', null, 'One item'),
      h('li', null, 'Another item')),
      h(OtherComponent)
    );
  }
});
```

## Example

This repo includes a few files demoing this.

Just do an `npm install` followed by `npm run example`

Example uses using React in node, but obviously this technique works in the browser too.

## Tradeoffs

One surprising thing React does for performance is, if the props is an empty object, it uses null instead of `{}`. You may try reverting that for aesthetic reasons, but probably shouldn't.

That said, here is an alternative project called hyperscript that gets rids of nulls, and combines children into arrays:

https://github.com/ohanhi/hyperscript-helpers

https://github.com/mlmorg/react-hyperscript

For CoffeeScript, see https://github.com/kalasjocke/react-coffee-elements
