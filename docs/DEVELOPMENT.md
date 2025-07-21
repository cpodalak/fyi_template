# Development Guide

Essential development workflow and data architecture for the personal website.

## 🏗️ Architecture Overview

This project follows a **data-driven architecture** with clean separation between content/data and presentation layers:

```
src/
├── components/    # Astro/React components (presentation layer)
├── data/          # Data layer (technology-agnostic)
│   ├── types.ts   # TypeScript interfaces
│   ├── *.ts       # Structured data in TypeScript
│   ├── yaml/      # YAML files for easy authoring
│   └── index.ts   # Data aggregation and utilities
├── content/       # Markdown content collections
├── pages/         # Routes that consume data
├── lib/           # External API clients (Notion, etc.)
└── styles/        # Global CSS
```

## 📊 Data Layer

The data layer is **completely framework-agnostic** and can be migrated to any frontend technology.

### Data Sources (in order of preference):

1. **YAML Files** (`src/data/yaml/`) - Easy authoring for non-technical users
2. **TypeScript Files** (`src/data/*.ts`) - Structured data with type safety
3. **External APIs** (`src/lib/`) - Dynamic content from Notion, etc.

### Core Data Types:

```typescript
// Personal & Contact
PersonalInfo, SocialLink

// Capabilities & Skills
Capability, ExpertiseArea, TechStack

// Learning & Growth
QuickWin, AIPrompt, BookCourse, LearningGoal

// Projects & Impact
ImpactMetric, ProjectImpact, Achievement, TimelineEvent

// Configuration
SiteConfig, NavigationItem, PageMeta
```

### Adding New Content:

**Option 1: YAML (Recommended for content authors)**
```yaml
# src/data/yaml/learning.yml
quickWins:
  - title: "New Quick Win"
    content: "Description of the quick win"
    tags: ["tag1", "tag2"]
    category: "Development"
```

**Option 2: TypeScript (Recommended for developers)**
```typescript
// src/data/learning.ts
export const quickWins: QuickWin[] = [
  {
    title: "New Quick Win",
    content: "Description",
    tags: ["tag1", "tag2"],
    category: "Development"
  }
];
```

**Option 3: External API**
```typescript
// src/lib/notion.ts
export async function getQuickWins() {
  // Fetch from external source
}
```

## 🛠️ Setup

```bash
git clone <your-repo-url>
cd fyi
npm install
cp .env.example .env
```

## 🚀 Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

## ✅ Quality Checks

```bash
# Run all checks
npm run validate

# Individual checks
npm run lint        # ESLint + Prettier
npm run type-check  # TypeScript
npm run test        # Unit tests
npm run test:e2e    # E2E tests
```

## 📝 Content Management

### Data Layer Architecture

The project uses a **3-tier data architecture**:

1. **YAML Layer** - Human-readable content authoring
2. **TypeScript Layer** - Type-safe data structures
3. **API Layer** - External data sources (Notion, etc.)

### Content Types:

- **Personal Info**: `src/data/personal.ts` or `src/data/yaml/personal.yml`
- **Capabilities**: Technical skills, expertise areas, current tech stack
- **Learning Content**: Quick wins, AI prompts, books/courses, learning goals
- **Projects**: Impact metrics, project timelines, achievements
- **Site Config**: Navigation, metadata, feature flags

### Adding New Content:

**For Content Authors (YAML)**:
```yaml
# src/data/yaml/learning.yml
quickWins:
  - title: "Your Quick Win"
    content: "Description here"
    tags: ["tag1", "tag2"]
    category: "Development"
```

**For Developers (TypeScript)**:
```typescript
// src/data/learning.ts
export const quickWins: QuickWin[] = [
  {
    title: "Your Quick Win",
    content: "Description here",
    tags: ["tag1", "tag2"],
    category: "Development"
  }
];
```

**Using in Components**:
```astro
---
// Astro component
import { quickWins } from '../data/index.ts';
import { yamlData } from '../data/yaml-loader.ts';

// Use YAML with TypeScript fallback
const dataQuickWins = yamlData.learning()?.quickWins || quickWins;
---

{dataQuickWins.map(win => (
  <div>{win.title}</div>
))}
```

### Migration Benefits:

- **Framework Agnostic**: Data layer can be used with React, Vue, Svelte, etc.
- **Easy Authoring**: YAML files for non-technical content updates
- **Type Safety**: TypeScript interfaces prevent data errors
- **Fallback Support**: Graceful degradation if YAML files missing
- **Version Control**: All content tracked in Git

## 📊 Data Layer Architecture

The project uses a **framework-agnostic data layer** that completely separates content from presentation. This makes the codebase easy to maintain and enables migration to other frameworks.

### 🏗️ Data Sources

Content can be authored in multiple formats:

1. **YAML Files** (recommended for content authors)
   - `src/data/yaml/` - Easy-to-edit YAML files
   - Perfect for non-technical users
   - Version controlled and diff-friendly

2. **TypeScript Files** (fallback)
   - `src/data/*.ts` - Type-safe data definitions
   - Automatic fallback when YAML files are missing
   - Good for developers

3. **Markdown Collections** (for blog-style content)
   - `src/content/` - Astro content collections
   - Great for articles, notes, and detailed content

### 📁 Data Structure

```
src/data/
├── yaml/                    # YAML content files (easy authoring)
│   ├── personal.yml         # Personal info & social links
│   ├── site-config.yml      # Site-wide configuration
│   ├── homepage.yml         # Homepage content
│   ├── navigation.yml       # Navigation menus
│   ├── projects.yml         # Project portfolio data
│   ├── projects-page.yml    # Projects page config
│   ├── widgets.yml          # Widget configurations
│   └── learning.yml         # Learning content
├── api.ts                   # Main data API (use this!)
├── yaml-loader.ts           # YAML loading utilities
├── types.ts                 # TypeScript type definitions
└── *.ts                     # TypeScript data files (fallback)
```

### 🚀 Using the Data Layer

#### In Astro Components

```astro
---
import { data } from '../data/index.js';

// Get data from the unified API
const homepageData = data.homepage();
const projects = data.projects();
const personal = data.personal();
---

<h1>{homepageData.hero.headline}</h1>
<p>{personal.bio}</p>

{projects.map(project => (
  <div>
    <h3>{project.title}</h3>
    <p>{project.description}</p>
  </div>
))}
```

#### In React Components

```tsx
import { DataAPI } from '@/data';

export function ProjectList() {
  const projects = DataAPI.getProjects();

  return (
    <div>
      {projects.map(project => (
        <div key={project.title}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### ✏️ Content Authoring

#### Option 1: YAML Files (Recommended)

Edit files in `src/data/yaml/` using any text editor:

```yaml
# src/data/yaml/personal.yml
personal:
  name: "Your Name"
  tagline: "Developer & Designer"
  email: "you@example.com"
  bio: |
    Your bio here.
    Can be multi-line.

social:
  - platform: "GitHub"
    url: "https://github.com/yourusername"
    handle: "@yourusername"
```

#### Option 2: TypeScript Files

For complex data or when you need TypeScript validation:

```typescript
// src/data/personal.ts
export const personalInfo = {
  name: "Your Name",
  tagline: "Developer & Designer",
  email: "you@example.com",
  bio: "Your bio here."
};
```

### 🔄 Migration Benefits

The data layer makes it easy to migrate to other frameworks:

#### Next.js Migration

```typescript
// pages/index.tsx
import { MigrationHelpers } from '@/data';

export async function getStaticProps() {
  return {
    props: MigrationHelpers.getNextJSProps('homepage')
  };
}
```

#### SvelteKit Migration

```typescript
// src/routes/+page.server.ts
import { MigrationHelpers } from '@/data';

export function load() {
  return MigrationHelpers.getSvelteKitLoad('homepage');
}
```

### 🛠️ Data API Reference

#### Core Methods

```typescript
import { data, DataAPI } from '@/data';

// Quick access (recommended)
const personal = data.personal();
const projects = data.projects();
const homepage = data.homepage();

// Full API access
const allData = DataAPI.exportAsJSON();
const featured = DataAPI.getFeaturedProjects(3);
const searchResults = DataAPI.search("typescript");
```

#### Available Data

- `data.personal()` - Personal information and social links
- `data.config()` - Site configuration and settings
- `data.navigation()` - Navigation menus and structure
- `data.homepage()` - Homepage content and hero section
- `data.projects()` - Project portfolio data
- `data.capabilities()` - Skills and capabilities
- `data.learning()` - Learning resources and notes
- `data.widgets()` - Widget configurations

### 🎯 Content Management Workflow

1. **For Content Authors** (non-technical):
   - Edit YAML files in `src/data/yaml/`
   - Use any text editor or GitHub's web interface
   - Changes are immediately reflected in the site

2. **For Developers**:
   - Use the `data` API in components
   - Add new data types in `types.ts`
   - Extend the API in `api.ts` for new functionality

3. **For Content Migration**:
   - Export all data: `DataAPI.exportAsJSON()`
   - Use migration helpers for other frameworks
   - Data layer is completely portable

### 🔍 Debugging Data

```typescript
// Check data sources
console.log(DataAPI.getDataSources());

// Output:
// {
//   personal: 'YAML',     // Loaded from YAML
//   projects: 'TypeScript', // Fallback to TS
//   // ...
// }
```

### 📝 Adding New Content Types

1. Add types to `src/data/types.ts`:
```typescript
export interface NewContentType {
  title: string;
  description: string;
}
```

2. Create YAML file `src/data/yaml/new-content.yml`:
```yaml
items:
  - title: "Example"
    description: "Example description"
```

3. Add loader to `src/data/yaml-loader.ts`:
```typescript
newContent() {
  try {
    return YamlLoader.loadFromDataDir('new-content.yml');
  } catch (error) {
    return null;
  }
}
```

4. Add API method to `src/data/api.ts`:
```typescript
static getNewContent() {
  return this.getCached('newContent', () => {
    return yamlData.newContent() || fallbackData;
  });
}
```

This architecture ensures your content is:
- ✅ **Easy to author** (YAML for humans, TS for developers)
- ✅ **Version controlled** (all content in git)
- ✅ **Framework agnostic** (works with any frontend)
- ✅ **Type safe** (TypeScript validation)
- ✅ **Migration ready** (portable data layer)
````
