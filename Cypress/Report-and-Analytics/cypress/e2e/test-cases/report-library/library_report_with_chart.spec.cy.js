import { navigateToOverview, randomRange } from '../../page-objects/verify_actions.spec.cy'
import { randomModule, randomDate, openReportLibrary } from '../../page-objects/module_library.spec.cy'

const i = randomRange(1, 13)

beforeEach(() => {
    cy.signIn()
    navigateToOverview()
    // skipTour()
    openReportLibrary()
})

describe('View and take actions on Charts from the library through the Chart icon', () => {
    it('Should view chart, change its type, and click edit chart when available from the library', () => {
        cy.fixture('lib_selectors').then((data) => {
            const module = data.selectLibrary.replace("integer", i.toString())
            const reportCount = data.reportQuantity.replace("integer", i.toString())
            cy.get(reportCount)
            .invoke('text')
            .then((text) => {
                const count = parseInt(text.trim().slice(0, -7).trim())
                cy.get(module).click()
                cy.wait(6000)
                /* Check Library capacity */
                if (count > 0){
                    /* loop through the library first page list */
                    for (let n = 1; n < count && n < 20; n++){
                        cy.get('body').then($body => {
                            console.log($body)
                            /* check for reports with charts */
                            let chartIcon = data.iconOfChart.replace("integer", n.toString())
                            if ($body.find(chartIcon).length > 0){
                                cy.get(chartIcon).click()
                                cy.get(data.expandedChart).should('be.visible').then((chartModal) => {
                                    /* drill down */
                                    // let k = 1
                                    // while (k){
                                    //     var legends = data.legend.replace("integer", k.toString())
                                    //     if (chartModal.find(legends).length > 0){
                                    //         cy.get(legends).click();
                                    //         cy.wait(3000)
                                    //         k += 1;
                                    //     } else{
                                    //         break
                                    //     }
                                    // }

                                     /* change chart type */
                                    for (let j = 1; j < 4; j++) {
                                        let chartType = data.chartTypeIcon.replace("integer", j.toString())
                                        if (chartModal.find(chartType).length > 0){
                                            cy.wait(2000)
                                            cy.get(chartType).click()
                                            cy.wait(2000)
                                        }
                                    }

                                    /* Navigate to edit chart for custom charts */
                                    if (chartModal.find(data.editChartBtn).length > 0) {
                                        cy.get(data.editChartBtn).click()
                                        cy.url().should('contain', '/update')
                                        cy.wait(6000)
                                        cy.get(data.backBtn).click()
                                        cy.get(data.noBtn).click()
                                        cy.get(data.spinner).should('not.exist')
                                        cy.wait(3000)
                                    /* else, close the modal and proceed */
                                    } else {
                                        cy.wait(3000)
                                        cy.get(data.cancelIcon).click()
                                    }
                                })
                            }
                        })
                    }
                }
                else{
                    expect('No report').to.eq('No report')
                }
            })

        })
    })
})