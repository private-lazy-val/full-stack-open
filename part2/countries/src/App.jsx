import {useEffect, useMemo, useState} from 'react'
import countryService from './services/countries.js'
import CountrySearch from "./components/country-search.jsx";
import CountriesList from "./components/countries-list.jsx";
import CountryData from "./components/country-data.jsx";

const toCountryView = (data) => ({
    name: data.name?.common ?? '—',
    capital: data.capital?.[0] ?? '—',
    area: data.area ?? 0,
    languages: data.languages ? Object.values(data.languages) : [],
    flag: data.flags?.svg ?? data.flags?.png ?? '',
    alt: data.flags?.alt ?? `Flag of ${data.name?.common ?? `the country`}`,
    lat: data.capitalInfo?.latlng?.[0] ?? null,
    lon: data.capitalInfo?.latlng?.[1] ?? null,
});

function App() {
    const [countries, setCountries] = useState([])
    const [countryStr, setCountryStr] = useState('')
    const [selectedCountry, setSelectedCountry] = useState(null)

    // Fetch all countries once
    useEffect(() => {
        countryService
            .getAll()
            .then(setCountries)
    }, [])

    const filter = countryStr.trim().toLowerCase()

    const filteredCountries = useMemo(() => {
        if (!filter) return []
        return countries.filter(c => c.name.common.toLowerCase().includes(filter))

    }, [countries, filter])


    // auto-show when exactly 1 match
    useEffect(() => {
        if (filteredCountries.length === 1) {
            setSelectedCountry(toCountryView(filteredCountries[0]))
        } else {
            // if user changes filter, remove previous selection
            setSelectedCountry(null)
        }
    }, [filteredCountries]);

    const handleShowCountryData = (country) => {
        setSelectedCountry(toCountryView(country))
    }
    const handleHideCountryData = () => {
        setSelectedCountry(null)
    }

    const handleSearchCountry = (e) => {
        setCountryStr(e.target.value)
    }

    return (
        <>
            <CountrySearch
                countryStr={countryStr}
                handleCountrySearch={handleSearchCountry}/>

            {filteredCountries.length > 10 && (
                <p>Too many matches, specify another filter</p>
            )}

            {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
                <CountriesList
                    countries={filteredCountries}
                    onShow={handleShowCountryData}
                    onHide={handleHideCountryData}
                    selectedCountry={selectedCountry}
                />
            )}
            {filteredCountries.length === 1 && selectedCountry && (
                <CountryData country={selectedCountry}/>)}
        </>
    )
}

export default App
