describe('Login', () => {
    beforeEach(() => {
        cy.visit('/auth/login')
    })
    it('should login', () => {
        cy.get('#email').type('admin@skateshop.com')
        cy.get('#password').type('skate_o_die_2024')
        cy.get('#logInButton').click()
    })
})