const {check, validationResult} = require('express-validator');

exports.validateContact = [
    check('firstname')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('First Name can not be empty!')
        .bail()
        .isLength({min: 2})
        .withMessage('Minimum 2 characters required!')
        .bail(),
    check('lastname')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Last Name can not be empty!')
        .bail()
        .isLength({min: 2})
        .withMessage('Minimum 2 characters required!')
        .bail(),
    check('email')
        .trim()
        .isEmail()
        .not()
        .isEmpty()
        .withMessage('Invalid email address!')
        .bail(),
    // check('street')
    //     .trim()
    //     .not()
    //     .isEmpty()
    //     .withMessage('Street can not be empty!')
    //     .bail()
    //     .isLength({min: 2})
    //     .withMessage('Minimum 2 characters required!')
    //     .bail(),
    // check('city')
    //     .trim()
    //     .not()
    //     .isEmpty()
    //     .withMessage('City can not be empty!')
    //     .bail()
    //     .isLength({min: 2})
    //     .withMessage('Minimum 2 characters required!')
    //     .bail(),
    // check('zip')
    //     .trim()
    //     .isNumeric()
    //     .withMessage('Zip needs to be a Number!')
    //     .not()
    //     .isEmpty()
    //     .withMessage('Zip can not be empty!')
    //     .bail()
    //     .isLength({min: 2})
    //     .withMessage('Minimum 2 characters required!')
    //     .bail(),
    // check('country')
    //     .trim()
    //     .not()
    //     .isEmpty()
    //     .withMessage('Country can not be empty!')
    //     .bail()
    //     .isLength({min: 2})
    //     .withMessage('Minimum 2 characters required!')
    //     .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];