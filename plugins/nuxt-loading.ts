import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.$nuxt.$router.beforeEach(() => {
        // maybe future use
    })

    nuxtApp.vueApp.$nuxt.$router.afterEach(() => {
        // maybe future use
    })
})
