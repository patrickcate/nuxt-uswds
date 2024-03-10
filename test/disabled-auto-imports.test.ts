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
    await expect(nuxtUswdsOptions).toContain(
      `"autoImportBaseComponents": false`,
    );
    await expect(nuxtUswdsOptions).toContain(`"autoImportComponents": false`);
    await expect(nuxtUswdsOptions).toContain(`"baseComponentPrefix": ""`);
    await expect(nuxtUswdsOptions).toContain(`"componentPrefix": ""`);

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
      .locator('.test-usa-component UsaTag')
      .textContent();
    await expect(usaTag).toContain('Test UsaTag');

    const baseLink = await page
      .locator('.test-base-component BaseLink')
      .textContent();
    await expect(baseLink).toContain('Test BaseLink');
  });
});
