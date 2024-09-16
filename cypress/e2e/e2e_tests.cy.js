import BaseHelper from "../helpers/base_helper";

describe('E-shop', () => {
    const helper = new BaseHelper();

    it('Check if user can register', () => {
        
        helper.visitUrl();
        helper.UserRegistration();

    });
    
    it('Check if user can login', () => {
        
        helper.visitUrl();
        helper.UserLogin();
    });

    it('Verify that "Computers" group has 3 sub-groups with correct names', () => {
        
        helper.visitUrl();
        helper.getElement(helper.computersCategoryButton).trigger('mouseover');
        const expectedSubGroups = ['Desktops', 'Notebooks', 'Accessories'];
        helper.getElement(helper.computerCategoryList)
            .should('have.length', 3)
            .each(($el, index) => {
                expect($el.text().trim()).to.equal(expectedSubGroups[index]);
            });
    });

    it('Checks if prices are sorted from low to high', () => {
        
        helper.visitUrl('/desktops');
        helper.sortBy('https://demowebshop.tricentis.com/desktops?orderby=10');
        helper.checkPricesAreSorted('asc');
    });
    
    it('Checks if prices are sorted from high to low', () => {
       
        helper.visitUrl('/desktops');
        helper.sortBy('https://demowebshop.tricentis.com/desktops?orderby=11');
        helper.checkPricesAreSorted('desc');
    });

    it('Checks if products are sorted from A to Z', () => {
        
        helper.visitUrl('/desktops');
        helper.sortBy('https://demowebshop.tricentis.com/desktops?orderby=5');
        helper.checkProductTitlesAreSorted('asc');
    });

    it('Checks if products are sorted from Z to A', () => {
        
        helper.visitUrl('/desktops');
        helper.sortBy('https://demowebshop.tricentis.com/desktops?orderby=6');
        helper.checkProductTitlesAreSorted('desc');
    });

    it('Checks if items per page works as expected', () => {
        
        helper.visitUrl('/apparel-shoes');
        helper.checkProductsPerPage(4);
        helper.checkProductsPerPage(8);
        helper.checkProductsPerPage(12);
    });

    it('Verify that allows adding an item to the Wishlist', () => {
        
        helper.visitUrl('/black-white-diamond-heart');
        helper.getElement(helper.addToWishlistButton).click();
        helper.getElement('.content').should('be.visible');
        helper.getElement(helper.wishlistQuantityIcon).should('have.text','(1)');
    });

    it('Verify that allows adding an item to the cart', () => {
        
        helper.visitUrl('/black-white-diamond-heart');
        helper.addItemToCart();
        helper.checkIfItemAddedSuccessfullyToCart();
        helper.removeItemFromCart();
    });

    it('Verify that allows checkout an item ', () => {
        
        helper.visitUrl();
        helper.UserLogin();
        helper.visitUrl('/black-white-diamond-heart');
        helper.addItemToCart();
        helper.checkIfItemAddedSuccessfullyToCart();
        helper.checkoutProcess();
    });
});