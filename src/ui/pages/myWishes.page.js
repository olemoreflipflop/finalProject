import { test } from '@playwright/test';
import { BasePage } from './base.page';
import { WishModal, WishesListModal } from '../elements/index';

export class MyWishesPage extends BasePage {
  constructor(page) {
    super(page);
    this.wishModal = new WishModal(page);
    this.wishesListModal = new WishesListModal(page);
    this.createNewWishButton = this.page.locator('button', {
      hasText: 'Загадать желание',
    });
    this.wishCard = (title) =>
      this.page
        .locator('a')
        .filter({ has: this.page.locator(`text=${title}`) });
  }

  async openWishesList(listName) {
    await test.step(`Открыть страницу списка ${listName}`, async () => {
      await this.page.locator('a', { hasText: listName }).click();
    });
  }

  async openSecretWishes() {
    await test.step(`Открыть страницу "Секретные"`, async () => {
      await this.page.locator(`a[href="/secret"]`).click();
      `a[href="${hrefValue}"]`;
    });
  }

  async openAlreadyGiftedWishes() {
    await test.step(`Открыть страницу "Исполнено"`, async () => {
      await this.page.locator(`a[href="/fulfilled"]`).click();
    });
  }

  async openReservedWishes() {
    await test.step(`Открыть страницу "Хочу подарить"`, async () => {
      await this.page.locator(`a[href="/reserved"]`).click();
    });
  }

  async createNewWish(wish) {
    await test.step(`Создать желание`, async () => {
      await this.createNewWishButton.click();
      await this.wishModal.fillAndSubmitWishForm(wish);
    });
  }

  async getWishItemCard(title) {
    const label = this.page.locator(`text=${title}`);
    const card = this.page.locator('a').filter({ has: label });
    return card;
    // const hrefValue = `/users/${username}/wishes/${id}`;
    // return page.locator(`a[href="${hrefValue}"]`);
  }

  // async getWishItemTitle(title) {
  //   return this.page.locator(`text=${title}`);
  // }
}
