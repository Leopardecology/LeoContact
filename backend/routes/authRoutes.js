const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const loginLimiter = require('../middleware/loginLimiter');

router.route('/')
    .post(loginLimiter, authController.login); //TODO: fix argument

router.route('/refresh')
    .get(authController.refresh);

router.route('/logout')
    .post(authController.logout);

module.exports = router;