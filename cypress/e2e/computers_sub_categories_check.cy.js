describe('E-shop', () => {
    
    it('Verify that "Computers" group has 3 sub-groups with correct names', () => {

        cy.visit('/');

        cy.xpath('//ul[@class="top-menu"]//a[contains(text(),"Computers")]').trigger('mouseover');
        const expectedSubGroups = ['Desktops', 'Notebooks', 'Accessories'];
        cy.xpath('//ul[@class="top-menu"]//a[contains(text(),"Computers")]/../ul/li/a')
            .should('have.length', 3)
            .each(($el, index) => {
                expect($el.text().trim()).to.equal(expectedSubGroups[index]);
            });
    });
});
