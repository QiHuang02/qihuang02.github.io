import { defineCollection } from 'vuepress-theme-plume'

export const minecraftMiscCollection = defineCollection({
  type: 'doc',
  dir: 'minecraft/misc',
  title: '我的世界小知识',
  link: '/minecraft/misc/',
  sidebar: [
    {
      text: '我的世界小知识',
      icon: 'https://zh.minecraft.wiki/images/Wiki.png?21467',
      items: [
        '前言',
        'Attribute',
        'Block',
        'Blockbench',
        'Codec',
        'DataComponents',
        'Ingredient',
        'Item',
        'LootType',
        'Resource_location',
        'Resource_pack',
      ],
    },
  ],
})
