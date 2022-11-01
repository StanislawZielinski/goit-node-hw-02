// const fs = require('fs').promises;
// const path = require('path');
// const {nanoid} = require("nanoid");

// const contactsPath = path.resolve('./models/contacts.json');

// // TODO: udokumentuj każdą funkcję
// const listContacts = async() => {
//   try {
//       const contactsTMP = await fs.readFile(contactsPath);
//       const contacts = await JSON.parse(contactsTMP);
//       return contacts 
//   }
//   catch(error) {
//       console.log(error)
//   }
// }

// const getContactById = async (contactId) => {
//   try {
//     const contactsTMP = await listContacts();
//     const contact = await contactsTMP.filter((elem)=>elem.id===contactId.toString());
//     return contact
//   } 
//   catch (error) {
//     console.log(error.message)
//     return false
//   }
// }

// const removeContact = async (contactId) => {
//   try {
//     const contactsTMP = await listContacts();
//     const contacts = await contactsTMP.filter((elem)=>elem.id !== contactId);
//     await fs.writeFile(contactsPath,JSON.stringify(contacts));
//     return contacts

//   } 
//   catch (error) {
//     console.log(error.message)
//   }
// }

// const addContact = async (body) => {
//   try {
//     const contactsTMP = await listContacts();
//     const newContact = {
//       id:nanoid(),
//       ...body
//     }

//     const contacts = [...contactsTMP, newContact]
//     await fs.writeFile(contactsPath,JSON.stringify(contacts));
//     return contacts
//   } 
//   catch (error) {
//     console.log(error.message)
//   }
// }

// const updateContact = async (contactId, body) => {
//   try {
//     const contactsTMP = await listContacts();
//     const upDatedContacts = await contactsTMP.map((elem)=>elem.id===contactId.toString() ? {...elem,...body}: elem);
//     console.log(upDatedContacts);
//     await fs.writeFile(contactsPath,JSON.stringify(upDatedContacts));
//     const uptatedContact = await upDatedContacts.filter((elem)=>elem.id===contactId.toString());
//     return uptatedContact
//   } 
//   catch (error) {
//     console.log(error.message)
//     return false
//   }
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }


const Contact = require('../services/schemas/contactSchema')

const listContacts = async () => {
  return Contact.find()
}

const getContactById = (id) => {
  return Contact.findOne({ _id: id })
}

const addContact = (body) => {
  return Contact.create(body)
}

const updateTask = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true })
}

const removeTask = (id) => {
  return Contact.findByIdAndRemove({ _id: id })
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateTask,
  removeTask,
}