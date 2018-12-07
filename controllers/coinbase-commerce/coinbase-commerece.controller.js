'use_strict'
let coinbase = require('coinbase-commerce-node');
let Charge = coinbase.resources.Charge;
const common_helper = require('../common_helper.controller');
let db = require('../../models/dbconfig');
exports.index = function (req, res) {
    db.Charge.findAll({
		include: [{
			model: db.User, required: true
		}]
	}).then((charges) => {
            common_helper.send_success(res, "all charges", charges)
        })
        .catch((err) => {
            common_helper.send_error(res, err, "database Error")
        })
}
exports.create = (req, res) => {
    db.User.findById(req.query.user_id)
        .then((user) => {
            if (user != null) {
                db.Product.findById(req.query.id)
                    .then((product) => {
                        var chargeData = {
                            'name': product.name,
                            'description': 'Sample Cource',
                            'local_price': {
                                'amount': product.price,
                                'currency': 'LKR'
                            },
                            'pricing_type': 'fixed_price'
                        }
                        Charge.create(chargeData, (err, createdCharge) => {
                            if (!err) {
                                db.Charge.create({
                                    UserId: req.query.user_id,
                                    code: createdCharge.code,
                                    productName: createdCharge.name,
                                    hostedUrl: createdCharge.hosted_url,
                                    description: createdCharge.description,
                                    ChargeCreateAt: createdCharge.created_at,
                                    ChargeExpiredAt: createdCharge.expires_at,
                                    price: createdCharge.pricing.local.amount,
                                    priceUnit: createdCharge.pricing.local.currency,
                                    pricingType: createdCharge.pricing_type,
                                })
                                    .then((charge) => {
                                        if (charge != null) {
                                            common_helper.send_success(res, "charge create successfull", charge)
                                        } else {
                                            common_helper.send_status_false(res, "charge create successfull but not inserted to the database")
                                        }
                                    })
                                    .catch((err) => {
                                        common_helper.send_error(res, err, "database Error")
                                    })
                            } else {
                                common_helper.send_error(res, err, "unable to create charge")
                            }
                        });
                    })
                    .catch((err) => {
                        common_helper.send_error(res, err, "database Error")
                    })
            } else {
                common_helper.send_error(res, err, "User cant identified")
            }
        })
        .catch((err) => {
            common_helper.send_error(res, err, "database Errors")
        })
}
exports.chargeCreatedWebhook = (req, res) => {
    const createdCharge = {
        code: req.body.event.data.code,
        ChargeCreatedAt: req.body.event.created_at
    }
    db.CreatedCharge.create(createdCharge)
        .then(() => {
            res.writeHead(200);
            res.end();
        })
        .catch((err) => {
            res.writeHead(500);
            res.end();
        })
}
exports.chargePendingWebhook = (req, res) => {
    const pendingCharge = {
        code: req.body.event.data.code,
        chargePendingAt: req.body.event.created_at,
        transactionId: req.body.payments.transaction_id,
        transactionAmount: req.body.payments.value.crypto.amount,
        transactionCoinUnit: req.body.payments.value.crypto.currency,
        blockNumber: req.body.payments.block.height,
        blockHash: req.body.payments.block.hash,
        confirmationAccumilated: req.body.payments.block.confirmations_accumulated,
        confirmationRequired: req.body.payments.block.confirmations_required
    }
    db.PendingCharge.create(pendingCharge)
        .then(() => {
            res.writeHead(200);
            res.end();
        })
        .catch((err) => {
            res.writeHead(500);
            res.end();
        })
}
exports.chargeDelayedWebhook = (req, res) => {
    const delayedCharge = {
        code: req.body.event.data.code,
        chargeDelayedAt: req.body.event.created_at,
        transactionId: req.body.payments.transaction_id,
        transactionAmount: req.body.payments.value.crypto.amount,
        transactionCoinUnit: req.body.payments.value.crypto.currency,
        blockNumber: req.body.payments.block.height,
        blockHash: req.body.payments.block.hash,
        confirmationAccumilated: req.body.payments.block.confirmations_accumulated,
        confirmationRequired: req.body.payments.block.confirmations_required
    }
    db.DelayedCharge.create(delayedCharge)
        .then(() => {
            res.writeHead(200);
            res.end();
        })
        .catch((err) => {
            res.writeHead(500);
            res.end();
        })
}
exports.chargeFailedWebhook = (req, res) => {
    const failedCharge = {
        code: req.body.event.data.code,
        ChargeExpiredAt: req.body.event.created_at
    }
    db.FailedCharge.create(failedCharge)
        .then(() => {
            res.writeHead(200);
            res.end();
        })
        .catch((err) => {
            res.writeHead(500);
            res.end();
        })
}
exports.chargeConfiremedWebhook = (req, res) => {
    const confiremedCharge = {
        code: req.body.event.data.code,
        chargeConfiremedAt: req.body.event.created_at,
        transactionId: req.body.payments.transaction_id,
        transactionAmount: req.body.payments.value.crypto.amount,
        transactionCoinUnit: req.body.payments.value.crypto.currency,
        blockNumber: req.body.payments.block.height,
        blockHash: req.body.payments.block.hash,
        confirmationAccumilated: req.body.payments.block.confirmations_accumulated,
        confirmationRequired: req.body.payments.block.confirmations_required
    }
    db.ConfirmedCharge.create(confiremedCharge)
        .then(() => {
            res.writeHead(200);
            res.end();
        })
        .catch((err) => {
            res.writeHead(500);
            res.end();
        })
}

exports.getChargeCreated = (req, res) => {
    db.CreatedCharge.all({
		include: [
            {model: db.Charge, required: true},
            {model: db.User, required: true},
        ]
	})
        .then((charges) => {
            common_helper.send_success(res, "all created charge", charges)
        })
        .catch((err) => {
            common_helper.send_error(res, err, "database Error")
        })
}
exports.getChargePending = (req, res) => {
    db.PendingCharge.all({
		include: [
            {model: db.Charge, required: true},
            {model: db.User, required: true},
        ]
	})
        .then((charges) => {
            common_helper.send_success(res, "all pending charges", charges)
        })
        .catch((err) => {
            common_helper.send_error(res, err, "database Error")
        })
}
exports.getChargeDelayed = (req, res) => {
    db.DelayedCharge.all({
		include: [
            {model: db.Charge, required: true},
            {model: db.User, required: true},
        ]
	})
        .then((charges) => {
            common_helper.send_success(res, "all delayed charges", charges)
        })
        .catch((err) => {
            common_helper.send_error(res, err, "database Error")
        })
}
exports.getChargeFailed = (req, res) => {
    db.FailedCharge.all({
		include: [
            {model: db.Charge, required: true},
            {model: db.User, required: true},
        ]
	})
        .then((charges) => {
            common_helper.send_success(res, "all failed charges", charges)
        })
        .catch((err) => {
            common_helper.send_error(res, err, "database Error")
        })
}
exports.getChargeConfiremed = (req, res) => {
    db.ConfiremedCharge.all({
		include: [
            {model: db.Charge, required: true},
            {model: db.User, required: true},
        ]
	})
        .then((charges) => {
            common_helper.send_success(res, "all confiremed charges", charges)
        })
        .catch((err) => {
            common_helper.send_error(res, err, "database Error")
        })
}