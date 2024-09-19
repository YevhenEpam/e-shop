export default class BasePage {

    visitUrl(url = 'https://demowebshop.tricentis.com/') {
        cy.visit(url);
        return this
    }
}

export const basePage = new BasePage();
