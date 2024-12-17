import { test as base } from '@playwright/test';
import { App } from '../pages/app.page';

export const test = base.extend({
  baseApp: async ({ page }, use) => {
    const baseApp = new App(page);
    await baseApp.open();
    await use(baseApp);
    await baseApp.page.close();
  },
});
