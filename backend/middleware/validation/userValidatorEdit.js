const {check, validationResult} = require('express-validator');

exports.validateUserEdit = [
    check('username')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('User name can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('Minimum 3 characters required!')
        .bail(),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('password can not be empty!')
        .bail()
        .isLength({min: 6})
        .withMessage('Minimum 6 characters required!')
        .optional({checkFalsy: true})
        .bail(),
    check('email')
        .trim()
        .isEmail()
        .not()
        .isEmpty()
        .withMessage('Invalid email address!')
        .bail(),
    check('roles')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Role can not be empty!')
        .bail()
        .isIn(["User", "Admin"])
        .withMessage('Roles can only be User or Admin!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];