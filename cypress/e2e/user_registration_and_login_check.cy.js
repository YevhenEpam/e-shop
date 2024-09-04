import RegistrationHelper from "../helpers/registration_helper";

describe('E-shop', () => {
    const registrationHelper = new RegistrationHelper();

    before(() => {
        cy.visit('/');
        registrationHelper.UserRegistration();
    });

    it('Check if user can login', () => {
        cy.visit('/');
        registrationHelper.UserLogin();
    });
});