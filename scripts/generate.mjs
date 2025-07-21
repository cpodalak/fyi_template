#!/usr/bin/env node

/**
 * Content generator script
 * Helps create new articles and projects with proper frontmatter
 */

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { slugify } from './utils.mjs';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function createArticle(title, description, tags = []) {
  const slug = slugify(title);
  const date = new Date().toISOString().split('T')[0];

  const frontmatter = `---
title: "${title}"
description: "${description}"
publishDate: ${date}
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
featured: false
draft: true
---

# ${title}

${description}

## Introduction

Write your article content here...

## Conclusion

Summarize your key points here...
`;

  const articleDir = 'src/content/articles';
  if (!existsSync(articleDir)) {
    mkdirSync(articleDir, { recursive: true });
  }

  const filepath = join(articleDir, `${slug}.md`);

  if (existsSync(filepath)) {
    log(`❌ Article "${slug}.md" already exists`, colors.red);
    return false;
  }

  writeFileSync(filepath, frontmatter);
  log(`✅ Created article: ${filepath}`, colors.green);
  return true;
}

function createProject(title, description, tags = [], githubUrl = '', liveUrl = '') {
  const slug = slugify(title);

  const frontmatter = `---
title: "${title}"
description: "${description}"
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
githubUrl: "${githubUrl}"
liveUrl: "${liveUrl}"
featured: false
order: 1
---

# ${title}

${description}

## Overview

Describe your project here...

## Technologies Used

- Technology 1
- Technology 2
- Technology 3

## Key Features

- Feature 1
- Feature 2
- Feature 3

## Installation

\`\`\`bash
# Clone the repository
git clone ${githubUrl}

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

## Usage

Explain how to use your project...

## Contributing

Guidelines for contributing to this project...
`;

  const projectDir = 'src/content/projects';
  if (!existsSync(projectDir)) {
    mkdirSync(projectDir, { recursive: true });
  }

  const filepath = join(projectDir, `${slug}.md`);

  if (existsSync(filepath)) {
    log(`❌ Project "${slug}.md" already exists`, colors.red);
    return false;
  }

  writeFileSync(filepath, frontmatter);
  log(`✅ Created project: ${filepath}`, colors.green);
  return true;
}

function showHelp() {
  console.log(`
${colors.bright}Content Generator${colors.reset}

Usage:
  node scripts/generate.mjs article "Title" "Description" tag1,tag2,tag3
  node scripts/generate.mjs project "Title" "Description" tag1,tag2,tag3 [github-url] [live-url]

Examples:
  node scripts/generate.mjs article "Building with Astro" "Learn how to build modern websites" web,astro,typescript
  node scripts/generate.mjs project "Todo App" "A simple todo application" react,typescript https://github.com/user/todo https://todo-demo.com

Options:
  article  - Create a new article
  project  - Create a new project
  help     - Show this help message
`);
}

function main() {
  const [,, type, title, description, tagsString, ...urls] = process.argv;

  if (!type || type === 'help') {
    showHelp();
    return;
  }

  if (!title || !description) {
    log('❌ Title and description are required', colors.red);
    showHelp();
    return;
  }

  const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()) : [];

  switch (type) {
    case 'article':
      createArticle(title, description, tags);
      break;
    case 'project':
      const [githubUrl = '', liveUrl = ''] = urls;
      createProject(title, description, tags, githubUrl, liveUrl);
      break;
    default:
      log(`❌ Unknown type: ${type}`, colors.red);
      showHelp();
  }
}

main();
