# Contributing

[fork]: https://github.com/github/rollup-and-away/fork
[pr]: https://github.com/github/rollup-and-away/compare
[style]: https://github.com/github/rollup-and-away/blob/-/eslint.config.js

Hi there! We're thrilled that you'd like to contribute to this project. Your help is essential for keeping it great.

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](./LICENSE).

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Getting Started

### Hello World

#### 1. Bun

This repo uses Bun as the package manager, primarily for the Typescript interpreter features.

Follow the [official guide to Install Bun](https://bun.sh/docs/installation#installing) on your machine.

#### 2. Configure Secrets

Locally, the secrets can be populated from a `.env` file. Typically you will use a PAT for testing, but GitHub App authentication is also supported. If you provide both, it will use the App. See `.env.example` for key names.

#### 3. Hello World

```sh
bun install
```

```sh
URL=https://github.com/ventojs/vento/issues bun render
```

This will render the file `./templates/default/summary.md.vto`.

### Husky

This repo uses Husky to lint files before they are committed to the repo. Run `bun run prepare` before committing to install the hooks.

You'll also need to [source your Node and Bun environments](https://github.com/typicode/husky/blob/main/docs/how-to.md#solution).

### Eslint

Eslint rules are marked as errors, but there's no need to fix them manually as you code. If you use VSCode, just press `Shift-Option-F` (Mac) or `Shift-Alt-F` to automatically format the current file.

### Running Actions Locally

Install the `SanjulaGanepola.github-local-actions` VSCode Extension from the recommendations. It will help you install the `nektos/act` Local Action Runner, and Docker if necessary. Open the sidebar tab, and supply the missing secrets and variables.

Make sure to always build your code before running, since it runs the action directly from the `/dist` folder (as specified in the local `action.yml`).

## Submitting a Pull Request

1. [Fork][fork] and clone the repository
1. Configure and install the dependencies: `bun install`
1. Make sure the tests (coming soon) pass on your machine: `bun test`
1. Make sure linter passes on your machine: `bun lint`
1. Create a new branch: `git checkout -b my-branch-name`
1. Make your change, add tests, and make sure the tests and linter still pass
1. Push to your fork and [submit a Pull Request][pr]
1. Pat yourself on the back and wait for your pull request to be reviewed and merged.

Here are a few things you can do that will increase the likelihood of your pull request being accepted:

- Follow the [style guide][style].
- Write tests.
- Keep your change as focused as possible. If there are multiple changes you would like to make that are not dependent upon each other, consider submitting them as separate pull requests.
- Write a [good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

## Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)
- [GitHub Help](https://help.github.com)
