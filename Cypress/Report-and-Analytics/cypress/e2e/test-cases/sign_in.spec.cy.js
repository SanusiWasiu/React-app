import { verifyOverview, navigateToOverview } from '../page-objects/verify_actions.spec.cy'

describe('navigate to Overview page', () => {
  it('Should sign in and redirect to the overview page', () => {
    cy.signIn()
    navigateToOverview()
    /* verify successful sigin */
    verifyOverview()
  })

  // xit('Should Launch Report and Visuals module', () => {
  //   cy.fixture('selectors').then((data) => {
  //     cy.get(data.permission).click()
  //     // cy.get(data.switchToAdmin).should('have.attr', 'href').and('include', 'control')
  //     // .then((href) => {
  //     //   cy.visit(href)
  //     // })
  //     cy.get(data.switchToAdmin).should('have.attr', 'href').and('include', 'control')
  //     cy.get(data.switchToAdmin).click()
  //     cy.get(data.appLaunch).click()
  //   })
  // })
})
