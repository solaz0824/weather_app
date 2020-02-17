import React from 'react'

const getDate = (timestamp) => {
    const date_data = new Date(timestamp*1000)
    const date_str = date_data.toString()
    const month = date_str.split(' ')[1]
    const date = date_data.getDate()
    const day = date_str.split(' ')[0]
    return `${date} ${day} ${month}`
}


const getTime = (timestamp) => {
    const date = new Date(timestamp*1000)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    return `${hours}:${minutes}`
}

export {getDate, getTime}



