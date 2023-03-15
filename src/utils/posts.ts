import dayjs from 'dayjs'
import type { CollectionEntry } from 'astro:content'

export const getSortedPosts = (posts: CollectionEntry<'blog'>[]) =>
  posts
    .filter(({ data }) => !data.draft)
    .sort(
      (a, b) =>
        Math.floor(new Date(b.data.pubDatetime).getTime() / 1000)
        - Math.floor(new Date(a.data.pubDatetime).getTime() / 1000),
    )

export function getYearToPostMap(posts: CollectionEntry<'blog'>[]) {
  const map = {} as Record<string, CollectionEntry<'blog'>[]>
  for (const post of posts) {
    const { pubDatetime } = post.data
    const year = pubDatetime.getFullYear()
    map[year] ? map[year].push(post) : (map[year] = [post])
  }
  return map
}

export const getYear = (a: Date | string | number) => new Date(a).getFullYear()

export const isSameYear = (
  a: Date | string | number,
  b: Date | string | number,
) => a && b && getYear(a) === getYear(b)

export function formatDate(d?: string | Date | null, lang = 'en') {
  if (!d)
    return
  if (isSameYear(d, new Date())) {
    return lang === 'zh'
      ? dayjs(d).locale('zh-CN').format('MMMDD日')
      : dayjs(d).format('MMM D')
  }
  else {
    return lang === 'zh'
      ? dayjs(d).locale('zh-CN').format('YYYY年 MMMDD日')
      : dayjs(d).format('MMM D, YYYY')
  }
}

export function getReadingTime(body: CollectionEntry<'blog'>['body']) {
  const time = Math.round(body.length / 400)
  return `${Math.max(time, 1)} min`
}
