const {check, validationResult} = require('express-validator');

exports.validateContact = [
    check('firstname')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Firstname can not be empty!')
        .bail()
        .matches(/^[A-Za-z\s]+$/).withMessage('Firstname must be alphabetic.')
        .bail()
        .isLength({min: 3})
        .withMessage('For Firstname, a minimum of 3 characters is required!')
        .bail(),
    check('lastname')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Lastname can not be empty!')
        .bail()
        .matches(/^[A-Za-z\s]+$/).withMessage('Firstname must be alphabetic.')
        .bail()
        .isLength({min: 3})
        .withMessage('For Lastname, a minimum of 3 characters is required!')
        .bail(),
    // check('email')
    //     .trim()
    //     .isEmail()
    //     .withMessage('Invalid email address!')
    //     .bail(),
    // check('telephone')
    //     .trim()
    //     .matches(/^(\+?\d+|)$/)
    //     .withMessage('Telephone needs to be a number with an optional "+" at the beginning!')
    //     .bail(),
    // check('role')
    //     .trim()
    //     .isLength({max: 50})
    //     .withMessage('For Role, a maximum of 50 characters is allowed!')
    //     .bail(),
    // check('calendar')
    //     .default(0)
    //     .trim()
    //     .isNumeric()
    //     .withMessage('Calendar amount needs to be a Number!').bail()
    //     .isLength({max: 5})
    //     .withMessage('For Calendar amount, a maximum of 5 characters is allowed!')
    //     .bail(),
    // check('annualReport')
    //     .trim()
    //     .isBoolean()
    //     .bail(),
    // check('address.street')
    //     .trim()
    //     .isLength({min: 3})
    //     .withMessage('For Street, a minimum of 3 characters is required!')
    //     .bail(),
    // check('address.city')
    //     .trim()
    //     .isLength({min: 3})
    //     .withMessage('For City, a minimum of 3 characters is required!')
    //     .bail(),
    // check('address.zip')
    //     .trim()
    //     .isNumeric()
    //     .withMessage('Zip needs to be a Number!')
    //     .bail()
    //     .isLength({min: 2})
    //     .withMessage('For Zip, a minimum of 2 characters is required!')
    //     .bail(),
    // check('address.country')
    //     .trim()
    //     .bail()
    //     .isLength({min: 2, max: 2})
    //     .withMessage('For Country, a minimum of 2 characters is required!')
    //     .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];