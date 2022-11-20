import React from "react"
import DeleteContact from "./DeleteContact"

const ShowContacts = ({ persons, filterValue, deleteContact }) => {
  const filteredName = persons.filter((person) =>
      person.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      person.number.toString().includes(filterValue)
  )

  return filteredName.map((person) => (
    <React.Fragment key={person.name} >
      <p className="break-words">
        {person.name}
      </p>
      <p>
        {person.number}
      </p>
      <div className="pb-1">
        <DeleteContact
          id={person.id}
          name={person.name}
          deleteContact={deleteContact}
        />
      </div>
    </React.Fragment>
  ))
}

export default ShowContacts
