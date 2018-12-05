const controllers = require('../../controllers/index.controller');

const express = require('express');
const router = express.Router();

router.get('/', controllers.userController.index);
router.get('/user-login', controllers.userController.userLogin);
router.get('/admin-login', controllers.userController.adminLogin);
module.exports = router;