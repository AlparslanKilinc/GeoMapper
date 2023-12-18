describe('Explore Page', () => {
    beforeEach(() => {
        cy.visit('/explore');
    });
    
    it('should open and close the Sort menu', () => {
        cy.get('.sort button').click();
        cy.get('.MuiMenu-paper').should('exist');

        cy.get('body').click();
        cy.get('.MuiMenu-paper').should('not.exist');
    });

    it('should open and close the Filter popover', () => {
        cy.get('.filter button').click();
        cy.get('.MuiPopover-paper').should('exist');
        cy.get('body').click();
        cy.get('.MuiPopover-paper').should('not.exist');
    });

    // it('should display map cards', () => {
    //     cy.get('.map-card-container .MapCard').should('exist');
    // });


});
