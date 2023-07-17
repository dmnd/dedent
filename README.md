<h1 align="center">Dedent</h1>

<p align="center">A string tag that strips indentation from multi-line strings.</p>

<p align="center">
	<a href="#contributors" target="_blank">
<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<img alt="All Contributors: 9" src="https://img.shields.io/badge/all_contributors-9-21bb42.svg" />
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->
	</a>
	<a href="https://codecov.io/gh/dmnd/dedent" target="_blank">
	<img alt="Codecov Test Coverage" src="https://codecov.io/gh/dmnd/dedent/branch/main/graph/badge.svg?token=INSERT_CODECOV_TOKEN_HERE"/>
	</a>
	<a href="https://github.com/dmnd/dedent/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank">
		<img alt="Contributor Covenant" src="https://img.shields.io/badge/code_of_conduct-enforced-21bb42" />
	</a>
	<a href="https://github.com/dmnd/dedent/blob/main/LICENSE.md" target="_blank">
		<img alt="License: MIT" src="https://img.shields.io/github/license/dmnd/dedent?color=21bb42">
	</a>
	<img alt="Style: Prettier" src="https://img.shields.io/badge/style-prettier-21bb42.svg" />
	<img alt="TypeScript: Strict" src="https://img.shields.io/badge/typescript-strict-21bb42.svg" />
</p>

An ES6 string tag that strips indentation from multi-line strings.

## Usage

```js
import dedent from "dedent";

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

console.log(usageExample());
```

```plaintext
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

## Contributors

<!-- spellchecker: disable -->
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://adrianjost.dev/"><img src="https://avatars.githubusercontent.com/u/22987140?v=4?s=100" width="100px;" alt="Adrian Jost"/><br /><sub><b>Adrian Jost</b></sub></a><br /><a href="https://github.com/dmnd/dedent/commits?author=adrianjost" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/phenomnomnominal"><img src="https://avatars.githubusercontent.com/u/1086286?v=4?s=100" width="100px;" alt="Craig Spence"/><br /><sub><b>Craig Spence</b></sub></a><br /><a href="https://github.com/dmnd/dedent/commits?author=phenomnomnominal" title="Code">💻</a> <a href="https://github.com/dmnd/dedent/issues?q=author%3Aphenomnomnominal" title="Bug reports">🐛</a> <a href="https://github.com/dmnd/dedent/commits?author=phenomnomnominal" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://synthesis.com/"><img src="https://avatars.githubusercontent.com/u/4427?v=4?s=100" width="100px;" alt="Desmond Brand"/><br /><sub><b>Desmond Brand</b></sub></a><br /><a href="https://github.com/dmnd/dedent/issues?q=author%3Admnd" title="Bug reports">🐛</a> <a href="https://github.com/dmnd/dedent/commits?author=dmnd" title="Code">💻</a> <a href="https://github.com/dmnd/dedent/commits?author=dmnd" title="Documentation">📖</a> <a href="#maintenance-dmnd" title="Maintenance">🚧</a> <a href="#projectManagement-dmnd" title="Project Management">📆</a> <a href="#tool-dmnd" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/G-Rath"><img src="https://avatars.githubusercontent.com/u/3151613?v=4?s=100" width="100px;" alt="Gareth Jones"/><br /><sub><b>Gareth Jones</b></sub></a><br /><a href="https://github.com/dmnd/dedent/commits?author=G-Rath" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://haroen.me/"><img src="https://avatars.githubusercontent.com/u/6270048?v=4?s=100" width="100px;" alt="Haroen Viaene"/><br /><sub><b>Haroen Viaene</b></sub></a><br /><a href="https://github.com/dmnd/dedent/commits?author=Haroenv" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://blog.cometkim.kr/"><img src="https://avatars.githubusercontent.com/u/9696352?v=4?s=100" width="100px;" alt="Hyeseong Kim"/><br /><sub><b>Hyeseong Kim</b></sub></a><br /><a href="#tool-cometkim" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jlarmstrongiv"><img src="https://avatars.githubusercontent.com/u/20903247?v=4?s=100" width="100px;" alt="John L. Armstrong IV"/><br /><sub><b>John L. Armstrong IV</b></sub></a><br /><a href="https://github.com/dmnd/dedent/issues?q=author%3Ajlarmstrongiv" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.joshuakgoldberg.com/"><img src="https://avatars.githubusercontent.com/u/3335181?v=4?s=100" width="100px;" alt="Josh Goldberg ✨"/><br /><sub><b>Josh Goldberg ✨</b></sub></a><br /><a href="https://github.com/dmnd/dedent/commits?author=JoshuaKGoldberg" title="Code">💻</a> <a href="https://github.com/dmnd/dedent/commits?author=JoshuaKGoldberg" title="Documentation">📖</a> <a href="#maintenance-JoshuaKGoldberg" title="Maintenance">🚧</a> <a href="#projectManagement-JoshuaKGoldberg" title="Project Management">📆</a> <a href="#tool-JoshuaKGoldberg" title="Tools">🔧</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://pratapvardhan.com/"><img src="https://avatars.githubusercontent.com/u/3757165?v=4?s=100" width="100px;" alt="Pratap Vardhan"/><br /><sub><b>Pratap Vardhan</b></sub></a><br /><a href="https://github.com/dmnd/dedent/issues?q=author%3Apratapvardhan" title="Bug reports">🐛</a> <a href="https://github.com/dmnd/dedent/commits?author=pratapvardhan" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- spellchecker: enable -->
