import { navigateToOverview, randomRange } from '../../page-objects/verify_actions.spec.cy'

beforeEach(() => {
    cy.signIn()
    navigateToOverview()
    // verifyOverview()
    // skipTour()
    cy.wait(3000)
})

describe('Create report from the employee module', () => {
    it('Should create the report with only starting data point', () => {
        
    })
})