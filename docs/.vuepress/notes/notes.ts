import { defineNotesConfig } from 'vuepress-theme-plume';
import minecraft_kubejsNote from './minecraft.kubejs';
import minecraft_MiscNote from './minecraft.misc';
import minecraft from './minecraft';

export const notes = defineNotesConfig({
	dir: 'notes',
	link: '/',
	notes: [
		minecraft,
		minecraft_kubejsNote,
		minecraft_MiscNote,
	]
})
