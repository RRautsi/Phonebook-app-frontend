import axios from "axios";
const contactsUrl = "http://localhost:3005/api/persons"

const getContacts = () => {
    const request = axios.get(contactsUrl)
    return request.then(response => response.data)
}

const postContact = (contactObject) => {
    const request = axios.post(contactsUrl, contactObject)
    return request.then(response => response.data)
}

const delContact = (id) => {
    return axios.delete(`${contactsUrl}/${id}`)
}

const editContact = (id, changedNumber) => {
  const request = axios.put(`${contactsUrl}/${id}`, changedNumber)
  return request.then(response => response.data)
}

const contactService = {
    getContacts,
    postContact,
    delContact,
    editContact
}

export default contactService