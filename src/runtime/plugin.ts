import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import VueUswds from 'vue-uswds/core';
import { NuxtLink } from '#components';

export default defineNuxtPlugin((nuxtApp) => {
  const { nuxtUswds } = useRuntimeConfig().public;

  const vueUswdsOptions = { ...nuxtUswds.vueUswds };

  nuxtApp.vueApp.use(VueUswds, {
    routerComponentName: NuxtLink,
    ...vueUswdsOptions,
  });
});
