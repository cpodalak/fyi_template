# Documentation Hub

Complete documentation for the personal website project with framework-agnostic
data layer.

## 📚 Documentation Overview

### 🚀 Getting Started

- **[Setup Guide](SETUP.md)** - Initial project setup and installation
- **[Development Guide](DEVELOPMENT.md)** - Developer workflow and architecture
- **[Usage Guide](USAGE.md)** - Basic usage and commands

### 📝 Content Management

- **[Content Management Guide](CONTENT-MANAGEMENT.md)** - Non-technical guide to
  editing content
- **[Data Layer Architecture](DEVELOPMENT.md#-data-layer-architecture)** -
  Technical overview of the data system

### 🔄 Migration & Portability

- **[Framework Migration Guide](MIGRATION.md)** - Moving to Next.js, SvelteKit,
  Vue, etc.
- **[Data Export & Import](MIGRATION.md#-migration-utilities)** - Tools for data
  portability

## 🏗️ Architecture Highlights

### Data Layer Benefits

- ✅ **Framework Agnostic** - Use with Astro, Next.js, SvelteKit, Vue, etc.
- ✅ **Easy Content Authoring** - YAML files for non-technical users
- ✅ **Type Safe** - TypeScript validation and IntelliSense
- ✅ **Version Controlled** - All content in Git with full history
- ✅ **Migration Ready** - Move between frameworks without losing content

### Content Sources

1. **YAML Files** (`src/data/yaml/`) - Easy editing for content authors
2. **TypeScript Files** (`src/data/*.ts`) - Fallback for developers
3. **Markdown Collections** (`src/content/`) - Blog-style content

### Quick Example

```yaml
# src/data/yaml/personal.yml
personal:
  name: 'Your Name'
  tagline: 'Developer & Designer'
  email: 'you@example.com'

social:
  - platform: 'GitHub'
    url: 'https://github.com/yourusername'
```

```astro
---
import { data } from '../data/index.js';
const personal = data.personal();
---

<h1>Hello, I'm {personal.name}</h1>
<p>{personal.tagline}</p>
```

## 📖 Documentation Guide

### For Content Authors (Non-Technical)

Start with the **[Content Management Guide](CONTENT-MANAGEMENT.md)**. This
covers:

- How to edit YAML files
- Content structure and examples
- Common tasks and troubleshooting
- No technical knowledge required

### For Developers

Read the **[Development Guide](DEVELOPMENT.md)** which includes:

- Data layer architecture
- API reference and usage
- Adding new content types
- TypeScript integration

### For Framework Migration

Use the **[Migration Guide](MIGRATION.md)** for:

- Step-by-step migration to other frameworks
- Framework-specific considerations
- Data export and import tools
- Migration utilities and helpers

### For Initial Setup

Follow the **[Setup Guide](SETUP.md)** for:

- Project installation
- Environment configuration
- Development server setup
- Deployment preparation

## 🎯 Quick Reference

### Common Tasks

| Task               | Documentation                                                                | File Location                   |
| ------------------ | ---------------------------------------------------------------------------- | ------------------------------- |
| Edit personal info | [Content Management](CONTENT-MANAGEMENT.md#personal-information-personalyml) | `src/data/yaml/personal.yml`    |
| Add new project    | [Content Management](CONTENT-MANAGEMENT.md#adding-a-new-project)             | `src/data/yaml/projects.yml`    |
| Change site colors | [Content Management](CONTENT-MANAGEMENT.md#colors-and-theming)               | `src/data/yaml/site-config.yml` |
| Update navigation  | [Content Management](CONTENT-MANAGEMENT.md#navigation-navigationyml)         | `src/data/yaml/navigation.yml`  |
| Migrate to Next.js | [Migration Guide](MIGRATION.md#nextjs-migration)                             | Copy `src/data/` folder         |
| Add new data type  | [Development Guide](DEVELOPMENT.md#adding-new-content-types)                 | `src/data/types.ts` + YAML      |

### Data API Quick Reference

```typescript
import { data } from '@/data';

// Get all data types
const personal = data.personal(); // Personal info & social links
const homepage = data.homepage(); // Homepage content
const projects = data.projects(); // Project portfolio
const navigation = data.navigation(); // Navigation menus
const capabilities = data.capabilities(); // Skills & capabilities
const learning = data.learning(); // Learning resources
const widgets = data.widgets(); // Widget configurations
```

## 🔧 Development Workflow

1. **Content Changes**: Edit YAML files → Auto-refresh in dev server
2. **Code Changes**: Edit components → Hot reload
3. **New Features**: Add types → Create YAML → Update API → Use in components
4. **Migration**: Export data → Copy to new framework → Adapt data loading

## 🤝 Contributing

1. **For Content**: Edit YAML files and create pull requests
2. **For Features**: Follow TypeScript and testing guidelines
3. **For Documentation**: Update relevant guides when adding features
4. **For Issues**: Check troubleshooting sections first

## 📚 External Resources

- [YAML Syntax Guide](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html)
- [Astro Documentation](https://docs.astro.build/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Need Help?** Start with the appropriate guide above, or check the
troubleshooting sections in each document.
