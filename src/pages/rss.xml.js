import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles');
  const publishedArticles = articles
    .filter(article => !article.data.draft)
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  return rss({
    title: 'Your Name - Articles',
    description: 'Thoughts, tutorials, and insights about web development, design, and technology.',
    site: context.site,
    items: publishedArticles.map(article => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishDate,
      link: `/articles/${article.slug}/`,
      categories: article.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
