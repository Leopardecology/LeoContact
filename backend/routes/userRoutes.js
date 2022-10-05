const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const {validateUser} = require('../middleware/validation/userValidator');

router.route('/')
    .get(userController.getAllUsers)
    .post(validateUser, userController.createNewUser)
    .patch(validateUser, userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;