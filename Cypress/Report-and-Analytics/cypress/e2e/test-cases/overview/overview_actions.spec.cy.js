import { skipTour } from '../../page-objects/quick_tour.spec.cy'
import { navigateToOverview, randomRange } from '../../page-objects/verify_actions.spec.cy'

const num = randomRange(3, 8)

beforeEach(() => {
    cy.signIn()
    navigateToOverview()
    // verifyOverview()
    // skipTour()
    cy.wait(3000)
})


describe('Overview page actions', () => {
    it('Should expand default charts and drill down', () => {
        cy.fixture('selectors').then((data) => {
            const chart = data.defaultChart.replace("integer", num.toString())
            if (num > 5){
                cy.get(data.rightChartArrow).click().click({force: true})
                if (num == 8){
                    cy.get(data.lastDefaultChart).should("be.visible").click({force: true})
                } else{
                    cy.get(chart).should("be.visible").click({force: true})
                }
            } else{
                cy.get(chart).click({force: true})
            }
            cy.get(data.expandedChart).should("be.visible")
            cy.wait(8000)
            var i = 1
            cy.get(data.expandedChart).then((chartModal) => {
                while (1){
                    var legends = data.legend.replace("integer", i.toString())
                    if (chartModal.find(legends).length > 0){
                        cy.get(legends).click();
                        cy.wait(3000)
                        i += 1;
                    } else{
                        break
                    }
                    
                }
            })
        })
    })

    it('Should edit chart name', () => {
        cy.fixture('selectors').then((data) => {
            const saveButton = data.save.replace("-integer", (num - 3).toString())
            const editIcon = data.editChart.replace("integer", num.toString())
            const InputBar = data.chartInputBar.replace("-integer", (num - 3).toString())
            if (num > 5){
                cy.get(data.rightChartArrow).click().click({force: true})
                if (num == 8){
                    cy.get(data.editLastChart).should("be.visible").click({force: true})
                    cy.get(data.inputOfLastChart).type(`${num}`)
                    cy.get(saveButton).click()
                } else{
                    cy.get(editIcon).should("be.visible").click({force: true})
                    cy.get(InputBar).type(`{backspace}${num}`)
                    cy.get(saveButton).click()
                }
            } else{
                cy.get(editIcon).click()
                cy.get(InputBar).type(`${num}`)
                cy.get(saveButton).click()
            }
        })
    })

    it('Should view a recent report', () => {
        cy.fixture('selectors').then((data) => {
            const viewSelect = data.view.replace("Integer", (num - 1).toString())
            cy.get(data.dropdownIcon).eq(num - 3).click()
            cy.get(viewSelect).click()
            cy.url().should('contain', '/report/view')
        })  
    })
    it('Should be able to rename a recent report', () => {
        cy.fixture('selectors').then((data) => {
            const renameSelect = data.rename.replace("Integer", (num - 1).toString())
            cy.get(data.dropdownIcon).eq(num - 3)
                .invoke("attr", "id")
                .then((id) => {
                    const chartNum = id.slice(-3)
                    const input = data.renameInput.replace("-integer", chartNum)
                    const save = data.saveRename.replace("-integer", chartNum)
                    cy.get(data.dropdownIcon).eq(num - 3).click()
                    cy.get(renameSelect).click()
                    cy.wait(3000)
                    cy.get(input).type(`{backspace}${num}`)
                    cy.wait(3000)
                    cy.get(save).click()
                })
        })
    })
    it('Should be able to delete a recent report', () => {
        cy.fixture('selectors').then((data) => {
            const deleteSelect = data.delete.replace("Integer", (num - 1).toString())
            cy.get(data.dropdownIcon).eq(num - 3).click()
            cy.get(deleteSelect).click()
            // cy.get(data.confirmDelete).click()
            cy.get(data.cancelDelete).click()
            cy.on('window:alert', (text) => {
                expect(text).to.contains('Report deleted successfully.')
            })
        })
    })
})