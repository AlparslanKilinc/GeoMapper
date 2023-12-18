describe('Map Creation Wrapper', () => {
    beforeEach(() => {
        cy.visit('/mapCreation');
    });
    
    it('should prompt the user to upload a file', () => {
        cy.get('.template-selection').contains('Create a Symbol Map').click();
        cy.get('#outline-page').should('exist');
        cy.get('.upload-file-button').click()
        cy.get('.file-input').should('exist')
    })

})
