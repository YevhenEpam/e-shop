import "cypress-xpath";

export default class CartHelper {
    addToCartButton = '//div[@class="overview"]//input[@value="Add to cart"]';
    addToCartSuccessMessage = '//p[contains(text(),"The product has been added to your")]';
    shoppingCartButton = '//a[contains(text(),"shopping cart")]';
    productCartList = '//td[@class="product"]';
    cartCheckBox = '//span[contains(text(),"Remove")]/../input';
    updateShoppingCartButton = '//input[@name="updatecart"]';
    checkoutButton = '//button[@id="checkout"]';
    countrySelector = '//select[@id="CountryId"]';
    termsCheckBox = '//input[@id="termsofservice"]';
    checkoutAsGuestButton = '//input[@value="Checkout as Guest"]';
    firstNameInput = '//input[@id="BillingNewAddress_FirstName"]';
    lastNameInput = '//input[@id="BillingNewAddress_LastName"]';
    emailInput = '//input[@id="BillingNewAddress_Email"]';
    checkoutCountrySelector = '//select[@id="BillingNewAddress_CountryId"]';
    cityInput = '//input[@id="BillingNewAddress_City"]';
    address1Input = '//input[@id="BillingNewAddress_Address1"]';
    zipCodeInput = '//input[@id="BillingNewAddress_ZipPostalCode"]';
    phoneNumberInput = '//input[@id="BillingNewAddress_PhoneNumber"]';
    billingAddressContinue = '//div[@id="billing-buttons-container"]/input[@title="Continue"]';
    shippingAddressContinue = '//div[@id="checkout-step-shipping"]//input[@title="Continue"]';
    shippingMethodContinue = '//div[@id="shipping-method-buttons-container"]//input[@value="Continue"]';
    paymentMethodContinue = '//div[@id="payment-method-buttons-container"]//input[@value="Continue"]';
    paymentInformationContinue = '//div[@id="payment-info-buttons-container"]//input[@value="Continue"]';
    orderConfirmButton = '//div[@id="confirm-order-buttons-container"]//input[@value="Confirm"]'
    orderSuccessMessage = '//strong[contains(text(),"Your order has been successfully processed!")]';
    

    addItemToCart() {
        return cy.xpath(this.addToCartButton).click();
    };

    checkIfItemAddedSuccessfullyToCart() {
        cy.xpath(this.addToCartSuccessMessage).should('be.visible');
        cy.xpath(this.shoppingCartButton).click();
        cy.xpath(this.productCartList).should('be.visible');
    }

    removeItemFromCart() {
        cy.xpath(this.cartCheckBox).click();
        cy.xpath(this.updateShoppingCartButton).click();
        cy.xpath(this.productCartList).should('not.exist');
    }

    checkoutProcess() {
        cy.xpath(this.countrySelector).select('Ukraine');
        cy.xpath(this.termsCheckBox).click();
        cy.xpath(this.checkoutButton).click();
        cy.xpath(this.checkoutAsGuestButton).click();
        cy.xpath(this.firstNameInput).type('Test');
        cy.xpath(this.lastNameInput).type('Test');
        cy.xpath(this.emailInput).type('testmag10012023@gmail.com');
        cy.xpath(this.checkoutCountrySelector).select('Ukraine');
        cy.xpath(this.cityInput).type('Ivano-Frankivsk');
        cy.xpath(this.address1Input).type('Ivano-Frankivsk');
        cy.xpath(this.zipCodeInput).type('76006');
        cy.xpath(this.phoneNumberInput).type('+380502020220');
        cy.xpath(this.billingAddressContinue).click();
        cy.xpath(this.shippingAddressContinue).click();
        cy.xpath(this.shippingMethodContinue).click();
        cy.xpath(this.paymentMethodContinue).click();
        cy.xpath(this.paymentInformationContinue).click();
        cy.xpath(this.orderConfirmButton).click();
        cy.xpath(this.orderSuccessMessage).should('be.visible');
    }
}
