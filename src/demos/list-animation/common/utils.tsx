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
