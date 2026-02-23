describe('Login', () => {
    beforeEach(() => {
        cy.visit('/auth/login')
    })
    it('should login', () => {
        cy.get('#email').type('admin@vask8.com')
        cy.get('#password').type('vask81')
        cy.get('#logInButton').click()
    })
    it('should login & logout', () => {
        cy.get('#email').type('admin@skateshop.com')
        cy.get('#password').type('skate_o_die_2024')
        cy.get('#logInButton').click()
        cy.get('#logoutButton').click()
    })
    it.only('should create transaction', () => {
        cy.get('#email').type('admin@skateshop.com')
        cy.get('#password').type('skate_o_die_2024')
        cy.get('#logInButton').click()
        cy.get('#store').click()
        cy.visit('/products?page=1')
        cy.get('#product-card-1').click()
        cy.get('#add-product-button-1').click();
        cy.get('#submit-order-button').click()
    })
})