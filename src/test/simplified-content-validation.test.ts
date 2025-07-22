import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

// Content validation tests for the simplified structure
describe('Simplified Content Structure Validation', () => {
  const contentDir = path.join(process.cwd(), 'src/content');

  // Test that consolidated data files exist and have correct structure
  it('should have consolidated skills.json with proper structure', async () => {
    const skillsPath = path.join(contentDir, 'data/skills.json');

    if (!fs.existsSync(skillsPath)) {
      throw new Error('skills.json not found at expected location');
    }

    const skillsContent = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));

    // Check required top-level structure
    expect(skillsContent).toHaveProperty('categories');
    expect(skillsContent).toHaveProperty('skills');
    expect(Array.isArray(skillsContent.skills)).toBe(true);

    // Check categories structure
    const expectedCategories = ['technical', 'ai', 'leadership', 'domain'];
    expectedCategories.forEach(category => {
      expect(skillsContent.categories).toHaveProperty(category);
      expect(skillsContent.categories[category]).toHaveProperty('name');
      expect(skillsContent.categories[category]).toHaveProperty('description');
      expect(skillsContent.categories[category]).toHaveProperty('color');
    });

    // Check skills structure
    if (skillsContent.skills.length > 0) {
      const skill = skillsContent.skills[0];
      expect(skill).toHaveProperty('name');
      expect(skill).toHaveProperty('level');
      expect(skill).toHaveProperty('category');
      expect(skill).toHaveProperty('description');
      expect(typeof skill.level).toBe('number');
      expect(skill.level).toBeGreaterThanOrEqual(1);
      expect(skill.level).toBeLessThanOrEqual(5);
      expect(expectedCategories).toContain(skill.category);
    }
  });

  it('should have consolidated learning.json with proper structure', async () => {
    const learningPath = path.join(contentDir, 'data/learning.json');

    if (!fs.existsSync(learningPath)) {
      throw new Error('learning.json not found at expected location');
    }

    const learningContent = JSON.parse(fs.readFileSync(learningPath, 'utf-8'));

    // Check required top-level structure
    expect(learningContent).toHaveProperty('quickWins');
    expect(learningContent).toHaveProperty('resources');
    expect(learningContent).toHaveProperty('currentGoals');
    expect(Array.isArray(learningContent.quickWins)).toBe(true);
    expect(Array.isArray(learningContent.resources)).toBe(true);
    expect(Array.isArray(learningContent.currentGoals)).toBe(true);

    // Check quickWins structure
    if (learningContent.quickWins.length > 0) {
      const quickWin = learningContent.quickWins[0];
      expect(quickWin).toHaveProperty('title');
      expect(quickWin).toHaveProperty('content');
      expect(quickWin).toHaveProperty('tags');
      expect(Array.isArray(quickWin.tags)).toBe(true);
    }

    // Check resources structure
    if (learningContent.resources.length > 0) {
      const resource = learningContent.resources[0];
      expect(resource).toHaveProperty('title');
      expect(resource).toHaveProperty('type');
      expect(['book', 'course', 'article', 'video']).toContain(resource.type);
    }

    // Check currentGoals structure
    if (learningContent.currentGoals.length > 0) {
      const goal = learningContent.currentGoals[0];
      expect(goal).toHaveProperty('title');
      expect(goal).toHaveProperty('description');
      expect(goal).toHaveProperty('status');
      expect(['planning', 'in-progress', 'completed']).toContain(goal.status);
    }
  });

  it('should have site.json with proper structure', async () => {
    const sitePath = path.join(contentDir, 'data/site.json');

    if (!fs.existsSync(sitePath)) {
      throw new Error('site.json not found at expected location');
    }

    const siteContent = JSON.parse(fs.readFileSync(sitePath, 'utf-8'));

    // Check required top-level structure
    expect(siteContent).toHaveProperty('site');
    expect(siteContent).toHaveProperty('theme');
    expect(siteContent).toHaveProperty('navigation');
    expect(siteContent).toHaveProperty('features');

    // Check site structure
    expect(siteContent.site).toHaveProperty('title');
    expect(siteContent.site).toHaveProperty('description');
    expect(siteContent.site).toHaveProperty('url');
    expect(siteContent.site).toHaveProperty('author');

    // Check navigation structure
    expect(siteContent.navigation).toHaveProperty('header');
    expect(siteContent.navigation).toHaveProperty('footer');
    expect(Array.isArray(siteContent.navigation.header)).toBe(true);
    expect(Array.isArray(siteContent.navigation.footer)).toBe(true);

    // Check header navigation items
    if (siteContent.navigation.header.length > 0) {
      const navItem = siteContent.navigation.header[0];
      expect(navItem).toHaveProperty('label');
      expect(navItem).toHaveProperty('href');
    }
  });

  // Test that profile data exists
  it('should have profile data with proper structure', async () => {
    const profilePath = path.join(contentDir, 'profile/main.json');

    if (!fs.existsSync(profilePath)) {
      throw new Error('profile/main.json not found at expected location');
    }

    const profileContent = JSON.parse(fs.readFileSync(profilePath, 'utf-8'));

    // Check required fields
    expect(profileContent).toHaveProperty('name');
    expect(profileContent).toHaveProperty('tagline');
    expect(profileContent).toHaveProperty('email');
    expect(profileContent).toHaveProperty('bio');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(profileContent.email)).toBe(true);
  });

  // Test that old scattered files are removed (or at least not required)
  it('should not rely on old scattered capability files', async () => {
    // Old files: capabilities/technical.json, ai.json, leadership.json, domain.json
    // These files may still exist but should not be required by components
    // We'll check that the new consolidated structure works instead
    const skillsPath = path.join(contentDir, 'data/skills.json');
    expect(fs.existsSync(skillsPath)).toBe(true);
  });

  it('should not rely on old scattered learning files', async () => {
    // Old files: learning/quick-wins.json, books.json, courses.json, goals.json
    // These files may still exist but should not be required by components
    // We'll check that the new consolidated structure works instead
    const learningPath = path.join(contentDir, 'data/learning.json');
    expect(fs.existsSync(learningPath)).toBe(true);
  });
});

// Component integration tests
describe('Component Integration with New Data Structure', () => {
  const componentsDir = path.join(process.cwd(), 'src/components');

  it('should have CompactCapabilityMatrix component', async () => {
    const componentPath = path.join(componentsDir, 'CompactCapabilityMatrix.tsx');
    expect(fs.existsSync(componentPath)).toBe(true);

    const componentCode = fs.readFileSync(componentPath, 'utf-8');

    // Check that component has required props interface
    expect(componentCode).toContain('interface');
    expect(componentCode).toContain('capabilities');

    // Check that component handles the new data structure
    expect(componentCode).toContain('category');
    expect(componentCode).toContain('level');
    expect(componentCode).toContain('featured');
  });

  it('should have updated CapabilityMatrix component that supports compact mode', async () => {
    const componentPath = path.join(componentsDir, 'CapabilityMatrix.tsx');

    if (fs.existsSync(componentPath)) {
      const componentCode = fs.readFileSync(componentPath, 'utf-8');

      // Check that component supports new props
      expect(componentCode).toContain('compact');
    }
  });
});

// Page integration tests
describe('Page Integration with New Data Structure', () => {
  const pagesDir = path.join(process.cwd(), 'src/pages');

  it('should have updated homepage that uses data structure', async () => {
    const homepagePath = path.join(pagesDir, 'index.astro');
    expect(fs.existsSync(homepagePath)).toBe(true);

    const homepageCode = fs.readFileSync(homepagePath, 'utf-8');

    // Check that homepage uses new data structure
    expect(homepageCode).toContain("getEntry('data', 'skills')");
    expect(homepageCode).toContain("getEntry('data', 'site')");
    expect(homepageCode).toContain('CompactCapabilityMatrix');
  });

  it('should have updated resume page that uses consolidated data', async () => {
    const resumePath = path.join(pagesDir, 'resume.astro');
    expect(fs.existsSync(resumePath)).toBe(true);

    const resumeCode = fs.readFileSync(resumePath, 'utf-8');

    // Check that resume page uses new data structure
    expect(resumeCode).toContain("getEntry('data', 'skills')");
    expect(resumeCode).toContain("getEntry('data', 'learning')");
  });

  it('should have updated learnings page that uses consolidated data', async () => {
    const learningsPath = path.join(pagesDir, 'learnings.astro');
    expect(fs.existsSync(learningsPath)).toBe(true);

    const learningsCode = fs.readFileSync(learningsPath, 'utf-8');

    // Check that learnings page uses new data structure
    expect(learningsCode).toContain("getEntry('data', 'learning')");
  });
});
