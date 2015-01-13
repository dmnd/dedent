# Dedent

An ES6 string tag that strips indentation from multi-line strings.

## Usage

```js
var dd = require('dedent');

function usageExample() {
  return dd`A string that gets so long you need to break it over multiple
            lines. Luckily dedent is here to keep it readable without lots of
            spaces ending up in the string itself.`;
}

usageExample().indexOf('  '); //=> -1
```

## License

MIT
