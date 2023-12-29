import type { ReactNode } from 'react'

export interface Project {
  name: string
  desc: string
  iconClass?: string
  icon?: () => ReactNode
  link: string
}

export interface Projects {
  title: string
  desc: string
  projects: Record<string, Project[]>
}

const projects: Projects = {
  title: 'Projects - Riri',
  desc: 'Riri\'s  Project List',
  projects: {
    'Vite Ecosystem': [
      {
        name: 'vite-react-ssg',
        desc: 'Static-site generation for React on Vite.',
        iconClass: 'i-carbon-printer',
        link: 'https://github.com/Daydreamer-riri/vite-react-ssg',
      },
    ],
    'CLI': [
      {
        name: 'img-shadower',
        desc: 'Add rounded corners and shadows to the image.',
        iconClass: 'i-fluent:image-shadow-24-regular',
        link: 'https://github.com/Daydreamer-riri/img-shadower',
      },
    ],
    'VS Code Extensions:': [
      {
        name: 'Iconfont reminder',
        desc: 'The preview of the iconfont icon component for VS Code.',
        iconClass: 'i-uil:icons',
        link: 'https://github.com/Daydreamer-riri/vscode-ext-iconfont-reminder',
      },
      {
        name: 'packages',
        desc: 'Helps JavaScript developers managing dependencies with package.json.',
        iconClass: 'i-noto-v1:package',
        link: 'https://github.com/Daydreamer-riri/vscode-ext-packages',
      },
    ],
    'Configurations': [
      {
        name: 'eslint-config',
        desc: 'My ESLint config presets',
        iconClass: 'i-simple-icons:eslint',
        link: 'https://github.com/Daydreamer-riri/eslint-config',
      },
      {
        name: 'pwsh-profile',
        desc: 'My pwsh profile',
        iconClass: 'i-simple-icons:powershell',
        link: 'https://github.com/Daydreamer-riri/pwsh-profile',
      },
    ],
    'Starter': [
      {
        name: 'Start Lib',
        desc: 'A starter template for library',
        iconClass: 'i-octicon-repo-template-24',
        link: 'https://github.com/Daydreamer-riri/starter-lib',
      },
      {
        name: 'Start VS Code',
        desc: 'Starter template for VS Code Extension',
        iconClass: 'i-octicon-repo-template-24',
        link: 'https://github.com/Daydreamer-riri/starter-vscode',
      },
    ],
  },
}

export default projects
