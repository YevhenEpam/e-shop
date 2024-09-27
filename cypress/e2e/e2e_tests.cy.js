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
                expect($el.text().trim()).to.equal(testData.SubGroups[index]);//todo:Probably it is unnecessary to create a separate json file for only this small Array, and it would de more understandable to put array here
            });
    });

    it('Checks if prices are sorted from low to high', () => {
        
        homePage
            .visitUrl('/desktops')//todo: it is better to use one url, and use steps to go from it to another page
            .sortBy('Price: Low to High')//todo: it is unclear what are you sorting by, you should use value, not selector ("Price: Low to High") - for all tests
            .checkPricesAreSorted('asc');
    });
    
    it('Checks if prices are sorted from high to low', () => {
        homePage
            .visitUrl('/desktops')
            .sortBy('https://demowebshop.tricentis.com/desktops?orderby=11')//todo: use value, not selector
            .checkPricesAreSorted('desc');
    });

    it('Checks if products are sorted from A to Z', () => {
        homePage
            .visitUrl('/desktops')
            .sortBy('https://demowebshop.tricentis.com/desktops?orderby=5') //todo: use value, not selector
            .checkProductTitlesAreSorted('asc');
    });

    it('Checks if products are sorted from Z to A', () => {
        homePage
            .visitUrl('/desktops')
            .sortBy('https://demowebshop.tricentis.com/desktops?orderby=6') //todo: use value, not selector
            .checkProductTitlesAreSorted('desc');
    });

    it('Checks if items per page works as expected', () => {
        homePage
            .visitUrl('/apparel-shoes')//todo: it is better to use one base url, and use steps to go from it to another page
            .checkProductsPerPage(4) //todo: it is simple method, no need to use it, it is better to move steps from it to this page
            .checkProductsPerPage(8)
            .checkProductsPerPage(12)
    });

    it('Verify that allows adding an item to the Wishlist', () => {
        cartPage
            .visitUrl()//todo: it is better to use one base url, and use steps to go from it to another page
            .addToWishlistButton.click();//todo: it is better to put clicking inside the method clickAddToWishlistBtn() and continue chain
        cartPage
            .wishlistQuantityIcon.should('have.text','(1)');
    });

    it('Verify that allows adding an item to the cart', () => {

        cartPage
            .visitUrl()
            .addItemToCart()
            .checkIfItemAddedSuccessfullyToCart()
            .removeItemFromCart();//todo: it is better not to use such method, but put steps here, and if they are not in the scope of your test - you should leave a comment about it
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
