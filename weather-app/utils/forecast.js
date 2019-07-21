const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const lat = latitude;
    const long = longitude;

    const url = `https://api.darksky.net/forecast/4b38d499236b59d8aaa1df877e37ac2f/${lat},${long}`;
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('unable to connect !', undefined);
        }else if(body.error) {
            callback(body.error, undefined);
        }else {
            const data = body;
            const currentData = body.currently;
            const temp = currentData.temperature;
            const humid = currentData.humidity;
            callback(undefined, data.daily.data[0].summary + ` It is currently ${temp} degree out. There is ${humid}% chance of rain.`);
        }
    })
}

module.exports = forecast;