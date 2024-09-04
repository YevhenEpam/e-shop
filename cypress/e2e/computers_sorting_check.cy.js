import SortingHelper from "../helpers/sorting_helper";

describe('E-shop', () => {
    const sortingHelper = new SortingHelper();

    it('Checks if prices are sorted from low to high', () => {
        cy.visit('/desktops');
        sortingHelper.sortBy('https://demowebshop.tricentis.com/desktops?orderby=10');
        sortingHelper.checkPricesAreSorted('asc');
    });
    
    it('Checks if prices are sorted from high to low', () => {
        cy.visit('/desktops');
        sortingHelper.sortBy('https://demowebshop.tricentis.com/desktops?orderby=11');
        sortingHelper.checkPricesAreSorted('desc');
    });

    it('Checks if products are sorted from A to Z', () => {
        cy.visit('/desktops');
        sortingHelper.sortBy('https://demowebshop.tricentis.com/desktops?orderby=5');
        sortingHelper.checkProductTitlesAreSorted('asc');
    });

    it('Checks if products are sorted from Z to A', () => {
        cy.visit('/desktops');
        sortingHelper.sortBy('https://demowebshop.tricentis.com/desktops?orderby=6');
        sortingHelper.checkProductTitlesAreSorted('desc');
    });
});
