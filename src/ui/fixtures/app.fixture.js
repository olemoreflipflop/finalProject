import { test as base } from '@playwright/test';
import { App } from '../pages';

export const test = base.extend({
  baseApp: async ({ page }, use) => {
    const baseApp = new App(page);
    await baseApp.page.goto(process.env.BASE_URL);
    await use(baseApp);
    await baseApp.page.close();
  },
});
