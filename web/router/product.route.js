const controllers = require('../../controllers/index.controller');

const express = require('express');
const router = express.Router();

router.get('/', controllers.productController.index);
module.exports = router;