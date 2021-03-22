const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=4dea61975f1c323f28555313fb8b7914&query=" +
        encodeURIComponent(latitude) +
        "," +
        encodeURIComponent(longitude);
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location services", undefined);
        } else if (body.error) {
            callback("Unable to find location. Check your input", undefined);
        } else {
            callback(
                undefined,
                body.current.weather_descriptions[0] +
                    ". It is currently " +
                    body.current.temperature +
                    " degress out, and it feels like " +
                    body.current.feelslike +
                    " degrees."
            );
        }
    });
};

module.exports = forecast;
