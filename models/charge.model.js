const Sequelize = require('sequelize');
const sequelize = require('./dbconection')
const Charge = sequelize.define('charge', {
    code: {
        type: Sequelize.STRING
    },
    productName: {
        type: Sequelize.STRING
    },
    hostedUrl: {
        type: Sequelize.BOOLEAN
    },
    description: {
        type: Sequelize.STRING
    },
    ChargeCreateAt: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.FLOAT
    },
    priceUnit: {
        type: Sequelize.STRING
    },
    pricingType: {
        type: Sequelize.STRING
    }
    
  });
  Charge.sync();
  module.exports = Charge;