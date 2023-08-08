// @ts-check
import { defineConfig } from 'astro/config'
import UnoCss from 'unocss/astro'
import Icons from 'unplugin-icons/vite'
import react from '@astrojs/react'
import rehypeAutoLindHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import rehypeToc from 'rehype-toc'
import sitemap from '@astrojs/sitemap'
import prefetch from '@astrojs/prefetch'
import mdx from '@astrojs/mdx'

const headerAnchor = {
  type: 'text',
  value: '#',
}

// https://astro.build/config
export default defineConfig({
  site: 'https://Daydreamer-riri.me',
  integrations: [
    mdx(),
    react(),
    UnoCss({ injectReset: true }),
    sitemap(),
    prefetch({ throttle: 3 }),
  ],
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      // @ts-expect-error rehypeToc has type error
      rehypeToc,
      [
        rehypeAutoLindHeadings,
        {
          behavior: 'append',
          properties: { class: 'header-anchor' },
          content: headerAnchor,
        },
      ],
    ],
    shikiConfig: {
      wrap: true,
      theme: 'vitesse-light',
    },
  },
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
      }),
    ],
  },
  experimental: {
    assets: true,
    viewTransitions: true,
  },
})
