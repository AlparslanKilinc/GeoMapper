describe("RegisterPage", () => {
    it("Renders the register page", () =>{
        cy.visit('/register');
    });
    it("Registers user with valid input and clicks register", () =>{
        cy.visit('/register');
        cy.get('input[name = "firstName"]').type('Tina');
        cy.get('input[name = "lastName"]').type("Mistry");
        cy.get('input[name = "userName"]').type("tinamistry1");
        cy.get('input[name = "email"]').type("tinasEmail@gmail.com");
        cy.get('input[name = "password"]').type("tinaspassword");
        cy.get('input[name = "passwordVerify"]').type("tinaspassword");
        cy.get('button[type="submit"]').click();
    });

    it("Navigates user to login page when login button is clicked", () =>{
        cy.visit('/register');
        cy.get('#loginButton').click()
        cy.url().should('include', '/login')
    });


})
