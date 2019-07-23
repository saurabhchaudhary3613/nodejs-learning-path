const request = require('request');

const geocode = (address, callback) => {
    const geoAddress = encodeURI(address);
    console.log(geoAddress);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${geoAddress}.json?access_token=pk.eyJ1Ijoic2F1cmFiaDM2MTMiLCJhIjoiY2p5Y3I4bWxrMGt3eTNpcGIyb2NjMDJlYyJ9.YHxSJM19z13SP5oE2w1wQA&limit=1`;

    request({url, json: true}, (error, response) => {
        if(error) {
            callback('unable to connect !', undefined);
        } else if(response.body.features.length === 0) {
            callback('No data found', undefined);
        }else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    });
};

module.exports = geocode;