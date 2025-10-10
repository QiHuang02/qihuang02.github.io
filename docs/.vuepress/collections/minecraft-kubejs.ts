import { defineCollection } from 'vuepress-theme-plume'

export const minecraftKubejsCollection = defineCollection({
  type: 'doc',
  dir: 'minecraft/kubejs',
  title: 'KubeJS 笔记',
  link: '/minecraft/kubejs/',
  sidebar: [
    {
      text: 'KubeJS笔记',
      icon: 'https://kubejs.com/img/logo/48.png',
      items: ['前言'],
    },
    {
      prefix: 'basic',
      text: 'KubeJS基本',
      icon: 'https://kubejs.com/img/logo/48.png',
      collapsed: false,
      items: [
        '介绍',
        {
          prefix: 'event',
          text: '事件',
          collapsed: true,
          items: ['client_scripts', 'server_scripts', 'startup_scripts'],
        },
        {
          prefix: 'recipe',
          text: '配方',
          collapsed: true,
          items: ['原版配方', '自定义配方'],
        },
        {
          prefix: 'registry',
          text: '注册',
          collapsed: true,
          items: [
            'Item',
            'Block',
            'Fluid',
            'Other',
            {
              prefix: 'example',
              text: '例子',
              collapsed: true,
              items: ['Item'],
            },
          ],
        },
      ],
    },
    {
      prefix: 'addons',
      text: 'KubeJS附属',
      icon: 'https://kubejs.com/img/logo/48.png',
      collapsed: false,
      items: [
        {
          prefix: 'lootjs',
          text: 'LootJS',
          collapsed: true,
          items: [
            'introduction',
            'loot_tables',
            'loot_modifiers',
            {
              prefix: 'api',
              text: 'API',
              collapsed: true,
              items: [
                'itemfilter',
                'loottable',
                'lootpool',
                'lootentry',
                'lootentrytransformer',
                'lootconditions',
                'lootfunctions',
                'lootmodifier',
                'lootcontext',
                'numberprovider',
                'range',
              ],
            },
          ],
        },
      ],
    },
    {
      prefix: 'project',
      text: '项目分享',
      icon: 'https://kubejs.com/img/logo/48.png',
      collapsed: false,
      items: ['前言', 'solar_panel', 'emendatusenigmaticajs'],
    },
  ],
})
