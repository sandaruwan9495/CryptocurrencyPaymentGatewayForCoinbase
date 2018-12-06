const authController = require('./auth/auth.controller');
const accountController = require('./account/account.controller');
const userController = require('./user/user.controller');
const productController = require('./product/product.controller');
const coinbaseCommereceController = require('./coinbase-commerce/coinbase-commerece.controller');

module.exports = {
    accountController,
    userController,
    authController,
    productController,
    coinbaseCommereceController
}