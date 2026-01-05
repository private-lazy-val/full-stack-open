const CountryData = ({country}) => {
    const name = country.name.common
    const area = country.area
    const capital = country.capital?.[0] ?? '—'
    const languages = country.languages ? Object.values(country.languages) : []
    const flag = country.flags.svg
    return (
        <div>
            <h2>{name}</h2>
            <p>Capital {capital}</p>
            <p>Area {area}</p>
            <h3>Languages</h3>
            <ul>{languages.map(language => (
                <li key={language}>{language}</li>
            ))}</ul>
            <img src={flag} alt={`Flag of ${name}`} width={200} height={200}/>
        </div>
    );
};

export default CountryData;