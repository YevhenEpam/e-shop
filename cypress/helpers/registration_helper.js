import "cypress-xpath";

export default class RegistrationHelper {
    registerButton = '//a[contains(text(),"Register")]';
    genderSelector = '//input[@id="gender-male"]';
    firstNameField = '//input[@id="FirstName"]';
    lastNameField = '//input[@id="LastName"]';
    emailField = '//input[@id="Email"]';
    passwordField = '//input[@id="Password"]';
    confirmPasswordField = '//input[@id="ConfirmPassword"]';
    registrationButton = '//input[@id="register-button"]';
    registrationSuccessMessageField = '//div[contains(text(),"Your registration completed")]';
    loginButton = '//a[contains(text(),"Log in")]';
    loginButtonConfirm = '//input[@value="Log in"]';
    logoutButton = '//a[contains(text(),"Log out")]';
    userEmail = '';
    userPassword = 'Test123';

    generateRandomEmail() {
        const randomString = Math.random().toString(36).substring(2, 11);
        return `test+${randomString}@example.com`;
    }
    
    UserRegistration() {

        this.userEmail = this.generateRandomEmail();
        cy.xpath(this.registerButton).click();
        cy.xpath(this.genderSelector).should('be.visible').click();
        cy.xpath(this.firstNameField).type('Test');
        cy.xpath(this.lastNameField).type('Test');
        cy.xpath(this.emailField).type(this.userEmail);
        cy.xpath(this.passwordField).type(this.userPassword);
        cy.xpath(this.confirmPasswordField).type(this.userPassword);
        cy.xpath(this.registrationButton).click();
        cy.xpath(this.registrationSuccessMessageField).should('be.visible');
    }

    UserLogin() {
        
        cy.xpath(this.logoutButton).click();
        cy.xpath(this.loginButton).click();
        cy.xpath(this.emailField).type(this.userEmail);
        cy.xpath(this.passwordField).type(this.userPassword);
        cy.xpath(this.loginButtonConfirm).click();
        cy.xpath(`//a[contains(text(),"${this.userEmail}")]`).should('be.visible');
    }
}
