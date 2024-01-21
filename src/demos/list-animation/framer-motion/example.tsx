// eslint-disable-next-line ts/ban-ts-comment
// @ts-nocheck
import './style.css'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

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
}

function Path(props: any) {
  return (
    <path
      fill="transparent"
      strokeWidth="3"
      stroke="hsl(0, 0%, 18%)"
      strokeLinecap="round"
      {...props}
    />
  )
}

export function CloseButton({ close }: { close: () => void }) {
  return (
    <button onClick={close} className="close">
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path d="M 3 16.5 L 17 2.5" />
        <Path d="M 3 2.5 L 17 16.346" />
      </svg>
    </button>
  )
}

export function remove(arr: number[], item: number) {
  const newArr = [...arr]
  newArr.splice(newArr.findIndex(i => i === item), 1)
  return newArr
}

let newIndex = 0
export function add(arr: number[]) {
  newIndex++
  return [...arr, newIndex]
}
