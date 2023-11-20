describe("RegisterPage", () => {
    const testUsername = 'testuser';
    const testPassword = 'testpassword';
    it('should log in with the registered account', () => {
        // Register the test account if not already registered
        cy.request({
            method: 'POST',
            url: 'auth/registerUser', // Replace with the actual registration API endpoint
            body: {
                username: testUsername,
                firstName: 'Tina',
                lastName: 'Mistry',
                email: 'testEmail@gmail.com',
                password: testPassword,
                passwordVerify: testPassword
            },
            failOnStatusCode: false,
        });
        cy.visit('/login');

        // Fill in the login form
        cy.get('#userName').type(testUsername);
        cy.get('#password').type(testPassword);
        cy.get('[type="submit"]').click();
    })


    it("Navigates user to login page when login button is clicked", () => {
        cy.visit('/register');
        cy.get('#loginButton').click()
        cy.url().should('include', '/login')
    })
});



