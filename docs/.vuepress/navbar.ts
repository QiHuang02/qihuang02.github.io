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
        text: '目录',
        icon: 'gg:menu-boxed',
        link: '/notes/' 
      },
      {
        text: 'Minecraft',
        icon: 'https://zh.minecraft.wiki/images/Wiki.png?21467',
        items: [
          {
            text: 'KubeJS',
            icon: 'https://kubejs.com/img/logo/48.png',
            link: '/minecraft/kubejs/'
          },
          {
            text: 'Minecraft小知识',
            icon: 'fluent-mdl2:knowledge-article',
            link: '/minecraft/misc/'
          }
        ]
      },
      {
        text: 'Git',
        icon: 'fa6-brands:square-git',
        items: [
          {
            text: '常用指令',
            icon: 'fa6-brands:square-git',
            link: '/git/git_command'
          }
        ],
      }
    ]
  },
  { text: '联结', link: '/blog/Friends.md'},
  { text: '图床', link: 'https://image.qihuang02.cn/'}
])
