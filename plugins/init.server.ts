import { defineNuxtPlugin } from '#app'
import { useAuthStore } from '@/store/auth'

export default defineNuxtPlugin(async () => {
    await useAuthStore().initAuth()
})
