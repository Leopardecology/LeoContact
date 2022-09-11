const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');
const {validateContact} = require('../middleware/validation/contactValidator');

router.route('/')
    .get(contactsController.getAllContacts)
    .post(contactsController.createNewContact)
    .patch(contactsController.updateContact)
    .delete(contactsController.deleteContact);

module.exports = router;