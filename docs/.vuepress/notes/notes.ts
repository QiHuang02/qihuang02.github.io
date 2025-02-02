import { defineNotesConfig } from 'vuepress-theme-plume'
import KubeJSNote from './kubejs'
import MiscNote from './misc'

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [
    KubeJSNote,
    MiscNote
  ],
})
