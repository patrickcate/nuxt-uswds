import { describe, it, expect } from 'vitest';
import { fileURLToPath } from 'node:url';
import { setup, createPage, url } from '@nuxt/test-utils/e2e';

describe('custom options', async () => {
  await setup({
    rootDir: fileURLToPath(
      new URL('./fixtures/custom-options', import.meta.url),
    ),
  });

  it('module loads with custom options', async () => {
    const page = await createPage('/');
    await page.goto(url('/'));

    const nuxtUswdsOptions = await page
      .locator('.test-nuxt-uswds-options')
      .textContent();
    expect(nuxtUswdsOptions).toContain(`"autoImportBaseComponents": true`);
    expect(nuxtUswdsOptions).toContain(`"autoImportComponents": true`);
    expect(nuxtUswdsOptions).toContain(`"baseComponentPrefix": "TB"`);
    expect(nuxtUswdsOptions).toContain(`"componentPrefix": "TC"`);

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
      .locator('.test-usa-component span.usa-tag')
      .textContent();
    expect(usaTag).toContain('Test UsaTag');

    const baseLink = await page.locator('.test-base-component a').textContent();
    expect(baseLink).toContain('Test BaseLink');
  });
});
