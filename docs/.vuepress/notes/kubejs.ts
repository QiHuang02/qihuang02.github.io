import { defineNoteConfig } from "vuepress-theme-plume";

export default defineNoteConfig({
    link: '/KubeJS/',
    dir: 'KubeJS',
    sidebar: [
        {
            dir: 'KubeJS',
            text: 'KubeJS',
            link: '/notes/KubeJS/README.md',
            items: 'auto'
        },
        {
            dir: 'Basic',
            text: 'KubeJS 基本',
            items: 'auto'
        },
        {
            dir: 'Misc',
            text: '杂项 & 小知识',
            items: 'auto'
        }
    ]
})