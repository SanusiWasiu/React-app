// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// import 'cypress-fill-command'

// Cypress.Commands.add('hover', (element) => {
//     cy.get(element).invoke('show')
// })
import 'cypress-fill-command'
import { navigateToOverview } from '../e2e/page-objects/verify_actions.spec.cy'
const user1 = Cypress.env('USER1')
const user2 = Cypress.env('USER2')

Cypress.Commands.add('signIn', () => {

    cy.fixture('selectors').then((data) => {
        cy.session(user1['Name'], () => {
            cy.visit({ url: '/', failOnStatusCode: false })
            cy.get(data.signinButton).click()
            cy.get(data.userNameInput).type(user1['userName'])
            cy.get(data.passwordInput).type(user1['password'])
            cy.get(data.submitButton).click()
            // cy.url().should('contain', '/overview')
        })
    })
    navigateToOverview()
})
