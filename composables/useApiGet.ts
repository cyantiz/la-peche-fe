import { getApiBaseUrl } from './../utils/config'
import { useAuthStore } from '~/store/auth'

export default function useApiGet<T>(url: string, opts: any = {}) {
    url = getApiBaseUrl() + url
    const bearerToken = useAuthStore().bearerToken
    const defaultHeaders = {
        Authorization: bearerToken,
    }
    return $fetch<T>(url, {
        ...opts,
        method: 'get',
        headers: {
            ...opts.headers,
            ...defaultHeaders,
        },
    })
}
