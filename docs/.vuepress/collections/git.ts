import { defineCollection } from 'vuepress-theme-plume'

export const gitCollection = defineCollection({
  type: 'doc',
  dir: 'git',
  title: 'Git Command',
  link: '/git/',
  sidebar: 'auto',
})
