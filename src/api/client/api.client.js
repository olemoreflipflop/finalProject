import { LoginService } from '../services/index';
import { test, request } from '@playwright/test';

export class ApiClient {
  constructor(apiContext) {
    this.apiContext = apiContext;
    this.loginService = new LoginService(apiContext);
  }

  static async getAuthorizedClient() {
    return await test.step('Создать авторизованного api клиента', async () => {
      const client = this.getUnauthorizedClient();

      const response = await client.loginService.login(
        process.env.USER_EMAIL,
        process.env.USER_PASSWORD,
      );
      const body = await response.json();
      console.log(body.token)
      process.env.TOKEN = body.token;

      const userContext = await request.newContext({
        extraHTTPHeaders: {
          'x-access-token': process.env.TOKEN,
        },
      });
      return new ApiClient(userContext);
    });
  }

  static async getUnauthorizedClient() {
    return await test.step('Создать api клиента', async () => {
      const context = await request.newContext();
      return new ApiClient(context);
    });
  }
}
