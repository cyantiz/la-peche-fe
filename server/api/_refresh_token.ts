import jwtDecode from 'jwt-decode'
import { AuthPayload } from './../../types/api/auth'
import { getApiBaseUrl } from '~/utils/config'

const REFRESH_TOKEN_NOT_FOUND_RESULT = {
    status: 400,
    body: {
        message: 'Refresh token required',
    },
}

const REFRESH_TOKEN_EXPIRED_RESULT = {
    status: 400,
    body: {
        message: 'Refresh token expired',
    },
}

// const INTERNAL_SERVER_ERROR_RESULT = {
//     status: 500,
//     body: {
//         message: 'Internal server error',
//     },
// }

export default defineEventHandler(async (event) => {
    const cookie = event.req.headers.cookie
    if (!cookie) return REFRESH_TOKEN_NOT_FOUND_RESULT

    const cookieArray = cookie.split(';')
    const refreshTokenCookie = cookieArray.find((cookie) =>
        cookie.trim().startsWith('refresh_token=')
    )
    if (!refreshTokenCookie) return REFRESH_TOKEN_NOT_FOUND_RESULT

    const refreshToken = refreshTokenCookie.split('=')[1]
    if (!refreshToken) return REFRESH_TOKEN_NOT_FOUND_RESULT

    const decodedRefreshToken = jwtDecode<AuthPayload>(refreshToken)
    if (!decodedRefreshToken) return REFRESH_TOKEN_NOT_FOUND_RESULT

    const isRefreshTokenExpired = Date.now() >= decodedRefreshToken.exp * 1000
    if (isRefreshTokenExpired) return REFRESH_TOKEN_EXPIRED_RESULT

    const baseURL = getApiBaseUrl()

    const response = await $fetch('/auth/refresh', {
        baseURL,
        method: 'post',
        body: {
            refreshToken,
        },
    })

    return response
})
