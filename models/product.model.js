const Sequelize = require('sequelize');
const sequelize = require('./dbconection')
const Product = sequelize.define('product', {
    name: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.FLOAT
    },
    priceUnit: {
        type: Sequelize.STRING
    }    
  });
  Product.sync();
  module.exports = Product;