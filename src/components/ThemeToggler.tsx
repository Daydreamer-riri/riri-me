export default function ThemeToggler() {
  return (
    <button
      title="Toggle Color Scheme"
      className="theme-toggle-btn"
      onPointerUp={e => window.toggleDark(e)}
      type="button"
    >
      <div className="dark:i-iconamoon-mode-light-duotone i-iconamoon-mode-dark-duotone"></div>
    </button>
  )
}
