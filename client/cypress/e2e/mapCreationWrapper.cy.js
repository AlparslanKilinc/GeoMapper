describe('Map Creation Wrapper', () => {
    beforeEach(() => {
        cy.visit('/mapCreation');
    });

    it('should pick a template in the initial stage of map creation ', () => {
        cy.get('.template-selection').contains('Create a Choropleth Map').click();
        cy.get('#outline-page').should('exist');
    })
    it('should navigate to Choropleth', () => {
        cy.get('.template-selection').contains('Create a Choropleth Map').click();
        cy.get('#outline-page').should('exist');
        cy.get('.upload-file-button').click()
        cy.get('.file-input').should('exist')
    });
    it('should navigate to symbol map', () => {
        cy.get('.template-selection').contains('Create a Symbol Map').click();
        cy.get('#outline-page').should('exist');
        cy.get('.upload-file-button').click()
        cy.get('.file-input').should('exist')
    })
    it('should prompt the user to upload a file', () => {
        cy.get('.template-selection').contains('Create a Symbol Map').click();
        cy.get('#outline-page').should('exist');
        cy.get('.upload-file-button').click()
        cy.get('.file-input').should('exist')
    })

})
