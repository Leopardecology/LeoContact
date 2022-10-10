const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');
const {validateContact} = require('../middleware/validation/contactValidator');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.route('/')
    .get(contactsController.getAllContacts)
    .post(validateContact, contactsController.createNewContact)
    .patch(validateContact, contactsController.updateContact)
    .delete(contactsController.deleteContact);

module.exports = router;