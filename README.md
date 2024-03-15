![vue-uswds logo](https://raw.githubusercontent.com/patrickcate/nuxt-uswds/main/playground/public/logo.svg)

# Nuxt USWDS

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

Easy U.S. Web Design System (USWDS) integration for Nuxt.js.

[✨ &nbsp;Release Notes](/CHANGELOG.md)

## Introduction

Nuxt USWDS integrates the [Vue USWDS](https://github.com/patrickcate/vue-uswds) library into Nuxt.js.

## Features

- [Auto import](https://nuxt.com/docs/guide/concepts/auto-imports) all Vue USWDS components.
- Automatically uses `NuxtLink` for Vue USWDS component linking.
- Supports all [Vue USWDS](https://patrickcate.github.io/vue-uswds/?path=/story/guide-configuration--page) options.

## Quick Setup

1. Add `nuxt-uswds` dependency to your project. You will also need to install `vue-uswds` as it is a peer dependency.

```bash
# Using npm
npm install nuxt-uswds vue-uswds

# Using pnpm
pnpm add nuxt-uswds vue-uswds

# Using yarn
yarn add nuxt-uswds vue-uswds
```

2. Add `nuxt-uswds` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ['nuxt-uswds'],
});
```

That's it! You can now use all Vue USWDS components in your Nuxt app ✨

## Options

The module supports the following options. They can be added to your `nuxt.config.ts` module configuration:

```js
{
  modules: [
    [
      'nuxt-uswds'',
      {
        // Modules options...
      },
    ],
  ]
}
```

| Name                       | Type      | Default | Description                                                                                                                                                                                                                                                              |
| -------------------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `autoImportBaseComponents` | `boolean` | `true`  | Enabled Nuxt's auto-import of all Vue USWDS base components. You should only need to turn disable this option if you have a name conflict with Vue USWDS's `BaseLink` or `BaseHeading` internal components.                                                              |
| `autoImportComponents`     | `boolean` | `true`  | Enabled Nuxt's auto-import of all regular Vue USWDS components.                                                                                                                                                                                                          |
| `baseComponentPrefix`      | `string`  | `''`    | If you have a name conflict with Nuxt.js's auto importing of Vue USWDS's `BaseLink` or `BaseHeading` internal components, you can set an additional prefix with this option.                                                                                             |
| `componentPrefix`          | `string`  | `''`    | All [Vue USWDS components](https://patrickcate.github.io/vue-uswds/) are prefixed with `Usa`. This should prevent any name conflicts with Nuxt.js's auto importing of components. If you encounter an issues however, you can add an additional prefix with this option. |
| `vueUswds`                 | `object`  | `{}`    | Any [Vue USWDS](https://patrickcate.github.io/vue-uswds/?path=/story/guide-configuration--page) options to want to use. The `routerComponentName` option is automatically set to 'NuxtLink'                                                                              |

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-uswds/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-uswds
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-uswds.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-uswds
[license-src]: https://img.shields.io/npm/l/nuxt-uswds.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-uswds
