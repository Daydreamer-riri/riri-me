import { Sandpack } from '@/demos/Sandpack'

const html = `<!DOCTYPE html>
<html>
  <head>
    <title>blowout text effect</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <section>
      <div class="section__content">
        <!-- <h1>Your Name</h1> -->
        <svg>
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">
            Your Name
          </text>
        </svg>
      </div>
    </section>
  </body>
</html>`

const css = `*,
*:after,
*:before {
  box-sizing: border-box;
}

body {
  display: grid;
  place-items: center;
  min-height: 100vh;
  font-family:  "SF Pro Text", "SF Pro Icons", "AOS Icons", "Helvetica Neue", Helvetica, Arial, sans-serif, system-ui;
  color: hsl(0 0% 100%);
  overflow-x: hidden;
}

section {
  min-height: 100vh;
  width: 100vw;
}

section {
  background: hsl(0 0% 100%);
}

.section__content {
  min-height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  position: sticky;
  top: 0;
  overflow: hidden;
}

section {
  color: hsl(0 0% 0%);
}
section .section__content {
  overflow: hidden;
}

section svg {
  --opacity: 1;
  font-weight: 600;
  font-size: clamp(2rem, 10vw + 1rem, 10rem);
  transform-origin: 50% 50%;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  opacity: 0.4;
  translate: -50% -50%;
  overflow: hidden;
}

section:nth-of-type(1) .section__content {
  overflow: visible;
  transform-style: preserve-3d;
  perspective: 100vh;
}

svg text {
  font-size: clamp(2rem, 6vw + 1rem, 6rem);
  font-weight: 600;
}

section {
  height: 200vh;
}

@supports (animation-timeline: scroll()) {
  section { view-timeline-name: --section; }

  section svg {
    animation: blow-out both ease-in, fade-in both ease-in;
    animation-timeline: --section;
    animation-range: exit-crossing 10% exit 0%, exit-crossing 10% exit-crossing 25%;
  }
  @keyframes fade-in { to { opacity: var(--opacity, 0.2); }}
  @keyframes fade-out { to { opacity: 0; }}
  @keyframes blow-out {
    0%, 95% { background: transparent; }
    to { transform: translate3d(0.04ch, 0, 99vh); background: black; }
  }
}`

export function BlowoutTextEffect() {
  return (
    <Sandpack
      template="static"
      files={{
        '/index.html': html,
        '/styles.css': css,
      }}
    />
  )
}
