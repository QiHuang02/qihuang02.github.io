import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  // { text: '标签', link: '/blog/tags/' },
  // { text: '归档', link: '/blog/archives/' },
  {
    text: '笔记',
    items: [
      {
        text: 'Catalogue',
        icon: 'gg:menu-boxed',
        link: '/notes/README.md'
      },
      {
        text: 'Minecraft',
        icon: 'https://zh.minecraft.wiki/images/Wiki.png?21467',
        link: '/notes/minecraft/前言.md'
      },
      {
        text: 'Git',
        icon: 'fa6-brands:square-git',
        link: '/notes/git/git_command.md'
      }
    ]
  },
  { text: '联结', link: '/Friends.md'},
  { text: '图床', link: 'https://image.qihuang02.cn/'}
])
