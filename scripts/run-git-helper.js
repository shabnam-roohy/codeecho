#!/usr/bin/env node

// Node.js script to execute the git helper bash script
// This script reads configuration from .env and is CI/CD ready

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env file if it exists
function loadEnv() {
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf-8');
        envContent.split('\n').forEach(line => {
            const match = line.match(/^([^=#]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim();
                if (!process.env[key]) {
                    process.env[key] = value;
                }
            }
        });
    }
}

function runGitHelper() {
    return new Promise((resolve, reject) => {
        // Load .env if not already loaded
        loadEnv();

        // Detect bash path - works on both Windows and Linux/macOS
        let bashPath;
        if (process.platform === 'win32') {
            bashPath = process.env.GIT_BASH_PATH || 'C:\\Program Files\\Git\\bin\\bash.exe';
        } else {
            bashPath = process.env.BASH_PATH || '/bin/bash';
        }

        const scriptPath = path.join(__dirname, 'git-test-helper.sh');
        const command = 'clone-and-commit';

        console.log('🚀 Starting git helper script...');
        console.log(`🖥️  Platform: ${process.platform}`);
        console.log(`📁 Script path: ${scriptPath}`);
        console.log(`🔧 Bash path: ${bashPath}`);
        console.log(`⚡ Command: ${command}`);

        // Pass environment variables to the bash script
        const env = {
            ...process.env,
            REPO_URL: process.env.REPO_URL || process.env.CYPRESS_REPO_URL || 'https://github.com/shabnam-roohy/test-1.git',
            REPO_DIR: process.env.REPO_DIR || process.env.CYPRESS_REPO_DIR || path.join(process.cwd(), 'test-repo'),
            GITHUB_TOKEN: process.env.GITHUB_TOKEN || process.env.CYPRESS_GITHUB_TOKEN || ''
        };

        console.log(`🔗 Repository: ${env.REPO_URL}`);
        console.log(`📂 Target directory: ${env.REPO_DIR}`);
        console.log(`🔑 GitHub Token: ${env.GITHUB_TOKEN ? '***configured***' : 'not set'}`);

        // Spawn the bash process
        const child = spawn(bashPath, [scriptPath, command], {
            cwd: process.cwd(),
            env: env,
            stdio: ['inherit', 'pipe', 'pipe']
        });

        let stdout = '';
        let stderr = '';

        child.stdout.on('data', (data) => {
            const output = data.toString();
            stdout += output;
            console.log(output.trim());
        });

        child.stderr.on('data', (data) => {
            const output = data.toString();
            stderr += output;
            console.error(output.trim());
        });

        child.on('close', (code) => {
            console.log(`📊 Process exited with code: ${code}`);
            if (code === 0) {
                console.log('✅ Git operations completed successfully');
                resolve({ code, stdout, stderr });
            } else {
                console.log('❌ Git operations failed');
                resolve({ code, stdout, stderr }); // Don't reject, let caller handle
            }
        });

        child.on('error', (error) => {
            console.error('❌ Failed to start process:', error.message);
            reject(error);
        });
    });
}

// Run if called directly
if (require.main === module) {
    runGitHelper()
        .then((result) => {
            process.exit(result.code);
        })
        .catch((error) => {
            console.error('❌ Error:', error.message);
            process.exit(1);
        });
}

module.exports = runGitHelper;