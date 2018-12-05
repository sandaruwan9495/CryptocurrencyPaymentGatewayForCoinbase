// const sql = require("mssql");
// const config = {    
//   server: 'localhost\\MSSQLSERVER_B',
//   database: 'NXT_EXAM',
//   user: 'sa',
//   password: 'sql2012',
//   port:1433
// }
// const conn = new sql.ConnectionPool(config);
// const req = new sql.Request(conn);
// module.exports = {conn,req};
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
module.exports = sequelize;