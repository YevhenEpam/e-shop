describe('E-shop', () => {

    it('Verify that allows adding an item to the Wishlist', () => {
        cy.visit('/black-white-diamond-heart');
        cy.xpath('//input[@id="add-to-wishlist-button-14"]').click();
        cy.xpath('//p[contains(text(),"The product has been added to your ")]').should('be.visible');
        cy.xpath('//span[@class="wishlist-qty"]').should('have.text','(1)');
    })
})