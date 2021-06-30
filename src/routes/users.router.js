const { userController } = require('../controllers');

const router = require('express').Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/request_password_reset', userController.requestPasswordReset);
router.patch('/password_reset/:token', userController.passwordReset);

module.exports = router;
