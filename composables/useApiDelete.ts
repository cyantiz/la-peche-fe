import { getApiBaseUrl } from './../utils/config'
import { useAuthStore } from '~/store/auth'

export default function useApiDelete<T>(url: string, opts: any = {}) {
    url = getApiBaseUrl() + url
    const bearerToken = useAuthStore().bearerToken
    const defaultHeaders = {
        Authorization: bearerToken,
    }
    return $fetch<T>(url, {
        ...opts,
        method: 'delete',
        headers: {
            ...opts.headers,
            ...defaultHeaders,
        },
    })
}
