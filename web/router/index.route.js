'use_strict'
const accountRoutes =  require('./account.route');
const authRoutes =  require('./auth.route');
const userRoutes =  require('./user.route');
const productRoutes =  require('./product.route');
const coinbaseCommerceRoutes =  require('./coinbase-commerce.route');
module.exports = {
    accountRoutes,
    userRoutes,
    authRoutes,
    productRoutes,
    coinbaseCommerceRoutes,

};