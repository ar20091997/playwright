import {Page} from '@playwright/test';

export class CheckoutDetailsPage {
  readonly page: Page;
  readonly firstNameInput = '#first-name';
  readonly lastNameInput = '#last-name';
  readonly postalCodeInput = '#postal-code';
  readonly continueButton = '#continue';
  readonly cancelButton = '#cancel';

  constructor(page: Page) {
    this.page = page;
}
  async goto() {
    await this.page.goto('/checkout-step-one.html');
  }
  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
    await this.page.click(this.continueButton);}
  
  async clickCancelButton() {
    await this.page.click(this.cancelButton);
  }}