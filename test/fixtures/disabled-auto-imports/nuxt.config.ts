import nuxtUswds from '../../../src/module';

export default defineNuxtConfig({
  modules: [
    [
      nuxtUswds,
      {
        autoImportBaseComponents: false,
        autoImportComponents: false,
        vueUswds: {
          prefixSeparator: '_',
          gridNamespace: 'tg-',
          utilityNamespace: 'tu-',
          imagePath: '/test-images/img',
          svgSpritePath: '/test-assets/img/test-sprite.svg',
          mobileMenuBreakpoint: '10em',
          footerNavBigBreakpoint: '20em',
        },
      },
    ],
  ],
});
