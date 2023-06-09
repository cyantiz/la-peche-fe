export const gender: Record<string, string> = {
    m: 'Man',
    f: 'Woman',
    o: 'Others',
}

export const getGender = (key: string | null) => {
    if (key === null) return 'Others'
    const result = gender[key]

    return result === undefined ? 'Others' : result
}
