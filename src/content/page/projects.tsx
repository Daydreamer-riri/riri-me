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
        name: 'ca-git',
        desc: 'Commitizen CLI adapter',
        // iconClass: 'i-carbon-plug',
        icon: () => <i>1234</i>,
        link: 'https://cz-git.qbb.sh/guide/introduction',
      },
      {
        name: 'czg',
        desc: 'Commitizen CLI alternative',
        iconClass: 'i-carbon:terminal',
        link: 'https://cz-git.qbb.sh/cli/',
      },
    ],
    'VS Code Extensions:': [
      {
        name: 'vitesse-qb',
        desc: 'VS Code theme fork by Vitesse Theme',
        iconClass: 'i-carbon-campsite',
        link: 'https://github.com/Zhengqbbb/vitesse-qb-vscode-theme',
      },
    ],
    'Toys': [
      {
        name: 'qb-coin',
        desc: 'Manage and view BSC coins in terminal',
        iconClass: 'i-carbon:condition-wait-point',
        link: 'https://github.com/Zhengqbbb/qb-coin',
      },
    ],
  },
}

export default projects
