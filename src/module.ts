import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponent,
  addTypeTemplate,
} from '@nuxt/kit';
import { camelCase } from 'scule';
import { defu } from 'defu';
import { name, version } from '../package.json';
import * as components from 'vue-uswds/components';

export interface VueUswdsOptions {
  prefixSeparator?: string;
  gridNamespace?: string;
  utilityNamespace?: string;
  imagePath?: string;
  svgSpritePath?: string;
  mobileMenuBreakpoint?: string;
  footerNavBigBreakpoint?: string;
}

export interface ModuleOptions {
  /**
   * Whether to auto-import Vue USWDS base components.
   * @default true
   */
  autoImportBaseComponents?: boolean;
  /**
   * Whether to auto-import Vue USWDS regular components.
   * @default true
   */
  autoImportComponents?: boolean;
  /**
   * Optional prefix to add to Vue USWDS base components.
   * @default ''
   */
  baseComponentPrefix?: string;
  /**
   * Optional prefix to add to Vue USWDS regular components.
   * @default ''
   */
  componentPrefix?: string;
  /**
   * Any Vue USWDS options you want to initialize the plugin with.
   * @default {}
   */
  vueUswds?: VueUswdsOptions;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: camelCase(name),
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    autoImportBaseComponents: true,
    autoImportComponents: true,
    baseComponentPrefix: '',
    componentPrefix: '',
    vueUswds: {},
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    nuxt.options.runtimeConfig.public.nuxtUswds = defu(
      nuxt.options.runtimeConfig.public.nuxtUswds,
      options,
    );

    const baseComponentNames = Object.keys(components).filter(
      (componentName) =>
        componentName.startsWith('Base') && componentName !== 'default',
    );

    const componentNames = Object.keys(components).filter(
      (componentName) =>
        componentName.startsWith('Usa') && componentName !== 'default',
    );

    if (options.autoImportBaseComponents) {
      baseComponentNames.forEach((originalComponentName) => {
        const componentName = options?.baseComponentPrefix
          ? camelCase(`${options.baseComponentPrefix}-${originalComponentName}`)
          : originalComponentName;

        addComponent({
          name: componentName,
          export: originalComponentName,
          filePath: 'vue-uswds/components',
        });
      });
    }

    if (options.autoImportComponents) {
      componentNames.forEach((originalComponentName) => {
        const componentName = options?.componentPrefix
          ? camelCase(`${options.componentPrefix}-${originalComponentName}`)
          : originalComponentName;

        addComponent({
          name: componentName,
          export: originalComponentName,
          filePath: 'vue-uswds/components',
        });
      });
    }

    addTypeTemplate({
      filename: 'types/vue-uswds.d.ts',
      getContents: () =>
        `declare module 'vue-uswds/core';\ndeclare module 'vue-uswds/components';`,
    });

    // Do not add the extension since the `.ts` will be transpiled to
    // `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'));
  },
});
