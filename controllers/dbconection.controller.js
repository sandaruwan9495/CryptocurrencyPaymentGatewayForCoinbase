const sql = require("mssql");
const config = {    
  server: 'localhost\\MSSQLSERVER_B',
  database: 'NXT_EXAM',
  user: 'sa',
  password: 'sql2012',
  port:1433
}
const conn = new sql.ConnectionPool(config);
const req = new sql.Request(conn);
module.exports = {conn,req};
