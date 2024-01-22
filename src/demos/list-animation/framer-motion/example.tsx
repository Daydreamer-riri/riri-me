export const example = `import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CloseButton, remove, add } from './utils'

export default function App() {
  const [notifications, setNotifications] = useState([0])

  return (
    <div className="container">
      <ul>
        <AnimatePresence initial={false}>
          {notifications.map(id => (
            <motion.li
              key={id}
              positionTransition
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            >
              <CloseButton
                close={() => setNotifications(remove(notifications, id))}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <button
        className="add"
        onClick={() => setNotifications(add(notifications))}
      >
        +
      </button>
    </div>
  )
}`
