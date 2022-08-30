const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://tic-uat.seamlesshrms.com/admin/reports-analytics#/overview',
    defaultCommandTimeout: 80000,
    viewportWidth: 1500,
    viewportHeight: 800,
    pageLoadTimeout: 120000,
    experimentalSessionAndOrigin: true,
    chromeWebSecurity: false,
    scrollBehavior: "nearest",
    // specPattern: 'cypress/e2e/allSpec.spec.cy.js',
  },
});
