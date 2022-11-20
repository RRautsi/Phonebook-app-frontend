import React, { useState, useEffect } from "react"
import PersonForm from "./components/PersonForm"
import FilterForm from "./components/FilterForm"
import ShowContacts from "./components/ShowContacts"
import contactService from "./services/ContactService"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const contactObject = {
    name: newName,
    number: newNumber,
  }

  const clearNameAndNumber = () => {
    setNewName("")
    setNewNumber("")
 }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilterValue(event.target.value)

  const fetchContactData = () => {
    contactService
      .getContacts()
      .then((contacts) => {
        setPersons(contacts)
    })
  }
  useEffect(fetchContactData, [])

  const addNew = (event) => {
    event.preventDefault()

    const alreadyAdded = persons.find((person) => 
      person.name.toLowerCase() === newName.toLowerCase())

    if (alreadyAdded) {
      const numberChange = { ...alreadyAdded, number: newNumber }
      if (window.confirm(
          `${alreadyAdded.name} is already added to phonebook, replace the old number with a new one?`
        )
      )
        contactService
          .editContact(alreadyAdded.id, numberChange)
          .then((changedNumber) => {
            setPersons(persons.map((person) =>
              person.id !== alreadyAdded.id ? person : changedNumber
              )
            )
            setNotification("Number updated succesfully!")
            setTimeout(() => {
              setNotification(null)
            }, 3000)
          })
          .catch((error) => {
            console.log(error)
            setErrorMessage(
              `${alreadyAdded.name} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })

    } else {
      contactService
        .postContact(contactObject)
        .then((updatedPersons) => {
          setPersons(persons.concat(updatedPersons))
          clearNameAndNumber()
          setNotification(`${contactObject.name} added!`)
          setTimeout(() => {
            setNotification(null)
        }, 3000)
      })
    }
  }

  const deleteContact = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      contactService
        .delContact(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
          setNotification(`${name} deleted`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
        .catch(() => {
          setErrorMessage(`${name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        }
      )
    }
  }

  return (
    <div className="body-custom to-teal-400 body-font">
      <h2 className="flex justify-center text-4xl antialiased py-10">Phonebook</h2>
      <Notification message={notification} error={errorMessage} />
      <div className="grid justify-center m-auto border border-black rounded-xl w-80 md:w-96 p-2">
        <h4 className="flex justify-center text-xl py-2">Filter users:</h4>
        <FilterForm
          filterValue={filterValue}
          title="Filter"
          handleFilter={handleFilterChange}
        />
        <h4 className="flex justify-center text-xl pt-5">Add new user</h4>
        <PersonForm
          newName={newName}
          newNumber={newNumber}
          handleName={handleNameChange}
          handleNumber={handleNumberChange}
          addNew={addNew}
        />
      </div>
      <div className="grid grid-cols-3 m-auto border border-black rounded-xl w-80 md:w-96 my-3 p-2">
        <h1 className="text-lg">Name</h1>
        <h1 className="text-lg">Number</h1>
        <br/>
        <ShowContacts
          persons={persons}
          filterValue={filterValue}
          deleteContact={deleteContact}
        />
      </div>
    </div>
  )
}

export default App
