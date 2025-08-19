import {Page} from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems = '.cart_item';
  readonly checkoutButton = '#checkout';
  readonly continueShoppingButton = '#continue-shopping';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/cart.html');
  }
  async getCartItems() {
    return await this.page.$$(this.cartItems);
  
  }
  async clickCheckoutButton() {
    await this.page.click(this.checkoutButton);
  }
  async clickContinueShoppingButton() {
    await this.page.click(this.continueShoppingButton);
  }
  async getCartItemCount() {
    const items = await this.getCartItems();
    return items.length;
  }
  async isCartEmpty() {
    const items = await this.getCartItems();
    return items.length === 0;
  }
}