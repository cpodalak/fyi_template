#!/usr/bin/env node

/**
 * Data Layer Demo Script
 * Demonstrates the framework-agnostic data layer functionality
 */

// Since we're in Node.js, we'll simulate the data layer functionality
import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import { resolve } from 'path';

// Simple YAML loader for demo
function loadYaml(filename) {
  try {
    const filePath = resolve(process.cwd(), 'src/data/yaml', filename);
    const content = readFileSync(filePath, 'utf-8');
    return yaml.load(content);
  } catch (error) {
    console.log(`Note: ${filename} not found, using fallback data`);
    return null;
  }
}

console.log('🚀 Data Layer Demo\n');

// Show available YAML files
console.log('� Available YAML Data Files:');
const yamlFiles = [
  'personal.yml',
  'homepage.yml',
  'site-config.yml',
  'navigation.yml',
  'projects.yml',
  'widgets.yml',
  'learning.yml',
];

yamlFiles.forEach(file => {
  const data = loadYaml(file);
  const status = data ? '✅' : '❌';
  console.log(`  ${status} ${file}`);
});

console.log('\n📊 Sample Data Structure:');

// Load personal data
const personalData = loadYaml('personal.yml');
if (personalData?.personal) {
  console.log('👤 Personal Info:');
  console.log(`  Name: ${personalData.personal.name}`);
  console.log(`  Email: ${personalData.personal.email}`);
  console.log(`  Social Links: ${personalData.social?.length || 0} platforms`);
}

// Load homepage data
const homepageData = loadYaml('homepage.yml');
if (homepageData?.hero) {
  console.log('\n🏠 Homepage:');
  console.log(`  Headline: ${homepageData.hero.headline?.replace(/<[^>]*>/g, '') || 'N/A'}`);
  console.log(`  CTA Primary: ${homepageData.hero.ctaButtons?.primary?.text || 'N/A'}`);
}

// Load projects data
const projectsData = loadYaml('projects.yml');
if (projectsData?.projects) {
  console.log('\n🛠️ Projects:');
  console.log(`  Total Projects: ${projectsData.projects.length}`);
  const featured = projectsData.projects.filter(p => p.featured);
  console.log(`  Featured Projects: ${featured.length}`);
  if (projectsData.projects.length > 0) {
    console.log(`  Latest: ${projectsData.projects[0].title}`);
  }
}

// Load site config
const siteConfig = loadYaml('site-config.yml');
if (siteConfig?.meta) {
  console.log('\n⚙️ Site Configuration:');
  console.log(`  Title: ${siteConfig.meta.title}`);
  console.log(`  Theme: ${siteConfig.theme?.defaultTheme || 'system'}`);
}

console.log('\n🎯 Data Layer Features:');
console.log('  ✅ Framework Agnostic - Works with any frontend');
console.log('  ✅ Easy Authoring - Human-readable YAML files');
console.log('  ✅ Type Safe - TypeScript validation');
console.log('  ✅ Version Controlled - All content in Git');
console.log('  ✅ Migration Ready - Portable to Next.js, SvelteKit, etc.');

console.log('\n� Content Editing:');
console.log('  1. Edit YAML files in src/data/yaml/');
console.log('  2. Changes are automatically reflected in the site');
console.log('  3. Non-technical users can edit content easily');
console.log('  4. Developers can extend with TypeScript');

console.log('\n🚀 Migration Ready:');
console.log('  • Next.js: Copy src/data/ → Use in getStaticProps');
console.log('  • SvelteKit: Copy src/data/ → Use in load functions');
console.log('  • Vue/Nuxt: Copy src/data/ → Use in composables');
console.log('  • Any framework: Export as JSON → Import anywhere');

console.log('\n📚 Documentation:');
console.log('  • docs/CONTENT-MANAGEMENT.md - For content authors');
console.log('  • docs/DEVELOPMENT.md - For developers');
console.log('  • docs/MIGRATION.md - For framework migration');

console.log('\n✅ Data layer demo complete!');
console.log('\nTry editing a YAML file and running `npm run dev` to see changes.');
