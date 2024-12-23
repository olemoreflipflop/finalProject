import { expect } from '@playwright/test';
import { test as base } from '../../src/ui/fixtures/app.fixture';
import * as allure from 'allure-js-commons';
import { WishBuilder } from '../../src/helpers/wish.builder';

const test = base.extend({
  app: async ({ baseApp }, use) => {
    const app = baseApp;
    await app.header.openMyWishes();
    await use(app);
  },
});

test.beforeAll('', () => {
  allure.epic('Мои желания');
  allure.owner('Olga Leonova');
});

test.describe('Добавление желания', () => {
  test.beforeAll('', () => {
    allure.feature('Желания');
    allure.severity('critical');
  });

  test('Пользователь может добавить желание', async ({ app }) => {
    const wish = new WishBuilder()
      .addTitle()
      .addDescription()
      .addLink()
      .addPrice()
      .addWishImage()
      .generate();
    await app.myWishesPage.createNewWish(wish);
    await test.step('Желание уcпешно добавлено', async () => {
      await expect(app.myWishesPage.wishModal.publishButton).toBeHidden();
      await expect(app.myWishesPage.wishCard(wish.title)).toBeVisible();
    });
  });

  test('Пользователь может добавить желание только с названием', async ({
    app,
  }) => {
    const wish = new WishBuilder().addTitle().generate();
    await app.myWishesPage.createNewWish(wish);
    await test.step('Желание уcпешно добавлено', async () => {
      await expect(app.myWishesPage.wishModal.publishButton).toBeHidden();
      await expect(app.myWishesPage.wishCard(wish.title)).toBeVisible();
    });
  });

  test('Нельзя добавить желание без названия', async ({ app }) => {
    allure.severity('normal');

    const wish = new WishBuilder().generate();
    await app.myWishesPage.createNewWish(wish);
    await test.step('Форма создания осталась открытой, желание не создано', async () => {
      await expect(app.myWishesPage.wishModal.publishButton).toBeVisible();
      await app.myWishesPage.wishModal.closeModal.click();
      await expect(app.myWishesPage.wishCard(wish.title)).toBeHidden();
    });
  });
});
