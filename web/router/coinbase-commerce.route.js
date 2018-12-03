const controllers = require('../../controllers/index.controller');

const express = require('express');
const router = express.Router();

router.get('/', controllers.coinbaseCommereceController.index);
router.get('/webhoockResponse', controllers.coinbaseCommereceController.webhoockResponse);
router.get('/charges', controllers.coinbaseCommereceController.charges);
module.exports = router;