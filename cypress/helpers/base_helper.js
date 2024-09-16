export default class BaseHelper {

    registerButton = '.ico-register';
    genderSelector = '#gender-male';
    firstNameField = '#FirstName';
    lastNameField = '#LastName';
    emailField = '#Email';
    passwordField = '#Password';
    confirmPasswordField = '#ConfirmPassword';
    registrationButton = '#register-button';
    registrationSuccessMessageField = '.page-body .result';
    loginButton = '.ico-login';
    loginButtonConfirm = '.button-1.login-button';
    logoutButton = '.ico-logout';
    userEmail = '';
    userPassword = 'Test123';
    sortingOptionSelector = '#products-orderby';
    productActualPrice = '.price.actual-price';
    productTitle = '.product-title a';
    perPageSelector = '#products-pagesize';
    productsTitle = '.product-title';
    addToCartButton = '#add-to-cart-button-14';
    addToCartSuccessMessage = '.content';
    shoppingCartButton = '#topcartlink a';
    productCartList = 'tbody .product';
    cartCheckBox = 'input[name="removefromcart"]';
    updateShoppingCartButton = 'input[name="updatecart"]';
    checkoutButton = '#checkout';
    countrySelector = '#CountryId';
    termsCheckBox = '#termsofservice';
    checkoutCountrySelector = '#BillingNewAddress_CountryId';
    cityInput = '#BillingNewAddress_City';
    address1Input = '#BillingNewAddress_Address1';
    zipCodeInput = '#BillingNewAddress_ZipPostalCode';
    phoneNumberInput = '#BillingNewAddress_PhoneNumber';
    billingAddressContinue = '#billing-buttons-container input[title="Continue"]';
    shippingAddressContinue = '#shipping-buttons-container input[title="Continue"]';
    shippingMethodContinue = 'div#shipping-method-buttons-container > .button-1.shipping-method-next-step-button';
    paymentMethodContinue = '#payment-method-buttons-container input[value="Continue"]';
    paymentInformationContinue = '#payment-info-buttons-container input[value="Continue"] ';
    orderConfirmButton = '#confirm-order-buttons-container input[value="Confirm"] '
    orderSuccessMessage = '.section.order-completed div strong';
    computersCategoryButton = '.top-menu > li:nth-of-type(2) > a';
    computerCategoryList = 'ul.sublist.firstLevel.active li a';
    addToWishlistButton = '#add-to-wishlist-button-14';
    wishlistQuantityIcon = '.wishlist-qty';

    visitUrl(url = 'https://demowebshop.tricentis.com/') {
        return cy.visit(url);
    }

    getElement(element){
        return cy.get(element)
    }
    
    generateRandomEmail() {
        const randomString = Math.random().toString(36).substring(2, 11);
        return `test+${randomString}@example.com`;
    }
    
    UserRegistration() {

        this.userEmail = this.generateRandomEmail();
        this.getElement(this.registerButton).click();
        this.getElement(this.genderSelector).should('be.visible').click();
        this.getElement(this.firstNameField).type('Test');
        this.getElement(this.lastNameField).type('Test');
        this.getElement(this.emailField).type(this.userEmail);
        this.getElement(this.passwordField).type(this.userPassword);
        this.getElement(this.confirmPasswordField).type(this.userPassword);
        this.getElement(this.registrationButton).click();
        this.getElement(this.registrationSuccessMessageField).should('be.visible');
    }

    UserLogin() {
        
        this.getElement(this.loginButton).click();
        this.getElement(this.emailField).type(this.userEmail);
        this.getElement(this.passwordField).type(this.userPassword);
        this.getElement(this.loginButtonConfirm).click();
        this.getElement('.header-links > ul  .account').should('contain',`${this.userEmail}`);
    }

    sortBy(optionValue) {
        this.getElement(this.sortingOptionSelector).select(optionValue);
    }

    checkPricesAreSorted(order = 'asc') {
        let prices = [];
        this.getElement(this.productActualPrice)
          .each(($price) => {
            const price = parseFloat($price.text());
            prices.push(price);
          })
          .then(() => {
            const sorted = [...prices].sort((a, b) => order === 'asc' ? a - b : b - a);
            expect(prices).to.deep.equal(sorted);
          });
    }

    checkProductTitlesAreSorted(order = 'asc') {
        let productNames = [];
        this.getElement(this.productTitle)
          .each(($el) => {
            const productName = $el.text().trim();
            productNames.push(productName);
          })
          .then(() => {
            const sorted = [...productNames].sort();
            if (order === 'desc') {
                sorted.reverse();
            }
            expect(productNames).to.deep.equal(sorted);
          });
    }

    checkProductsPerPage (number) {
        this.getElement(this.perPageSelector).select(number.toString());
        this.getElement(this.productsTitle).should('have.length', number);
    }

    addItemToCart() {
        return this.getElement(this.addToCartButton).click();
    };

    checkIfItemAddedSuccessfullyToCart() {
        this.getElement(this.addToCartSuccessMessage).should('be.visible');
        this.getElement(this.shoppingCartButton).click();
        this.getElement(this.productCartList).should('be.visible');
    }

    removeItemFromCart() {
        this.getElement(this.cartCheckBox).click();
        this.getElement(this.updateShoppingCartButton).click();
        this.getElement(this.productCartList).should('not.exist');
    }

    checkoutProcess() {
        this.getElement(this.countrySelector).select('Ukraine');
        this.getElement(this.termsCheckBox).click();
        this.getElement(this.checkoutButton).click();
        this.getElement(this.checkoutCountrySelector).select('Ukraine');
        this.getElement(this.cityInput).type('Ivano-Frankivsk');
        this.getElement(this.address1Input).type('Ivano-Frankivsk');
        this.getElement(this.zipCodeInput).type('76006');
        this.getElement(this.phoneNumberInput).type('+380502020220');
        this.getElement(this.billingAddressContinue).click();
        this.getElement(this.shippingAddressContinue).click();
        this.getElement(this.shippingMethodContinue).click();
        this.getElement(this.paymentMethodContinue).click();
        this.getElement(this.paymentInformationContinue).click();
        this.getElement(this.orderConfirmButton).click();
        this.getElement(this.orderSuccessMessage).should('be.visible');
    }

}