import { defineNoteConfig } from "vuepress-theme-plume";

export default defineNoteConfig({
    dir: 'kubejs',
    link: '/notes/kubejs/',
    sidebar: [
        {
            text: 'KubeJS 笔记',
            icon: '/images/kubejs_logo.svg',
            items: [
                '前言'
            ]
        },
        {
            prefix: 'basic',
            text: 'KubeJS 基本',
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
                }
            ]
        },
        {
            prefix: 'misc',
            text: '小知识',
            collapsed: true,
            items: [
                '介绍',
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
                }
            ]
        }
    ]
})