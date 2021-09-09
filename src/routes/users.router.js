'use strict';

const { authController } = require('../controllers');
const { auth } = require('../middlewares/AuthMiddleware');

const router = require('express').Router();

router.post('/signup', authController.signup);
router.get('/verify', authController.verify);
router.post('/login', authController.login);
router.post('/request-password-reset', [authController.requestPasswordReset]);
router.patch('/password-reset/:token', authController.passwordReset);

module.exports = router;
