import CartHelper from "../helpers/cart_helper";

describe('E-shop', () => {
    
    it('Verify that allows checkout an item ', () => {
        
        cy.visit('/black-white-diamond-heart');
        new CartHelper().addItemToCart();
        new CartHelper().checkIfItemAddedSuccessfullyToCart();
        new CartHelper().checkoutProcess();
    });
});
