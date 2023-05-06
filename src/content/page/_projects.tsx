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
    // 'CLI': [
    //   {
    //     name: 'ca-git',
    //     desc: 'Commitizen CLI adapter',
    //     iconClass: 'i-carbon-plug',
    //     // icon: () => <i>1234</i>,
    //     link: 'https://cz-git.qbb.sh/guide/introduction',
    //   },
    //   {
    //     name: 'czg',
    //     desc: 'Commitizen CLI alternative',
    //     iconClass: 'i-carbon:terminal',
    //     link: 'https://cz-git.qbb.sh/cli/',
    //   },
    // ],
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
