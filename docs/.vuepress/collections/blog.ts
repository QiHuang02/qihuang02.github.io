import { defineCollection } from 'vuepress-theme-plume'

export const blogCollection = defineCollection({
  type: 'post',
  dir: 'blog',
  title: '博客',
  link: '/blog/',
  linkPrefix: '/article/',
  postList: true,
  tags: true,
  archives: true,
  categories: true,
  postCover: 'right',
  pagination: { perPage: 15 },
})
