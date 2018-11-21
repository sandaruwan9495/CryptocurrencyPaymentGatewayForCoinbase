const express = require('express');
const router = express.Router();
const accountController = require('../../controllers/account/account.controller');
router.get('/', accountController.index);
router.get('/transaction-status', accountController.callback1);
router.get('/transaction-status2', accountController.callback2);
module.exports = router;