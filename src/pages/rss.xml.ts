import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { site, description, title } from '@meta'
import slugify from '@utils/slugify'

export async function get() {
  const posts = await getCollection('blog', ({ data }) => !data.draft)
  return rss({
    title: title,
    description: description,
    site: site,
    items: posts.map(({ data }) => ({
      link: `posts/${slugify(data)}`,
      title: data?.title ?? '',
      description: data?.description ?? '',
      pubDate: new Date(data.pubDatetime),
    })),
  })
}
