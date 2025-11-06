import { defineConfig } from "cypress";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

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
      API_URL: process.env.CYPRESS_API_URL || 'http://localhost:8080/api',
      ENV: process.env.CYPRESS_ENV || 'development',
      TEST_EMAIL: process.env.CYPRESS_TEST_EMAIL || 'user@example.com',
      TEST_PASSWORD: process.env.CYPRESS_TEST_PASSWORD || 'password123',
      // Bash command configuration for cross-platform compatibility
      BASH_COMMAND: process.env.CYPRESS_BASH_COMMAND || 'bash',
      SCRIPT_PATH: process.env.CYPRESS_SCRIPT_PATH || 'scripts/git-test-helper.sh',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
      // Custom task to run git helper script
      on('task', {
        runGitHelper() {
          return new Promise((resolve) => {
            const { spawn } = require('child_process');
            const path = require('path');
            
            // Use the full Windows path to bash
            const bashPath = 'C:\\Program Files\\Git\\bin\\bash.exe';
            const scriptPath = path.join(__dirname, 'scripts', 'git-test-helper.sh');
            
            // Set up environment variables for the script
            const env = {
              ...process.env,
              REPO_URL: process.env.REPO_URL || 'https://github.com/shabnam-roohy/test-1.git',
              REPO_DIR: path.join(__dirname, 'test-repo'), // Use absolute path
              GITHUB_TOKEN: process.env.GITHUB_TOKEN || ''
            };
            
            console.log('🚀 Starting git helper script via Cypress task...');
            console.log('📂 REPO_DIR:', env.REPO_DIR);
            
            const child = spawn(bashPath, [scriptPath, 'clone-and-commit'], {
              cwd: __dirname,
              env: env,
              stdio: 'pipe'
            });

            let stdout = '';
            let stderr = '';

            child.stdout.on('data', (data: Buffer) => {
              stdout += data.toString();
            });

            child.stderr.on('data', (data: Buffer) => {
              stderr += data.toString();
            });

            child.on('close', (code: number | null) => {
              console.log(`📊 Git helper task completed with code: ${code}`);
              resolve({ code: code || 0, stdout, stderr });
            });

            child.on('error', (error: Error) => {
              console.error('❌ Git helper task error:', error.message);
              resolve({ code: 1, stdout: '', stderr: error.message });
            });
          });
        }
      });
      
      // Enable code coverage if needed
      // require('@cypress/code-coverage/task')(on, config)
      
      return config
    },
  },
});
