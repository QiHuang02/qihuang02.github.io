import { defineNoteConfig } from "vuepress-theme-plume";

export default defineNoteConfig({
    dir: 'kubejs',
    link: '/notes/kubejs/',
    sidebar: [
        {
            text: 'KubeJS 笔记',
            icon: 'https://kubejs.com/logo_48.png',
            items: [
                '前言'
            ]
        },
        {
            prefix: 'basic',
            text: 'KubeJS 基本',
            icon: 'https://kubejs.com/logo_48.png',
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
                                'Block'
                            ]
                        }
                    ]
                }
            ]
        },
        // {
        //     prefix: 'addons',
        //     text: 'KubeJS附属',
        //     icon: 'https://kubejs.com/logo_48.png',
        //     collapsed: false,
        //     items: [
        //         {
        //             prefix: 'LootJS',
        //             text: 'LootJS',
        //             collapsed: true,
        //             items: [
        //                 Introduction
        //             ]
        //         }
        //     ]
        // },
        {
            prefix: 'project',
            text: '项目分享',
            icon: '/images/kubejs_logo.svg',
            collapsed: false,
            items: [
                '前言',
                'solar_panel',
                'emendatusenigmaticajs'
            ]
        },
        {
            prefix: 'misc',
            text: '小知识',
            collapsed: true,
            items: [
                '介绍',
                {
                    prefix: 'basic',
                    text: 'Basic',
                    collapsed: false,
                    items: 'auto'
                },
                {
                    prefix: 'item',
                    text: 'Item',
                    collapsed: false,
                    items: 'auto'
                },
                {
                    prefix: 'block',
                    text: 'Block',
                    collapsed: false,
                    items: 'auto'
                },
                {
                    prefix: 'recipe',
                    text: 'Recipe',
                    collapsed: false,
                    items: 'auto'
                },
                {
                    prefix: 'software',
                    text: '软件分享',
                    collapsed: false,
                    items: 'auto'
                }
            ]
        }
    ]
})