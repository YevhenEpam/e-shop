import "cypress-xpath";

export default class SortingHelper {

    sortingOptionSelector = '//select[@id="products-orderby"]';
    productActualPrice = '//span[@class="price actual-price"]';
    productTitle = '//h2[@class="product-title"]/a';
    
    sortBy(optionValue) {
        cy.xpath(this.sortingOptionSelector).select(optionValue);
    }

    checkPricesAreSorted(order = 'asc') {
        let prices = [];
        cy.xpath(this.productActualPrice)
          .each(($price) => {
            const price = parseFloat($price.text());
            prices.push(price);
          })
          .then(() => {
            const sorted = [...prices].sort((a, b) => order === 'asc' ? a - b : b - a);
            expect(prices).to.deep.equal(sorted);
          });
    }

    checkProductTitlesAreSorted(order = 'asc') {
        let productNames = [];
        cy.xpath(this.productTitle)
          .each(($el) => {
            const productName = $el.text().trim();
            productNames.push(productName);
          })
          .then(() => {
            const sorted = [...productNames].sort();
            if (order === 'desc') {
                sorted.reverse();
            }
            expect(productNames).to.deep.equal(sorted);
          });
    }
}
