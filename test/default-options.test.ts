import { describe, it, expect } from 'vitest';
import { fileURLToPath } from 'node:url';
import { setup, createPage } from '@nuxt/test-utils/e2e';

describe('default option', async () => {
  await setup({
    rootDir: fileURLToPath(
      new URL('./fixtures/default-options', import.meta.url),
    ),
  });

  it('module loads with default options', async () => {
    const page = await createPage('/');

    const nuxtUswdsOptions = await page
      .locator('.test-nuxt-uswds-options')
      .textContent();
    await expect(nuxtUswdsOptions).toContain(
      `"autoImportBaseComponents": true`,
    );
    await expect(nuxtUswdsOptions).toContain(`"autoImportComponents": true`);
    await expect(nuxtUswdsOptions).toContain(`"baseComponentPrefix": ""`);
    await expect(nuxtUswdsOptions).toContain(`"componentPrefix": ""`);

    const vueUswdsOptions = await page
      .locator('.test-vue-uswds-options')
      .textContent();
    await expect(vueUswdsOptions).toContain(`{}`);

    const usaTag = await page
      .locator('.test-usa-component span.usa-tag')
      .textContent();
    await expect(usaTag).toContain('Test UsaTag');

    const baseLink = await page.locator('.test-base-component a').textContent();
    await expect(baseLink).toContain('Test BaseLink');
  });
});
