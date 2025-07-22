import { defineCollection, z } from 'astro:content';

// Profile/Personal Information
const profile = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    email: z.string().email(),
    website: z.string().url().optional(),
    location: z.string().optional(),
    bio: z.string(),
    avatar: z.string().optional(),
    social: z
      .array(
        z.object({
          platform: z.string(),
          url: z.string().url(),
          handle: z.string().optional(),
          icon: z.string().optional(),
        })
      )
      .default([]),
    status: z
      .object({
        message: z.string(),
        availability: z.enum(['available', 'busy', 'away']).default('available'),
        currentProject: z.string().optional(),
        lastUpdated: z.string(),
      })
      .optional(),
  }),
});

// Simplified Data Collections
const data = defineCollection({
  type: 'data',
  schema: z.union([
    // Site configuration
    z.object({
      site: z.object({
        title: z.string(),
        description: z.string(),
        url: z.string().url(),
        author: z.string(),
        keywords: z.array(z.string()).default([]),
      }),
      theme: z.object({
        defaultTheme: z.enum(['light', 'dark', 'system']).default('system'),
        colors: z.object({
          primary: z.string(),
          secondary: z.string(),
          accent: z.string(),
        }),
      }),
      navigation: z.object({
        header: z.array(
          z.object({
            label: z.string(),
            href: z.string(),
            description: z.string().optional(),
            external: z.boolean().default(false),
          })
        ),
        footer: z.array(
          z.object({
            label: z.string(),
            href: z.string(),
            external: z.boolean().default(false),
          })
        ),
      }),
      features: z.object({
        rss: z.boolean().default(true),
        sitemap: z.boolean().default(true),
        analytics: z.boolean().default(false),
      }),
    }),
    // Skills and capabilities
    z.object({
      categories: z.record(
        z.object({
          name: z.string(),
          description: z.string(),
          color: z.string(),
        })
      ),
      skills: z.array(
        z.object({
          name: z.string(),
          level: z.number().min(1).max(5),
          category: z.string(),
          description: z.string(),
          years: z.number().optional(),
          featured: z.boolean().default(false),
          tags: z.array(z.string()).default([]),
        })
      ),
    }),
    // Learning resources
    z.object({
      quickWins: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
          tags: z.array(z.string()).default([]),
          featured: z.boolean().default(false),
        })
      ),
      resources: z.array(
        z.object({
          title: z.string(),
          type: z.enum(['book', 'course', 'article', 'video']),
          author: z.string().optional(),
          description: z.string().optional(),
          url: z.string().url().optional(),
          status: z.enum(['reading', 'completed', 'want-to-read', 'in-progress']).optional(),
          rating: z.number().min(1).max(5).optional(),
          tags: z.array(z.string()).default([]),
          date: z.string().optional(),
          featured: z.boolean().default(false),
        })
      ),
      currentGoals: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          status: z.enum(['planning', 'in-progress', 'completed']),
          target: z.string().optional(),
          tags: z.array(z.string()).default([]),
          featured: z.boolean().default(false),
        })
      ),
    }),
  ]),
});

// Page Content (Hero sections, CTAs, etc.)
const pages = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(), // 'homepage', 'projects', 'learnings', etc.
    title: z.string(),
    description: z.string().optional(),
    hero: z
      .object({
        headline: z.string(),
        subheadline: z.string().optional(),
        description: z.string(),
        ctaButtons: z.object({
          primary: z.object({
            text: z.string(),
            href: z.string(),
          }),
          secondary: z
            .object({
              text: z.string(),
              href: z.string(),
            })
            .optional(),
        }),
      })
      .optional(),
    sections: z.record(z.any()).optional(), // Flexible sections data
    quickStats: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          description: z.string(),
          icon: z.string().optional(),
        })
      )
      .optional(),
  }),
});

// Widgets Configuration (simplified)
const widgets = defineCollection({
  type: 'data',
  schema: z.object({
    type: z.string(), // 'contact', 'gists', 'templates', 'reading'
    title: z.string(),
    description: z.string().optional(),
    config: z.record(z.any()), // Flexible widget-specific configuration
    featured: z.array(z.record(z.any())).optional(), // Featured items
  }),
});

// Build notes - technical logs and decisions
const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    project: z.string().optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('intermediate'),
  }),
});

// AI prompts collection
const prompts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z
      .enum(['development', 'design', 'writing', 'analysis', 'general'])
      .default('general'),
    prompt: z.string(),
    use: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

// Projects
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    githubUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    stack: z.array(z.string()).default([]),
    status: z.enum(['active', 'completed', 'archived']).default('completed'),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          description: z.string().optional(),
        })
      )
      .optional(),
  }),
});

// Articles
const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string().or(z.date()),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  profile,
  data,
  pages,
  widgets,
  notes,
  prompts,
  projects,
  articles,
};
