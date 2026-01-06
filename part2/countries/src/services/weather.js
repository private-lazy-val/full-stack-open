import axios from "axios"

const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getCurrentWeatherByLatLon = (lat, lon) => {
    return axios
        .get(baseUrl, {
            params: {
                lat,
                lon,
                appid: apiKey,
                units: 'metric',
            },
        })
        .then((res) => res.data);
};

export default { getCurrentWeatherByLatLon }
