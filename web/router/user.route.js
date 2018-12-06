const controllers = require('../../controllers/index.controller');

const express = require('express');
const router = express.Router();

router.get('/', controllers.userController.index);
router.post('/user-login', controllers.userController.userLogin);
router.post('/admin-login', controllers.userController.adminLogin);
router.get('/checkout-list', controllers.userController.checkoutList);
module.exports = router;