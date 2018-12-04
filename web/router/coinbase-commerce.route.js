const controllers = require('../../controllers/index.controller');

const express = require('express');
const router = express.Router();

router.get('/', controllers.coinbaseCommereceController.index);
router.post('/webhoockResponse', controllers.coinbaseCommereceController.webhoockResponse);
router.get('/charges', controllers.coinbaseCommereceController.charges);
router.get('/lists', controllers.coinbaseCommereceController.lists);
router.get('/test', controllers.coinbaseCommereceController.test);
module.exports = router;