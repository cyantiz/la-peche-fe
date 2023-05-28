export const defaultAPIBaseURL = '/api/'

export const getApiBaseUrl = () => {
    const runtimeConfig = useRuntimeConfig()
    const apiBaseUrl = runtimeConfig.public.apiBaseUrl

    return apiBaseUrl || defaultAPIBaseURL
}

export const noImageUrl =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
