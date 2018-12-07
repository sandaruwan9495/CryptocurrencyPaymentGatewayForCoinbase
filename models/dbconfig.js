const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mssql',
  dialectOptions: {
    instanceName: 'MSSQLSERVER_B'
  },
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
const PendingCharge = require('./charge_pending.model')(sequelize, Sequelize);
const FailedCharge = require('./charge_failed.model')(sequelize, Sequelize);
const DelayedCharge = require('./charge_delayed.model')(sequelize, Sequelize);
const CreatedCharge = require('./charge_created.model')(sequelize, Sequelize);
const ConfirmedCharge = require('./charge_confiremed.model')(sequelize, Sequelize);
const Charge = require('./charge.model')(sequelize, Sequelize);
const User = require('./users.model')(sequelize, Sequelize);
const Product = require('./product.model')(sequelize, Sequelize);
let db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = User;
db.Product = Product;
db.Charge = Charge;
db.CreatedCharge = CreatedCharge;
db.PendingCharge = PendingCharge;
db.DelayedCharge = DelayedCharge;
db.FailedCharge = FailedCharge;
db.ConfirmedCharge = ConfirmedCharge;

db.User.hasMany(db.Charge);
db.Charge.belongsTo(db.User);
db.Charge.hasMany(db.CreatedCharge);
db.CreatedCharge.belongsTo(db.Charge);
db.CreatedCharge.belongsTo(db.User);
db.Charge.hasMany(db.PendingCharge);
db.PendingCharge.belongsTo(db.Charge);
db.PendingCharge.belongsTo(db.User);
db.Charge.hasMany(db.DelayedCharge);
db.DelayedCharge.belongsTo(db.Charge);
db.DelayedCharge.belongsTo(db.User);
db.Charge.hasMany(db.FailedCharge);
db.FailedCharge.belongsTo(db.Charge);
db.FailedCharge.belongsTo(db.User);
db.Charge.hasMany(db.ConfirmedCharge);
db.ConfirmedCharge.belongsTo(db.Charge);
db.ConfirmedCharge.belongsTo(db.User);

db.User.hasMany(db.CreatedCharge);
db.User.hasMany(db.PendingCharge);
db.User.hasMany(db.DelayedCharge);
db.User.hasMany(db.FailedCharge);
db.User.hasMany(db.ConfirmedCharge);
module.exports = db;