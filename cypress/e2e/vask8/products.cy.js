describe('Pruebas de producto', () => {
    beforeEach(() => {
        cy.visit('/admin/products?page=1')
    })
    it('usar el form', () => {
        cy.get('#add-new-product-link').click();
        cy.get('#name').type('prueba');
        cy.get('#price').type('100');
        cy.get('#stock').type('10');
        cy.get('#color').type('rojo')
        cy.get('#size').type('8')
        cy.get('#categoryId').select('1')
        cy.get('#deckId').select('1')
        // cy.get('#submitProductButton').click()
    });

});
