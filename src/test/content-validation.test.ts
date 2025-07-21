import fs from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';

// Content validation tests to ensure all fields defined in content are used in components
describe('Content Field Usage Validation', () => {
  const contentDir = path.join(process.cwd(), 'src/content');
  const componentsDir = path.join(process.cwd(), 'src/components');

  // Reading widget content validation
  it('should use all reading.json fields in ReadingWidget', async () => {
    const readingContentPath = path.join(contentDir, 'widgets/reading.json');
    const readingWidgetPath = path.join(componentsDir, 'ReadingWidget.astro');

    if (!fs.existsSync(readingContentPath) || !fs.existsSync(readingWidgetPath)) {
      return; // Skip if files don't exist
    }

    const readingContent = JSON.parse(fs.readFileSync(readingContentPath, 'utf-8'));
    const widgetCode = fs.readFileSync(readingWidgetPath, 'utf-8');

    // Check that reading widget uses the main structure fields
    expect(widgetCode).toContain('books.reading');
    expect(widgetCode).toContain('books.read');
    expect(widgetCode).toContain('books.wishlist');

    // Check book fields are used
    if (readingContent.reading && readingContent.reading.length > 0) {
      const bookFields = ['title', 'author', 'progress', 'tags', 'notes'];
      bookFields.forEach(field => {
        expect(widgetCode).toContain(`book.${field}`);
      });
    }

    if (readingContent.read && readingContent.read.length > 0) {
      const readBookFields = ['rating', 'completedDate', 'keyTakeaways'];
      readBookFields.forEach(field => {
        if (readingContent.read.some((book: any) => book[field])) {
          expect(widgetCode).toContain(`book.${field}`);
        }
      });
    }

    if (readingContent.wishlist && readingContent.wishlist.length > 0) {
      const wishlistFields = ['priority', 'reason', 'description'];
      wishlistFields.forEach(field => {
        if (readingContent.wishlist.some((book: any) => book[field])) {
          expect(widgetCode).toContain(`book.${field}`);
        }
      });
    }
  });

  // Gists widget content validation
  it('should use all gists.json fields in GistsWidget', async () => {
    const gistsContentPath = path.join(contentDir, 'widgets/gists.json');
    const gistsWidgetPath = path.join(componentsDir, 'GistsWidget.astro');

    if (!fs.existsSync(gistsContentPath) || !fs.existsSync(gistsWidgetPath)) {
      return;
    }

    const gistsContent = JSON.parse(fs.readFileSync(gistsContentPath, 'utf-8'));
    const widgetCode = fs.readFileSync(gistsWidgetPath, 'utf-8');

    // Check that gists widget uses the main structure
    expect(widgetCode).toContain('gistsData?.data');
    expect(widgetCode).toContain('gists.length');

    // Check gist fields are used
    if (gistsContent.featured && gistsContent.featured.length > 0) {
      const gistFields = ['title', 'description', 'language', 'url', 'files', 'updatedAt'];
      gistFields.forEach(field => {
        expect(widgetCode).toContain(`gist.${field}`);
      });
    }
  });

  // Templates widget content validation
  it('should use all templates.json fields in TemplatesWidget', async () => {
    const templatesContentPath = path.join(contentDir, 'widgets/templates.json');
    const templatesWidgetPath = path.join(componentsDir, 'TemplatesWidget.astro');

    if (!fs.existsSync(templatesContentPath) || !fs.existsSync(templatesWidgetPath)) {
      return;
    }

    const templatesContent = JSON.parse(fs.readFileSync(templatesContentPath, 'utf-8'));
    const widgetCode = fs.readFileSync(templatesWidgetPath, 'utf-8');

    // Check that templates widget uses the main structure
    expect(widgetCode).toContain('templatesData?.data');
    expect(widgetCode).toContain('templates.length');

    // Check template fields are used
    if (templatesContent.featured && templatesContent.featured.length > 0) {
      const templateFields = ['title', 'description', 'category', 'tags', 'content'];
      templateFields.forEach(field => {
        expect(widgetCode).toContain(`template.${field}`);
      });
    }
  });

  // Contact widget content validation
  it('should use all contact.json fields in ContactWidget', async () => {
    const contactContentPath = path.join(contentDir, 'widgets/contact.json');
    const contactWidgetPath = path.join(componentsDir, 'ContactWidget.astro');

    if (!fs.existsSync(contactContentPath) || !fs.existsSync(contactWidgetPath)) {
      return;
    }

    const contactContent = JSON.parse(fs.readFileSync(contactContentPath, 'utf-8'));
    const widgetCode = fs.readFileSync(contactWidgetPath, 'utf-8');

    // Check that contact widget uses the main structure
    expect(widgetCode).toContain('contactData?.data');
    expect(widgetCode).toContain('contact.title');

    // Check contact fields are used
    if (contactContent.methods && contactContent.methods.length > 0) {
      const methodFields = ['type', 'href', 'label'];
      methodFields.forEach(field => {
        expect(widgetCode).toContain(`method.${field}`);
      });
    }

    if (contactContent.organizations && contactContent.organizations.length > 0) {
      const orgFields = ['name', 'role'];
      orgFields.forEach(field => {
        expect(widgetCode).toContain(`org.${field}`);
      });
    }
  });

  // Site config validation
  it('should use site.json fields in Header component', async () => {
    const siteConfigPath = path.join(contentDir, 'config/site.json');
    const headerPath = path.join(componentsDir, 'Header.astro');

    if (!fs.existsSync(siteConfigPath) || !fs.existsSync(headerPath)) {
      return;
    }

    const siteConfig = JSON.parse(fs.readFileSync(siteConfigPath, 'utf-8'));
    const headerCode = fs.readFileSync(headerPath, 'utf-8');

    // Check that header uses site config
    expect(headerCode).toContain('siteConfig?.data');
    expect(headerCode).toContain('navigation');

    // Check navigation fields are used
    if (siteConfig.navigation && siteConfig.navigation.header) {
      const navFields = ['href', 'label'];
      navFields.forEach(field => {
        expect(headerCode).toContain(`item.${field}`);
      });
    }
  });

  // Profile data validation
  it('should use profile.json fields in Header component', async () => {
    const profilePath = path.join(contentDir, 'profile/main.json');
    const headerPath = path.join(componentsDir, 'Header.astro');

    if (!fs.existsSync(profilePath) || !fs.existsSync(headerPath)) {
      return;
    }

    const profileData = JSON.parse(fs.readFileSync(profilePath, 'utf-8'));
    const headerCode = fs.readFileSync(headerPath, 'utf-8');

    // Check that header uses profile data
    expect(headerCode).toContain('profileData?.data');

    // Check name field is used
    if (profileData.name) {
      expect(headerCode).toContain('siteName');
    }
  });

  // Validate default fallbacks exist
  it('should have default fallbacks for all widgets', async () => {
    const widgetFiles = [
      'ReadingWidget.astro',
      'GistsWidget.astro',
      'TemplatesWidget.astro',
      'ContactWidget.astro'
    ];

    widgetFiles.forEach(widgetFile => {
      const widgetPath = path.join(componentsDir, widgetFile);
      if (fs.existsSync(widgetPath)) {
        const widgetCode = fs.readFileSync(widgetPath, 'utf-8');

        // Check for default fallback data
        expect(widgetCode).toMatch(/default\w+/);
        expect(widgetCode).toContain('||');

        // Check for empty state handling
        expect(widgetCode).toMatch(/\.length > 0|\.length === 0|No .+ available/);
      }
    });
  });

  // Validate content structure matches schema
  it('should validate content files have expected structure', async () => {
    const contentFiles = [
      { path: 'widgets/reading.json', requiredFields: ['reading', 'read', 'wishlist'] },
      { path: 'widgets/gists.json', requiredFields: ['featured'] },
      { path: 'widgets/templates.json', requiredFields: ['featured'] },
      { path: 'widgets/contact.json', requiredFields: ['title', 'methods'] },
      { path: 'config/site.json', requiredFields: ['navigation'] },
      { path: 'profile/main.json', requiredFields: ['name'] }
    ];

    contentFiles.forEach(({ path: filePath, requiredFields }) => {
      const fullPath = path.join(contentDir, filePath);
      if (fs.existsSync(fullPath)) {
        const content = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));

        requiredFields.forEach(field => {
          expect(content).toHaveProperty(field);
        });
      }
    });
  });

  // Validate no hardcoded sample data bypasses content system
  it('should not contain hardcoded arrays in widget components', async () => {
    const widgetFiles = [
      'ReadingWidget.astro',
      'GistsWidget.astro',
      'TemplatesWidget.astro',
      'ContactWidget.astro'
    ];

    widgetFiles.forEach(widgetFile => {
      const widgetPath = path.join(componentsDir, widgetFile);
      if (fs.existsSync(widgetPath)) {
        const widgetCode = fs.readFileSync(widgetPath, 'utf-8');

        // Should use content collections
        expect(widgetCode).toMatch(/getEntry.*content/);

        // Should have proper fallback pattern with content being used first
        expect(widgetCode).toMatch(/\|\| default\w+|fallback/);

        // Check that there are no hardcoded sample objects (with numbered IDs indicating sample data)
        expect(widgetCode).not.toMatch(/id:\s*[1-9]/);

        // Should not have hardcoded non-fallback data that looks like sample content
        // (Allow simple fallback titles but not complex hardcoded content)
        if (!widgetCode.includes('defaultContact') && !widgetCode.includes('Fallback')) {
          expect(widgetCode).not.toMatch(/title:\s*["'][A-Z][^"']{15,}["']/);
        }
      }
    });
  });
});
