import { defineNotesConfig } from 'vuepress-theme-plume';
import KubejsNote from './kubejs';
import MiscNote from './misc';

export const notes = defineNotesConfig({
	dir: 'notes',
	link: '/',
	notes: [
		KubejsNote,
		MiscNote,
	]
})
