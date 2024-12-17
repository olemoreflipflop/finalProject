import { BasePage } from './base.page';
import { AuthorizationPage, MyWishesPage } from './index';
import { Header } from '../elements/index';

export class App extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(this.page);
    this.authorizationPage = new AuthorizationPage(page);
    this.myWishesPage = new MyWishesPage(page);

    this.loginButton = this.page.locator('button', { hasText: 'Войти' }).nth(0);
    this.userSettingsButton = this.page.getByRole('button', {
      name: 'Опции',
      exact: true,
    });
  }

  async open() {
    await this.page.goto('/');
  }

  async openAuthorizationPage() {
    await this.loginButton.click();
  }
}
