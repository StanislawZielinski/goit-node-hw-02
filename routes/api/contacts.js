const express = require('express')
// const { nanoid } = require('nanoid')
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
  const {name, email, phone} = req.body;
  const canSave = [name, email, phone].every(Boolean);
  console.log(canSave);
  if (canSave) {
    const response = await contacts.addContact(name, email, phone)
    res.status(201).json({
      status:201,
      data:response
    })
  } else {
    res.status(400).json({ message: 'missing required field' })
  }


})

router.put('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const contactsTMP = await contacts.getContactById(contactId);
  const isIdFound = await contactsTMP.find(contact => contact.id === contactId);
  const body = req.body;
  const {name, email, phone} = body;
  // console.log(body)
  const canSave = [name,email,phone].some(Boolean);
  if (isIdFound) {
    if (canSave) {
      const response = await contacts.updateContact(contactId, body);
      res.status(200).json({ 
        status: 200,
        message: response});
    } else {
      res.status(400).json({ message: 'missing fields' })
    }
  } else {
    res.status(404).json({ message: 'Not found' })
  }
})


router.delete('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const contactsTMP = await contacts.getContactById(contactId);
  const isIdFound = await contactsTMP.find(contact => contact.id === contactId);

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
