describe('Login', () => {
    beforeEach(() => {
        cy.visit('/auth/login')
    })
    it('should login', () => {
        cy.get('#email').type('admin@vask8.com')
        cy.get('#password').type('vask81')
        cy.get('#logInButton').click()
    })
    it.only('should login & logout', () => {
        cy.get('#email').type('admin@skateshop.com')
        cy.get('#password').type('skate_o_die_2024')
        cy.get('#logInButton').click()
        // cy.wait(1000)
        // cy.get('#logoutButton').click()
    })
})