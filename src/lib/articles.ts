export type ArticleLocale = 'zh' | 'ja';

export type ArticleContentBlock = {
  type: 'paragraph' | 'heading' | 'quote' | 'divider' | 'coda';
  text?: string;
  level?: number;
};

export type ArticleLocaleEntry = {
  slug: string;
  category: string;
  author: string;
  date: string;
  dateDisplay: string;
  locale: ArticleLocale;
  title: string;
  subtitle?: string;
  excerpt?: string;
  content: ArticleContentBlock[];
};

export type BilingualArticle = {
  slug: string;
  date: string;
  zh: ArticleLocaleEntry;
  ja: ArticleLocaleEntry;
};

const articleMap = new Map<string, Partial<Record<ArticleLocale, ArticleLocaleEntry>>>();
const articleModules = import.meta.glob('../content/articles/*.{zh,ja}.json', {
  eager: true,
});

for (const [file, module] of Object.entries(articleModules)) {
  const match = file.match(/\/([^/]+)\.(zh|ja)\.json$/);

  if (!match) {
    continue;
  }

  const [, basename, locale] = match as [string, string, ArticleLocale];
  const entry = (module as { default?: ArticleLocaleEntry }).default ?? (module as ArticleLocaleEntry);
  const group = articleMap.get(basename) ?? {};

  group[locale] = entry;
  articleMap.set(basename, group);
}

const articles = Array.from(articleMap.values())
  .filter((entry): entry is Record<ArticleLocale, ArticleLocaleEntry> => Boolean(entry.zh && entry.ja))
  .map((entry): BilingualArticle => ({
    slug: entry.zh.slug,
    date: entry.zh.date,
    zh: entry.zh,
    ja: entry.ja,
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

export function getAllArticles() {
  return articles;
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
