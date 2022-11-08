const fs = require('fs').promises;
const path = require('path');
const {nanoid} = require("nanoid");

const contactsPath = path.resolve('./models/contacts.json');

// TODO: udokumentuj każdą funkcję

// fn to return list of contacts
const listContacts = async() => {
  try {
      const contactsFile = await fs.readFile(contactsPath);
      const contacts = await JSON.parse(contactsFile);
      return contacts 
  }
  catch(error) {
      console.log(error)
  }
}

// fn to return contact by ID
const getContactById = async (contactId) => {
  try {
    const contactsFile = await listContacts();
    const contact = await contactsFile.filter((elem)=>elem.id===contactId);
    return contact
  } 
  catch (error) {
    console.log(error.message)
    return false
  }
}

// fn to delete contact by ID
const removeContact = async (contactId) => {
  try {
    const contactsFile = await listContacts();
    const contacts = await contactsFile.filter((elem)=>elem.id !== contactId);
    await fs.writeFile(contactsPath,JSON.stringify(contacts));
    return contacts

  } 
  catch (error) {
    console.log(error.message)
  }
}

// fn to create contact with new ID
const addContact = async (body) => {
  try {
    const contactsFile = await listContacts();
    const newContact = {
      id:nanoid(),
      ...body
    }

    const contacts = [...contactsFile, newContact]
    await fs.writeFile(contactsPath,JSON.stringify(contacts));
    return contacts
  } 
  catch (error) {
    console.log(error.message)
  }
}

// fn to update contact 
const updateContact = async (contactId, body) => {
  try {
    const contactsFile = await listContacts();
    const upDatedContacts = await contactsFile.map((elem)=>elem.id===contactId.toString() ? {...elem,...body}: elem);
    console.log(upDatedContacts);
    await fs.writeFile(contactsPath,JSON.stringify(upDatedContacts));
    const uptatedContact = await upDatedContacts.filter((elem)=>elem.id===contactId.toString());
    return uptatedContact
  } 
  catch (error) {
    console.log(error.message)
    return false
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
