// describe('Blog ', function() {
//   it('front page can be opened', function() {
//     cy.visit('http://localhost:3000')
//     cy.contains('Blog')
//     cy.contains('Login')
//   })
// })

describe('Blog app', function() {
  beforeEach(function() {
    // cy.request('POST', 'http://localhost:3002/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login to application')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('unicorn')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Linda Blow logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('blokblok')
      cy.get('#login-button').click()

      cy.contains('invalid username or password')
    })
  })
})