import jwtDecode from 'jwt-decode'
import { defineStore } from 'pinia'
import {
    LoginResponse,
    LoginRequestBody,
    AuthUser,
    AuthPayload,
    RegisterRequestBody,
    RegisterResponse,
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
            access_token: '',
            user: {},
            loading: true,
        } as AuthData),
    getters: {
        isAuth(): Boolean {
            const refreshToken = useCookie('refresh_token').value
            if (!refreshToken) return false

            try {
                const refreshTokenPayload = jwtDecode<AuthPayload>(refreshToken)

                if (!refreshTokenPayload) return false
                if (refreshTokenPayload.exp * 1000 < Date.now()) return false
            } catch (error) {
                return false
            }

            return this.access_token !== ''
        },
        bearerToken(): string {
            if (!this.access_token) return ''
            return `Bearer ${this.access_token}`
        },
    },
    actions: {
        async login(formData: LoginRequestBody) {
            const data = await useApiPost<LoginResponse>('/auth/login', {
                body: formData,
            })

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
                const refreshToken = useCookie('refresh_token').value

                if (!refreshToken) return

                const refreshTokenPayload = jwtDecode<AuthPayload>(refreshToken)

                if (!refreshTokenPayload) {
                    this.logout()
                    return
                }

                if (refreshTokenPayload.exp * 1000 < Date.now()) {
                    this.logout()
                    return
                }

                const data = await useApiPost<{
                    accessToken: string
                }>('/auth/refresh', {
                    method: 'POST',
                    body: {
                        refreshToken,
                    },
                })

                this.access_token = data.accessToken
                const payload = jwtDecode<AuthPayload>(data.accessToken)

                this.access_token = data.accessToken
                this.user = payload
            } catch (error) {
                this.logout()
            }
        },

        async initAuth() {
            this.loading = true
            try {
                await this.refreshToken()
            } catch (err) {
                this.logout()
            }
            this.loading = false
        },

        async register(formData: RegisterRequestBody) {
            const data = await useApiPost<RegisterResponse>('/auth/register', {
                body: formData,
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

        logout() {
            useCookie('refresh_token', {
                sameSite: 'strict',
            }).value = null
            if (process.client) {
                location.replace('/auth/login')
            }
        },
    },
})
