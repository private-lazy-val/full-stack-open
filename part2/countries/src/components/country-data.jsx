import {useEffect, useState} from "react"
import weatherService from '../services/weather.js'

const CountryData = ({country}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        if (country.lat == null || country.lon == null) {
            setWeather(null)
            return
        }

        weatherService
            .getCurrentWeatherByLatLon(country.lat, country.lon)
            .then(setWeather)
    }, [country.lat, country.lon]);

    const weatherIcon = weather?.weather?.[0]?.icon
    const weatherIconUrl = weatherIcon ? `https://openweathermap.org/img/wn/${weatherIcon}@2x.png` : null

    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <h3>Languages</h3>
            <ul>{country.languages.map(language => (
                <li key={language}>{language}</li>
            ))}</ul>
            {country.flag && (
                <img src={country.flag} alt={country.alt} width={200} />
            )}

            {weather && (
                <>
                    <h3>Weather in {country.capital}</h3>
                    <p>Temperature {weather.main?.temp} Celsius</p>
                    {weatherIconUrl &&
                        <img src={weatherIconUrl} alt={weather.weather?.[0]?.description ?? 'weather icon'} width={100}/>}
                    <p>Wind {weather.wind?.speed} m/s</p>
                </>
            )}
        </div>
    );
};

export default CountryData;