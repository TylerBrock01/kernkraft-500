describe('User', () => {
    const admin = {
        "email": "hotdog@hotdog.com",
        "password": "Password123!"
    }
    beforeEach(() => {
        cy.visit('/login')
        cy.clearCookies('caza_token')
    })
    it('should login', () => {
        cy.get('#login-email-input').type(admin.email)
        cy.get('#login-password-input').type(admin.password)
        cy.get('#login-submit-button').click()
        cy.url().should('include', '/dashboard')
    })
    it.only('should login', () => {
        cy.get('#login-email-input').type(admin.email)
        cy.get('#login-password-input').type(admin.password)
        cy.get('#login-submit-button').click()
        cy.wait(1000)
        cy.get("#side-link-Personal").click()
        cy.get("#recruit-Button").click()
        cy.get('#button-role-almacen').click()

        cy.get('#input-create-name').type('test')
        cy.get('#input-create-email').type('almacen@alma.com')
        cy.get('#input-create-password').type('Password123!')
        cy.get('#button-submit-create-user').click()
    })
})