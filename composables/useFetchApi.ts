import { useAuthStore } from '~/store/auth'

export default function useFetchApi<T>(url: string, opts: any = {}) {
    const SERVER_ENV_API_BASE_URL = process?.env?.NUXT_PUBLIC_API_BASE_URL
    const CLIENT_ENV_API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const defaultAPIBaseURL = '/api/'
    const API_BASE_URL =
        SERVER_ENV_API_BASE_URL || CLIENT_ENV_API_BASE_URL || defaultAPIBaseURL

    url = API_BASE_URL + url

    const bearerToken = useAuthStore().access_token

    const defaultHeaders = {
        Authorization: bearerToken ? `Bearer ${bearerToken}` : '',
    }

    function GET() {
        return $fetch<T>(url, {
            ...opts,
            method: 'get',
            headers: {
                ...opts.headers,
                ...defaultHeaders,
            },
        })
    }

    function POST() {
        return $fetch<T>(url, {
            ...opts,
            method: 'post',
            headers: {
                ...opts.headers,
                ...defaultHeaders,
            },
        })
    }

    function PUT() {
        return $fetch<T>(url, {
            ...opts,
            method: 'put',
            headers: {
                ...opts.headers,
                ...defaultHeaders,
            },
        })
    }

    function DELETE() {
        return $fetch<T>(url, {
            ...opts,
            method: 'delete',
            headers: {
                ...opts.headers,
                ...defaultHeaders,
            },
        })
    }

    return { GET, POST, PUT, DELETE }
}
