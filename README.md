# Dedent

An ES6 string tag that strips indentation from multi-line strings.

## Usage

```js
var dd = require('dedent');

function usageExample() {
  let first = dd`A string that gets so long you need to break it over multiple
                 lines. Luckily dedent is here to keep it readable without
                 lots of spaces ending up in the string itself.`;

  let second = dd`
    Leading and trailing lines will be trimmed, so you can write something like
    this and have it work as you expect:

      * how convenient it is
      * that I can use an indented list
         - and still have it do the right thing

    That's all.
  `;

  return first + "\n\n" + second;
}
```

```
> console.log(usageExample());
A string that gets so long you need to break it over multiple
lines. Luckily dedent is here to keep it readable without
lots of spaces ending up in the string itself.

Leading and trailing lines will be trimmed, so you can write something like
this and have it work as you expect:

  * how convenient it is
  * that I can use an indented list
    - and still have it do the right thing

That's all.
```

## License

MIT
