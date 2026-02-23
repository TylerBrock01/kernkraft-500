describe('Transaction', () => {
    beforeEach(() => {
        cy.visit('/products?page=1')
    })
    it('should create transaction', () => {
        cy.get('#product-card-1').click()
        cy.get('#add-product-button-1').click();
        // cy.get('#confirm-order-button').click()
    })
})