import { App } from './src/ui/pages/index';

const { chromium } = require('@playwright/test');

async function globalSetup(config) {
  const { storageState, baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage({ baseURL });
  const app = new App(page);
  await app.open(baseURL);
  await app.openAuthorizationPage();
  await app.page
    .context()
    .storageState({ path: './unauthSessionStorage.json' });
  await app.authorizationPage.loginUsingEmail(
    process.env.USER_EMAIL,
    process.env.USER_PASSWORD,
  );
  await app.header.myWishesMenu.click();
  await app.page.context().storageState({ path: storageState });
  await browser.close();
}

module.exports = globalSetup;
