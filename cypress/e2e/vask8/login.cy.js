describe('Login', () => {
    const admin = {
        email: "test@test.com",
        password: "vask177",
    }
    const vendedor = {
        "email": "test1@test1.com",
        "password": "vask177",
    }
    const coupon = 'VASK8_PRO_2026'

    beforeEach(() => {
        cy.visit('/auth/login')
        cy.clearCookies('skate_token')
    })
    it('should login', () => {
        cy.get('#email').type(admin.email)
        cy.get('#password').type(admin.password)
        cy.get('#logInButton').click()
    })
    it('should login & logout', () => {
        cy.get('#email').type('admin@skateshop.com')
        cy.get('#password').type('skate_o_die_2024')
        cy.get('#logInButton').click()
        cy.get('#logoutButton').click()
    })

    it.only('should create transaction as admin w/coupon', () => {
        cy.get('#email').type(admin.email)
        cy.get('#password').type(admin.password)
        cy.get('#logInButton').click()

        cy.get('#store').click()
        cy.wait(500)
        cy.visit('/products?page=1')
        cy.get('#product-card-1').click()
        cy.get('#add-product-button-1').click();
        cy.get('#cart-button').click()

        cy.get('#coupon-input').type(coupon)
        cy.get('#coupon-submit').click()

        cy.get('#submit-order-button').click()

        cy.get('#profile-button').click()

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