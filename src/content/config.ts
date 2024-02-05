import { defineCollection } from 'astro:content'
import { blogSchema, nowSchema } from './_schemas'

const blog = defineCollection({
  schema: blogSchema,
})

const now = defineCollection({
  schema: nowSchema,
})

export const collections = { blog, now }
