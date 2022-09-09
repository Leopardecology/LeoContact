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
        .normalizeEmail()
        .not()
        .isEmpty()
        .withMessage('Invalid email address!')
        .bail(),
    // check('address')
    //     .trim()
    //     .not()
    //     .isEmpty()
    //     .withMessage('Role can not be empty!')
    //     .bail()
    //     .isIn(["User", "Admin"])
    //     .withMessage('Roles can only be User or Admin!')
    //     .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];