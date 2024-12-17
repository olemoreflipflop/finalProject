import { test } from '@playwright/test';

export class WishesListModal {
  constructor(page) {
    this.page = page;
  }

  async createNewList() {
    await test.step(`Создать новый список`, async () => {});
  }

  async updateList() {
    await test.step(`Редактировать список`, async () => {});
  }
}
