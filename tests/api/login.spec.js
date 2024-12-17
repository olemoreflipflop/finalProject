import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/api/client/api.client';
import { faker } from '@faker-js/faker';
import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';
import * as fs from 'node:fs';
import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';

let client;

test.describe('/auth/login', () => {
  const ajv = new Ajv();
  ajvFormats(ajv);
  const schema = JSON.parse(
    fs.readFileSync('src/api/schemas/user.schema.json', 'utf8'),
  );

  test.beforeAll(async ({}) => {
    client = await ApiClient.getUnauthorizedClient();
    await allure.feature('Авторизация по электронной почте');
    await allure.severity(Severity.CRITICAL);
  });

  test('Успешный логин (201)', async ({}) => {
    await allure.severity(Severity.BLOCKER);
    const credentials = {
      email: process.env['USER_EMAIL'],
      password: process.env['USER_PASSWORD'],
    };
    const response = await client.loginService.login(
      credentials.email,
      credentials.password,
    );

    const validate = ajv.compile(schema);
    expect(validate(response.body)).toBe(true);
    expect(response.status).toBe(201);
    expect(response.body.user.email).toEqual(credentials.email);
  });

  test('Введен неверный email (400)', async ({}) => {
    const credentials = {
      email: faker.internet.email(),
      password: process.env['USER_PASSWORD'],
    };
    const response = await client.loginService.login(
      credentials.email,
      credentials.password,
    );

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Введен неверный email или пароль');
  });

  test('Введен неверный пароль (400)', async ({}) => {
    const credentials = {
      email: process.env['USER_EMAIL'],
      password: faker.string.alpha(10),
    };
    const response = await client.loginService.login(
      credentials.email,
      credentials.password,
    );

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Введен неверный email или пароль');
  });

  test('Введен username вместо email-a (400)', async ({}) => {
    const credentials = {
      email: process.env['USER_EMAIL'],
      password: process.env['USER_PASSWORD'],
    };
    const response = await client.loginService.login(
      credentials.email.split('@')[0],
      credentials.password,
    );

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Submitted fields are invalid');
    expect(response.body.details).toMatchObject({
      email: 'This value is not a valid email address.',
    });
  });

  test('Отсутствует payload с credentials (400)', async ({}) => {
    await allure.severity(Severity.NORMAL);
    const response = await client.apiContext.post(client.loginService.path);
    const body = await response.json();

    expect(response.status()).toBe(400);
    expect(body.message).toEqual('Form submit is required');
  });
});
