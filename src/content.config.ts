import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string(),
    description: z.string(),
    descriptionEn: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    categoryEn: z.string(),
    tags: z.array(z.string()).optional(),
    author: z.string().default('蓐収株式会社'),
    readTime: z.string().optional(),
  }),
});

export const collections = {
  articles,
};
