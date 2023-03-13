// @ts-check
import { defineConfig } from 'astro/config'
import UnoCss from 'unocss/astro'
import Icons from 'unplugin-icons/vite'
import react from '@astrojs/react'
import remarkToc from 'remark-toc'
import remarkCollapse from 'remark-collapse'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://riri-me.netlify.app',
  integrations: [UnoCss(), react(), sitemap()],
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: 'Table of content' }]],
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
