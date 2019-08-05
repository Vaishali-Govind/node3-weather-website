const request = require('request');


const forecaste = (lat,long,callback) => {
    const url = 'https://api.darksky.net/forecast/75ea8f2fe0f07b50be2d3ff44edc02ca/'+ lat +','+ long
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
                 icon: body.currently.icon
             });
         }
     })
}
module.exports = forecaste;
