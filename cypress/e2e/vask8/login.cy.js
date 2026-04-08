describe('Login', () => {
    const admin = "cto.admin@caza.store"
    const password = 'Password123!'
    const vendedor = "bb@pirata.com"
    const coupon = 'VASK8_PRO_2026'

    beforeEach(() => {
        cy.visit('/login')
        cy.clearCookies('caza_token')
    })
    it.only('should login', () => {
        cy.get('#login-email-input').type(vendedor)
        cy.get('#login-password-input').type(password)
        cy.get('#login-submit-button').click()
        // cy.url().should('include', '/dashboard')
    })
    it('should login & logout', () => {
        cy.get('#email').type('admin@skateshop.com')
        cy.get('#password').type('skate_o_die_2024')
        cy.get('#logInButton').click()
        cy.get('#logoutButton').click()
    })

    it('should create transaction as admin w/coupon', () => {
        cy.get('#email').type(admin.email)
        cy.get('#password').type(admin.password)
        cy.get('#logInButton').click()

        cy.get('#store').click()

        cy.visit('/products?page=1')

        cy.get('#product-card-1').click()
        cy.get('#add-product-button-1').click();
        cy.get('#cart-button').click()

        cy.get('#coupon-input').type(coupon)
        cy.get('#coupon-submit').click()

        cy.get('#close-cart-button').click()

        // cy.get('#submit-order-button').click()
        //
        // cy.get('#profile-button').click()

    })
    it('should see transactions as admin ', () => {
        cy.get('#email').type(admin.email)
        cy.get('#password').type(admin.password)
        cy.get('#logInButton').click()

    })

    it('should create transaction as vendedor', () => {
        cy.get('#email').type(vendedor.email)
        cy.get('#password').type(vendedor.password)
        cy.get('#logInButton').click()

        cy.get('#store').click()

        cy.visit('/products?page=1')
        cy.get('#product-card-2').click()
        cy.get('#add-product-button-2').click();
        cy.get('#submit-order-button').click()
    })
    it('should see transactions as vendedor ', () => {
        cy.get('#email').type(vendedor.email)
        cy.get('#password').type(vendedor.password)
        cy.get('#logInButton').click()

    })

    it('should see shooping cart', () => {
        cy.get('#email').type(admin.email)
        cy.get('#password').type(admin.password)
        cy.get('#logInButton').click()

        cy.get('#store').click()
        cy.get('#shooping-cart').should('exist')
    })

})