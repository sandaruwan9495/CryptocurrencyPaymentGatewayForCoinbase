const Sequelize = require('sequelize');
const sequelize = require('./dbconection')
const User = require ('./users.model');
const Charge = sequelize.define('charge', {  
    code: {
        type: Sequelize.STRING
    },
    productName: {
        type: Sequelize.STRING
    },
    hostedUrl: {
        type: Sequelize.STRING
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
  Charge.belongsTo(User);
  Charge.sync();
  module.exports = Charge;
