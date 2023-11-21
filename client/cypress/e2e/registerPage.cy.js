describe("RegisterPage", () => {
    const testUsername = 'testuser';
    const testPassword = 'testpassword';
    it('should log in with the registered account', () => {

        cy.request({
            method: 'POST',
            url: 'auth/registerUser',
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



