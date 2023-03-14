// @ts-check
import { defineConfig } from 'astro/config'
import UnoCss from 'unocss/astro'
import Icons from 'unplugin-icons/vite'
import react from '@astrojs/react'
import remarkToc from 'remark-toc'
import remarkCollapse from 'remark-collapse'
import rehypeAutoLindHeadings from 'rehype-autolink-headings'
import sitemap from '@astrojs/sitemap'

import prefetch from '@astrojs/prefetch'

// https://astro.build/config
export default defineConfig({
  site: 'https://riri-me.netlify.app',
  integrations: [UnoCss(), react(), sitemap(), prefetch({ throttle: 3 })],
  markdown: {
    remarkPlugins: [remarkToc],
    rehypePlugins: [
      [
        rehypeAutoLindHeadings,
        {
          behavior: 'prepend',
        },
      ],
    ],
    shikiConfig: {
      wrap: true,
      theme: 'vitesse-dark',
    },
  },
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
      }),
    ],
  },
})
