describe('Pruebas de producto', () => {
    beforeEach(() => {
        cy.visit('/admin/products?page=1')
    })
    it('should create product', () => {
        cy.get('#add-new-product-link').click();
        cy.get('#name').type('prueba');
        cy.get('#price').type('100');
        cy.get('#stock').type('10');
        cy.get('#color').type('rojo')
        cy.get('#size').type('8')
        cy.get('#categoryId').select('6')
        cy.get('#deckId').select('1')
        // cy.get('#submitProductButton').click()
    });
    it('should updated product', () => {
        cy.get('#update-product4-link').click();
        cy.get('#name').clear()
        cy.get('#name').type('Element');

        cy.get('#price').clear()
        cy.get('#price').type('1500');

        cy.get('#stock').clear()
        cy.get('#stock').type('1');

        cy.get('#color').clear()
        cy.get('#color').type('blanca')

        cy.get('#size').clear()
        cy.get('#size').type('8')

        cy.get('#categoryId').select('6')
        cy.get('#deckId').select('1')
        // cy.get('#update-Product-Button').click();
    });
});
