import BasePage from "./base_page";

class CartPage extends BasePage{

    get addToCartButton() {
        return cy.get('#add-to-cart-button-14');
    };

    get addToCartSuccessMessage() {
        return cy.get('.content');
    };

    get clickShoppingCartButton() {
        return cy.get('#topcartlink a').click()
    }

    get productCartList() {
        return cy.get('tbody .product');
    };

    get cartCheckBox() {
        return cy.get('input[name="removefromcart"]');
    };

    get updateShoppingCartButton() {
        return cy.get('input[name="updatecart"]');
    };

    get checkoutButton() {
        return cy.get('#checkout');
    };

    get countrySelector() {
        return cy.get('#CountryId');
    };

    get termsCheckBox() {
        return cy.get('#termsofservice');
    };

    get checkoutCountrySelector() {
        return cy.get('#BillingNewAddress_CountryId');
    };

    get cityInput() {
        return cy.get('#BillingNewAddress_City');
    };

    get address1Input() {
        return cy.get('#BillingNewAddress_Address1');
    };

    get zipCodeInput() {
        return cy.get('#BillingNewAddress_ZipPostalCode');
    };

    get phoneNumberInput() {
        return cy.get('#BillingNewAddress_PhoneNumber');
    };

    get billingAddressContinue() {
        return cy.get('#billing-buttons-container input[title="Continue"]');
    };

    get shippingAddressContinue() {
        return cy.get('#shipping-buttons-container input[title="Continue"]');
    };

    get shippingMethodContinue() {
        return cy.get('div#shipping-method-buttons-container > .button-1.shipping-method-next-step-button');
    };

    get paymentMethodContinue() {
        return cy.get('#payment-method-buttons-container input[value="Continue"]');
    };

    get paymentInformationContinue() {
        return cy.get('#payment-info-buttons-container input[value="Continue"]');
    };

    get orderConfirmButton() {
        return cy.get('#confirm-order-buttons-container input[value="Confirm"]');
    };

    get orderSuccessMessage() {
        return cy.get('.section.order-completed div strong');
    };

    get wishlistQuantityIcon() {
        return cy.get('.wishlist-qty');
    };

    visitUrl(url = 'https://demowebshop.tricentis.com') {
        cy.visit(url);
        return this;
    }
    clickAddToCartButton() {
        this.addToCartButton.click();
        return this;
    };

    checkIfItemAddedSuccessfullyToCart() {
        this.addToCartSuccessMessage.should('be.visible');
        this.clickShoppingCartButton
        this.productCartList.should('be.visible');
        return this;
    }

    checkoutProcess() {
        this.countrySelector.select('Ukraine');
        this.termsCheckBox.click();
        this.checkoutButton.click();
        this.checkoutCountrySelector.select('Ukraine');
        this.cityInput.type('Ivano-Frankivsk');
        this.address1Input.type('Ivano-Frankivsk');
        this.zipCodeInput.type('76006');
        this.phoneNumberInput.type('+380502020220');
        this.billingAddressContinue.click();
        this.shippingAddressContinue.click();
        this.shippingMethodContinue.click();
        this.paymentMethodContinue.click();
        this.paymentInformationContinue.click();
        this.orderConfirmButton.click();
        return this;
    }

    get clickJewelryButton() {
        cy.get('.header-menu .top-menu [href="/jewelry"]').click()
        return this
    }
    get clickDiamondItem() {
        cy.get('.picture [href="/black-white-diamond-heart"]').click();
        return this
    }

    get clickAddToWishlistBtn() {
        cy.get('#add-to-wishlist-button-14').click()
        return this
    };

}

export const cartPage = new CartPage();
