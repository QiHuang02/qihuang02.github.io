import { defineThemeConfig } from 'vuepress-theme-plume'
// import { navbar } from './navbar'
// import { notes } from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: '/favicon.svg',

  appearance: 'dark',  // 配置 深色模式

  social: [
    { icon: 'github', link: 'https://github.com/QiHuang02' },
  ],
  // navbarSocialInclude: ['github'], // 允许显示在导航栏的 social 社交链接
  aside: true, // 页内侧边栏， 默认显示在右侧
  outline: [2, 6], // 页内大纲， 默认显示 h2, h3

  lastUpdatedText: '上次更新于',

  /**
   * 文章版权信息
   * @see https://theme-plume.vuejs.press/guide/features/copyright/
   */
  // copyright: true,

  // prevPage: true,   // 是否启用上一页链接
  // nextPage: true,   // 是否启用下一页链接
  // createTime: true, // 是否显示文章创建时间

  /* 站点页脚 */
  footer: {
    // message: 'Power by <a target="_blank" href="https://v2.vuepress.vuejs.org/">VuePress</a> & <a target="_blank" href="https://theme-plume.vuejs.press">vuepress-theme-plume</a>',
    // copyright: '',
    message: '𝓔𝔁𝓹𝓮𝓻𝓲𝓮𝓷𝓬𝓮 𝓲𝓼 𝓽𝓱𝓮 𝓫𝓮𝓼𝓽 𝓽𝓮𝓪𝓬𝓱𝓮𝓻.',
    copyright: 'Copyright © 2024 - QiHuang02'
  },

  /**
   * @see https://theme-plume.vuejs.press/config/basic/#profile
   */
  profile: {
    avatar: '/images/avatar.svg',
    name: 'QiHuang02的笔记本',
    description: '我的研究笔记',
    // circle: true,
    // location: '',
    // organization: '',
  },

  // navbar,
  // notes,

  /**
   * 公告板
   * @see https://theme-plume.vuejs.press/guide/features/bulletin/
   */
  // bulletin: {
  //   layout: 'top-right',
  //   contentType: 'markdown',
  //   title: '公告板标题',
  //   content: '公告板内容',
  // },

  /* 过渡动画 @see https://theme-plume.vuejs.press/config/basic/#transition */
  transition: {
    page: true,        // 启用 页面间跳转过渡动画
    postList: true,    // 启用 博客文章列表过渡动画
    appearance: 'circle-clip',  // 启用 深色模式切换过渡动画, 或配置过渡动画类型
  },

})
