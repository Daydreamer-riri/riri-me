import { Sandpack } from '@codesandbox/sandpack-react'
import style from '../common/style.css?raw'
import App from './example?raw'

export function ListAnimationFramerMotion() {
  return (
    <Sandpack
      template="vite-react-ts"
      files={{
        '/style.css': style,
        '/App.tsx': App.split('// @ts-nocheck\n')[1],
      }}
      customSetup={{
        dependencies: {
          'framer-motion': '1.1.0',
        },
      }}
      options={{
        editorHeight: 500,
        editorWidthPercentage: 0,
        classes: {
          'sp-wrapper': 'sandpack-wrapper',
        },
        layout: 'preview',
      }}
    />
  )
}
