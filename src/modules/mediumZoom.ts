import mediumZoom from 'medium-zoom'

export const initMediumZoom = () => {
  mediumZoom(`:not(a) > img:not(.not-zoom)`)
}
