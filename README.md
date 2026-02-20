# cargurus-npm-library-template
Frontend libraries for use by site-static and multi-repo frontend applications.

## Installation

Modules published by this template can be added to a project via `yarn add`. `babel-config`, `jest-suite`, and the `eslint` modules should be added as dev dependencies. Specify the appropriate major version to ensure that the remote module is properly referenced.
* i.e. `yarn add @cargurus/sample-library@^0.0.0`

## Adding another package
We use the utility `@cargurus/create-package` to create new packages within this monorepo.
* First, make sure we are in the `./packages` directory
* `npx @cargurus/create-package --help` will show us our options for the `--type` argument
* Then, as an example, if we want to create a `react` package, we can run `npx @cargurus/create-package -t react @cargurus/my-sweet-package`

## Local Development

To test your changes across repos, see this guide below:

https://cargurus.atlassian.net/wiki/spaces/EP/pages/3791323360/Using+Yalc+for+fast+package+development+in+Frontend+Multirepo

## How to pull latest template into your repository


> **Note: Highly recommended this is done on Day 1 of the template usage to avoid conflicts after you remove & rename packages.**


1. Add this template as a remote to your repo

    `git remote add template https://code.cargurus.com/cargurus-eng/cargurus-npm-library-template.git`

2. Fetch updated changes

    `git fetch --all`

3. Merge template branch

    `git merge template/main --allow-unrelated-histories`

4. Resolve conflicts
