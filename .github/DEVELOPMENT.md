# Development

After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo) and [installing pnpm](https://pnpm.io/installation):

```shell
git clone https://github.com/<your-name-here>/dedent
cd dedent
pnpm install
```

> This repository includes a list of suggested VS Code extensions.
> It's a good idea to use [VS Code](https://code.visualstudio.com) and accept its suggestion to install them, as they'll help with development.

## Building

Run [**Babel**](https://babeljs.io) to build source files from `src/` into output files in `dist/`:

```shell
pnpm build
```

### Building Types

Run [**tsup**](https://tsup.egoist.dev) to build TypeScript definition files in `dist/`:

```shell
pnpm build:types
```

## Formatting

[Prettier](https://prettier.io) is used to format code.
It should be applied automatically when you save files in VS Code or make a Git commit.

To manually reformat all files, you can run:

```shell
pnpm format --write
```

## Linting

This package includes several forms of linting to enforce consistent code quality and styling.
Each should be shown in VS Code, and can be run manually on the command-line:

- `pnpm lint` ([ESLint](https://eslint.org) with [typescript-eslint](https://typescript-eslint.io)): Lints JavaScript and TypeScript source files
- `pnpm lint:knip` ([knip](https://github.com/webpro/knip)): Detects unused files, dependencies, and code exports
- `pnpm lint:md` ([Markdownlint](https://github.com/DavidAnson/markdownlint)): Checks Markdown source files
- `pnpm lint:package-json` ([npm-package-json-lint](https://npmpackagejsonlint.org/)): Lints the `package.json` file
- `pnpm lint:packages` ([pnpm dedupe --check](https://pnpm.io/cli/dedupe)): Checks for unnecessarily duplicated packages in the `pnpm-lock.yml` file
- `pnpm lint:spelling` ([cspell](https://cspell.org)): Spell checks across all source files

Read the individual documentation for each linter to understand how it can be configured and used best.

For example, ESLint can be run with `--fix` to auto-fix some lint rule complaints:

```shell
pnpm run lint --fix
```

Note that you'll likely need to run `pnpm build` before `pnpm lint` so that lint rules which check the file system can pick up on any built files.

## Testing

[Jest](https://jestjs.io) is used for tests.
You can run it locally on the command-line:

```shell
pnpm run test
```

Add the `--coverage` flag to compute test coverage and place reports in the `coverage/` directory:

```shell
pnpm run test --coverage
```

Note that [console-fail-test](https://github.com/JoshuaKGoldberg/console-fail-test) is enabled for all test runs.
Calls to `console.log`, `console.warn`, and other console methods will cause a test to fail.

### Testing with Bun

If you have [Bun](https://bun.com/docs/test) installed on your system, tests can be run with Bun's test runner rather than Node and Jest.

```shell
pnpm run test:bun
```

## Type Checking

You should be able to see suggestions from [TypeScript](https://typescriptlang.org) in your editor for all open files.

However, it can be useful to run the TypeScript command-line (`tsc`) to type check all files in `src/`:

```shell
pnpm tsc
```

Add `--watch` to keep the type checker running in a watch mode that updates the display as you save files:

```shell
pnpm tsc --watch
```
