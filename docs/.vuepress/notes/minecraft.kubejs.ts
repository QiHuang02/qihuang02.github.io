import { defineNoteConfig } from "vuepress-theme-plume";

export default defineNoteConfig({
    dir: 'minecraft/kubejs',
    link: '/notes/minecraft/kubejs/',
    sidebar: [
        {
            text: 'KubeJS 笔记',
            icon: 'https://kubejs.com/img/logo/48.png',
            items: [
                '前言'
            ]
        },
        {
            prefix: 'basic',
            text: 'KubeJS 基本',
            icon: 'https://kubejs.com/img/logo/48.png',
            collapsed: false,
            items: [
                '介绍',
                '事件列表',
                {
                    prefix: 'recipe',
                    text: '配方',
                    collapsed: true,
                    items: [
                        '原版配方',
                        '自定义配方'
                    ]
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
                            items: [
                                'Item',
                            ]
                        }
                    ]
                }
            ]
        },
        {
            prefix: 'addons',
            text: 'KubeJS附属',
            icon: 'https://kubejs.com/img/logo/48.png',
            collapsed: false,
            items: [
                {
                    prefix: 'LootJS',
                    text: 'LootJS',
                    collapsed: true,
                    items: [
                        'Introduction',
                    ]
                }
            ]
        },
        {
            prefix: 'project',
            text: '项目分享',
            icon: 'https://kubejs.com/img/logo/48.png',
            collapsed: false,
            items: [
                '前言',
                'solar_panel',
                'emendatusenigmaticajs'
            ]
        }
    ]
})