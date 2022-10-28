const express = require('express')
const router = express.Router()
const contacts = require("../../models/contacts")


router.get('/', async (req, res, next) => {
  const response = await contacts.listContacts()
  res.status(200).json({ 
    status: 200,
    data: response });
})

router.get('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const contactsTMP = await contacts.getContactById(contactId);
  const isIdFound = await contactsTMP.find(contact => contact.id === contactId);

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
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
