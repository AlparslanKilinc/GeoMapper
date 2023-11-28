describe('Map Creation Wrapper', () => {
    beforeEach(() => {
        cy.visit('/mapCreation');
    });
    it ('should click on a map to render', () => {
        cy.get('.template-selection').contains('Create a Choropleth Map').click();
        cy.get('#outline-page').should('exist');
        cy.contains('.location', 'Niger').click();
    })

    it('should navigate to data editing after slecting a map', () => {
        cy.get('.template-selection').contains('Create a Choropleth Map').click();
        cy.get('#outline-page').should('exist');
        cy.contains('.location', 'Niger').click();
        cy.get('.mapCreationWrapper').get('.wrapper-button-group')
        cy.get('.next')
    });
    it('should check that the nav button is disabled', () => {
        cy.get('.template-selection').contains('Create a Choropleth Map').click();
        cy.get('#outline-page').should('exist');
        cy.get('.mapCreationWrapper').get('.wrapper-button-group')
        cy.get('.next').should('be.disabled')
    })
    it('should navigaet to the map editing page afer clicking next', () => {
        cy.get('.template-selection').contains('Create a Choropleth Map').click();
        cy.get('#outline-page').should('exist');
        cy.contains('.location', 'Niger').click();
        cy.get('.mapCreationWrapper').get('.wrapper-button-group')
        cy.get('.next')
        cy.get('.next')
    })
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