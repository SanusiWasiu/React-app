import { takeTour, skipTour, cancelTour } from '../../page-objects/quick_tour.spec.cy'
import { navigateToOverview, verifyOverview} from '../../page-objects/verify_actions.spec.cy'

beforeEach(() => {
    cy.signIn()
    navigateToOverview()
    verifyOverview()
})

describe('tour actions', () => {
    it('Should take tour and hide it', () => {
        takeTour()
    })
    it('Should skip tour', () => {
        skipTour()
    })
    xit('Should take tour and close it permanently', () => {
        cancelTour()
    })
})