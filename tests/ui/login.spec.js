import { expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { faker } from '@faker-js/faker';
import { test as base } from '../../src/ui/fixtures/app.fixture';

const test = base.extend({
  app: async ({ baseApp }, use) => {
    const app = baseApp;
    await app.openAuthorizationPage();
    await use(app);
  },
});

test.beforeAll('', () => {
  allure.epic('Авторизация');
  allure.owner('Olga Leonova');
});

test.use({ storageState: 'unauthSessionStorage.json' });

test.describe('Авторизация по электронной почте', () => {
  test.beforeAll('', () => {
    allure.feature('Авторизация по электронной почте');
  });

  test('Авторизация с валидными почтой и паролем @UI', async ({ app }) => {
    await app.authorizationPage.loginUsingEmail(
      process.env.USER_EMAIL,
      process.env.USER_PASSWORD,
    );
    await test.step('Пользователь уcпешно авторизован', async () => {
      await expect(app.loginButton).toBeHidden();
      await expect(app.userSettingsButton).toBeVisible();
      expect(app.authorizationPage.page.url()).toBe(`${process.env.BASE_URL}/`);
    });
  });

  test('Авторизация с некорректным паролем @UI', async ({ app }) => {
    await test.step('Ввести почту и некорректный пароль и подтверить логин', async () => {
      await app.authorizationPage.loginUsingEmail(
        process.env.USER_EMAIL,
        faker.string.alpha(10),
      );
    });
    await test.step('Пользователь неавторизован', async () => {
      await expect(app.authorizationPage.loginButton).toBeVisible();
      expect(app.authorizationPage.page.url()).toBe(
        `${process.env.BASE_URL}/authorization`,
      );
    });
  });
});
