export const defaultAPIBaseURL = '/api/'

export const getApiBaseUrl = () => {
    const runtimeConfig = useRuntimeConfig()
    const apiBaseUrl = runtimeConfig.public.apiBaseUrl

    return apiBaseUrl || defaultAPIBaseURL
}

export const noImageUrl =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'

export const swipeLimitRatioTouchDevice = 0.2
export const swipeLimitRatioDesktop = 0.6
