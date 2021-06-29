const { userController } = require('../controllers');

const router = require('express').Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;
