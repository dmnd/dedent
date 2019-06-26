# Dedent-Tabs

![monthly downloads](https://img.shields.io/npm/dm/dedent-tabs.svg)
[![Build Status](https://travis-ci.com/adrianjost/dedent-tabs.svg?branch=master)](https://travis-ci.com/adrianjost/dedent-tabs)
[![codecov](https://codecov.io/gh/adrianjost/dedent-tabs/branch/master/graph/badge.svg)](https://codecov.io/gh/adrianjost/dedent-tabs)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7e343810585c48f1ac7c2acdb8bdad5d)](https://www.codacy.com/app/adrianjost/dedent-tabs?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=adrianjost/dedent-tabs&amp;utm_campaign=Badge_Grade)

> It's basicly [dedent](https://www.npmjs.com/search?q=keywords:dedent), but with support for tabs.

An ES6 string tag that strips indentation from multi-line strings.

## Usage

```js
import dedent from "dedent-tabs";

function usageExample() {
  const first = dedent`A string that gets so long you need to break it over
                       multiple lines. Luckily dedent is here to keep it
                       readable without lots of spaces ending up in the string
                       itself.`;

  const second = dedent`
    Leading and trailing lines will be trimmed, so you can write something like
    this and have it work as you expect:

      * how convenient it is
      * that I can use an indented list
         - and still have it do the right thing

    That's all.
  `;

  const third = dedent(`
    Wait! I lied. Dedent can also be used as a function.
  `);

  return first + "\n\n" + second + "\n\n" + third;
}
```

```js
> console.log(usageExample());
```

```
A string that gets so long you need to break it over
multiple lines. Luckily dedent is here to keep it
readable without lots of spaces ending up in the string
itself.

Leading and trailing lines will be trimmed, so you can write something like
this and have it work as you expect:

  * how convenient it is
  * that I can use an indented list
    - and still have it do the right thing

That's all.

Wait! I lied. Dedent can also be used as a function.
```

## License

MIT
