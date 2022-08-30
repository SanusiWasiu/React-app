const verifyOverview = () => {
  cy.fixture('selectors').then((data) => {
    cy.contains(data.defaultCharts).should("be.visible")
    cy.contains(data.recentReports).should("be.visible")
    cy.get(data.quickLinks).should("be.visible")
  })
}

const navigateToOverview = () => {
  cy.visit('/')
}

const randomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
  verifyOverview, 
  navigateToOverview,
  randomRange
};