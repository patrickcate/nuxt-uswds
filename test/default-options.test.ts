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
    expect(nuxtUswdsOptions).toContain(`"autoImportBaseComponents": true`);
    expect(nuxtUswdsOptions).toContain(`"autoImportComponents": true`);
    expect(nuxtUswdsOptions).toContain(`"baseComponentPrefix": ""`);
    expect(nuxtUswdsOptions).toContain(`"componentPrefix": ""`);

    const vueUswdsOptions = await page
      .locator('.test-vue-uswds-options')
      .textContent();
    expect(vueUswdsOptions).toContain(`{}`);

    const usaTag = await page
      .locator('.test-usa-component span.usa-tag')
      .textContent();
    expect(usaTag).toContain('Test UsaTag');

    const baseLink = await page.locator('.test-base-component a').textContent();
    await expect(baseLink).toContain('Test BaseLink');
  });
});
