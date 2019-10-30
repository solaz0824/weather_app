import React from 'react'

const getDate = (timestamp) => {
    const date_data = new Date(timestamp*1000)
    console.log(date)
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




// var date = new Date(1563510824*1000);

// date
// Fri Jul 19 2019 06:33:44 GMT+0200 (Central European Summer Time)
// date.getMonth() + 1
// 7
//  date.getFullYear()
// 2019
// date.getDate()
// 19