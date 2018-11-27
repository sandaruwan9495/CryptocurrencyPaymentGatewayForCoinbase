const route = require('./common.route');

const controllers = require('../../controllers/index.controller');
route.get('/', controllers.authController.index);
route.get('/client-auth-status', controllers.authController.getAccountInfo);
route.get('/account-Info', controllers.accountController.index);
module.exports = route;