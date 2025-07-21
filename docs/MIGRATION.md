# Framework Migration Guide

How to migrate your data layer to other frontend frameworks while preserving all your content and configuration.

## 🎯 Overview

The data layer architecture is **completely framework-agnostic**. All your content, configuration, and business logic can be moved to any modern frontend framework with minimal changes.

## 📊 What You Can Migrate

✅ **All content data** (YAML files)
✅ **TypeScript types and validation**
✅ **Business logic and data transformations**
✅ **Content authoring workflow**
✅ **Version control and git history**

## 🚀 Migration Paths

### Next.js Migration

#### 1. Setup Next.js Project

```bash
npx create-next-app@latest my-site --typescript --tailwind --app
cd my-site
npm install js-yaml
```

#### 2. Copy Data Layer

```bash
# Copy the entire data layer
cp -r astro-project/src/data nextjs-project/src/
cp -r astro-project/src/content nextjs-project/src/
```

#### 3. Update Import Paths

```typescript
// src/data/yaml-loader.ts - Update for Next.js
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const YAML_DIR = path.resolve(process.cwd(), 'src/data/yaml');
// ... rest stays the same
```

#### 4. Use in Pages

```typescript
// pages/index.tsx or app/page.tsx
import { MigrationHelpers } from '@/data';

// For Pages Router
export async function getStaticProps() {
  return {
    props: MigrationHelpers.getNextJSProps('homepage')
  };
}

// For App Router
export default async function HomePage() {
  const data = MigrationHelpers.getNextJSProps('homepage');

  return (
    <div>
      <h1>{data.homepage.hero.headline}</h1>
      <p>{data.personal.bio}</p>
    </div>
  );
}
```

#### 5. Create API Routes (Optional)

```typescript
// pages/api/data.ts or app/api/data/route.ts
import { MigrationHelpers } from '@/data';

export async function GET() {
  const data = await MigrationHelpers.getAPIData();
  return Response.json(data);
}
```

### SvelteKit Migration

#### 1. Setup SvelteKit Project

```bash
npm create svelte@latest my-site
cd my-site
npm install
npm install js-yaml @types/js-yaml
```

#### 2. Copy Data Layer

```bash
cp -r astro-project/src/data sveltekit-project/src/
cp -r astro-project/src/content sveltekit-project/src/
```

#### 3. Use in Load Functions

```typescript
// src/routes/+page.server.ts
import { MigrationHelpers } from '$lib/data';

export function load() {
  return MigrationHelpers.getSvelteKitLoad('homepage');
}
```

#### 4. Use in Components

```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
  export let data;

  $: ({ homepage, personal, projects } = data.props);
</script>

<h1>{homepage.hero.headline}</h1>
<p>{personal.bio}</p>

{#each projects as project}
  <div>
    <h3>{project.title}</h3>
    <p>{project.description}</p>
  </div>
{/each}
```

### Nuxt.js Migration

#### 1. Setup Nuxt Project

```bash
npx nuxi@latest init my-site
cd my-site
npm install js-yaml
```

#### 2. Copy Data Layer

```bash
cp -r astro-project/src/data nuxt-project/
```

#### 3. Use in Composables

```typescript
// composables/useData.ts
import { data } from '~/data';

export const useData = () => {
  return {
    personal: data.personal(),
    homepage: data.homepage(),
    projects: data.projects(),
    // ... other data
  };
};
```

#### 4. Use in Pages

```vue
<!-- pages/index.vue -->
<template>
  <div>
    <h1 v-html="homepage.hero.headline"></h1>
    <p>{{ personal.bio }}</p>

    <div v-for="project in projects" :key="project.title">
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
    </div>
  </div>
</template>

<script setup>
const { personal, homepage, projects } = useData();
</script>
```

### Remix Migration

#### 1. Setup Remix Project

```bash
npx create-remix@latest my-site
cd my-site
npm install js-yaml @types/js-yaml
```

#### 2. Copy Data Layer

```bash
cp -r astro-project/src/data remix-project/app/
```

#### 3. Use in Loaders

```typescript
// app/routes/_index.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { MigrationHelpers } from "~/data";

export function loader() {
  return json(MigrationHelpers.getNextJSProps('homepage'));
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: data.homepage.hero.headline }} />
      <p>{data.personal.bio}</p>
    </div>
  );
}
```

### Vite + React Migration

#### 1. Setup Vite Project

```bash
npm create vite@latest my-site -- --template react-ts
cd my-site
npm install js-yaml @types/js-yaml
```

#### 2. Copy Data Layer

```bash
cp -r astro-project/src/data vite-project/src/
```

#### 3. Use in Components

```typescript
// src/App.tsx
import { data } from './data';

function App() {
  const homepage = data.homepage();
  const personal = data.personal();
  const projects = data.projects();

  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: homepage.hero.headline }} />
      <p>{personal.bio}</p>

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

## 🛠️ Migration Utilities

### Data Export Tool

Create a script to export all data for migration:

```javascript
// scripts/export-data.mjs
import { DataAPI } from '../src/data/api.js';
import fs from 'fs';

const allData = DataAPI.exportAsJSON();

// Export as JSON
fs.writeFileSync('exported-data.json', JSON.stringify(allData, null, 2));

// Export individual files
Object.entries(allData).forEach(([key, value]) => {
  fs.writeFileSync(`exported-${key}.json`, JSON.stringify(value, null, 2));
});

console.log('Data exported successfully!');
```

### Universal Data Hook

Create a universal hook that works across frameworks:

```typescript
// src/hooks/useData.ts (React/Next.js)
// src/lib/stores/data.ts (Svelte)
// composables/useData.ts (Vue/Nuxt)

export function useData() {
  return {
    // Computed/reactive data
    personal: computed(() => data.personal()),
    homepage: computed(() => data.homepage()),
    projects: computed(() => data.projects()),

    // Methods
    getFeaturedProjects: (limit = 3) => data.featuredProjects(limit),
    searchContent: (query: string) => data.search(query),
    getProjectsByCategory: (category: string) =>
      data.projects().filter(p => p.category === category),
  };
}
```

## 📝 Migration Checklist

### Pre-Migration

- [ ] Export all data using migration utilities
- [ ] Document any Astro-specific customizations
- [ ] List all external dependencies
- [ ] Test YAML loading in new framework
- [ ] Verify TypeScript types work

### During Migration

- [ ] Copy data layer files
- [ ] Update import paths for new framework
- [ ] Adapt data loading for framework patterns
- [ ] Update build configuration if needed
- [ ] Test data loading in development

### Post-Migration

- [ ] Verify all content displays correctly
- [ ] Test YAML editing workflow
- [ ] Update deployment configuration
- [ ] Document framework-specific usage
- [ ] Update team documentation

## 🔧 Framework-Specific Considerations

### Next.js

- **Static Generation**: Use `getStaticProps` for static sites
- **Server Components**: Data can be loaded directly in components
- **API Routes**: Create API endpoints for dynamic data
- **Image Optimization**: Update image paths for Next.js Image component

### SvelteKit

- **Load Functions**: Use server-side load functions for SSR
- **Stores**: Consider using Svelte stores for reactive data
- **Static Generation**: Configure for static site generation
- **Component Props**: Pass data through component props

### Vue/Nuxt

- **Composables**: Create Vue composables for data access
- **Reactivity**: Leverage Vue's reactivity system
- **Server-Side Rendering**: Use Nuxt's SSR capabilities
- **Auto-imports**: Configure auto-imports for data functions

## 🚨 Common Migration Issues

### Path Resolution

```typescript
// Issue: Different frameworks handle paths differently
// Solution: Use absolute imports or configure path mapping

// tsconfig.json or jsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/data/*": ["./src/data/*"],
      "@/components/*": ["./src/components/*"]
    }
  }
}
```

### Build Configuration

```javascript
// vite.config.js / next.config.js
export default {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}
```

### YAML Loading in Browser

```typescript
// Some frameworks need special handling for YAML in browser
// Solution: Pre-process YAML to JSON during build

// Example build script
import { yamlData } from './src/data/yaml-loader.js';
import fs from 'fs';

const allYamlData = {
  personal: yamlData.personal(),
  homepage: yamlData.homepage(),
  // ... etc
};

fs.writeFileSync('public/data.json', JSON.stringify(allYamlData));
```

## 📚 Resources

- [Next.js Data Fetching](https://nextjs.org/docs/basic-features/data-fetching)
- [SvelteKit Loading Data](https://kit.svelte.dev/docs/loading)
- [Nuxt Data Fetching](https://nuxt.com/docs/getting-started/data-fetching)
- [Remix Loaders](https://remix.run/docs/en/main/route/loader)
- [Vite Static Assets](https://vitejs.dev/guide/assets.html)

---

**Key Takeaway**: The data layer is designed to be portable. Your content and business logic can move with you to any framework, giving you the freedom to choose the best technology for your needs without losing your investment in content and configuration.
