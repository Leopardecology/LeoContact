const {check, validationResult} = require('express-validator');

exports.validateContact = [
    check('firstname')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Firstname can not be empty!')
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
        .isLength({min: 3})
        .withMessage('For Lastname, a minimum of 3 characters is required!')
        .bail(),
    check('email')
        .trim()
        .isEmail()
        .not()
        .isEmpty()
        .withMessage('Invalid email address!')
        .bail(),
    check('address.street')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Street can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('For Street, a minimum of 3 characters is required!')
        .bail(),
    check('address.city')
        .trim()
        .not()
        .isEmpty()
        .withMessage('City can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('For City, a minimum of 3 characters is required!')
        .bail(),
    check('address.zip')
        .trim()
        .isNumeric()
        .withMessage('Zip needs to be a Number!')
        .not()
        .isEmpty()
        .withMessage('Zip can not be empty!')
        .bail()
        .isLength({min: 2})
        .withMessage('For Zip, a minimum of 2 characters is required!')
        .bail(),
    check('address.country')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Country can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('For Country, a minimum of 3 characters is required!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];