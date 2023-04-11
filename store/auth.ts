import jwtDecode from 'jwt-decode'
import { defineStore } from 'pinia'
import {
    LoginResponse,
    LoginRequestBody,
    AuthUser,
    AuthPayload,
} from '~/types/api/auth'

type AuthData = {
    access_token: string
    user: AuthUser
    loading: boolean
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: () =>
        ({
            access_token: useCookie('access_token').value || '',
            user: {},
            loading: true,
        } as AuthData),
    getters: {
        isAuth(): Boolean {
            return this.access_token !== ''
        },
        bearerToken(): string {
            if (!this.access_token) return ''
            return `Bearer ${this.access_token}`
        },
    },
    actions: {
        async login({ username, password }: LoginRequestBody) {
            const data = await useApiPost<LoginResponse>('/auth/login', {
                body: {
                    username,
                    password,
                },
            })

            useCookie('access_token', {
                sameSite: 'strict',
            }).value = data.accessToken
            useCookie('refresh_token', {
                sameSite: 'strict',
            }).value = data.refreshToken

            this.access_token = data.accessToken
            const payload = jwtDecode<AuthPayload>(data.accessToken)
            this.user = payload
            location.reload()
        },

        async refreshToken() {
            try {
                const data = await useApiPost<{
                    accessToken: string
                }>('/auth/refresh', {
                    method: 'POST',
                    body: {
                        refreshToken: useCookie('refresh_token').value,
                    },
                })

                this.access_token = data.accessToken
                const payload = jwtDecode<AuthPayload>(data.accessToken)

                this.access_token = data.accessToken
                this.user = payload
                useCookie('access_token', {
                    sameSite: 'strict',
                }).value = data.accessToken
            } catch (error) {}
        },

        async initAuth() {
            this.loading = true
            try {
                await this.refreshToken()
            } catch (err) {
                console.log(err)
            }
            this.loading = false
        },

        logout() {
            useCookie('access_token', {
                sameSite: 'strict',
            }).value = ''
            useCookie('refresh_token', {
                sameSite: 'strict',
            }).value = ''
            this.$reset()
            location.replace('/auth/login')
        },
    },
})
