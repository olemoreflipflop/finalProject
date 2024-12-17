import { BasePage } from './base.page';
import * as allure from 'allure-js-commons';

export class AuthorizationPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailField = page.getByPlaceholder('Электронная почта');
    this.passwordField = this.page.getByPlaceholder('Пароль');
    this.loginButton = this.page.locator('button', { hasText: 'Далее' });
  }

  async loginUsingEmail(email = '', password = '') {
    await this.page.locator('button', { hasText: 'Электронная почта' }).click();
    await this.passwordField.fill(password);
    await this.emailField.fill(email);
    await this.loginButton.click();
  }
}
