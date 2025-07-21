#!/usr/bin/env node

/**
 * Development setup script
 * Runs various checks and setups for development environment
 */

import { execSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function runCommand(command, description) {
  try {
    log(`🔄 ${description}...`, colors.blue);
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} completed`, colors.green);
    return true;
  } catch (error) {
    log(`❌ ${description} failed`, colors.red);
    console.error(error.message);
    return false;
  }
}

function checkFile(filePath, description) {
  if (existsSync(filePath)) {
    log(`✅ ${description} exists`, colors.green);
    return true;
  } else {
    log(`❌ ${description} missing`, colors.red);
    return false;
  }
}

function createEnvExample() {
  const envExample = `# Site Configuration
SITE_URL=http://localhost:4321

# Notion Integration (Optional)
NOTION_API_KEY=your_notion_integration_token
NOTION_DATABASE_ID=your_notion_database_id

# Analytics (Optional)
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
PLAUSIBLE_DOMAIN=yourdomain.com

# Development
NODE_ENV=development
`;

  if (!existsSync('.env.example')) {
    writeFileSync('.env.example', envExample);
    log('✅ Created .env.example', colors.green);
  }

  if (!existsSync('.env')) {
    writeFileSync('.env', envExample);
    log('✅ Created .env from example', colors.green);
  }
}

async function main() {
  log('🚀 Setting up development environment...', colors.bright);
  console.log();

  // Check Node.js version
  const nodeVersion = process.version;
  log(`Node.js version: ${nodeVersion}`, colors.cyan);

  if (parseInt(nodeVersion.slice(1)) < 18) {
    log('❌ Node.js 18+ is required', colors.red);
    process.exit(1);
  }

  // Create environment files
  createEnvExample();

  // Check important files
  const files = [
    ['.eslintrc.cjs', 'ESLint configuration'],
    ['.prettierrc.json', 'Prettier configuration'],
    ['tsconfig.json', 'TypeScript configuration'],
    ['tailwind.config.js', 'Tailwind configuration'],
    ['astro.config.mjs', 'Astro configuration'],
  ];

  files.forEach(([file, desc]) => checkFile(file, desc));

  // Install dependencies
  if (!runCommand('npm install', 'Installing dependencies')) {
    process.exit(1);
  }

  // Setup Husky
  if (!runCommand('npm run prepare', 'Setting up Git hooks')) {
    log('⚠️  Git hooks setup failed - this is optional', colors.yellow);
  }

  // Run type checking
  runCommand('npm run type-check', 'Type checking');

  // Run linting
  runCommand('npm run lint', 'Linting code');

  // Run tests
  runCommand('npm run test', 'Running tests');

  console.log();
  log('🎉 Development environment setup complete!', colors.green);
  log('📝 Available commands:', colors.bright);
  console.log();
  log('  npm run dev          - Start development server', colors.cyan);
  log('  npm run build        - Build for production', colors.cyan);
  log('  npm run test         - Run unit tests', colors.cyan);
  log('  npm run test:e2e     - Run end-to-end tests', colors.cyan);
  log('  npm run lint         - Lint code', colors.cyan);
  log('  npm run format       - Format code', colors.cyan);
  log('  npm run validate     - Run all checks', colors.cyan);
  console.log();
}

main().catch(console.error);
