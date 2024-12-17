import { test as base } from '@playwright/test';
import { App } from '../pages';

export const test = base.extend({
  baseApp: async ({ page, baseURL }, use) => {
    const baseApp = new App(page);
    await baseApp.page.goto(`https://ohmywishes.com`);
    await use(baseApp);
    await baseApp.page.close();
  },
});
