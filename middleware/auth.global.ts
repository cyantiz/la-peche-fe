import { useAuthStore } from '~/store/auth'

export default defineNuxtRouteMiddleware((to) => {
    const auth = useAuthStore()

    const isAuth = computed(() => auth.isAuth)

    if (!isAuth.value && !to.fullPath.startsWith('/auth')) {
        return navigateTo('/auth/login')
    }

    if (isAuth.value && to.fullPath.startsWith('/auth')) {
        return navigateTo('/')
    }
})
