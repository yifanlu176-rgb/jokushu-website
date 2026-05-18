import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllArticles } from '../lib/articles';

export function GET(context: APIContext) {
  const articles = getAllArticles();

  return rss({
    title: '文録 | 蓐収株式会社',
    description: '蓐収株式会社の文録。学理と文化を主とする文章。',
    site: context.site!,
    items: articles.map((article) => ({
      title: article.ja.title,
      pubDate: new Date(article.date),
      description: article.ja.excerpt ?? article.zh.excerpt ?? '',
      link: `/articles/${article.slug}`,
      author: article.ja.author,
    })),
    customData: '<language>ja</language>',
  });
}
