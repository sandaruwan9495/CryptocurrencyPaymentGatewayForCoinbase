const Sequelize = require('sequelize');
const sequelize = require('./dbconection')
const DelayedCharge = sequelize.define('delayed_charge', {
    code: {
        type: Sequelize.STRING
    },
    chargeDelayedAt: {
        type: Sequelize.STRING
    },
    transactionId: {
        type: Sequelize.STRING
    },
    transactionAmount: {
        type: Sequelize.FLOAT
    },
    transactionCoinUnit: {
        type: Sequelize.STRING
    },
    blockNumber: {
        type: Sequelize.INTEGER
    },
    blockHash: {
        type: Sequelize.STRING
    },
    confirmationAccumilated: {
        type: Sequelize.INTEGER
    },
    confirmationRequired: {
        type: Sequelize.INTEGER
    }
    
  });
  DelayedCharge.sync();
  module.exports = DelayedCharge;