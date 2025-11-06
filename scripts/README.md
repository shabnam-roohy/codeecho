# Git Test Helper Script

Minimal bash script for E2E testing - clones repository, commits, and cleans up.

## Usage

```bash
bash scripts/git-test-helper.sh clone-and-commit
```

## What it does

1. **Clones** the repository (removes existing directory first)
2. **Creates** a test file with timestamp
3. **Commits** and pushes the changes
4. **Removes** the cloned repository (cleanup)

## Environment Variables

### For the Bash Script:
- `REPO_URL` - Repository URL (default: https://github.com/shabnam-roohy/test-1.git)
- `REPO_DIR` - Local directory (default: ./test-repo)
- `GITHUB_TOKEN` - GitHub token (optional, for private repos)

### For Cypress (Cross-Platform Configuration):
- `CYPRESS_BASH_COMMAND` - Bash executable path (default: 'bash')
- `CYPRESS_SCRIPT_PATH` - Script path (default: 'scripts/git-test-helper.sh')

### Platform-Specific Examples:
```bash
# Linux/Mac/CI Pipelines
CYPRESS_BASH_COMMAND=bash

# Windows with Git Bash
CYPRESS_BASH_COMMAND="C:\Program Files\Git\bin\bash.exe"

# Docker/Alpine Linux
CYPRESS_BASH_COMMAND=/bin/bash

# WSL (Windows Subsystem for Linux)
CYPRESS_BASH_COMMAND=wsl bash
```

## Cypress Integration

The script runs automatically in your Cypress test after `cy.Addproject()`:

```javascript
cy.exec('bash scripts/git-test-helper.sh clone-and-commit')
```

Returns exit code 0 for success, non-zero for failure.

## Troubleshooting

### Git Not Found
- Ensure Git is installed and in your system PATH
- Try running `git --version` in PowerShell to verify

### Bash Not Found
- Install Git for Windows (includes Git Bash)
- Or install WSL (Windows Subsystem for Linux)

### Permission Issues
- Run PowerShell as Administrator if needed
- Check that execution policy allows script execution

### Repository Access Issues
- For private repositories, set the `GITHUB_TOKEN` environment variable
- Ensure you have read/write access to the repository
- Check that the repository URL is correct

## Example Usage in Cypress

The integration is already set up in your test file. The script will run automatically after project creation. You can monitor the execution in the Cypress test runner logs.

If you need to run different commands or customize the behavior, modify the `cy.exec()` calls in the test file.