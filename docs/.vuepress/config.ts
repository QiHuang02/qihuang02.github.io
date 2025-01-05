import { defineUserConfig } from 'vuepress';
import { viteBundler } from '@vuepress/bundler-vite';
import { plumeTheme } from 'vuepress-theme-plume';

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'QiHuang02的笔记本',
  
  description: 'An Docs based on vuepress and written with my notes',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', sizes: '16*16', href: '/favicon.svg'}],
    ['link', { rel: 'icon', type: 'image/svg+xml', sizes: '32*32', href: '/favicon.svg'}],
    ['link', { rel: 'shortcut icon', type: 'image/svg+xml', sizes: '16*16', href: '/favicon.svg'}],
    ['link', { rel: 'shortcut icon', type: 'image/svg+xml', sizes: '32*32', href: '/favicon.svg'}],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'}],
    ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg'}],
    ['link', { rel: "preconnect", href: "https://static.zeoseven.com", crossorigin: ""}],
    ['link', { rel: "stylesheet", href: "https://static.zeoseven.com/zsft/442/main/result.css"}]
  ],

  bundler: viteBundler(),
  shouldPrefetch: false,

  theme: plumeTheme({
    // 添加您的部署域名
    hostname: 'https://qihuang02.cn',
    // your git repo url
    docsRepo: 'https://github.com/QiHuang02/qihuang02.github.io',
    docsDir: 'docs',

    editLinkText: '帮助我修改错误',

    changelog: true,
    contributors: { mode: 'block' },

    blog: {
      include: [
        'blog/*.md'
      ]
    },

    plugins: {
      /**
       * Shiki 代码高亮
       * @see https://theme-plume.vuejs.press/config/plugins/code-highlight/
       */
      shiki: {
        languages: ['typescript', 'javascript', 'css', 'html', 'json', 'shell'],
        twoslash: false
      },

      /**
       * markdown enhance
       * @see https://theme-plume.vuejs.press/config/plugins/markdown-enhance/
       */
      markdownEnhance: {
        demo: true,
      //   include: true,
      //   chart: true,
      //   echarts: true,
      //   mermaid: true,
      //   flowchart: true,
      },

      /**
       *  markdown power
       * @see https://theme-plume.vuejs.press/config/plugin/markdown-power/
       */
      markdownPower: {
        // pdf: true,
        // caniuse: true,
        plot: true,
        // bilibili: true,
        // youtube: true,
        // icons: true,
        // codepen: true,
        // replit: true,
        // codeSandbox: true,
        // jsfiddle: true,
        // repl: {
        //   go: true,
        //   rust: true,
        //   kotlin: true,
        // },
      },

      /**
       * comments
       * @see https://theme-plume.vuejs.press/guide/features/comments/
       */
      comment: {
        provider: 'Giscus', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
        comment: true,
        repo: 'QiHuang02/qihuang02.comment',
        repoId: 'R_kgDOM7Uw0A',
        category: 'General',
        categoryId: 'DIC_kwDOM7Uw0M4CjDTS',
        mapping: 'pathname',
        reactionsEnabled: true,
        inputPosition: 'top',
      },

      git: true
    },
  }),
})
