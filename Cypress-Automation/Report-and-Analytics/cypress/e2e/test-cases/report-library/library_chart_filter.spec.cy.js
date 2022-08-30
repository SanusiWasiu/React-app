import { navigateToOverview, randomRange } from '../../page-objects/verify_actions.spec.cy'
import { randomModule, randomDate, openReportLibrary } from '../../page-objects/module_library.spec.cy'

const i = randomRange(1, 12)
const d = randomDate(new Date(2021, 0, 1), new Date());

beforeEach(() => {
    cy.signIn()
    navigateToOverview()
    // skipTour()
    openReportLibrary()
})

describe('Filter, Search and Paginate in report Libraries', () => {
    it('Should be able to filter by report type', () => {
        randomModule(i)
        const n = randomRange(1, 3)
        cy.get('.reports-filter > .material-icons').click()
        cy.get(':nth-child(1) > .select-input > .si-virtual-input > .justify-content-between > .si-show-dropdown > .material-icons').click()
        cy.get('.si-options-section > :nth-child(1)').click()
        cy.get('.filter__btn > .btn').click()
        if (n == 1){
            cy.get(':nth-child(1) > .align-items-center > .d-flex > .clr-purple').should('not.exist')
        } else {
            cy.get(':nth-child(1) > .align-items-center > .d-flex > .clr-green').should('not.exist')
        }

    })

    it('Should be able to filter by date', () => {
        randomModule(3)
        cy.get('.reports-filter > .material-icons').click()
        /* pick start date */
        cy.get('.mx-3 > .vue-daterange-picker > .form-control > .justify-content-between > .d-flex > .fs-16').click()
        cy.get('div.daterangepicker.ltr.show-calendar.single.openscenter > div > div > div > div > table > tbody > tr:nth-child(5) > td:nth-child(5)').click()
        /* pick end date */
        cy.get(':nth-child(3) > .vue-daterange-picker > .form-control > .justify-content-between > .d-flex > .fs-16').click()
        cy.get('div.daterangepicker.ltr.show-calendar.single.openscenter > div > div > div > div > table > tbody > tr:nth-child(5) > td:nth-child(5)').click()
        cy.get('.filter__btn > .btn').click()

        /* Assert filter */
        cy.wait(5000)
        cy.get('body').then($body => {
            if ($body.find('tbody > :nth-child(1) > :nth-child(1) > .align-items-center .d-flex > .mb-0').length > 0){
                cy.get(':nth-child(1) > :nth-child(3) > .align-items-center > .d-flex > .mb-0 > :nth-child(1)')
                .invoke('text')
                .then((date_created) => {
                    cy.get('.mx-3 > .vue-daterange-picker > .form-control > .justify-content-between > .d-flex > .fs-15')
                    .invoke('text')
                    .should((filter_date) => {
                        expect(filter_date.trim()).to.eq(date_created.split("-").reverse().join("-"))
                    })
                })
            }
            else {
                expect('No report').to.eq('No report')
            }
        })

    })

    it('Should be able to search by report name', () => {
        randomModule(i)
        cy.get('body').then($body => {
            if ($body.find('tbody > :nth-child(1) > :nth-child(1) > .align-items-center .d-flex > .mb-0').length > 0){
                cy.get(":nth-child(1) > :nth-child(1) > .align-items-center > .d-flex > .mb-0")
                .invoke('attr', 'title')
                .then((reportName) => {
                    cy.get('.shr-search-input > :nth-child(2) > .form-control').click().type(reportName.trim())
                    cy.wait(4000)
                    cy.get('tbody > tr > :nth-child(1) > .align-items-center').should('be.visible')
                })
            } 
            else {
                expect('No report').to.eq('No report')
            }
        })
    })

    it('Should be able to paginate', () => {
        randomModule(3)

        /* move to advance page */
        cy.get('.last-page')
        .invoke('text')
        .then((page) => {
            if (parseInt(page) > 1) {
                cy.get(':nth-child(7) > .icon').click()
                cy.get('.py-4 > .d-block > .spinner-border').should('not.exist')
                /* verify the page number */
                cy.get('.pagination-active > .form-control')
                .invoke('val')
                .should((value) => {
                    expect(value).to.eq('2')
                })
            }
        })
        
    })
})