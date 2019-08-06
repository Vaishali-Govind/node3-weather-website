const request = require('request');


const forecaste = (lat,long,callback) => {
    const url = 'https://api.darksky.net/forecast/75ea8f2fe0f07b50be2d3ff44edc02ca/' +lat+ ',' +long + "?units=si";
     request({url, json: true},(error,{body}) => {
         if(error) {
             callback('unable to connect to services',undefined);

         }else if(body.error) {
             callback('data incorrect',undefined);

         }else {
             callback(undefined, {
                 temprature: body.currently.temperature,
                 Rain: body.currently.precipProbability,
                 summary:body.daily.data[0].summary,
                 temperatureHigh: body.daily.data[0].temperatureHigh,
                 temperatureLow:body.daily.data[0].temperatureLow,
                // sunriseTime:body.daily.data[0].sunriseTime,
                // sunsetTime:body.daily.data[0].sunsetTime
            
             });
         }
     })
}
module.exports = forecaste;
