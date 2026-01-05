const Persons = ({persons, filteredName, onDelete}) => {
    const filterLower = filteredName.trim().toLowerCase()
    const filteredPersons = persons.filter(p =>
        p.name.toLowerCase().includes(filterLower))

    return (
        <div>
            {filteredPersons.map(person =>
                <div key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => onDelete(person)}>delete</button>
                </div>
            )}
        </div>
    );
};

export default Persons;