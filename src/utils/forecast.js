request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e7059aa8e3bec28f5b78fa3215532d77&query='+ latitude + ',' + longitude + '&units=f'    
    request({ url, json: true }, (error, {body}) => {
        console.log(error)
    if (error) {
        calback('Not able to connect', {})
    } else if (body.error) {
        callback('No location found', {})
    } else {
        callback('UNDEFINED', {
            description: body.current.weather_descriptions[0],
            current_temparature: body.current.temperature,
            feelslike: body.current.feelslike,
            humidity: body.current.humidity
        })
    }
})
}

module.exports = forecast
