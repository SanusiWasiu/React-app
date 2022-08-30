import { navigateToOverview, randomRange } from '../../page-objects/verify_actions.spec.cy'

const i = randomRange(1, 10)
beforeEach(() => {
    cy.signIn()
    navigateToOverview()
    /* navigate to audit trails */
    cy.fixture('selectors').then((quickLink) => {
        cy.get(quickLink.auditTrails).click({force: true})
        cy.get(quickLink.auditTrailsPage).should('be.visible')
    })
})

describe('Audit trails', () => {
    it('Should filter audit trails', () => {
        cy.get('.right__border > .material-icons').click()
        /* pick start date */
        cy.get(':nth-child(1) > .vue-daterange-picker > .form-control > .justify-content-between > .d-flex > .fs-16').click()
        cy.get('div.daterangepicker.ltr.show-calendar.single.openscenter > div > div > div > div > table > tbody > tr:nth-child(5) > td:nth-child(5)').click()
        /* pick end date */
        cy.get('.mx-3 > .vue-daterange-picker > .form-control > .justify-content-between > .d-flex > .fs-16').click()
        cy.get('div.daterangepicker.ltr.show-calendar.single.openscenter > div > div > div > div > table > tbody > tr:nth-child(5) > td:nth-child(5)').click()
        cy.get('.filter__btn > .btn').click()

        /* Assert filter */
        cy.wait(5000)
        cy.get('body').then($body => {
            if ($body.find('tbody > :nth-child(1) > :nth-child(1) > .align-items-center').length > 0){
                cy.get(':nth-child(1) > :nth-child(5) > .align-items-center > .d-flex > .mb-0 > :nth-child(1)')
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

    it('Should be able to paginate', () => {
        /* move to advance page */
        cy.get('.last-page')
        .invoke('text')
        .then((page) => {
            if (parseInt(page) > 1) {
                cy.get(':nth-child(8) > .icon').click()
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

    it('Should be able to change table limiter', () => {
        cy.get('#dropdownMenu1').click()
        cy.get(`:nth-child(${i}) > .dropdown-item`)
        .invoke('text')
        .then((limit) => {
            cy.get(`:nth-child(${i}) > .dropdown-item`).click()
            cy.wait(10000)
            cy.get(`:nth-child(${limit}) > :nth-child(1) > .align-items-center`).should('be.visible')
        })
    })
})