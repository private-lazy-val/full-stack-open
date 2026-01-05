import CountryData from "./country-data.jsx";

const CountriesList = ({countries, onShow, onHide, countryData}) => {
    return (
        <ul>
            {countries.map(country => {
                const isShown = countryData?.name.common === country.name.common
                return (
                    <li key={country.name.common}>
                        {country.name.common}
                        <button type={'button'}
                                onClick={() => (isShown ? onHide() : onShow(country.name.common))}>
                            {isShown ? 'Hide' : 'Show'}
                        </button>

                        {isShown && (
                            <CountryData country={countryData}/>
                        )}
                    </li>
                )
            })}
        </ul>
    );
};

export default CountriesList;