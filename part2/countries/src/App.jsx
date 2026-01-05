import {useEffect, useMemo, useState} from 'react'
import countryService from './services/countries.js'
import CountrySearch from "./components/country-search.jsx";
import CountriesList from "./components/countries-list.jsx";
import CountryData from "./components/country-data.jsx";

function App() {
    const [countries, setCountries] = useState([])
    const [countryStr, setCountryStr] = useState('')
    const [countryData, setCountryData] = useState(null)

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

    const selectedCountry =
        filteredCountries.length === 1 ? filteredCountries[0] : null

    const handleShowCountryData = ((name) => {
        countryService.getCountryDataByName(name)
            .then((data) => {
            setCountryData(data)
        });
    })
    const handleHideCountryData = () => {
        setCountryData(null)
    }

    const handleCountrySearch = (e) => {
        setCountryStr(e.target.value)
    }

    return (
        <>
            <CountrySearch
                countryStr={countryStr}
                handleCountrySearch={handleCountrySearch}/>

            {filteredCountries.length > 10 && (
                <p>Too many matches, specify another filter</p>
            )}

            {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
                <CountriesList
                    countries={filteredCountries}
                    onShow={handleShowCountryData}
                    onHide={handleHideCountryData}
                    countryData={countryData}
                />
            )}
            {selectedCountry && <CountryData country={selectedCountry}/>}
        </>
    )
}

export default App
