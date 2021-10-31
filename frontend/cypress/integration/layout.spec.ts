describe('JAMDb starter', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('Has title', () => {
        cy.contains('JAMDb')
        cy.contains('Just Another Movie Database')
    })

    it('Navbar is visible', () => {
        cy.contains('Discover')
        cy.contains('Profile')
        cy.contains('Settings')
    })

    it('Navbar is not blocked', () => {
        cy.get('#navToggle').click()
        cy.contains('Discover').click()

        cy.location('pathname').should('eq', '/')
    })
})
