import "cypress-xpath";

export default class ItemPerPage {
    perPageSelector = '//select[@id="products-pagesize"]';
    productsTitle = '//h2[@class="product-title"]';

    checkProductsPerPage (number) {
        cy.xpath(this.perPageSelector).select(number.toString());
        cy.xpath(this.productsTitle).should('have.length', number);
    }
}