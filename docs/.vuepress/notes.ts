import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const demoNote = defineNoteConfig({
  dir: 'demo',
  link: '/demo',
  sidebar: ['', 'foo', 'bar'],
})

const kubejsNote = defineNoteConfig({
  dir: 'kubejs',
  link: '/kubejs',
  sidebar: 'auto'
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [kubejsNote],
})
