import CountryData from "./country-data.jsx";

const CountriesList = ({countries, onShow, onHide, selectedCountry}) => {
    return (
        <ul>
            {countries.map(country => {
                const isShown = selectedCountry?.name === country.name.common
                return (
                    <li key={country.name.common}>
                        {country.name.common}
                        <button type={'button'}
                                onClick={() => (isShown ? onHide() : onShow(country))}>
                            {isShown ? 'Hide' : 'Show'}
                        </button>
                        {isShown && selectedCountry && (
                            <CountryData country={selectedCountry} />
                        )}
                    </li>
                )
            })}
        </ul>
    );
};

export default CountriesList;