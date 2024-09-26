import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume';
import kubejsNote from './kubejs';

export const notes = defineNotesConfig({
	dir: 'notes',
	link: '/',
	notes: [kubejsNote],
})
