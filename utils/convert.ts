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
            label: item.name.replace(
                /(Tỉnh|Thành phố|Huyện|Quận|Xã|Phường|Thị xã)/,
                ''
            ),
            value: item.code,
        }
    })
}
