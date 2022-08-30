import { randomModule, intReplace } from '../../page-objects/module_library.spec.cy'
import { navigateToOverview, randomRange } from '../../page-objects/verify_actions.spec.cy'
// import { skipTour } from '../../page-objects/quick_tour.spec.cy'


const i = randomRange(1, 12)


beforeEach(() => {
    cy.signIn()
    navigateToOverview()
    // skipTour()
    cy.fixture('selectors').then((quickLink) => {
        cy.get(quickLink.reportLibrary).click({force: true})
        cy.get(quickLink.reportLibraryPage).should('be.visible')
    })
    cy.wait(3000)
    randomModule(i)
})


describe('Actions on individual library', () => {
    it('view a random report in a random module', () => {
        cy.fixture('lib_selectors').then((libraryLink) => {
            const dropdown = libraryLink.actionDropdown.replace("integer", i.toString())
            cy.get('body').then($body => {
                // const link = intReplace(libraryLink.actionDropdown, i)
                if ($body.find(dropdown).length){
                    if ($body.find('tbody > :nth-child(2) > :nth-child(1) > .align-items-center').length > 0){
                        cy.get(":nth-child(1) > :nth-child(5) > .dropdown > #dropdownMenu1").click()
                    } else {
                        cy.get('#dropdownMenu1').click()
                    }

                    // const title = intReplace(libraryLink.reportTitle, i)
                    cy.get(":nth-child(1) > :nth-child(1) > .align-items-center > .d-flex > .mb-0")
                    .invoke('attr', 'title')
                    .then((reportName) => {
                        // const view = intReplace(libraryLink.viewBtn, i)
                        cy.get(":nth-child(1) > :nth-child(5) > .dropdown > .dropdown-menu > a.dropdown-item").click()
                        // cy.get(libLink)

                        // cy.get(libLink).click()
                        cy.get(libraryLink.reportHeader)
                        .invoke('text')
                        .should((header) => {
                            expect(header.trim()).to.eq(reportName)
                        })
                    })
                }
                else{
                    expect($body).not.to.have.descendants('.report-change-table-row')
                }
            })
            
        })
    })

    it('Should duplicate report from the library', () => {
        cy.fixture('lib_selectors').then((libraryLink) => {
            // const dropdown = libraryLink.actionDropdown.replace("integer", i.toString())
            cy.get('body').then($body => {
                // const link = intReplace(libraryLink.actionDropdown, i)
                if ($body.find(":nth-child(1) > :nth-child(5) > .dropdown > #dropdownMenu1 .fs-15").length){
                    if ($body.find('tbody > :nth-child(2) > :nth-child(1) > .align-items-center').length > 0){
                        cy.get(":nth-child(1) > :nth-child(5) > .dropdown > #dropdownMenu1").click()
                    } else {
                        cy.get('#dropdownMenu1').click()
                    }
                    // const title = intReplace(libraryLink.reportTitle, i)
                    cy.get(":nth-child(1) > :nth-child(5) > .dropdown > .dropdown-menu > :nth-child(2)").click()
                    cy.on('window:alert', (text) => {
                        expect(text).to.contains('Duplicating process was successful')
                    })
                }
                else{
                    expect($body).not.to.have.descendants('.report-change-table-row')
                }
            }) 
        })
    })

    it('Should Rename report on the Library', () => {
        cy.fixture('lib_selectors').then((libraryLink) => {
            cy.get('body').then($body => {
                if ($body.find(":nth-child(1) > :nth-child(5) > .dropdown > #dropdownMenu1 .fs-15").length){
                    if ($body.find('tbody > :nth-child(2) > :nth-child(1) > .align-items-center').length > 0){
                        cy.get(":nth-child(1) > :nth-child(5) > .dropdown > #dropdownMenu1").click()
                    } else {
                        cy.get('#dropdownMenu1').click()
                    }
                    cy.get(":nth-child(1) > :nth-child(5) > .dropdown > .dropdown-menu > :nth-child(3)").click()
                    cy.wait(3000)
                    cy.get('.flex-column > div > .form-control').type(`{backspace}${i}`)
                    cy.get('#next-btn').click()

                    cy.on('window:alert', (text) => {
                        expect(text).to.contains('Report renamed successfully.')
                    })
                }
                else{
                    expect($body).not.to.have.descendants('.report-change-table-row')
                }
            })
        })
    })

    it('Should be able to delete a report from the library', () => {
        cy.fixture('lib_selectors').then((libraryLink) => {
            cy.get('body').then($body => {
                if ($body.find(":nth-child(1) > :nth-child(5) > .dropdown > #dropdownMenu1 .fs-15").length){
                    if ($body.find('tbody > :nth-child(2) > :nth-child(1) > .align-items-center').length > 0){
                        cy.get(":nth-child(1) > :nth-child(5) > .dropdown > #dropdownMenu1").click()
                    } else {
                        cy.get('#dropdownMenu1').click()
                    }
                    cy.get(":nth-child(1) > :nth-child(5) > .dropdown > .dropdown-menu > :nth-child(4)").click()
                    cy.wait(3000)
                    cy.get('.cancel-tour').click()

                    cy.on('window:alert', (text) => {
                        expect(text).to.contains('Report deleted successfully.')
                    })
                }
                else{
                    expect($body).not.to.have.descendants('.report-change-table-row')
                }
            })
        })
    })
})