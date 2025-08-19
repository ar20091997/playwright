import {Page} from '@playwright/test';
//import one of the item from scenetestdata in the inventory page so that the item index property can be used to select the item
// This class represents the inventory page where items are listed and can be added to the ca

export class InventoryPage {
  readonly page: Page;
  readonly AddToCartButtonSelector: string; // Selector for the inventory items
  readonly cartButton = '#shopping_cart_container';

  constructor(page: Page, itemName: string) {
    this.page = page;
    this.AddToCartButtonSelector = `#add-to-cart-${itemName}`; // Selector for the add to cart button
  }
  async goto() {
    await this.page.goto('/inventory.html');
  }
    async getInventoryItems() {
        return await this.page.$$('[id^="add-to-cart-"]'); // Get all inventory items
}
    async clickCartButton() {
        await this.page.click(this.cartButton);
    }
    //get the list of items in the inventory page and provide a method to select through the items in the page also once a item is selected ask if another item needs to be added to the cart
    async selectItem() {
        await this.page.click(this.AddToCartButtonSelector); // Click the add to cart button for the specified item
        return true;
    }
    async getCartItemCount() {
        const cartCountElement = await this.page.$('#shopping_cart_container .shopping_cart_badge');
        if (cartCountElement) {
            const countText = await cartCountElement.textContent();
            return parseInt(countText || '0', 10);
        }
        return 0;
    }
}