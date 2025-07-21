/* Remaining To Do's:
- create city dropdown list filtered based on matches of the first three entered letters, to select correct city.
- Make page responsive
- When page loads, use local storage to load last entered city
*/
document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("user-input");
    const weatherDisplayContainer = document.getElementById("weather-display-container");
    const cityCoordinates = {};

     const weatherCodes = {
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
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms-day.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms-night.svg"
          }
     },
     96: {
          name: "Slight Hailstorm",
          icons: {
               day: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-day-hail.svg",
               night: "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast-night-hail.svg"
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
            cityCoordinates.name = cityData[0].name;
            cityCoordinates.latitude = cityData[0].latitude; 
            cityCoordinates.longitude = cityData[0].longitude;
            cityCoordinates.countryCode = cityData[0].country_code;
            cityCoordinates.country = cityData[0].country;
            cityCoordinates.state = cityData[0].admin1;
            console.log(cityCoordinates);
        })
        .catch((error) => {
            console.error(error);
            window.alert(`${error}: Data could not be loaded.`);
        })

    }

    const createForecastItem = (weatherObject) => {
     const forecastContainer = document.getElementById("forecast-container");
     forecastContainer.innerHTML = "";
     const dailyWeatherObj = weatherObject.daily;
     const dailyDate = dailyWeatherObj.time;
     const dailyTemperatureMax = dailyWeatherObj.temperature_2m_max;
     const dailyTemperatureMin = dailyWeatherObj.temperature_2m_min;
     const dailyWeather = dailyWeatherObj.weather_code;
     const forecastHeading = document.getElementById("forecast-heading");
     forecastHeading.innerText = "Daily Forecast";
     // console.log("Fine so far")

     for (let i = 0; i < 7; i++) {
          const forecastItem = document.createElement("div");
          forecastItem.className = "forecast-item";

          const forecastIconContainer = document.createElement("div");
          const forecastIcon = document.createElement("img");
          forecastIcon.className = "forecast-icon";
          forecastIcon.src = weatherCodes[dailyWeather[i]].icons.day;
          forecastIconContainer.appendChild(forecastIcon);

          const forecastTemperatureContainer = document.createElement("div");
          forecastTemperatureContainer.className = "forecast-temp-container";
          const forecastMinTemperature = document.createElement("div");
          forecastMinTemperature.className = "forecast-min-temp";
          forecastMinTemperature.innerText = `${dailyTemperatureMin[i]}°C`;

          const forecastMaxTemperature = document.createElement("div");
          forecastMaxTemperature.className = "forecast-max-temp";
          forecastMaxTemperature.innerText = `${dailyTemperatureMax[i]}°C`;

          const forecastDate = document.createElement("div");
          forecastDate.className = "forecast-date";
          forecastDate.innerText = `${dailyDate[i]}`;

          forecastTemperatureContainer.appendChild(forecastMaxTemperature);
          forecastTemperatureContainer.appendChild(forecastMinTemperature);
          
          forecastItem.appendChild(forecastDate);
          forecastItem.appendChild(forecastIconContainer);
          forecastItem.appendChild(forecastTemperatureContainer);

          forecastContainer.appendChild(forecastItem);
     }
    }

    const fetchWeatherInfo = async () => {
        await fetchGeolocation();
        const {latitude, longitude, name, state, country, countryCode} = cityCoordinates;
        console.log(latitude, longitude, name, state, country, countryCode);

        const cityTitle = document.getElementById("city-title");
        const currentWeatherIcon = document.getElementById("current-weather-icon");
        const currentTemperature = document.getElementById("current-temperature");
        const currentWeatherDescription = document.getElementById("current-weather-description");
        const apparentTemperature = document.getElementById("apparent-temperature");
        const apparentTemperatureIcon = document.getElementById("apparent-temperature-icon");
        const surfacePressure = document.getElementById("surface-pressure");
        const surfacePressureIcon = document.getElementById("surface-pressure-icon");
        const relativeHumidity = document.getElementById("relative-humidity");
        const relativeHumidityIcon = document.getElementById("relative-humidity-icon");
        const windBeaufort = document.getElementById("wind-beaufort-icon");
        const windSpeed = document.getElementById("wind-speed");


        axios
        .get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&current=is_day,temperature_2m,surface_pressure,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m`)
        .then((response) => {
            const weatherData = response.data;
            const currentWeather = weatherData.current;
            const currentUnits = weatherData.current_units;

          //If city is located in the US -> state name gets appanded, otherwise country name
            countryCode === "US" ? cityTitle.innerHTML = `${name}<span class="region">(${state})</span>`: cityTitle.innerHTML = `${cityCoordinates.name}<span class="region">(${country})</span>`;
            
            if (currentWeather.is_day === 1) {
               currentWeatherIcon.src = weatherCodes[currentWeather.weather_code].icons.day;
            } 
            else if (currentWeather.is_day === 0) {
               currentWeatherIcon.src = weatherCodes[currentWeather.weather_code].icons.night;
            }

            currentTemperature.innerText = `${currentWeather.temperature_2m}${currentUnits.temperature_2m}`;

            currentWeatherDescription.innerText = weatherCodes[currentWeather.weather_code].name;

            apparentTemperature.innerText = `${currentWeather.apparent_temperature}${currentUnits.apparent_temperature}`;
            apparentTemperatureIcon.src = "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thermometer.svg";

            surfacePressure.innerText = `${currentWeather.surface_pressure} ${currentUnits.surface_pressure}`;
            
            if(currentWeather.surface_pressure > 1015 && currentWeather.surface_pressure < 1030) {
            surfacePressureIcon.src = "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/pressure-high.svg";
            } 
            else if (currentWeather.surface_pressure > 1030) {
            surfacePressureIcon.src = "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/pressure-high-alt.svg";
            } 
            else if (currentWeather.surface_pressure < 1010 && currentWeather.surface_pressure > 980) {
            surfacePressureIcon.src = "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/pressure-low.svg";
            } 
            else if (currentWeather.surface_pressure < 980) {
            surfacePressureIcon.src = "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/pressure-low-alt.svg";
            } 

            relativeHumidity.innerText = `${currentWeather.relative_humidity_2m}${currentUnits.relative_humidity_2m}`;

            if (currentWeather.wind_speed_10m >= 0 && currentWeather.wind_speed_10m < 2) {
               windBeaufort.src = "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind-beaufort-0.svg";
            } 
            else if (currentWeather.wind_speed_10m >= 2 && currentWeather.wind_speed_10m  <= 6) {
               windBeaufort.src = "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind-beaufort-1.svg";
            }
            else if (currentWeather.wind_speed_10m > 6 && currentWeather.wind_speed_10m  <= 11) {
               windBeaufort.src = "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind-beaufort-2.svg";
            }
            else if (currentWeather.wind_speed_10m > 11 && currentWeather.wind_speed_10m  <= 19) {
               windBeaufort.src = "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind-beaufort-3.svg";
            }
            else if (currentWeather.wind_speed_10m > 19 && currentWeather.wind_speed_10m  <= 30) {
               windBeaufort.src = "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind-beaufort-4.svg";
            }
            else if (currentWeather.wind_speed_10m > 30 && currentWeather.wind_speed_10m  <= 39) {
               windBeaufort.src = "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind-beaufort-5.svg";
            }
            else if (currentWeather.wind_speed_10m > 39 && currentWeather.wind_speed_10m  <= 50) {
               windBeaufort.src = "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind-beaufort-6.svg";
            }
            else if (currentWeather.wind_speed_10m > 50 && currentWeather.wind_speed_10m  <= 61) {
               windBeaufort.src = "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind-beaufort-7.svg";
            }
            else if (currentWeather.wind_speed_10m > 61 && currentWeather.wind_speed_10m  <= 74) {
               windBeaufort.src = "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind-beaufort-8.svg";
            }
            else if (currentWeather.wind_speed_10m > 74 && currentWeather.wind_speed_10m  <= 88) {
               windBeaufort.src = "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind-beaufort-9.svg";
            }
            else if (currentWeather.wind_speed_10m > 88 && currentWeather.wind_speed_10m  <= 102) {
               windBeaufort.src = "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind-beaufort-10.svg";
            }
            else if (currentWeather.wind_speed_10m > 102 && currentWeather.wind_speed_10m  <= 117) {
               windBeaufort.src = "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind-beaufort-11.svg";
            }
            else if (currentWeather.wind_speed_10m > 117) {
               windBeaufort.src = "https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/wind-beaufort-12.svg";
            };

            windSpeed.innerText = `${currentWeather.wind_speed_10m}${currentUnits.wind_speed_10m}`;
            createForecastItem(weatherData);
            weatherDisplayContainer.style.display = "flex";
        })
        .catch((error) => {
          console.error(`${error}: Oops something went wrong!`)
        })
    }



    userInput.addEventListener("keydown", (e) => {
        if(e.key === "Enter") {
            fetchWeatherInfo();
            userInput.value = "";
        }
    })
})