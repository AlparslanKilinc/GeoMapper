describe('Navigation Bar', () => {
    it('renders the navigation bar', () => {
        cy.visit('/');
    });
    it('renders the explore page on button click', () => {
        cy.visit('/'); //visit home page
        cy.get('#exploreButton')
            .click() //click explore button
            .url().should('include', '/explore'); //make sure new page is explore
    });
    it('renders the map creation page on button click', () => {
        cy.visit('/'); //visit home page
        cy.get('#mapCreation')
            .click() //click map creation button
            .url().should('include', '/mapCreation'); //make sure new page is map creation
    });
});