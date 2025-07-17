document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("user-input");
    const weatherDisplayContainer = document.getElementById("weather-display-container");
    const cityCoordinates = {};

const weather_codes = {
     0: {
          name: "Clear Sky",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-night.svg"
          }
     },
     1: {
          name: "Mainly Clear",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-night.svg"
          }
     },
     2: {
          name: "Partly Cloudy",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-day.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-night.svg"
          }
     },
     3: {
          name: "Overcast",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night.svg"
          }
     },
     45: {
          name: "Fog",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/fog-day.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/fog-night.svg"
          }
     },
     48: {
          name: "Rime Fog",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/fog-day.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/fog-night.svg"
          }
     },
     51: {
          name: "Light Drizzle",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-day-drizzle.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-night-drizzle.svg"
          }
     },
     53: {
          name: "Moderate Drizzle",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/drizzle.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/drizzle.svg"
          }
     },
     55: {
          name: "Heavy Drizzle",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-drizzle.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-drizzle.svg"
          }
     },
     56: {
          name: "Light Freezing Drizzle",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/sleet.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/sleet.svg"
          }
     },
     57: {
          name: "Dense Freezing Drizzle",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/sleet.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/sleet.svg"
          }
     },
     61: {
          name: "Slight Rain",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-day-rain.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-night-rain.svg"
          }
     },
     63: {
          name: "Moderate Rain",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/rain.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/rain.svg"
          }
     },
     65: {
          name: "Heavy Rain",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-rain.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-rain.svg"
          }
     },
     66: {
          name: "Light Freezing Rain",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-sleet.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-sleet.svg"
          }
     },
     67: {
          name: "Heavy Freezing Rain",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/extreme-day-sleet.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/extreme-night-sleet.svg"
          }
     },
     71: {
          name: "Slight Snowfall",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-day-snow.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-night-snow.svg"
          }
     },
     73: {
          name: "Moderate Snowfall",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/snow.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/snow.svg"
          }
     },
     75: {
          name: "Heavy Snowfall",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-snow.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-snow.svg"
          }
     },
     77: {
          name: "Snow Grains",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/snow.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/snow.svg"
          }
     },
     80: {
          name: "Slight Rain Showers",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-day-rain.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-night-rain.svg"
          }
     },
     81: {
          name: "Moderate Rain Showers",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-rain.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-rain.svg"
          }
     },
     82: {
          name: "Violent Rain Showers",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/extreme-day-rain.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/extreme-night-rain.svg"
          }
     },
     85: {
          name: "Light Snow Showers",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-day-snow.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-night-snow.svg"
          }
     },
     86: {
          name: "Heavy Snow Showers",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/extreme-day-snow.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/extreme-night-snow.svg"
          }
     },
     95: {
          name: "Thunderstorm",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms.svg"
          }
     },
     96: {
          name: "Slight Hailstorm",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/hail.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/hail.svg"
          }
     },
     99: {
          name: "Heavy Hailstorm",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/extreme-day-hail.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/extreme-night-hail.svg"
          }
     }
};

    const fetchGeolocation = () => {
        const city = userInput.value.trim();
        console.log(city);
        console.log(isNaN(city))
        
        if(!city || !isNaN(city))  {
            console.error("Userinput is not a valid city name.")
            return;
        } 
        
        // Need to add the return statement before axios request to be able to await updated cityCoordniates object in fetchWeatherInfo()
        return axios
        .get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
        .then((response) => {
            const cityData = response.data.results;
            cityCoordinates.latitude = cityData[0].latitude; 
            cityCoordinates.longitude = cityData[0].longitude;
            console.log(cityCoordinates);
        })
        .catch((error) => {
            console.error(error);
            weatherDisplayContainer.innerHTML = `${error}: Data could not be loaded.`;
        })

    }

    const fetchWeatherInfo = async () => {
        await fetchGeolocation();
        const {latitude, longitude} = cityCoordinates;
        console.log(latitude, longitude);

        axios
        .get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&current=is_day,temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`)
        .then((response) => {
            const weatherData = response.data;
            console.log(weatherData);
        })
    }



    userInput.addEventListener("keydown", (e) => {
        if(e.key === "Enter") {
            fetchWeatherInfo();
            userInput.value = "";
        }
    })
})