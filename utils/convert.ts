export function array2NaiveOptions(array: any[]) {
    return array.map((item) => {
        return {
            label: item,
            value: item,
        }
    })
}

export function area2NaiveOptions(
    array: Array<{ name: string; code: string }>
) {
    return array.map((item) => {
        return {
            label: removeAreaPrefix(item.name),
            value: item.code,
        }
    })
}

export function removeAreaPrefix(area: string | undefined) {
    if (!area?.length) return area
    return area.replace(
        /(Tỉnh|Thành phố|Thành Phố|Huyện|Quận|Xã|Phường|Thị xã)/,
        ''
    )
}

export function uuid4ToNumeric(uuidStr: string): number {
    const cleanedStr = uuidStr.replace(/\D/g, '')

    // Convert the cleaned string to an integer
    const numericValue = parseInt(cleanedStr, 10)

    return numericValue
}
