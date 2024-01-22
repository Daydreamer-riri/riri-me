import style from '../common/styles.css?raw'
import utils from '../common/utils.tsx?raw'
import { Sandpack } from '@/demos/Sandpack'

const example = `import React, { useState } from 'react'
import { flushSync } from 'react-dom'
import { CloseButton, remove, add } from './utils'
import './index.css'

export default function App() {
  const [notifications, setNotifications] = useState([0])

  return (
    <div className="container">
      <ul>
        {notifications.map((id) => (
          <li
            key={id}
            style={{ "--transition-name": \`tn-\${ id } \` }}
            id={\`li-\${ id }\`}
          >
            <CloseButton
              close={() => {
                const li = document.getElementById(\`li-\${ id }\`);
                li.style['view-transition-name'] = "tn-out";
                document.startViewTransition(() =>
                  flushSync(() => setNotifications(remove(notifications, id)))
                );
              }}
            />
          </li>
        ))}
      </ul>
      <button
        className="add"
        onClick={() => {
          document.startViewTransition(() => {
            flushSync(() => {
              setNotifications(add(notifications));
            });
          });
        }}
      >
        +
      </button>
    </div>
  )
}`

const css = `li {
  view-transition-name: var(--transition-name);
  animation: scale-in .3s;
}

::view-transition-old(tn-out):only-child {
  animation: scale-out .3s forwards;
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.3);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes scale-out {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(50px) scale(.5);
  }
}
`

export function ListAnimationViewTransition() {
  return (
    <Sandpack
      template="vite-react-ts"
      files={{
        '/App.tsx': example,
        '/utils.tsx': utils,
        '/styles.css': style,
        '/index.css': css,
      }}
      options={{
        visibleFiles: ['/App.tsx', '/index.css', '/utils.tsx'],
      }}
    />
  )
}
