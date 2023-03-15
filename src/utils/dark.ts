const primaryColorScheme = '' // "light" | "dark"

// Get theme data from local storage
const currentTheme = localStorage.getItem('theme')

export function getPreferTheme() {
  // return theme value in local storage if it is set
  if (currentTheme)
    return currentTheme

  // return primary color scheme if it is set
  if (primaryColorScheme)
    return primaryColorScheme

  // return user device's prefer color scheme
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

const themeValue = getPreferTheme()

export function setPreference() {
  localStorage.setItem('theme', themeValue)
  reflectPreference()
}

export function reflectPreference() {
  document.documentElement.setAttribute('data-theme', themeValue)
}
