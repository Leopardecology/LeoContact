const Contact = require('../models/Contact');

// @desc Get all contacts 
// @route GET /contacts
// @access Private
const getAllContacts = async (req, res) => {
    // Get all contacts from MongoDB
    const contacts = await Contact.find().lean();

    // If no contacts 
    if (!contacts?.length) {
        return res.status(400).json({message: 'No contacts found'});
    }

    res.json(contacts);
};

// @desc Create new contact
// @route POST /contacts
// @access Private
const createNewContact = async (req, res) => {
    const {firstname, lastname, email, address, personal} = req.body;


    // Check for duplicate email
    const duplicate = await Contact.findOne({email}).collation({locale: 'en', strength: 2}).lean().exec();

    if (duplicate) {
        return res.status(409).json({message: 'Duplicate contact Email!'});
    }

    // Create and store the new contact
    const contact = await Contact.create({firstname, lastname, email, address, personal});

    if (contact) { // Created 
        return res.status(201).json({message: 'New contact created'});
    } else {
        return res.status(400).json({message: 'Invalid contact data received'});
    }

};

// @desc Update a contact
// @route PATCH /contacts
// @access Private
const updateContact = async (req, res) => {
    const {id, firstname, lastname, email, address, personal} = req.body;

    // Confirm contact exists to update
    const contact = await Contact.findById(id).exec();

    if (!contact) {
        return res.status(400).json({message: 'Contact not found'});
    }

    // Check for duplicate email
    const duplicate = await Contact.findOne({email}).collation({locale: 'en', strength: 2}).lean().exec();

    // Allow renaming of the original contact 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: 'Duplicate contact email'});
    }

    contact.firstname = firstname;
    contact.lastname = lastname;
    contact.email = email;
    contact.address = address;
    contact.personal = personal;

    const updatedContact = await contact.save();

    res.json(`'${updatedContact.email}' updated`);
};

// @desc Delete a contact
// @route DELETE /contacts
// @access Private
const deleteContact = async (req, res) => {
    const {id} = req.body;

    // Confirm data
    if (!id) {
        return res.status(400).json({message: 'Contact ID required'});
    }

    // Confirm contact exists to delete 
    const contact = await Contact.findById(id).exec();

    if (!contact) {
        return res.status(400).json({message: 'Contact not found'});
    }

    const result = await contact.deleteOne();

    const reply = `Contact '${result.email}' with ID ${result._id} deleted`;

    res.json(reply);
};

module.exports = {
    getAllContacts,
    createNewContact,
    updateContact,
    deleteContact
};