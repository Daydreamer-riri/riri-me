import style from '../common/styles.css?raw'
import utils from '../common/utils.tsx?raw'
import { example } from './example'
import { Sandpack } from '@/demos/Sandpack'

export function ListAnimationFramerMotion() {
  return (
    <Sandpack
      template="vite-react-ts"
      files={{
        '/App.tsx': example,
        '/utils.tsx': utils,
        '/styles.css': style,
      }}
      options={{
        visibleFiles: ['/App.tsx', '/utils.tsx'],
      }}
      customSetup={{
        dependencies: {
          'framer-motion': '1.1.0',
        },
      }}
    />
  )
}
