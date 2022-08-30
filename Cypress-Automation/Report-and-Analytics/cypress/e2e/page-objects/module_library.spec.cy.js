const randomModule = (i) => {
    cy.fixture('lib_selectors').then((data) => {
        const module = data.selectLibrary.replace("integer", i.toString())
        cy.get(`:nth-child(${i}) > a > .mt-2`)
        .invoke('text')
        .then((text) => {
            const count = parseInt(text.trim().slice(0, -7).trim())
            cy.get(module).click()
            // cy.wait(6000)
            cy.get('.py-4 > .d-block > .spinner-border').should('not.exist')
        })
        
    }) 
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

/* function to replace the dynamic integer */
const intReplace = (selector, i) => {
    selector.replace("integer", i.toString())
}

const openReportLibrary = () => {
    cy.fixture('selectors').then((quickLink) => {
        cy.get(quickLink.reportLibrary).click({force: true})
        cy.get(quickLink.reportLibraryPage).should('be.visible')
        cy.get('.py-4 > .d-block > .spinner-border').should('not.exist')
    })
}

export default {
    randomModule,
    intReplace,
    randomDate,
    openReportLibrary
};