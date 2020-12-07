# Dedent-Tabs

[![npm](https://img.shields.io/npm/v/dedent-tabs?color=brightgreen)](https://www.npmjs.com/package/dedent-tabs)
[![npm bundle size](https://img.shields.io/bundlephobia/min/dedent-tabs?color=brightgreen)](https://bundlephobia.com/result?p=dedent-tabs)
![monthly downloads](https://img.shields.io/npm/dm/dedent-tabs.svg)

[![Build Status](https://travis-ci.com/adrianjost/dedent-tabs.svg?branch=master)](https://travis-ci.com/adrianjost/dedent-tabs)
[![CI](https://github.com/adrianjost/dedent-tabs/workflows/CI/badge.svg)](https://github.com/adrianjost/dedent-tabs/actions?query=workflow%3ACI)
[![Code Coverage](https://codecov.io/gh/adrianjost/dedent-tabs/branch/master/graph/badge.svg)](https://codecov.io/gh/adrianjost/dedent-tabs)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7e343810585c48f1ac7c2acdb8bdad5d)](https://www.codacy.com/app/adrianjost/dedent-tabs?utm_source=github.com&utm_medium=referral&utm_content=adrianjost/dedent-tabs&utm_campaign=Badge_Grade)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=adrianjost/dedent-tabs)](https://dependabot.com)
[![Dependency Status](https://david-dm.org/adrianjost/dedent-tabs.svg)](https://david-dm.org/adrianjost/dedent-tabs)
[![Dependency Status](https://david-dm.org/adrianjost/dedent-tabs/dev-status.svg)](https://david-dm.org/adrianjost/dedent-tabs?type=dev)

> It's basicly [dedent](https://www.npmjs.com/package/dedent), but with **support for tabs and still maintained**.

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

```text
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

### Escape characters in template strings

When using the template string tag syntax, for example:

```
dedent`
  Hi there I am
  a multi line
  string
`
```

`dedent` will not support all the escape sequences that a standard ES6 template string supports and will return them literally.

For example:

```
console.log(dedent`
  \xA9
`)
// Logs "\xA9"
```

The currently supported escape sequences are:

- [\n](https://github.com/adrianjost/dedent-tabs/blob/d23380be141ccf7ba704f7b1e6ba9d3f0d388783/__tests__/dedent-tests.js#L93)
- [Line continuations](https://github.com/adrianjost/dedent-tabs/blob/d23380be141ccf7ba704f7b1e6ba9d3f0d388783/__tests__/dedent-tests.js#L22)
- [\\`](https://github.com/adrianjost/dedent-tabs/blob/d23380be141ccf7ba704f7b1e6ba9d3f0d388783/__tests__/dedent-tests.js#L83)
- [\\\$ and \\{](https://github.com/adrianjost/dedent-tabs/blob/d23380be141ccf7ba704f7b1e6ba9d3f0d388783/__tests__/dedent-tests.js#L87)

The reason these escape characters are not fully supported is due to having to bypass the native escape character handling (using the raw property) in order to be able to handle newlines correctly.

There are plans to correct this in the future ([see Issue #109](https://github.com/adrianjost/dedent-tabs/issues/109)).

All escape characters are supported when [calling dedent-tabs as a function](https://github.com/adrianjost/dedent-tabs/blob/d23380be141ccf7ba704f7b1e6ba9d3f0d388783/__tests__/dedent-tests.js#L118).

## License

MIT

## Release new version

1. `npm ci` - for a clean environment
1. `npm version patch|minor|major` - Bump version https://docs.npmjs.com/cli/v6/commands/npm-version
1. `npm run lint` - to ensure a consistent code style
1. `npm run test` - to make sure everything is working
1. Bump version
1. `npm run build` - to create the bundle to release
1. `git commit -m "update bundle"` - to make sure the latest bundle is in the `dist` directory
1. `npm publish`
