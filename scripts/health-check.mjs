#!/usr/bin/env node

/**
 * Project health check script
 * Analyzes the project for potential issues and improvements
 */

import { execSync } from 'child_process';
import { readFileSync, statSync } from 'fs';
import { glob } from 'glob';

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

class HealthChecker {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.successes = [];
  }

  addIssue(message) {
    this.issues.push(message);
  }

  addWarning(message) {
    this.warnings.push(message);
  }

  addSuccess(message) {
    this.successes.push(message);
  }

  checkPackageJson() {
    try {
      const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

      if (!pkg.description) {
        this.addWarning('Package.json missing description');
      } else {
        this.addSuccess('Package.json has description');
      }

      if (!pkg.keywords || pkg.keywords.length === 0) {
        this.addWarning('Package.json missing keywords');
      } else {
        this.addSuccess('Package.json has keywords');
      }

      if (!pkg.repository) {
        this.addWarning('Package.json missing repository');
      } else {
        this.addSuccess('Package.json has repository');
      }

      if (!pkg.license) {
        this.addWarning('Package.json missing license');
      } else {
        this.addSuccess('Package.json has license');
      }

      // Check for security vulnerabilities
      try {
        execSync('npm audit --audit-level high', { stdio: 'pipe' });
        this.addSuccess('No high/critical security vulnerabilities found');
      } catch (error) {
        this.addIssue('Security vulnerabilities found - run `npm audit fix`');
      }
    } catch (error) {
      this.addIssue('Failed to read package.json');
    }
  }

  checkDependencies() {
    try {
      const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };

      // Check for outdated dependencies
      try {
        const outdated = execSync('npm outdated --json', { stdio: 'pipe', encoding: 'utf8' });
        const outdatedPackages = JSON.parse(outdated || '{}');

        if (Object.keys(outdatedPackages).length > 0) {
          this.addWarning(`${Object.keys(outdatedPackages).length} outdated dependencies found`);
        } else {
          this.addSuccess('All dependencies are up to date');
        }
      } catch (error) {
        // npm outdated exits with code 1 when there are outdated packages
        if (error.stdout) {
          const outdatedPackages = JSON.parse(error.stdout || '{}');
          this.addWarning(`${Object.keys(outdatedPackages).length} outdated dependencies found`);
        }
      }
    } catch (error) {
      this.addWarning('Could not check dependency status');
    }
  }

  checkCodeQuality() {
    // Check TypeScript files
    const tsFiles = glob.sync('src/**/*.{ts,tsx}').length;
    const jsFiles = glob.sync('src/**/*.{js,jsx}').length;

    if (tsFiles > 0) {
      this.addSuccess(`${tsFiles} TypeScript files found`);
    }

    if (jsFiles > 0) {
      this.addWarning(`${jsFiles} JavaScript files found - consider migrating to TypeScript`);
    }

    // Check for TODO comments
    const allFiles = glob.sync('src/**/*.{ts,tsx,js,jsx,astro}');
    let todoCount = 0;

    allFiles.forEach(file => {
      try {
        const content = readFileSync(file, 'utf8');
        const todos = content.match(/TODO|FIXME|HACK/gi);
        if (todos) {
          todoCount += todos.length;
        }
      } catch (error) {
        // Ignore files that can't be read
      }
    });

    if (todoCount > 0) {
      this.addWarning(`${todoCount} TODO/FIXME/HACK comments found`);
    } else {
      this.addSuccess('No TODO comments found');
    }
  }

  checkTestCoverage() {
    const testFiles = glob.sync('src/**/*.{test,spec}.{ts,tsx,js,jsx}').length;
    const sourceFiles = glob.sync('src/**/*.{ts,tsx,js,jsx}', {
      ignore: ['src/**/*.{test,spec}.*', 'src/test/**/*'],
    }).length;

    if (testFiles === 0) {
      this.addIssue('No test files found');
    } else {
      const ratio = testFiles / sourceFiles;
      if (ratio < 0.3) {
        this.addWarning(
          `Low test coverage: ${testFiles} test files for ${sourceFiles} source files`
        );
      } else {
        this.addSuccess(
          `Good test coverage: ${testFiles} test files for ${sourceFiles} source files`
        );
      }
    }
  }

  checkBuildSize() {
    try {
      // Check if dist exists and get size
      const distStat = statSync('dist');
      if (distStat.isDirectory()) {
        // Get rough size estimate
        const sizeOutput = execSync('du -sh dist', { encoding: 'utf8' });
        const size = sizeOutput.split('\t')[0];
        this.addSuccess(`Build size: ${size}`);
      }
    } catch (error) {
      this.addWarning('No build found - run `npm run build` to check build size');
    }
  }

  checkAccessibility() {
    // Check for accessibility-related dependencies
    try {
      const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

      if (allDeps['eslint-plugin-jsx-a11y']) {
        this.addSuccess('Accessibility linting is configured');
      } else {
        this.addWarning('Consider adding eslint-plugin-jsx-a11y for accessibility linting');
      }
    } catch (error) {
      // Ignore
    }
  }

  printReport() {
    console.log();
    log('📊 Project Health Report', colors.bright);
    console.log('='.repeat(50));
    console.log();

    if (this.successes.length > 0) {
      log('✅ Successes:', colors.green);
      this.successes.forEach(success => log(`  • ${success}`, colors.green));
      console.log();
    }

    if (this.warnings.length > 0) {
      log('⚠️  Warnings:', colors.yellow);
      this.warnings.forEach(warning => log(`  • ${warning}`, colors.yellow));
      console.log();
    }

    if (this.issues.length > 0) {
      log('❌ Issues:', colors.red);
      this.issues.forEach(issue => log(`  • ${issue}`, colors.red));
      console.log();
    }

    // Overall score
    const total = this.successes.length + this.warnings.length + this.issues.length;
    const score = total > 0 ? Math.round((this.successes.length / total) * 100) : 0;

    let scoreColor = colors.red;
    if (score >= 80) scoreColor = colors.green;
    else if (score >= 60) scoreColor = colors.yellow;

    log(`Overall Health Score: ${score}%`, scoreColor);
    console.log();

    if (this.issues.length === 0 && this.warnings.length === 0) {
      log('🎉 Your project is in excellent health!', colors.green);
    } else if (this.issues.length === 0) {
      log(
        '👍 Your project is in good health with some minor improvements possible.',
        colors.yellow
      );
    } else {
      log('🔧 Your project needs some attention to improve its health.', colors.red);
    }
  }

  async run() {
    log('🔍 Analyzing project health...', colors.blue);
    console.log();

    this.checkPackageJson();
    this.checkDependencies();
    this.checkCodeQuality();
    this.checkTestCoverage();
    this.checkBuildSize();
    this.checkAccessibility();

    this.printReport();
  }
}

const checker = new HealthChecker();
checker.run().catch(console.error);
