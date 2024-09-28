import { defineNoteConfig } from "vuepress-theme-plume";

export default defineNoteConfig({
    dir: 'kubejs',
    link: '/notes/kubejs/',
    sidebar: [
        {
            text: 'KubeJS 笔记',
            items: [
                '前言'
            ]
        },
        {
            prefix: 'basic',
            text: 'KubeJS 基本',
            collapsed: false,
            items: 'auto'
        }
    ]
    // sidebar: [
    //     {
    //         text: '前言',
    //         link: 'foreword.md'
    //     },
    //     {
    //         prefix: '/basic',
    //         text: 'KubeJS 基本',
    //         items: 'auto'
    //     }
    // ]
})