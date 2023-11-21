describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('should display the login form', () => {
        cy.get('h1').should('have.text', 'Log into GeoMapper');
        cy.get('#userName').should('exist');
        cy.get('#password').should('exist');
        cy.get('[type="submit"]').should('have.text', 'Login');
    });

    it('should display error messages for empty form submission', () => {
        cy.get('[type="submit"]').click();

        cy.get('#userName').should('have.attr', 'aria-invalid', 'true');
        cy.get('#userName').should('have.attr', 'aria-describedby', 'userName-helper-text');
        cy.get('#userName-helper-text').should('have.text', 'Username is required');

        cy.get('#password').should('have.attr', 'aria-invalid', 'true');
        cy.get('#password').should('have.attr', 'aria-describedby', 'password-helper-text');
        cy.get('#password-helper-text').should('have.text', 'Password is required');
    });

    it('should navigate to the registration page when "Register" button is clicked', () => {
        cy.contains('Register').click();
        cy.url().should('include', '/register');
    });

    it('should navigate to the forgot password page when "Forgot Password" button is clicked', () => {
        cy.contains('Forgot Password').click();
        cy.url().should('include', '/forgotPassword');
    });
});
