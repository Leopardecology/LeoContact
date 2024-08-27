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
    const {
        salutation,
        firstname,
        lastname,
        company,
        email,
        telephonePrivate,
        telephoneBusiness,
        role,
        calendarEnglish,
        calendarGerman,
        annualReport,
        address,
        comment,
        personal,
        administration
    } = req.body;


    // Check for duplicate email
    const duplicate = await Contact.findOne({email}).collation({
        locale: 'en',
        strength: 2
    }).lean().exec();

    if (duplicate) {
        return res.status(409).json({
            "errors": [
                {
                    "location": "body",
                    "msg": "Duplicate contact Email!",
                    "param": "email"
                }
            ]
        });
    }
    try {
        // Create and store the new contact
        const contact = await Contact.create({
            salutation,
            firstname,
            lastname,
            company,
            email,
            telephonePrivate,
            telephoneBusiness,
            role,
            calendarEnglish,
            calendarGerman,
            annualReport,
            address,
            comment,
            personal,
            administration
        });

        if (contact) { // Created
            return res.status(201).json({message: 'New contact created'});
        } else {
            return res.status(400).json({message: 'Invalid contact data received'});
        }

    } catch (error) {
        // Log the error to the console
        console.error("Error creating new contact: ", error);

        // Send a detailed error response
        if (error.name === 'ValidationError') {
            return res.status(422).json({
                message: 'Validation error occurred',
                errors: error.errors
            });
        } else {
            return res.status(500).json({message: 'Internal server error'});
        }
    }
};

// @desc Update a contact
// @route PATCH /contacts
// @access Private
const updateContact = async (req, res) => {
    const {
        id,
        salutation,
        firstname,
        lastname,
        company,
        email,
        telephonePrivate,
        telephoneBusiness,
        role,
        calendarEnglish,
        calendarGerman,
        annualReport,
        address,
        comment,
        personal,
        administration
    } = req.body;

    // Confirm contact exists to update
    const contact = await Contact.findById(id).exec();

    if (!contact) {
        return res.status(400).json({message: 'Contact not found'});
    }

    // Check for duplicate email
    const duplicate = await Contact.findOne({email}).collation({
        locale: 'en',
        strength: 2
    }).lean().exec();

    // Allow renaming of the original contact
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: 'Duplicate contact email'});
    }

    contact.salutation = salutation;
    contact.firstname = firstname;
    contact.lastname = lastname;
    contact.company = company;
    contact.email = email;
    contact.telephonePrivate = telephonePrivate;
    contact.telephoneBusiness = telephoneBusiness;
    contact.role = role;
    contact.calendarEnglish = calendarEnglish;
    contact.calendarGerman = calendarGerman;
    contact.annualReport = annualReport;
    contact.address = address;
    contact.comment = comment;
    contact.personal = personal;
    contact.administration = administration;

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