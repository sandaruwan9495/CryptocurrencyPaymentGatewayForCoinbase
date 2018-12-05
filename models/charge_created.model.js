const Sequelize = require('sequelize');
const sequelize = require('./dbconection')
const CreatedCharge = sequelize.define('created_charge', {
    code: {
        type: Sequelize.STRING
    },
    ChargeCreatedAt: {
        type: Sequelize.STRING
    }    
  });
  CreatedCharge.sync();
  module.exports = CreatedCharge;