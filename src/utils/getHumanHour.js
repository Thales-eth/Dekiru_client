const getHumanHour = (createdAt) => {
    if (!createdAt) return ""
    const date = new Date(createdAt)

    let hours = date.getHours()
    let minutes = date.getMinutes()

    if (hours < 10) hours = `0${hours}`
    if (minutes < 10) minutes = `0${minutes}`

    return `${hours}:${minutes}`
}

export default getHumanHour