const Filter = ({filteredName, handlePersonFilter}) => {
    return (
        <div>
            filter shown with <input value={filteredName}
                                     onChange={handlePersonFilter}/>
        </div>
    );
};

export default Filter;