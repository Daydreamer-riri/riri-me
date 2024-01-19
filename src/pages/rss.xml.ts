import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { description, site } from '@meta'
import slugify from '@utils/slugify'

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.draft)
  return rss({
    title: 'Daydreamer Riri',
    description,
    site,
    items: posts.map(({ data }) => ({
      link: `posts/${slugify(data)}`,
      title: data?.title ?? '',
      description: data?.description ?? '',
      pubDate: new Date(data.pubDatetime),
    })),
  })
}
