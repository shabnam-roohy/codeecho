#!/bin/bash

# Git Test Helper Script for E2E Testing
set -e  # Exit on error

# Configuration
REPO_URL="${REPO_URL:-https://github.com/shabnam-roohy/test-1.git}"
REPO_DIR="${REPO_DIR:-$(pwd)/test-repo}"
GITHUB_TOKEN="${GITHUB_TOKEN:-}"

# Simple logging functions
print_success() {
    echo "✓ $1"
}

print_error() {
    echo "✗ $1"
}

print_info() {
    echo "ℹ $1"
}

# Clone repository
setup_repo() {
    # Remove existing directory if it exists
    if [ -d "$REPO_DIR" ]; then
        rm -rf "$REPO_DIR"
    fi
    
    # Clone fresh repository
    if [ -n "$GITHUB_TOKEN" ]; then
        REPO_WITH_TOKEN=$(echo "$REPO_URL" | sed "s|https://|https://${GITHUB_TOKEN}@|")
        git clone "$REPO_WITH_TOKEN" "$REPO_DIR"
    else
        git clone "$REPO_URL" "$REPO_DIR"
    fi
    
    cd "$REPO_DIR"
    print_success "Repository cloned"
}

# Add a new commit
add_commit() {
    local filename="test-file-$(date +%s).txt"
    local content="Test commit at $(date)"
    
    # Make sure we're in the correct directory
    if [ ! -d "$REPO_DIR" ]; then
        print_error "Repository directory not found: $REPO_DIR"
        exit 1
    fi
    
    cd "$REPO_DIR"
    
    # Remove all old test files first
    print_info "Cleaning up old test files..."
    git rm test-file-*.txt 2>/dev/null || true
    if [ -n "$(git status --porcelain)" ]; then
        git add -A
        git commit -m "Cleanup: Remove old test files"
        print_info "Old test files removed"
    fi
    
    # Create file and commit
    echo "$content" > "$filename"
    git config user.name "E2E Test Bot" 2>/dev/null || true
    git config user.email "e2e-test@example.com" 2>/dev/null || true
    git add "$filename"
    git commit -m "E2E Test commit: $filename"
    
    # Push to remote
    if [ -n "$GITHUB_TOKEN" ]; then
        REPO_WITH_TOKEN=$(echo "$REPO_URL" | sed "s|https://|https://${GITHUB_TOKEN}@|")
        git push "$REPO_WITH_TOKEN" HEAD
    else
        git push
    fi
    
    print_success "Commit pushed: $filename (old files cleaned up)"
}



# Cleanup - remove cloned repository
cleanup() {
    if [ -d "$REPO_DIR" ]; then
        rm -rf "$REPO_DIR"
        print_success "Repository removed"
    fi
}

# Main script logic
case "$1" in
    clone-and-commit)
        setup_repo
        add_commit
        cleanup
        print_success "Complete: cloned, committed, and cleaned up"
        ;;
    *)
        echo "Usage: $0 clone-and-commit"
        echo "This script will:"
        echo "1. Clone the repository"
        echo "2. Create and push a test commit"
        echo "3. Remove the cloned repository"
        exit 1
        ;;
esac