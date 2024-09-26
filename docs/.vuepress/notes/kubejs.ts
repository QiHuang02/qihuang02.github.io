import { defineNoteConfig } from "vuepress-theme-plume";

export default defineNoteConfig({
    link: '/KubeJS/',
    dir: 'KubeJS',
    sidebar: [
        {
            dir: 'KubeJS',
            text: '前言',
            link: '/notes/KubeJS/前言.md'
        },
        {
            dir: 'Basic',
            text: 'KubeJS 基本',
            link: '/notes/KubeJS/Basic/README.md',
            items: [
                '事件列表',
                '简单配方'
            ]
        }
    ]
})