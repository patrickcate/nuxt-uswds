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
    await expect(nuxtUswdsOptions).toContain(
      `"autoImportBaseComponents": true`,
    );
    await expect(nuxtUswdsOptions).toContain(`"autoImportComponents": true`);
    await expect(nuxtUswdsOptions).toContain(`"baseComponentPrefix": "TB"`);
    await expect(nuxtUswdsOptions).toContain(`"componentPrefix": "TC"`);

    const vueUswdsOptions = await page
      .locator('.test-vue-uswds-options')
      .textContent();
    await expect(vueUswdsOptions).toContain(`"prefixSeparator": "_"`);
    await expect(vueUswdsOptions).toContain(`"gridNamespace": "tg-"`);
    await expect(vueUswdsOptions).toContain(`"utilityNamespace": "tu-"`);
    await expect(vueUswdsOptions).toContain(`"imagePath": "/test-images/img"`);
    await expect(vueUswdsOptions).toContain(
      `"svgSpritePath": "/test-assets/img/test-sprite.svg"`,
    );
    await expect(vueUswdsOptions).toContain(`"mobileMenuBreakpoint": "10em"`);
    await expect(vueUswdsOptions).toContain(`"footerNavBigBreakpoint": "20em"`);

    const usaTag = await page
      .locator('.test-usa-component span.usa-tag')
      .textContent();
    await expect(usaTag).toContain('Test UsaTag');

    const baseLink = await page.locator('.test-base-component a').textContent();
    await expect(baseLink).toContain('Test BaseLink');
  });
});
