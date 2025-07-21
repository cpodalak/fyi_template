# FYI - Personal Website

[![CI/CD Pipeline](https://github.com/yourusername/fyi/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/yourusername/fyi/actions/workflows/ci-cd.yml)
[![CodeQL](https://github.com/yourusername/fyi/actions/workflows/codeql.yml/badge.svg)](https://github.com/yourusername/fyi/actions/workflows/codeql.yml)
[![Lighthouse CI](https://img.shields.io/badge/Lighthouse-100%2F100-brightgreen.svg)](https://github.com/yourusername/fyi/actions)
[![Deployment](https://img.shields.io/badge/Deployed-Live-brightgreen.svg)](https://yourusername.github.io/fyi)

A minimalistic yet elegant personal website built with Astro, TypeScript, and Tailwind CSS. Features blog functionality, project showcase, and Notion integration for dynamic content.

## 🚀 Live Demo

[View Live Site](https://yoursite.com) (Replace with your actual domain)

## ✨ Features

- **🏝️ Astro Islands Architecture** - Optimal performance with minimal JavaScript
- **📝 Content Collections** - Markdown-based articles and projects
- **🌓 Dark Mode** - Automatic theme switching based on system preference
- **📱 Responsive Design** - Mobile-first approach with Tailwind CSS
- **🔗 Notion Integration** - Dynamic learnings content from Notion API
- **🎨 Modern Design** - Clean, minimalist interface with smooth animations
- **♿ Accessible** - Keyboard navigable, semantic HTML, ARIA labels
- **⚡ Fast Performance** - Optimized for Core Web Vitals
- **📊 SEO Optimized** - Meta tags, Open Graph, structured data
- **📄 RSS Feed** - Syndicated content for articles

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) v5.12.1
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v3.4.0
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Content**: Markdown/MDX with Astro Content Collections
- **API Integration**: [Notion API](https://developers.notion.com/) via @notionhq/client
- **Typography**: Inter, EB Garamond, IBM Plex Mono
- **Testing**: [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/)
- **Code Quality**: ESLint, Prettier, Husky, Commitlint
- **CI/CD**: GitHub Actions with automated testing and deployment
- **Deployment**: Automated deployment to GitHub Pages via GitHub Actions

## 📁 Project Structure

```
src/
├── components/          # Reusable Astro components
│   ├── Layout.astro    # Main layout wrapper
│   ├── Header.astro    # Navigation header
│   ├── Footer.astro    # Site footer
│   ├── BaseHead.astro  # HTML head with SEO meta tags
│   ├── ArticleCard.astro # Article preview card
│   └── ProjectCard.astro # Project showcase card
├── content/            # Content collections
│   ├── articles/       # Blog posts (Markdown)
│   ├── projects/       # Project descriptions (Markdown)
│   └── config.ts       # Content schema definitions
├── lib/                # Utility functions
│   └── notion.ts       # Notion API client
├── pages/              # File-based routing
│   ├── index.astro     # Homepage
│   ├── articles/       # Blog section
│   │   ├── index.astro # Articles list
│   │   └── [slug].astro # Individual article
│   ├── projects.astro  # Projects showcase
│   ├── resume.astro    # Professional resume
│   ├── learnings.astro # Notion-powered learnings
│   └── rss.xml.js      # RSS feed generator
└── styles/             # Global styles
    └── global.css      # Tailwind base + custom styles

docs/                   # Documentation
├── README.md           # Documentation index
├── SETUP.md            # Repository setup
├── DEVELOPMENT.md      # Developer guide
└── USAGE.md            # Usage and deployment

scripts/                # Utility scripts
├── setup.mjs           # Project setup automation
├── health-check.mjs    # Health check utilities
└── generate.mjs        # Content generation helpers
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 8+
- Git

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fyi.git
   cd fyi
   ```

2. **Run setup script**
   ```bash
   npm run setup
   ```

   This will:
   - Install dependencies
   - Set up environment files
   - Configure Git hooks
   - Run initial validation

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit `http://localhost:4321`

### Manual Setup (Alternative)

If you prefer manual setup:

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Add your Notion credentials (optional):
   ```env
   NOTION_API_KEY=your_notion_integration_token
   NOTION_DATABASE_ID=your_notion_database_id
   SITE_URL=https://yoursite.com
   ```

3. **Set up Git hooks**
   ```bash
   npm run prepare
   ```

## 📝 Content Management

### Articles

Create new articles in `src/content/articles/`:

```markdown
---
title: "Your Article Title"
description: "Brief description of the article"
publishDate: 2024-01-15
tags: ["web development", "astro"]
featured: true
draft: false
---

# Your Article Content

Write your article content here using Markdown.
```

### Projects

Add projects in `src/content/projects/`:

```markdown
---
title: "Project Name"
description: "Project description"
tags: ["react", "typescript"]
githubUrl: "https://github.com/yourusername/project"
liveUrl: "https://project-demo.com"
featured: true
order: 1
---

Project details and documentation.
```

### Notion Integration (Optional)

To display dynamic learnings from Notion:

1. Create a Notion integration at [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Create a database with these properties:
   - **Title** (Title)
   - **Description** (Text)
   - **Tags** (Multi-select)
   - **URL** (URL)
   - **Published** (Checkbox)
   - **Created** (Created time)
3. Share your database with the integration
4. Add credentials to your `.env` file

## 🎨 Customization

### Fonts

Update font imports in `src/styles/global.css` and `tailwind.config.js`

### Colors

Modify the color palette in `tailwind.config.js` under `theme.extend.colors`

### Personal Information

Update these files with your information:
- `src/components/BaseHead.astro` - Meta tags and site info
- `src/components/Header.astro` - Navigation and name
- `src/components/Footer.astro` - Social links and contact
- `src/pages/resume.astro` - Professional experience
- `astro.config.mjs` - Site URL

## 🚀 Deployment

### GitHub Pages (Automated)

This project is configured for automated deployment to GitHub Pages via GitHub Actions:

1. **Push to main branch** - Triggers full CI/CD pipeline with tests and quality checks
2. **Pull requests** - Automatically deploy preview builds to `gh-pages-preview` branch
3. **Manual deploy** - Use the "Fast Deploy" workflow for quick deployments

#### Setup GitHub Pages:
1. Go to your repository **Settings** → **Pages**
2. Set source to **Deploy from a branch**
3. Select **gh-pages** branch
4. Your site will be available at `https://yourusername.github.io/repository-name`

#### Custom Domain (Optional):
1. Add your domain in the repository **Settings** → **Pages** → **Custom domain**
2. Update the `cname` field in `.github/workflows/ci-cd.yml`
3. Configure DNS records with your domain provider

### Manual Deployment

For other hosting platforms, build the site locally:

```bash
npm run build
```

The built site in `dist/` is a static website that can be hosted anywhere.

## 📊 Performance

This site is optimized for performance:

- **Minimal JavaScript** - Only loads when needed via Astro Islands
- **Optimized Images** - Responsive images with proper loading
- **Critical CSS** - Inline critical styles, load rest async
- **Font Loading** - Preload critical fonts, swap fallbacks
- **Bundle Splitting** - Code splitting for optimal loading

## 🧪 Development & Testing

This project follows modern development practices with comprehensive tooling:

### Code Quality
- **TypeScript** - Strict type checking
- **ESLint** - Code linting with Astro, React, and accessibility rules
- **Prettier** - Consistent code formatting
- **Husky** - Pre-commit hooks for quality assurance

### Testing
- **Vitest** - Fast unit testing with coverage reports
- **Playwright** - End-to-end testing across browsers
- **Testing Library** - Component testing utilities

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Quality Assurance
npm run lint             # Run all linting
npm run format           # Format code with Prettier
npm run type-check       # TypeScript type checking
npm run validate         # Run all quality checks

# Testing
npm run test             # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
npm run test:e2e         # Run end-to-end tests

# Utilities
npm run setup            # Initial project setup
npm run health-check     # Analyze project health
npm run commit           # Guided conventional commits
npm run clean            # Clean build artifacts
```

### Development Workflow

1. Make changes to the code
2. Tests and linting run automatically on commit
3. Push to GitHub triggers CI/CD pipeline
4. Pull requests get automatic preview deployments
5. Merging to main deploys to production

For detailed development guidelines, see [docs/](./docs/).

## 🚀 Quick Deploy

```bash
git add .
git commit -m "feat: update content"
git push origin main
# Site automatically deploys! 🚀
```

## 📚 Documentation

- **[Setup](./docs/SETUP.md)** - Repository setup and GitHub configuration
- **[Development](./docs/DEVELOPMENT.md)** - Developer guide and workflow
- **[Usage](./docs/USAGE.md)** - Customization and deployment

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Astro, TypeScript, and Tailwind CSS**
