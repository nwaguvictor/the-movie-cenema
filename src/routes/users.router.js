'use strict';

const { authController } = require('../controllers');

const router = require('express').Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/request_password_reset', authController.requestPasswordReset);
router.patch('/password_reset/:token', authController.passwordReset);

module.exports = router;
