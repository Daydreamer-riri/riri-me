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
    // 'Toys': [
    //   {
    //     name: 'qb-coin',
    //     desc: 'Manage and view BSC coins in terminal',
    //     iconClass: 'i-carbon:condition-wait-point',
    //     link: 'https://github.com/Zhengqbbb/qb-coin',
    //   },
    // ],
  },
}

export default projects
