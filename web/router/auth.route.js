const controllers = require('../../controllers/index.controller');

const express = require('express');
const router = express.Router();

router.get('/', controllers.authController.index);
router.post('/login', controllers.authController.userLogin);
router.get('/register', controllers.authController.userRegistration);
router.get('/client-auth-status', controllers.authController.getAccountInfo);
router.get('/account-Info', controllers.accountController.index);
module.exports = router;