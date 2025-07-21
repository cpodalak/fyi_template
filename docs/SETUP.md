# Setup Guide

Quick repository setup and GitHub configuration.

## 🔧 GitHub Setup

### 1. Enable GitHub Pages
1. Go to repository **Settings** → **Pages**
2. Set **Source** to "Deploy from a branch"
3. Select **gh-pages** branch
4. Click **Save**

### 2. Repository Permissions
Go to **Settings** → **Actions** → **General**:
- **Actions permissions**: Allow all actions
- **Workflow permissions**: Read and write permissions
- Check: "Allow GitHub Actions to create and approve pull requests"

### 3. Environment Variables (Optional)
Add in **Settings** → **Secrets and variables** → **Actions**:

```bash
# Notion API (optional)
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id

# Lighthouse CI (optional)
LHCI_GITHUB_APP_TOKEN=your_lighthouse_ci_token

# Security scanning (optional)
SNYK_TOKEN=your_snyk_token
```

## 🚀 Quick Start

1. **Fork/clone** this repository
2. **Enable GitHub Pages** (steps above)
3. **Push to main** branch → automatic deployment
4. **Access your site**: `https://yourusername.github.io/repository-name`

That's it! 🎉
