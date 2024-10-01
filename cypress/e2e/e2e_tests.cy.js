import {homePage} from "../helpers/home_page";
import {cartPage} from "../helpers/cart_page";

describe('E-shop', () => {

    it('Check if user can register', () => {
        homePage
            .visitUrl()
            .registerUser()
            .registrationSuccessMessageField.should('be.visible');
    });

    it('Check if user can login', () => {
        homePage
            .visitUrl()
            .registerUser()
            .userLogin();
        cy.contains('a', homePage.userEmail).should('be.visible');
    });

    it('Verify that "Computers" group has 3 sub-groups with correct names', () => {
        const subGroups = ["Desktops", "Notebooks", "Accessories"];

        homePage
            .visitUrl()
            .computersCategoryButton.trigger('mouseover');

        homePage
            .computerCategoryList
            .should('have.length', subGroups.length)
            .each(($el, index) => {
                expect($el.text().trim()).to.equal(subGroups[index]);
            });
    });


    it('Checks if prices are sorted from low to high', () => {
        
        homePage
            .visitUrl()
            .computersCategoryButton.trigger('mouseover');
        homePage
            .desktopButton.click();
        homePage
            .sortBy('Price: Low to High')
            .checkPricesAreSorted('asc');
    });
    
    it('Checks if prices are sorted from high to low', () => {
        homePage
            .visitUrl()
            .computersCategoryButton.trigger('mouseover');
        homePage
            .desktopButton.click();
        homePage
            .sortBy('Price: High to Low')
            .checkPricesAreSorted('desc');
    });

    it('Checks if products are sorted from A to Z', () => {
        homePage
            .visitUrl()
            .computersCategoryButton.trigger('mouseover');
        homePage
            .desktopButton.click();
        homePage
            .sortBy('Name: A to Z')
            .checkProductTitlesAreSorted('asc');
    });

    it('Checks if products are sorted from Z to A', () => {
        homePage
            .visitUrl()
            .computersCategoryButton.trigger('mouseover');
        homePage
            .desktopButton.click();
        homePage
            .sortBy('Name: Z to A')
            .checkProductTitlesAreSorted('desc');
    });

    it('Checks if items per page works as expected', () => {
        homePage
            .visitUrl()
            .shoesButton.click();
        homePage
            .perPageSelector.select("4");
        homePage
            .productsTitle.should('have.length', 4);

        homePage
            .perPageSelector.select("8");
        homePage
            .productsTitle.should('have.length', 8);

        homePage
            .perPageSelector.select("12");
        homePage
            .productsTitle.should('have.length', 12)
    });

    it('Verify that allows adding an item to the Wishlist', () => {
        cartPage
            .visitUrl()
            .clickJewelryButton
            .clickDiamondItem
            .clickAddToWishlistBtn
            .wishlistQuantityIcon.should('have.text','(1)');
    });

    it('Verify that allows adding an item to the cart', () => {

        cartPage
            .visitUrl()
            .clickJewelryButton
            .clickDiamondItem
            .clickAddToCartButton()
            .checkIfItemAddedSuccessfullyToCart()

            //removing item from cart
            .cartCheckBox.click();
        cartPage
            .updateShoppingCartButton.click();
        cartPage
            .productCartList.should('not.exist')
    });

    it('Verify that allows checkout an item ', () => {
        homePage
            .visitUrl()
            .registerUser()
            .userLogin()
        cartPage
            .visitUrl()
            .clickJewelryButton
            .clickDiamondItem
            .clickAddToCartButton()
            .checkIfItemAddedSuccessfullyToCart()
            .checkoutProcess()
            .orderSuccessMessage.should('be.visible')
    });
});
