import mediumZoom from 'medium-zoom'

export function initMediumZoom() {
  mediumZoom(':not(a) > img:not(.not-zoom)')
}
