const axios = require('axios');
const querystring = require('querystring');
const db = require('../../models/dbconection');
const common_helper = require('../common_helper.controller');
let Client = require('coinbase').Client;
let query;
exports.index = function (req, res) {
  let userId = req.query.id;

  db.query("SELECT * FROM coinbase_tokens where user_id=" + userId, function (err, data) {
    if (!err) {
      if (data.rowsAffected > 0) {
        common_helper.send_success(res, "Please Confirm", {});
      } else {
        let url = 'https://www.coinbase.com/oauth/authorize?response_type=code&client_id=' + process.env.CLIENT_ID + '&redirect_uri=https://localhost:3000/auth/client-auth-status&state=' + userId + '&response_type=code&scope=wallet:user:read,wallet:accounts:read,wallet:transactions:request';
        common_helper.send_success(res, "Please authenticate account", { url })
      }
    } else {
      common_helper.send_error(res, err, "Error in database", {})
    }
  })
}

exports.getAccountInfo = function (req, res) {
  let code = req.query.code;
  let userId = req.query.state;
  let url = 'https://www.coinbase.com/oauth/token';
  axios.post(
    url,
    querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: 'https://localhost:3000/auth/client-auth-status'
    }))
    .then(
      (response) => {
        if (response.data.access_token != null && response.data.refresh_token != null) {
          query = "INSERT INTO coinbase_tokens (user_id,access_token,refresh_token) VALUES (" + userId + "," + "\'" + response.data.access_token + "\'" +
            "," + "\'" + response.data.refresh_token + "\'" + ");";
          db.query(query, function (err, data) {
            if (!err) {
              let client = new Client({ 'accessToken': response.data.access_token, 'refreshToken': response.data.refresh_token });
              client.getAccounts({}, function (err, accounts) {
                accounts.forEach(async function (account) {
                  query = "INSERT INTO coinbase_accounts (user_id,coinbase_id) VALUES(" + userId +
                    ",\'" + account.id + "\')";
                  db.query(query, await callback)
                  function callback(err) {
                    if (err) {
                      common_helper.send_error(res, { err: "more than one error ocurred" }, "Database error ", {})
                    } else {
                      common_helper.send_success(res, "Account cinfiremed", {});
                    }
                  }
                  console.log('my bal: ' + account.balance.amount + ' for ' + account.name);
                })
              });
            } else {
              common_helper.send_error(res, err, "Database error", {})
            }
          })
        } else {
          common_helper.send_error(res, err, "Cant get the tokens", {})
        }
      }
    )
    .catch(
      (error) => {
        res.send("Eror");
      }
    );

}
exports.userLogin = function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  query = "SELECT * FROM users WHERE username=\'" + username + "\' AND password=\'" + password + "\'";
  db.query(query, function (err, data) {
    if (!err) {
      if (data.rowsAffected > 0) {
        res.send({
          status: true,
          error: false,
          error_message: "",
          message: "login success",
          data: {
            is_match: true,
            user: data.recordset[0]
          }
        })
      } else {
        res.send({
          status: false,
          error: false,
          error_message: "",
          message: "username or password incorrect",
          data: {
            is_match: false,
            user: {}
          }
        })
      }
    } else {
      res.send({
        status: false,
        error: true,
        error_message: err,
        message: "",
        data: {
          is_match: false,
          user: {}
        }
      })
    }
  })
}
exports.adminLogin = function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  query = "SELECT * FROM admins WHERE username=\'" + username + "\' AND password=\'" + password + "\'";
  db.query(query, function (err, data) {
    if (!err) {
      if (data.rowsAffected > 0) {
        res.send({
          status: true,
          error: false,
          error_message: "",
          message: "login success",
          data: {
            is_match: true,
            user: data.recordset[0]
          }
        })
      } else {
        res.send({
          status: false,
          error: false,
          error_message: "",
          message: "username or password incorrect",
          data: {
            is_match: false,
            user: {}
          }
        })
      }
    } else {
      res.send({
        status: false,
        error: true,
        error_message: err,
        message: "",
        data: {
          is_match: false,
          user: {}
        }
      })
    }
  })
}
exports.bitcoinPayment = function (req, res) {
  let userId = req.query.id;
  let auth_code = req.query.auth_code;
  if (auth_code == null) {
  query = "SELECT coinbase_id FROM coinbase_accounts WHERE user_id=" + userId;
  db.query(query, (err, account_in_db) => {
    if (!err) {
      query = "SELECT * FROM coinbase_tokens WHERE user_id=" + userId;
      db.query(query,function(err, dataset){
        let client = new Client({ 'accessToken': dataset.recordset[0].access_token, 'refreshToken': dataset.recordset[0].refresh_token });
        client.getAccount(account_in_db.recordset[0].coinbase_id, function (err, account) {
          if(!err){
            var args = {
              "to": "sandaruwanwijerathne9495@gmail.com",
              "amount": "0.000001",
              "currency": "BTC",
              "description": "Sample transaction for you"
            };
            account.sendMoney(args, function (error, txn) {
              if (!error) {
                common_helper.send_success(res, "transaction successfull", {txn});
              } else {
                common_helper.send_status_false(res, "Please enter the code which coinbase send to you", {})
              }
            });
            console.log('bal: ' + account.balance.amount + ' currency: ' + account.balance.currency);
          }else{
            common_helper.send_error(res, err, "Coinbase error", {})
          }
        });
      })      
    } else {
      common_helper.send_error(res, err, "Database error", {})
    }
  })
  } else {
  query = "SELECT coinbase_id FROM coinbase_accounts WHERE user_id=" + userId;
  db.query(query, (err, account_in_db) => {
    if (!err) {
      query = "SELECT * FROM coinbase_tokens WHERE user_id=" + userId;
      db.query(query,function(err, dataset){
        let client = new Client({ 'accessToken': dataset.recordset[0].access_token, 'refreshToken': dataset.recordset[0].refresh_token });
        client.getAccount(account_in_db.recordset[0].coinbase_id, function (err, account) {
          if(!err){
            var args = {
              "to": "sandaruwanwijerathne9495@gmail.com",
              "amount": "0.000001",
              "currency": "BTC",
              "description": "Sample transaction for you"
            };
            console.log("AuthCode", auth_code)
            account.sendMoney(args, function (error, txn) {
              if (!error) {
                common_helper.send_success(res, "transaction successfull", {txn});
              } else {
                console.log("error", error)
                common_helper.send_error(res, error, "Error in transaction", {})
              }
            },auth_code);
            console.log('bal: ' + account.balance.amount + ' currency: ' + account.balance.currency);
          }else{
            common_helper.send_error(res, err, "Coinbase error", {})
          }
        });
      })      
    } else {
      common_helper.send_error(res, err, "Database error", {})
    }
  },)
  }
  
  
}
exports.requestFund = function(req,res){
  let userId = req.query.id;
  query = "SELECT coinbase_id FROM coinbase_accounts WHERE user_id=" + userId;
  db.query(query, (err, account_in_db) => {
    if (!err) {
      query = "SELECT * FROM coinbase_tokens WHERE user_id=" + userId;
      db.query(query,function(err, dataset){
        let client = new Client({ 'accessToken': dataset.recordset[0].access_token, 'refreshToken': dataset.recordset[0].refresh_token });
        client.getAccount(account_in_db.recordset[0].coinbase_id, function (err, account) {
          if(!err){
          args = {
            'to'          : 'sandaruwan.uni@corporate.mediadefined.com',
            'amount'      : '0.0001',
            'currency'    : 'BTC',
            'description' : 'notes'
          };
            account.requestMoney(args, function (error, txn) {
              console.log(error)
              console.log(txn)
              if (!error) {
                common_helper.send_success(res, "transaction successfull", {txn});
              } else {
                common_helper.send_status_false(res, "Please enter the code which coinbase send to you", {})
              }
            });
            console.log('bal: ' + account.balance.amount + ' currency: ' + account.balance.currency);
          }else{
            common_helper.send_error(res, err, "Coinbase error", {})
          }
        });
      })      
    } else {
      common_helper.send_error(res, err, "Database error", {})
    }
  })
}
exports.userRegistration = function (req, res) {
  res.send("hi all")
}