import {Page} from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
    readonly finishButton = '#finish';
    readonly cancelButton = '#cancel';

  constructor(page: Page) {
    this.page = page;
  }
  async goto() {
    await this.page.goto('/checkout-step-two.html');
}
  async clickFinishButton() {
    await this.page.click(this.finishButton);
  }

  async clickCancelButton() {
    await this.page.click(this.cancelButton);
  }
  async isCheckoutComplete() {
    const url = this.page.url();
    return url.includes('/checkout-complete.html');
  }
  async isCheckoutCancelled() {
    const url = this.page.url();
    return url.includes('/inventory.html');
  }
}