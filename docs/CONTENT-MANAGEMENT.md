# Content Management Guide

A non-technical guide to managing your website content using Astro Content Collections.

## 🎯 Overview

Your website content is now stored in JSON and Markdown files located in `src/content/`. You can edit these files using any text editor, including GitHub's web interface, without any technical knowledge.

## 📝 Available Content Files

### Personal Information (`src/content/profile/main.json`)
Your basic information and social media links.

```json
{
  "name": "Your Name",
  "tagline": "Systems Engineer + AI Enabler",
  "email": "your.email@example.com",
  "website": "https://yoursite.com",
  "location": "San Francisco, CA"
  bio: |
    Your professional bio here.
    Can span multiple lines.
  avatar: "/avatar.jpg"

social:
  - platform: "GitHub"
    url: "https://github.com/yourusername"
    handle: "@yourusername"
    icon: "github"
```

### Homepage Content (`homepage.yml`)
The main landing page content.

```yaml
hero:
  headline: "Hello, I'm <span class='text-blue-600'>Your Name</span>"
  subheadline: "Developer & Designer"
  description: |
    Welcome message and brief introduction.
  ctaButtons:
    primary:
      text: "View My Work"
      href: "/projects"
    secondary:
      text: "Read My Articles"
      href: "/articles"

quickStats:
  - label: "Years Experience"
    value: "8+"
    description: "Building software solutions"
    icon: "calendar"
```

### Projects (`projects.yml`)
Your portfolio projects.

```yaml
projects:
  - title: "E-Commerce Dashboard"
    description: "Modern analytics dashboard for e-commerce businesses"
    category: "web-app"
    tags: ["react", "typescript", "tailwind"]
    status: "completed"
    featured: true
    url: "https://project-url.com"
    github: "https://github.com/username/project"
    tech: ["React", "TypeScript", "Next.js"]
    startDate: "2024-01-15"
    endDate: "2024-03-20"
```

### Navigation (`navigation.yml`)
Website navigation menus.

```yaml
header:
  logo:
    text: "Your Name"
    href: "/"
  menu:
    - label: "Articles"
      href: "/articles"
      description: "Technical writing and insights"
    - label: "Projects"
      href: "/projects"
      description: "Portfolio of work"
```

### Site Configuration (`site-config.yml`)
Website settings and metadata.

```yaml
meta:
  title: "Your Name - Developer & Designer"
  description: "Your site description"
  url: "https://yoursite.com"
  author: "Your Name"

theme:
  defaultTheme: "system"
  colors:
    primary: "#2563eb"
    secondary: "#64748b"
```

### Widgets (`widgets.yml`)
Contact forms, reading lists, and other interactive elements.

```yaml
contact:
  title: "Let's Connect"
  description: "Always open to discussing new opportunities"
  email: "your.email@example.com"
  calendlyUrl: "https://calendly.com/yourusername"

reading:
  title: "Current Reading"
  currentlyReading:
    - title: "The Pragmatic Programmer"
      author: "David Thomas & Andrew Hunt"
      progress: 75
```

## ✏️ How to Edit Content

### Option 1: GitHub Web Interface (Easiest)

1. Go to your repository on GitHub
2. Navigate to `src/data/yaml/`
3. Click on any `.yml` file
4. Click the pencil icon (Edit)
5. Make your changes
6. Scroll down and commit your changes

### Option 2: Local Text Editor

1. Clone your repository locally
2. Open any file in `src/data/yaml/` with your preferred text editor
3. Make changes and save
4. Commit and push your changes

### Option 3: VS Code (Recommended for developers)

1. Open the project in VS Code
2. Navigate to `src/data/yaml/`
3. Edit files with syntax highlighting and validation
4. Use the integrated git tools to commit changes

## 📋 Content Guidelines

### Writing Tips

1. **Use clear, concise language**
2. **Keep descriptions under 200 characters** for better display
3. **Use action words** for buttons and CTAs
4. **Be consistent** with terminology across pages

### YAML Syntax Rules

1. **Indentation matters** - Use 2 spaces, not tabs
2. **Strings with special characters** should be quoted: `"Text with: colons"`
3. **Multi-line text** uses the `|` symbol:
   ```yaml
   bio: |
     Line one
     Line two
   ```
4. **Lists** use dashes:
   ```yaml
   tags:
     - "react"
     - "typescript"
   ```

### Image Guidelines

1. **Profile photos**: 400x400px, saved as `/public/avatar.jpg`
2. **Project images**: 800x600px, saved in `/public/projects/`
3. **Use web-friendly formats**: JPG, PNG, WebP
4. **Optimize images** for web (under 200KB when possible)

## 🔧 Common Tasks

### Adding a New Project

1. Open `projects.yml`
2. Add a new entry to the `projects` list:
   ```yaml
   - title: "My New Project"
     description: "What this project does"
     category: "web-app"
     tags: ["tag1", "tag2"]
     featured: true
     url: "https://project-url.com"
   ```

### Updating Personal Info

1. Open `personal.yml`
2. Edit the `personal` section:
   ```yaml
   personal:
     name: "New Name"
     tagline: "New Title"
     email: "new@email.com"
   ```

### Changing Homepage Content

1. Open `homepage.yml`
2. Edit the `hero` section:
   ```yaml
   hero:
     headline: "New Headline"
     description: "New description"
   ```

### Adding Social Media Links

1. Open `personal.yml`
2. Add to the `social` list:
   ```yaml
   social:
     - platform: "LinkedIn"
       url: "https://linkedin.com/in/username"
       handle: "username"
   ```

## 🎨 Customization Options

### Colors and Theming

Edit `site-config.yml`:
```yaml
theme:
  colors:
    primary: "#your-color"    # Main brand color
    secondary: "#your-color"  # Secondary color
    accent: "#your-color"     # Accent color
```

### Project Categories

Common categories for projects:
- `web-app` - Full web applications
- `tool` - Developer tools and utilities
- `library` - Code libraries and packages
- `experiment` - Learning projects
- `open-source` - Open source contributions

### Project Status Options

- `planning` - In planning phase
- `in-progress` - Currently working on
- `completed` - Finished project
- `archived` - No longer maintained

## 🚨 Troubleshooting

### Common Issues

1. **Site not updating after changes**
   - Check if changes were committed and pushed
   - Wait a few minutes for deployment

2. **YAML syntax errors**
   - Check indentation (use spaces, not tabs)
   - Ensure quotes match
   - Validate YAML at [yamlchecker.com](https://yamlchecker.com)

3. **Images not showing**
   - Ensure images are in `/public/` folder
   - Check file paths in YAML files
   - Verify image file names match exactly

4. **Content not displaying**
   - Check YAML syntax is correct
   - Ensure all required fields are present
   - Look for typos in field names

### Getting Help

1. **Check the syntax** - YAML is sensitive to formatting
2. **Compare with examples** - Look at existing entries
3. **Test small changes** - Make one change at a time
4. **Ask for help** - Create an issue in the repository

## 📚 Resources

- [YAML Syntax Guide](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html)
- [YAML Validator](https://yamlchecker.com)
- [Markdown Guide](https://www.markdownguide.org) (for bio and descriptions)
- [GitHub Web Interface Guide](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files)

---

**Remember**: Changes to YAML files automatically update your website. Always double-check your changes before committing!
