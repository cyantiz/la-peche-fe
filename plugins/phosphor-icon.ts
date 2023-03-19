import { defineNuxtPlugin } from '#app'
import PhosphorVue from 'phosphor-vue'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PhosphorVue)
})
