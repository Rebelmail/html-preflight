# html-preflight

[![Build Status](https://travis-ci.org/Rebelmail/html-preflight.svg?branch=master)](https://travis-ci.org/Rebelmail/html-preflight)
[![NPM version](https://badge.fury.io/js/html-preflight.png)](http://badge.fury.io/js/html-preflight)

HTMLPreflight is a runner of plugins that transform an email before sending it.

## Example

```js
var HTMLPreflight = require('html-preflight');
var Minifier = require('html-preflight').MinifierPlugin;

var minifier = new Minifier();
var preflight = new HTMLPreflight([minifier.run.bind(minifier)]);

preflight.run(htmlString, { stats: true }, function(err, finalHtml) {
  console.log(arguments);
});
```

## Documentation

### `HTMLPreflight(plugins)`

Takes in an array of functions. This functions will run in the order they were
provided. Each will pass the resulting HTML string to the next function.
Always keep in mind that if your provided function must have access to its
scope, you will probably have to bind it to it.

### `run(htmlString, options, callback)`

* htmlString -> Initial HTML to transform.
* `options` -> Object with flags for `stats`.
* `callback(err, html)` -> Callback executed after plugins finish running. The second parameter will contain the final transformation

## Enjoy
