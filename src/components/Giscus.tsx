import { giscusConfig } from '@meta'
import GiscusComp from '@giscus/react'

export default function Giscus() {
  return (
    <GiscusComp
      repo={giscusConfig.repo as any}
      repoId={giscusConfig.categoryId}
      category={giscusConfig.category}
      categoryId={giscusConfig.categoryId}
      theme={'preferred_color_scheme'}
      mapping={'pathname'}
      inputPosition={'top'}
      reactionsEnabled={'1'}
      strict={'1'}
      emitMetadata={'0'}
    />
  )
}
