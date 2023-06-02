export const array2NaiveOptions = (array: any[]) => {
    return array.map((item) => {
        return {
            label: item,
            value: item,
        }
    })
}

export const area2NaiveOptions = (
    array: Array<{ name: string; code: string }>
) => {
    return array.map((item) => {
        return {
            label: removeAreaPrefix(item.name),
            value: item.code,
        }
    })
}

export const removeAreaPrefix = (area: string | undefined) => {
    if (!area?.length) return area
    return area.replace(
        /(Tỉnh|Thành phố|Thành Phố|Huyện|Quận|Xã|Phường|Thị xã)/,
        ''
    )
}
