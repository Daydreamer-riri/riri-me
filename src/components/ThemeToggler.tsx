export default function ThemeToggler() {
  return (
    <button
      title="Toggle Color Scheme"
      className="theme-toggle-btn"
      onClick={e => window.toggleDark(e)}
    >
      <div className="dark:i-iconamoon-mode-light-duotone i-iconamoon-mode-dark-duotone"></div>
    </button>
  )
}
