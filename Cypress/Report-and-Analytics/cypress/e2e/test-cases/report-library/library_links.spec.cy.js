import { navigateToOverview, verifyOverview } from '../../page-objects/verify_actions.spec.cy'

beforeEach(() => {
    cy.signIn()
    navigateToOverview()
    // verifyOverview()
    // skipTour()
    cy.wait(3000)

    /* navigate to report library page from overview */
    cy.fixture('selectors').then((libraryLink) => {
        cy.get(libraryLink.reportLibrary).click({force: true})
        cy.get(libraryLink.reportLibraryPage).should('be.visible')
    })
})

describe('Report Library quick links', () => {
    it('Should navigate to the create report page from the Library', () => {
        /* click the create report button to navigate to that flow */
        cy.fixture('selectors').then((libraryLink) => {
            cy.get(libraryLink.createReportBtn).click()
            cy.get(libraryLink.createReportPage).should('be.visible')
        })

    })

    it('Should navigate back to overview', () => {
        cy.fixture('selectors').then((libraryLink) => {
            cy.get(libraryLink.backToOverview).click()
            verifyOverview()
        })
    })
})