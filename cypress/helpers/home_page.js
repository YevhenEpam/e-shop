import BasePage from "./base_page";

class HomePage extends BasePage {

    userPassword = 'Test12345';
    userEmail = '';

    get registerButton() {
        return cy.get('.ico-register');
    }

    get genderSelector() {
        return cy.get('#gender-male');
    }

    get firstNameField() {
        return cy.get('#FirstName');
    }

    get lastNameField() {
        return cy.get('#LastName');
    }

    get emailField() {
        return cy.get('#Email');
    }

    get passwordField() {
        return cy.get('#Password');
    }

    get confirmPasswordField() {
        return cy.get('#ConfirmPassword');
    }

    get registrationButton() {
        return cy.get('#register-button');
    }

    get registrationSuccessMessageField() {
        return cy.get('.page-body .result');
    }

    get loginButton() {
        return cy.get('.ico-login');
    }

    get loginButtonConfirm() {
        return cy.get('.button-1.login-button');
    }

    get logoutButton() {
        return cy.get('.ico-logout');
    }

    get computersCategoryButton() {
        return cy.get('.top-menu > li:nth-of-type(2) > a');
    };

    get computerCategoryList() {
        return cy.get('ul.sublist.firstLevel.active li a');
    };

    get sortingOptionSelector() {
        return cy.get('#products-orderby');
    };

    get productActualPrice() {
        return cy.get('.price.actual-price');
    };

    get productTitle() {
        return cy.get('.product-title a');
    };

    get productsTitle() {
        return cy.get('.product-title');
    }

    get perPageSelector() {
        return cy.get('#products-pagesize');
    };

    visitUrl(url = 'https://demowebshop.tricentis.com/') {
        cy.visit(url);
        return this;
    }

    generateRandomEmail() {
        const randomString = Math.random().toString(36).substring(2, 11);
        return `test+${randomString}@example.com`;
    }

    userRegistration() {
        const userEmail = this.generateRandomEmail();
        this.userEmail = userEmail;
        this.registerButton.click()
        this.genderSelector.should('be.visible').click();
        this.firstNameField.type('Test');
        this.lastNameField.type('Test');
        this.emailField.type(userEmail);
        this.passwordField.type(this.userPassword);
        this.confirmPasswordField.type(this.userPassword);
        this.registrationButton.click();
        return this;
    }

    userLogin(userEmail, userPassword) {
        this.logoutButton.click();
        this.loginButton.click();
        this.emailField.type(this.userEmail);
        this.passwordField.type(this.userPassword);
        this.loginButtonConfirm.click();
        return this;
    }

    sortBy(optionValue) {
        this.sortingOptionSelector.select(optionValue);
        return this;
    }

    checkPricesAreSorted(order = 'asc') {
        let prices = [];
        this.productActualPrice
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
        this.productTitle
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
        this.perPageSelector.select(number.toString());
        this.productsTitle.should('have.length', number);
        return this;
    }
}

export const homePage = new HomePage();
