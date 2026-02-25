describe('Customers', () => {
    beforeEach(() => {
        cy.visit('/home')
    })
    it('shouldnt customer see shooping car', () => {
        cy.get('#shooping-cart').should('not.exist')
    })
    it.only('shouldnt add product shooping cart', () => {
        cy.visit('/products?page=1')
        cy.get('#product-card-1').click()
        cy.get('#add-product-button-1').should('not.exist')
    })
})