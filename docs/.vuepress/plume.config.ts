import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import { notes } from './notes/notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: '/favicon.svg',
  // your git repo url
  docsRepo: 'https://github.com/QiHuang02/qihuang02.github.io',
  docsDir: 'docs',

  contributors: true,
  contributorsText: '贡献者',

  editLink: true,
  editLinkText: '编辑此页',

  appearance: 'dark',
  aside: true,

  profile: {
    avatar: './images/avatar.svg',
    name: 'QiHuang02 Docs',
    description: '一个使用Vuepress的文档站，用于存放一些我自己的笔记和小研究',
    // circle: true,
    // location: '',
    // organization: '',
  },

  navbar,
  notes,
  social: [
    { icon: 'github', link: 'https://github.com/QiHuang02' },
  ],

  autoFrontmatter: {
    title: true,
    createTime: true,
    permalink: true,
  },

  footer: {
    message: '𝓔𝔁𝓹𝓮𝓻𝓲𝓮𝓷𝓬𝓮 𝓲𝓼 𝓽𝓱𝓮 𝓫𝓮𝓼𝓽 𝓽𝓮𝓪𝓬𝓱𝓮𝓻.',
    copyright: 'Copyright © 2024 - QiHuang02'
  }
})
