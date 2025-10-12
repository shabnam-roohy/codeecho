import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl || 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    downloadsFolder: 'cypress/downloads',
    viewportWidth: parseInt(process.env.CYPRESS_viewportWidth || '1280'),
    viewportHeight: parseInt(process.env.CYPRESS_viewportHeight || '720'),
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: parseInt(process.env.CYPRESS_defaultCommandTimeout || '10000'),
    requestTimeout: parseInt(process.env.CYPRESS_requestTimeout || '10000'),
    responseTimeout: parseInt(process.env.CYPRESS_responseTimeout || '10000'),
    pageLoadTimeout: 10000,
    retries: {
      runMode: 2,
      openMode: 0
    },
    env: {
      // Environment variables from .env file
      API_URL: process.env.CYPRESS_API_URL || 'http://localhost:3001/api',
      ENV: process.env.CYPRESS_ENV || 'development',
      TEST_EMAIL: process.env.CYPRESS_TEST_EMAIL || 'user@example.com',
      TEST_PASSWORD: process.env.CYPRESS_TEST_PASSWORD || 'password123',
    },
    setupNodeEvents(_on, config) {
      // implement node event listeners here
      // Example: on('task', { ... })
      
      // Enable code coverage if needed
      // require('@cypress/code-coverage/task')(on, config)
      
      return config
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
  },
})