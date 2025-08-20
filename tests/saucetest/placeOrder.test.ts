// I want to place an order using all the page objects provided.
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/saucepages/LoginPage';
import { InventoryPage } from '../../pages/saucepages/InventoryPage';
import { CartPage } from '../../pages/saucepages/CartPage';
import { CheckoutPage } from '../../pages/saucepages/Checkout';
import { CheckoutDetailsPage } from '../../pages/saucepages/CheckoutDetails';

const itemName = process.env.ITEM_NAME || 'sauce-labs-backpack'; // Default to a specific item if not set in .env

test.describe('Place Order Test', () => {  
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutDetailsPage: CheckoutDetailsPage;
    let checkoutPage: CheckoutPage;
    const username = 'standard_user';
    const password = 'secret_sauce';
    // This block will make sure if login session expires, it will re-login before each test or in between of any test.
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page, itemName);
        cartPage = new CartPage(page);
        checkoutDetailsPage = new CheckoutDetailsPage(page);
        checkoutPage = new CheckoutPage(page);
        await loginPage.goto();
        await loginPage.login(username, password);
    });
    // This block will 1st assert the inventory page is loaded, then select the 1st item and add it to the cart, and check if the cart count is updated and click on the cart button.
    test("Place Order - Add First Item to Cart", async () => {
        await expect(inventoryPage.page).toHaveURL('/inventory.html');
        await inventoryPage.selectItem();
        const cartCount = await inventoryPage.getCartItemCount();
        expect(cartCount).toBe(1);
        await inventoryPage.clickCartButton();
          
// This block will assert the cart page is loaded, then click on the checkout button.
        await expect(cartPage.page).toHaveURL('/cart.html');
        await cartPage.clickCheckoutButton();
        await checkoutDetailsPage.fillCheckoutForm('John', 'Doe', '12345');


    // This block will assert the checkout overview page is loaded, then click on the finish button and assert the order confirmation message.
        await expect(checkoutDetailsPage.page).toHaveURL('/checkout-step-two.html');
        await checkoutPage.clickFinishButton();
        await expect(checkoutPage.page).toHaveURL('/checkout-complete.html');
    });
});