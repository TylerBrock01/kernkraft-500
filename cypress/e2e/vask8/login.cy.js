describe('Login', () => {
    const admin = {
        email: "test@test.com",
        password: "vask177",
    }
    beforeEach(() => {
        cy.visit('/auth/login')
        cy.clearCookies('skate_token')
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
    it('should create transaction as vendedor', () => {
        cy.get('#email').type('admin@skateshop.com')
        cy.get('#password').type('skate_o_die_2024')
        cy.get('#logInButton').click()
        cy.get('#store').click()
        cy.visit('/products?page=1')
        cy.get('#product-card-1').click()
        cy.get('#add-product-button-1').click();
        cy.get('#submit-order-button').click()
    })
    it('should create transaction as admin', () => {
        cy.get('#email').type(admin.email)
        cy.get('#password').type(admin.password)
        cy.get('#logInButton').click()

        cy.get('#store').click()

        cy.visit('/products?page=1')
        cy.get('#product-card-1').click()
        cy.get('#add-product-button-1').click();
        cy.get('#submit-order-button').click()
    })
    it('should see shooping cart', () => {
        cy.get('#email').type(admin.email)
        cy.get('#password').type(admin.password)
        cy.get('#logInButton').click()

        // cy.get('#store').click()
        // cy.get('#shooping-cart').should('exist')
    })
    it.only('should see transactions ', () => {
        cy.get('#email').type(admin.email)
        cy.get('#password').type(admin.password)
        cy.get('#logInButton').click()

    })
})