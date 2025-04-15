import { describe, it, expect } from 'vitest';
import { fileURLToPath } from 'node:url';
import { setup, createPage, url } from '@nuxt/test-utils/e2e';

describe('disabled auto-imports', async () => {
  await setup({
    rootDir: fileURLToPath(
      new URL('./fixtures/disabled-auto-imports', import.meta.url),
    ),
  });

  it('module does not auto-import components', async () => {
    const page = await createPage('/');
    await page.goto(url('/'));

    const nuxtUswdsOptions = await page
      .locator('.test-nuxt-uswds-options')
      .textContent();
    expect(nuxtUswdsOptions).toContain(`"autoImportBaseComponents": false`);
    expect(nuxtUswdsOptions).toContain(`"autoImportComponents": false`);
    expect(nuxtUswdsOptions).toContain(`"baseComponentPrefix": ""`);
    expect(nuxtUswdsOptions).toContain(`"componentPrefix": ""`);

    const vueUswdsOptions = await page
      .locator('.test-vue-uswds-options')
      .textContent();
    expect(vueUswdsOptions).toContain(`"prefixSeparator": "_"`);
    expect(vueUswdsOptions).toContain(`"gridNamespace": "tg-"`);
    expect(vueUswdsOptions).toContain(`"utilityNamespace": "tu-"`);
    expect(vueUswdsOptions).toContain(`"imagePath": "/test-images/img"`);
    expect(vueUswdsOptions).toContain(
      `"svgSpritePath": "/test-assets/img/test-sprite.svg"`,
    );
    expect(vueUswdsOptions).toContain(`"mobileMenuBreakpoint": "10em"`);
    expect(vueUswdsOptions).toContain(`"footerNavBigBreakpoint": "20em"`);

    const usaTag = await page
      .locator('.test-usa-component UsaTag')
      .textContent();
    expect(usaTag).toContain('Test UsaTag');

    const baseLink = await page
      .locator('.test-base-component BaseLink')
      .textContent();
    expect(baseLink).toContain('Test BaseLink');
  });
});
