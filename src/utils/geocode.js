request = require('postman-request')

const geocode = (address = {}, callback = {}) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicGFkbWFuYWJoYW4iLCJhIjoiY2wxbm1sZ2FlMHUyOTNjb2IxMDd5aGM3ZiJ9.XSMRTUETKChMDa0HNARiYw&limit=1'
    request({ url, json: true }, (error, {body}) => {
        if (error){
            callback('Not able to connect', {})
        } else if (body.features.length === 0) {
           callback('No location found in mapbox', {}) 
        } else {
            callback({}, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
            })
        }
    })
    }

    module.exports = geocode
