import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponent,
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
  autoImportBaseComponents?: boolean;
  autoImportComponents?: boolean;
  baseComponentPrefix?: string;
  componentPrefix?: string;
  vueUswds?: VueUswdsOptions;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: camelCase(name),
    compatibility: {
      nuxt: '^3.0.0',
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

    const resolver = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to
    // `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'));
  },
});
