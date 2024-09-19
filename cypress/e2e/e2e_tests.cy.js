import {homePage} from "../helpers/home_page";
import {cartPage} from "../helpers/cart_page";
import testData from "../fixtures/testData.json"

describe('E-shop', () => {

    it('Check if user can register', () => {
        homePage
            .visitUrl()
            .userRegistration()
            .registrationSuccessMessageField.should('be.visible');
    });

    it('Check if user can login', () => {
        homePage
            .visitUrl()
            .userRegistration()
            .userLogin();
        cy.contains('a', homePage.userEmail).should('be.visible');
    });

    it('Verify that "Computers" group has 3 sub-groups with correct names', () => {

        homePage
            .visitUrl()
            .computersCategoryButton.trigger('mouseover')
        homePage
            .computerCategoryList
            .should('have.length', 3)
            .each(($el, index) => {
                expect($el.text().trim()).to.equal(testData.SubGroups[index]);
            });
    });

    it('Checks if prices are sorted from low to high', () => {
        
        homePage
            .visitUrl('/desktops')
            .sortBy('https://demowebshop.tricentis.com/desktops?orderby=10')
            .checkPricesAreSorted('asc');
    });
    
    it('Checks if prices are sorted from high to low', () => {
        homePage
            .visitUrl('/desktops')
            .sortBy('https://demowebshop.tricentis.com/desktops?orderby=11')
            .checkPricesAreSorted('desc');
    });

    it('Checks if products are sorted from A to Z', () => {
        homePage
            .visitUrl('/desktops')
            .sortBy('https://demowebshop.tricentis.com/desktops?orderby=5')
            .checkProductTitlesAreSorted('asc');
    });

    it('Checks if products are sorted from Z to A', () => {
        homePage
            .visitUrl('/desktops')
            .sortBy('https://demowebshop.tricentis.com/desktops?orderby=6')
            .checkProductTitlesAreSorted('desc');
    });

    it('Checks if items per page works as expected', () => {
        homePage
            .visitUrl('/apparel-shoes')
            .checkProductsPerPage(4)
            .checkProductsPerPage(8)
            .checkProductsPerPage(12)
    });

    it('Verify that allows adding an item to the Wishlist', () => {
        cartPage
            .visitUrl()
            .addToWishlistButton.click();
        cartPage
            .wishlistQuantityIcon.should('have.text','(1)');
    });

    it('Verify that allows adding an item to the cart', () => {

        cartPage
            .visitUrl()
            .addItemToCart()
            .checkIfItemAddedSuccessfullyToCart()
            .removeItemFromCart();
    });

    it('Verify that allows checkout an item ', () => {
        homePage
            .visitUrl()
            .userRegistration()
            .userLogin()
        cartPage
            .visitUrl()
            .addItemToCart()
            .checkIfItemAddedSuccessfullyToCart()
            .checkoutProcess()
            .orderSuccessMessage.should('be.visible')
    });
});
