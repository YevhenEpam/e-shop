import ItemPerPage from "../helpers/items_per_page_helper";

describe('E-shop', () => {

    it('Checks if items per page works as expected', () => {
        cy.visit('/apparel-shoes');
        
        new ItemPerPage().checkProductsPerPage(4);
        new ItemPerPage().checkProductsPerPage(8);
        new ItemPerPage().checkProductsPerPage(12);
    })
})