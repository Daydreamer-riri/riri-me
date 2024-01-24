import style from '../common/styles.css?raw'
import utils from '../common/utils.jsx?raw'
import { example } from './example'
import { Sandpack } from '@/demos/Sandpack'

export function ListAnimationFramerMotion() {
  return (
    <Sandpack
      template="react"
      files={{
        '/App.js': example,
        '/utils.js': utils,
        '/styles.css': style,
      }}
      options={{
        visibleFiles: ['/App.tsx', '/utils.js'],
      }}
      customSetup={{
        dependencies: {
          'framer-motion': '1.1.0',
        },
      }}
    />
  )
}
