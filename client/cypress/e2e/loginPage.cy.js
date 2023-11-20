describe('LoginPage', () => {
    it('Renders The Login Page', () => {
        cy.visit('/login');
    });
    it('Logins in a user with valid credentials and is redirected to explore page', () => {
        cy.visit('/login');
        cy.get('input[name="userName"]').type('tinamistry');
        cy.get('input[name="password"]').type('tinasPassword!');
        cy.get('button[type="submit"]').click();

    });

    it('Redirect user to register page when register button is clicked', () =>{
        cy.visit('/login');
        cy.get('a[href="/register"]').click();
        cy.url().should('include', '/register');
    });

    //testinggggg
})

