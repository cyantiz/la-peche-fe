export const getErrorMessage = (error: any) => {
    if (typeof error.message === 'string')
        return upperCaseFirstLetter(error.message)

    if (Array.isArray(error.message))
        return upperCaseFirstLetter(error.message.join(', '))

    if (Array.isArray(error.response._data.message)) {
        return upperCaseFirstLetter(error.response._data.message.join(', '))
    }

    if (!error.response._data.message) return 'Unknown error'

    return upperCaseFirstLetter(error.response._data.message)
}

const upperCaseFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
