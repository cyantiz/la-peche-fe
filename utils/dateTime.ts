export function getDateFormalString(date: Date) {
    // if date is today return "Today xx:xx am/pm"
    // if yesterday return "Yesterday xx:xx am/pm"
    // if date is in the last 7 days return "Monday", "Tuesday", etc.
    // if date is in months return 1 week ago, 2 weeks ago, etc.
    // if date is in years return 1 month ago, 2 months ago, etc.
    // if date is in decades return 1 year ago, 2 years ago, etc.
    // else return the date in the format "dd/mm/yyyy"

    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const lastWeek = new Date(today)
    lastWeek.setDate(lastWeek.getDate() - 7)
    const lastMonth = new Date(today)
    lastMonth.setMonth(lastMonth.getMonth() - 1)
    const lastYear = new Date(today)
    lastYear.setFullYear(lastYear.getFullYear() - 1)
    const lastDecade = new Date(today)
    lastDecade.setFullYear(lastDecade.getFullYear() - 10)

    if (date.toDateString() === today.toDateString())
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        })
    else if (date.toDateString() === yesterday.toDateString())
        return (
            'Yesterday ' +
            date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            })
        )
    else if (date > lastWeek)
        return date.toLocaleDateString('en-US', { weekday: 'long' })
    else if (date > lastMonth)
        return `${Math.floor(
            (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 7)
        )} weeks ago`
    else if (date > lastYear)
        return `${Math.floor(
            (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30)
        )} months ago`
    else if (date > lastDecade)
        return `${Math.floor(
            (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 365)
        )} years ago`
    else return date.toLocaleDateString('en-US')
}
