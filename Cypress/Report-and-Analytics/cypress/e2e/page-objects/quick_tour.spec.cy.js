const takeTour = () => {
    cy.fixture('selectors').then((data) => {
        cy.get('body').then((body) => {
            cy.wait(3000)
            if (body.find(data.miniTour).length > 0){
                cy.get(data.miniTour).click({force: true})
            }
        })
        cy.get(data.tourOption).click()
        cy.get(data.firstGuide).should('have.css', 'background-color', 'rgb(41, 109, 179)')
        cy.get(data.next).click()
        cy.get(data.secondGuide).should('have.css', 'background-color', 'rgb(41, 109, 179)')
        for (let i = 3; i < 9; i++){
            cy.get(data.nextMore).click()
            cy.get(`.counter > :nth-child(${i})`).should('have.css', 'background-color', 'rgb(41, 109, 179)')
        }
        cy.get(data.nextMore).click()
        cy.get(data.tourEnd).should("be.visible")
        // cy.get(data.cancel).click()
        cy.get(data.tourOption).click()
    })
}

const skipTour = () => {
    cy.fixture('selectors').then((data) => {
        cy.get(data.skip).click()
        cy.get(data.confirmSkip).click()
    })
}

const cancelTour = () => {
    cy.fixture('selectors').then((data) => {
        skipTour()
        cy.get(data.closeTour).click()
    })
}

export default { takeTour, skipTour, cancelTour };