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

const headerAnchor = {
  type: 'text',
  value: '#',
}

// https://astro.build/config
export default defineConfig({
  site: 'https://riri-me.netlify.app',
  integrations: [UnoCss(), react(), sitemap(), prefetch({ throttle: 3 })],
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      // @ts-expect-error
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
