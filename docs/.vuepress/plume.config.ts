import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import { notes } from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: './images/netherite_gear.png',
  // your git repo url
  docsRepo: 'https://qihuang02.github.io/',
  docsDir: 'docs',

  appearance: 'force-dark',
  aside: true,

  profile: {
    avatar: './images/avatar.png',
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
    copyright: 'QiHuang02'
  }

})
