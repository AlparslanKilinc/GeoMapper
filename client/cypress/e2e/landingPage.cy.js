describe('Landing Page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should have the correct title and introduction text', () => {
        cy.get('h1').should('have.text', ' Welcome to GeoMapper ');

        cy.get('.intro-info-box p').should(
            'have.text',
            'GeoMapper offers map visualization combined with a community focus. Dive into GeoMapper and discover a balanced approach to engaging with geographic data, harmonizing technology, and community.'
        );
    });

});
