const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demowebshop.tricentis.com/',
    viewportWidth: 1920,
    viewportHeight: 1080,
    downloadsFolder: 'cypress/downloads',   // Define where downloaded files should be stored
    setupNodeEvents(on, config) {
      // Implement a task to clear the downloads directory before each test
      on('task', {
        clearDownloads() {
          console.log(`Clearing downloads folder: ${config.downloadsFolder}`);
          try {
            fs.readdirSync(config.downloadsFolder).forEach(file => {
              const filePath = path.join(config.downloadsFolder, file);
              fs.unlinkSync(filePath);
            });
          } catch (err) {
            console.error('Failed to clear downloads folder:', err);
            throw err;  // Rethrow the error so it's visible and fails the task if necessary
          }
          return null; // Return null to signify completion of the task
        }
      });
    },
  },
});