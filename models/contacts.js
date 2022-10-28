const fs = require('fs').promises;
const path = require('path');
// const {nanoid} = require("nanoid");

const contactsPath = path.resolve('./models/contacts.json');

// TODO: udokumentuj każdą funkcję
const listContacts = async() => {
  try {
      const contactsTMP = await fs.readFile(contactsPath);
      const contacts = await JSON.parse(contactsTMP);
      return contacts 
  }
  catch(error) {
      console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const contactsTMP = await listContacts();
    const contact = await contactsTMP.filter((elem)=>elem.id===contactId.toString());
    return contact
  } 
  catch (error) {
    console.log(error.message)
    return false
  }
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
