const Sequelize = require('sequelize');
const sequelize = require('./dbconection')
const FailedCharge = sequelize.define('failed_charge', {
    code: {
        type: Sequelize.STRING
    },
    ChargeExpiredAt: {
        type: Sequelize.STRING
    }    
  });
  FailedCharge.sync();
  module.exports = FailedCharge;