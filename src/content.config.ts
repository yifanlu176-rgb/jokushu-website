import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleContentBlock = z.object({
  type: z.enum(['paragraph', 'heading', 'quote', 'divider', 'coda']),
  text: z.string().optional(),
  level: z.number().optional(),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{zh,ja}.json', base: './src/content/articles' }),
  schema: z.object({
    slug: z.string(),
    category: z.string(),
    author: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    dateDisplay: z.string(),
    locale: z.enum(['zh', 'ja']),
    title: z.string(),
    subtitle: z.string().optional(),
    excerpt: z.string().optional(),
    content: z.array(articleContentBlock),
  }),
});

const collections_items = defineCollection({
  loader: glob({ pattern: '**/*.{zh,ja}.json', base: './src/content/collections' }),
  schema: z.object({
    slug: z.string(),
    volume: z.number().min(1).max(3),
    name: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    provenance: z.string(),
    era: z.string().optional(),
    priceRange: z.string(),
    status: z.enum(['available', 'reserved', 'sold']),
    images: z.array(z.string()),
    locale: z.enum(['zh', 'ja']),
  }),
});

export const collections = { articles, collections_items };
