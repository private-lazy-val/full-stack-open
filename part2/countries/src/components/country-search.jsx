const CountrySearch = ({countryStr, handleCountrySearch}) => {
    return (
        <div>
            find countries <input value={countryStr}
                                  onChange={handleCountrySearch}/>
        </div>
    );
};

export default CountrySearch;