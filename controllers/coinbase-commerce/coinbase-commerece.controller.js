'use_strict'
let coinbase = require('coinbase-commerce-node');
let Charge = coinbase.resources.Charge;
const common_helper = require('../common_helper.controller');
const ChargeM = require('../../models/charge.model');
const Product = require('../../models/product.model');
const CreatedCharge = require('../../models/charge_created.model');
const PendingCharge = require('../../models/charge_pending.model');
const DelayedCharge = require('../../models/charge_delayed.model');
const FailedCharge = require('../../models/charge_failed.model');
const ConfiremedCharge = require('../../models/charge_confiremed.model');
exports.index = function (req, res) {
    ChargeM.all()
    .then((charges)=>{
        common_helper.send_success(res, "all charges", charges)
    })
    .catch((err)=>{
        common_helper.send_error(res, err, "database Error")
    })
}
exports.create = (req, res) => {
    Product.findById(req.query.id)
    .then((product)=>{
        var chargeData = {
            'name': product.name,
            'description': 'Sample Cource',
            'local_price': {
                'amount': product.price,
                'currency': 'LKR'
            },
            'pricing_type': 'fixed_price'
        }
        Charge.create(chargeData, (err, createdCharge)=>{
            if (!err) {
                ChargeM.create({
                    code:createdCharge.code,
                    productName:createdCharge.name,
                    hostedUrl:createdCharge.hosted_url,
                    description:createdCharge.description,
                    ChargeCreateAt:createdCharge.created_at,
                    ChargeExpiredAt:createdCharge.expires_at,
                    price:createdCharge.pricing.local.amount,
                    priceUnit:createdCharge.pricing.local.currency,
                    pricingType:createdCharge.codpricing_typee,
                })
                .then((charge)=>{
                    if(charge != null){
                        common_helper.send_success(res, "charge create successfull",charge)
                    }else{
                        common_helper.send_status_false(res, "charge create successfull but not inserted to the database")
                    }
                })
                .catch((err)=>{
                    common_helper.send_error(res, err, "database Error")
                })
            } else {
                common_helper.send_error(res, err, "unable to create charge")
            }
        });
    })
    .catch((err)=>{
        common_helper.send_error(res, err, "database Error")
    })
}
exports.chargeCreatedWebhook = (req, res) => {
    const createdCharge =  {
        code:req.body.event.data.code,
        ChargeCreatedAt:req.body.event.data.timeline.time
    }
    CreatedCharge.create(createdCharge)
    .then(()=>{
        res.writeHead(200);
        res.end();
    })
    .catch((err)=>{
        res.writeHead(500);
        res.end();
    })
}
exports.chargePendingWebhook = (req, res) => {
    const pendingCharge =  {
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
    PendingCharge.create(pendingCharge)
    .then(()=>{
        res.writeHead(200);
        res.end();
    })
    .catch((err)=>{
        res.writeHead(500);
        res.end();
    })
}
exports.chargeDelayedWebhook = (req, res) => {
    const delayedCharge =  {
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
    DelayedCharge.create(delayedCharge)
    .then(()=>{
        res.writeHead(200);
        res.end();
    })
    .catch((err)=>{
        res.writeHead(500);
        res.end();
    })
}
exports.chargeFailedWebhook = (req, res) => {
    const createdCharge =  {
        code:req.body.event.data.code,
        ChargeExpiredAt:req.body.event.created_at
    }
    CreatedCharge.create(createdCharge)
    .then(()=>{
        res.writeHead(200);
        res.end();
    })
    .catch((err)=>{
        res.writeHead(500);
        res.end();
    })
}
exports.chargeConfiremedWebhook = (req, res) => {
    const confiremedCharge =  {
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
    CreatedCharge.create(confiremedCharge)
    .then(()=>{
        res.writeHead(200);
        res.end();
    })
    .catch((err)=>{
        res.writeHead(500);
        res.end();
    })
}