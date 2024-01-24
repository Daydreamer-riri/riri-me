import type {
  SandpackProps,
} from '@codesandbox/sandpack-react'
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react/unstyled'

export function Sandpack(props: SandpackProps) {
  return (
    <SandpackProvider
      className="lg:w-130%! lg:ml-[-15%]! max-w-screen! not-prose"
      {...props}
      options={{
        classes: {
          'sp-wrapper': 'sandpack-wrapper',
        },
        ...props.options,
      }}
    >
      <SandpackLayout>
        <SandpackCodeEditor initMode="lazy" />
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  )
}
