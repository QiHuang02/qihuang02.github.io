import { defineCollections } from 'vuepress-theme-plume'
import { blogCollection } from './blog'
import { gitCollection } from './git'
import { minecraftKubejsCollection } from './minecraft-kubejs'
import { minecraftMiscCollection } from './minecraft-misc'

export const collections = defineCollections([
  blogCollection,
  minecraftKubejsCollection,
  minecraftMiscCollection,
  gitCollection,
])
