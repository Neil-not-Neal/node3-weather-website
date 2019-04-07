const request = require('request')

const forecast = (latitude, longitude, callback) => { 
    //create a function that takes in long and latitude and returns the weather forecast
    //create dynamic url object
    const url = 'https://api.darksky.net/forecast/617c4a5114963c736665c335b5054606/' + encodeURIComponent(latitude) + ','+ encodeURIComponent(longitude)
    
    //require request so that it can do the HTTP request
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to retrieve weather forecast', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently '+ body.currently.temperature + ' degrees out.  There is '+ body.currently.precipProbability + '% chance of rain.')
        }


    })




}

module.exports = forecast