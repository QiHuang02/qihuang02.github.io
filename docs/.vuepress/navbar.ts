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
  // {
  //   text: '相关链接',
  //   icon: '',
  //   items: [
  //     {
  //       text: '我的世界相关',
  //       icon: 'https://www.minecraft.net/etc.clientlibs/minecraftnet/clientlibs/clientlib-site/resources/favicon.ico',
  //       items: [
  //         {
  //           text: '我的世界中文百科',
  //           icon: 'https://zh.minecraft.wiki/images/Wiki.png?21467',
  //           link: 'https://zh.minecraft.wiki/'
  //         },
  //         {
  //           text: 'NeoForged',
  //           icon: 'https://neoforged.net/favicon.ico',
  //           link: 'https://neoforged.net/'
  //         },
  //         {
  //           text: 'KubeJS 官方 Wiki',
  //           icon: 'https://kubejs.com/logo_48.png',
  //           link: 'https://kubejs.com/'
  //         },
  //         {
  //           text: 'MC百科',
  //           icon: 'https://www.mcmod.cn/images/favicon.ico',
  //           link: 'https://www.mcmod.cn/'
  //         }
  //       ]
  //     },
  //     {
  //       text: '实用网站',
  //       icon: 'fluent:virtual-network-toolbox-20-filled',
  //       items: [
  //         {
  //           text: 'Sci-hub',
  //           icon: 'https://img.gufenxueshu.net/favicon.ico',
  //           link: 'https://gfsoso.99lb.net/sci-hub.html'
  //         }
  //       ]
  //     }
  //   ]
  // }
])
