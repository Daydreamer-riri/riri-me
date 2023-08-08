const primaryColorScheme = '' // "light" | "dark"

// Get theme data from local storage
const currentTheme = localStorage.getItem('theme')

function getPreferTheme() {
  // return theme value in local storage if it is set
  if (currentTheme) return currentTheme

  // return primary color scheme if it is set
  if (primaryColorScheme) return primaryColorScheme

  // return user device's prefer color scheme
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

let themeValue = getPreferTheme()

function setPreference() {
  localStorage.setItem('theme', themeValue)
  reflectPreference()
}

function reflectPreference() {
  document.firstElementChild.setAttribute('data-theme', themeValue)
  document.firstElementChild.className = themeValue

  document.querySelector('#theme-btn')?.setAttribute('aria-label', themeValue)
}

// set early so no page flashes / CSS is made aware
reflectPreference()

window.onload = () => {
  // set on load so screen readers can get the latest value on the button
  reflectPreference()

  // now this script can find and listen for clicks on the control
  document.querySelector('#theme-btn')?.addEventListener('click', (event) => {
    toggleDark(event)
  })
}

// sync with system changes
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({ matches: isDark }) => {
    themeValue = isDark ? 'dark' : 'light'
    setPreference()
  })

  /**
 * Credit to [@hooray](https://github.com/hooray)
 * @see https://github.com/vuejs/vitepress/pull/2347
 */
function toggleDark(event) {
  const isDark = themeValue === 'dark'
  
  // @ts-expect-error experimental API
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    && !!event

  if (!isAppearanceTransition) {
    toggle()
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(() => {
    toggle()
  })
  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: isDark
            ? [...clipPath].reverse()
            : clipPath,
        },
        {
          duration: 300,
          easing: 'ease-out',
          pseudoElement: isDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
  
  function toggle() {
    themeValue = themeValue === 'light' ? 'dark' : 'light'
    setPreference()
  }
}