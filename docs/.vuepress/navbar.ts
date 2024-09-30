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
        text: 'Note 目录',
        icon: 'gg:menu-boxed',
        link: '/notes/README.md'
      },
      {
        text: 'KubeJS',
        icon: 'https://kubejs.com/logo_48.png',
        link: '/notes/kubejs/前言.md'
      }
    ]
  },
  {
    text: '相关链接',
    icon: '',
    items: [
      {
        text: '我的世界相关',
        icon: 'https://www.minecraft.net/etc.clientlibs/minecraftnet/clientlibs/clientlib-site/resources/favicon.ico',
        items: [
          {
            text: '我的世界中文百科',
            icon: 'https://zh.minecraft.wiki/images/Wiki.png?21467',
            link: 'https://zh.minecraft.wiki/'
          },
          {
            text: 'NeoForged',
            icon: 'https://neoforged.net/favicon.ico',
            link: 'https://neoforged.net/'
          },
          {
            text: 'KubeJS 官方 Wiki',
            icon: 'https://kubejs.com/logo_48.png',
            link: 'https://kubejs.com/'
          },
          {
            text: 'MC百科',
            icon: 'https://www.mcmod.cn/images/favicon.ico',
            link: 'https://www.mcmod.cn/'
          }
        ]
      }
    ]
  }
])
