export const defaultAPIBaseURL = '/api/'

export const getServerEnvApiBaseUrl = () =>
    process?.env?.NUXT_PUBLIC_API_BASE_URL

export const getClientEnvApiBaseUrl = () => import.meta.env.VITE_API_BASE_URL

export const getApiBaseUrl = () => {
    const serverEnv = getServerEnvApiBaseUrl()
    const clientEnv = getClientEnvApiBaseUrl()

    return serverEnv || clientEnv || defaultAPIBaseURL
}
