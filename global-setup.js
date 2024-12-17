import { App } from './src/ui/pages/index';

const { chromium } = require('@playwright/test');

async function globalSetup(config) {
  const { storageState, baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage({ baseURL });
  const app = new App(page);
  console.log(page.url());
  await page.goto('https://ohmywishes.com');
  await app.openAuthorizationPage();
  await app.page
    .context()
    .storageState({ path: './unauthSessionStorage.json' });

  await app.authorizationPage.loginUsingEmail(
    process.env.USER_EMAIL,
    process.env.USER_PASSWORD,
  );
  // TODO: Заменить вынужденное ожидание всплывабщего окна на UI, тк запись параметра ohmywishes: {"isDrawBannerClosed":true}
  //по каким-то причинам не срабатывает - необходимо разобраться
  /*   
      await baseApp.page.evaluate(() => {
      localStorage.setItem('ohmywishes', `{"isDrawBannerClosed":true}`);
      });
  */
  await app.header.myWishesMenu.click();
  await app.page
    .locator('h1', { name: 'Новогодний розыгрыш' })
    .waitFor({ state: 'visible' });
  await app.page.getByText('Закрыть').click();

  await app.page.context().storageState({ path: storageState });
  await browser.close();
}

module.exports = globalSetup;
