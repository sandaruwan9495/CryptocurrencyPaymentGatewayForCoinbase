const controllers = require('../../controllers/index.controller');

const express = require('express');
const router = express.Router();

router.get('/', controllers.coinbaseCommereceController.index);
router.get('/create', controllers.coinbaseCommereceController.create);
router.post('/charge-created-webhook', controllers.coinbaseCommereceController.chargeCreatedWebhook);
router.post('/charge-pending-webhook', controllers.coinbaseCommereceController.chargePendingWebhook);
router.post('/charge-delayed-webhook', controllers.coinbaseCommereceController.chargeDelayedWebhook);
router.post('/charge-failed-webhook', controllers.coinbaseCommereceController.chargeFailedWebhook);
router.post('/charge-confirmed-webhook', controllers.coinbaseCommereceController.chargeConfiremedWebhook);
router.get('/charge-created', controllers.coinbaseCommereceController.getChargeCreated);
router.get('/charge-pending', controllers.coinbaseCommereceController.getChargePending);
router.get('/charge-delayed', controllers.coinbaseCommereceController.getChargeDelayed);
router.get('/charge-failed', controllers.coinbaseCommereceController.getChargeFailed);
router.get('/charge-confirmed', controllers.coinbaseCommereceController.getChargeConfiremed);
module.exports = router;