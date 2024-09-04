import CartHelper from "../helpers/cart_helper";

describe('E-shop', () => {
    
    it('Verify that allows adding an item to the cart', () => {
        
        cy.visit('/black-white-diamond-heart');
        new CartHelper().addItemToCart();
        new CartHelper().checkIfItemAddedSuccessfullyToCart();
        new CartHelper().removeItemFromCart();
    });
});
