import { z } from 'astro:content'

export const blogSchema = z
  .object({
    author: z.string().optional(),
    pubDatetime: z.date().or(z.string()),
    title: z.string(),
    postSlug: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(['others']),
    ogImage: z.string().optional(),
    description: z.string(),
  })
  .strict()

export type BlogFrontmatter = z.infer<typeof blogSchema>

export const nowSchema = z
  .object({
    description: z.string(),
    pubDatetime: z.date().or(z.string()),
  })

export type NowFrontmatter = z.infer<typeof nowSchema>
