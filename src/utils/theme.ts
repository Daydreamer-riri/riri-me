import { applyTheme, argbFromHex, themeFromSourceColor } from '@material/material-color-utilities'

const theme = themeFromSourceColor(argbFromHex('#386a1f'))

applyTheme(theme, { brightnessSuffix: true })
