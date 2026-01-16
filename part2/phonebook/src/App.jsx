import {useEffect, useRef, useState} from 'react'
import Filter from "./components/filter.jsx";
import PersonForm from "./components/person-form.jsx";
import Persons from "./components/persons.jsx";
import personService from './services/persons.js'
import Notification from "./components/notification.jsx";


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filteredName, setFilteredName] = useState('')
    const [notification, setNotification] = useState(null)

    const notificationTimeoutRef = useRef(null)

    const showNotification = (message, type) => {
        setNotification({message, type})

        // cancel the previous auto-hide
        if (notificationTimeoutRef.current) {
            clearTimeout(notificationTimeoutRef.current)
        }

        notificationTimeoutRef.current = setTimeout(() => {
            setNotification(null)
            notificationTimeoutRef.current = null
        }, 5000)
    }

    useEffect(() => {
        personService.getAll().then(setPersons)

        // cleanup on unmount
        return () => {
            if (notificationTimeoutRef.current) {
                clearTimeout(notificationTimeoutRef.current)
            }
        }
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        const name = newName.trim()
        const number = newNumber.trim()

        if (!name || !number) {
            alert('Name and number are required')
            return
        }

        const existingPerson = persons.find(
            person => person.name.toLowerCase() === name.toLowerCase()
        );

        // If person exists and number is the same -> just inform
        if (existingPerson && existingPerson.number === number) {
            alert(`${name} is already added to phonebook`)
            return
        }

        // If person exists and number is different -> ask to replace
        if (existingPerson && number !== existingPerson.number) {
            const ok = window.confirm(
                `${name} is already added to the phonebook, replace the old number with a new number?`
            );
            if (!ok) return

            const changedPerson = {...existingPerson, number}

            personService
                .replace(existingPerson.id, changedPerson)
                .then(returnedPerson => {
                    setPersons(prev => prev.map(p => p.id === returnedPerson.id
                        ? returnedPerson
                        : p))
                    setNewName('')
                    setNewNumber('')
                    showNotification(`Updated ${returnedPerson.name}`, 'success')
                })
                .catch((error) => {
                    const message = error.response?.data?.error
                        || `Information of ${existingPerson.name} has already been removed from the server`
                    showNotification(message, 'error')

                    if (message === 'number is the same as before' || message === 'name cannot be changed') {
                        personService.getAll().then(setPersons)
                    } else { // person was deleted from the server
                        setPersons((prev) => prev.filter(p => p.id !== existingPerson.id))
                        setNewName('')
                        setNewNumber('')
                    }
                })
            return
        }

        // Otherwise create new
        const personObject = {name, number}

        personService
            .create(personObject)
            .then((returnedPerson) => {
                setPersons((prev) => prev.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
                showNotification(`Added ${returnedPerson.name}`, 'success')
            })
            .catch((error) => {
                const message = error.response?.data?.error || 'something went wrong'
                if (error.response?.status === 409) { // already exists
                    personService.getAll().then(setPersons)
                    setNewName('')
                    setNewNumber('')
                }
                showNotification(message, 'error')
            });
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handlePersonFilter = (event) => {
        setFilteredName(event.target.value)
    }

    const handleDelete = (person) => {
        const ok = window.confirm(`Delete ${person.name}?`)
        if (!ok) return

        personService
            .delete(person.id)
            .then(() => {
                setPersons((prev) => prev.filter(p => p.id !== person.id))
                showNotification(`Deleted ${person.name}`, 'success')
            })
            .catch(() => {
                    showNotification(
                        `Information of ${person.name} has already been removed from the server`,
                        'error'
                    )
                    setPersons((prev) => prev.filter(p => p.id !== person.id))
                }
            )
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notification={notification}/>
            <Filter filteredName={filteredName} handlePersonFilter={handlePersonFilter}/>

            <h3>Add a new</h3>
            <PersonForm handleSubmit={handleSubmit}
                        newName={newName}
                        handleNameChange={handleNameChange}
                        newNumber={newNumber}
                        handleNumberChange={handleNumberChange}/>

            <h3>Numbers</h3>
            <Persons persons={persons} filteredName={filteredName} onDelete={handleDelete}/>
        </div>
    )
}

export default App;