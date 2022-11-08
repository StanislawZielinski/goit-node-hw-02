const express = require('express')
const router = express.Router()
const contacts = require("../../models/contacts");
const joi = require('../../utils/joi/joi');

router.get('/', async (req, res, next) => {
  const response = await contacts.listContacts()
  res.status(200).json({ 
    status: 200,
    data: response });
})

router.get('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const contactsFile = await contacts.getContactById(contactId);
  const isIdFound = await contactsFile.find(contact => contact.id === contactId);

  if (isIdFound) {
    const response = await contacts.getContactById(contactId);
    res.status(200).json({ 
      status: 200,
      data: response });
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

router.post('/', async (req, res, next) => {
  const body = req.body;
    const result = joi.schemaPost.validate(body);
    const { error } = result; 
    if (error) {
      const errorMessage = error.details.map((elem)=>elem.message);
      res.status(400).json({ message: errorMessage })
    } else {
      const response = await contacts.addContact(body)
      res.status(201).json({
        status:201,
        data:response
      })
    } 
})

router.put('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const contactsFile = await contacts.getContactById(contactId);
  const isIdFound = await contactsFile.find(contact => contact.id === contactId);
  const body = req.body;
  const result = joi.schemaPut.validate(body);
  const { error } = result; 
  if (isIdFound) {
    if (!error) {
      const response = await contacts.updateContact(contactId, body);
      res.status(200).json({ 
        status: 200,
        message: response});
    } else {
      const errorMessage = error.details.map((elem)=>elem.message);
      res.status(400).json({ message: errorMessage })
    }
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const contactsFile = await contacts.getContactById(contactId);
  const isIdFound = await contactsFile.find(contact => contact.id === contactId);

  if (isIdFound) {
    await contacts.removeContact(contactId);
    res.status(200).json({ 
      status: 200,
      message: 'contact deleted'});
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})

module.exports = router
