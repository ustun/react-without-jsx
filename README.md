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
                   h1(null, 'Hello ' + this.props.name)
                   ul(null,
                      li(null, a({href: "http://cnn.com"}, "CNN")),
                      li(null, a({href: "http://bbc.com}))));
   }
});
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

## Example

This repo includes a few files demoing this.

Just do an `npm install` followed by `npm run example`

Example uses using React in node, but obviously this technique works in the browser too.
