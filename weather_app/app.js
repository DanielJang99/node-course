const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const address = process.argv[2];

if (address) {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return console.log("Error:", error);
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log("Error:", error);
            }
            console.log(location);
            console.log(forecastData);
        });
    });
} else {
    console.log("No address given!");
}
