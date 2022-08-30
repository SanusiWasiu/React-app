import { navigateToOverview, randomRange } from '../../page-objects/verify_actions.spec.cy'
import { skipTour } from '../../page-objects/quick_tour.spec.cy'

const num = randomRange(2, 7)
const numStr = num.toString()

beforeEach(() => {
  cy.signIn()
  navigateToOverview()
  // skipTour()
  // verifyOverview()
})

describe('Explore overview', () => {
  it('Should navigate to create report page with quick link', () => {
    cy.fixture('selectors').then((quickLink) => {
      cy.get(quickLink.createReport).click({force: true})
      cy.get(quickLink.createReportPage).should('be.visible')
    })
    
  })

  it('Should navigate to Report Library page with quick link', () => {
    cy.fixture('selectors').then((quickLink) => {
      cy.get(quickLink.reportLibrary).click({force: true})
      cy.get(quickLink.reportLibraryPage).should('be.visible')
    })
  })

  it('Should navigate to Dashboards page with quick link', () => {
    cy.fixture('selectors').then((quickLink) => {
      cy.get(quickLink.dashboard).click({force: true})
      cy.url().should('contain', '/dashboards-list')
    })
  })

  it('Should navigate to Audit Trails page with quick link', () => {
    cy.fixture('selectors').then((quickLink) => {
      cy.get(quickLink.auditTrails).click({force: true})
      cy.get(quickLink.auditTrailsPage).should('be.visible')
    })
  })

  it('Should navigate to Dashboard list when "Go to Dashboard" is clicked', () => {
    cy.fixture('selectors').then((link) => {
      cy.get(link.goToDashboard).click({force: true})
      cy.get(link.dashboardList).should('be.visible')
    })
  })

  it('Should not be able to navigate to Scheduled Reports page with quick link yet', () => {
    cy.fixture('selectors').then((quickLink) => {
      cy.get(quickLink.rightSArrow).click()
      cy.get(quickLink.scheduledReports).debug().click()
      cy.url().should('contain', '/overview')
    })
  })

  it('Should navigate to the Report Library when clicked on overview', () => {
    /* click a random report library under recent report list on overview and assert */
    cy.fixture('selectors').then((libraryLinks) => {
      const libLink = libraryLinks.modSpecLib.replace("integer", numStr)
      cy.get(libLink)
        .invoke('attr', 'title')
        .then((title) => {
          cy.get(libLink).click()
          cy.get(libraryLink.libraryHeader)
            .invoke('text')
            .should((text2) => {
              expect(text2.trim()).to.eq(title)
            })
        })
    })
  })
})

