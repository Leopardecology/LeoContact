const {check, validationResult} = require('express-validator');

exports.validateUserEdit = [
    check('username')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Username can not be empty!')
        .bail()
        .isLength({min: 3})
        .withMessage('For Username minimum 3 characters required!')
        .bail(),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password can not be empty!')
        .bail()
        .isLength({min: 6})
        .withMessage('For Password minimum 6 characters required!')
        .optional({checkFalsy: true})
        .bail(),
    check('email')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Email address cant be empty!').bail()
        .isEmail()
        .withMessage('Invalid email address!')
        .bail(),
    check('roles')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Role can not be empty!')
        .bail()
        .isIn(["Admin", "User"])
        .withMessage('Roles can only be User or Admin!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];