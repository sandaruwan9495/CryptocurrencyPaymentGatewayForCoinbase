const axios = require('axios');
const querystring = require('querystring');
const db = require('../dbconection.controller').req;
let Client = require('coinbase').Client;
let query;
exports.index = function(req, res){
  axios.defaults.baseURL = 'https://www.coinbase.com';
  let url = 'https://www.coinbase.com/oauth/authorize?response_type=code&client_id='+process.env.CLIENT_ID+'&redirect_uri=https://localhost:3000/client-auth-status&response_type=code&scope=wallet:user:read,wallet:accounts:read,wallet:transactions:send&meta[send_limit_amount]=1&meta[send_limit_currency]=USD&meta[send_limit_period]=day';
  // res.writeHead(301,
  //   {Location: url}
  // );
  // res.end();
  res.send({url})
}

exports.getAccountInfo = function(req, res){  
  let code = req.query.code;
  let url = 'https://www.coinbase.com/oauth/token';
  axios.post(
    url,
    querystring.stringify({
      grant_type: 'authorization_code',
      code : code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri:'https://localhost:3000/client-auth-status'
    }))
  .then(
    (response)=>{
      if (response.data.access_token != null && response.data.refresh_token != null){
       db.query("SELECT * FROM coinbase where user_id=1",function(err,data){
          if(!err){
            if(data.rowsAffected > 0){
              query = "UPDATE coinbase SET refresh_token="+"\'"+response.data.refresh_token+"\'"+", "+
              "access_token="+"\'"+response.data.access_token+"\'"+" WHERE id=1";              
              console.log("Query: "+query)
              db.query(query,function(err,data){
                if(!err){
                  let client = new Client({'accessToken': response.data.access_token, 'refreshToken': response.data.refresh_token});
                  client.getAccounts({}, function(err, accounts) {
                    accounts.forEach(function(account) {
                      console.log('my bal: ' + account.balance.amount + ' for ' + account.name);
                      var args = {
                        "to": "sandaruwanwijerathne9495@gmail.com",
                        "amount": "0.000001",
                        "currency": "BTC",
                        "description": "Sample transaction for you"
                      };
                      account.sendMoney(args, function(err, txn) {
                        if(!err){                      
                            res.send({txn})
                        }else{
                          res.send("Error in coinbase transaction: "+err);
                        }
                      });
                    });
                  });
                }else{
                  res.send("SQL Eror when update coinbase: "+err);
                }
              })
            }else{
              query = "INSERT INTO coinbase (user_id,access_token,refresh_token) VALUES (1,"+"\'"+response.data.access_token+"\'"+
              ","+"\'"+response.data.refresh_token+"\'"+");";
              db.query(query,function(err,data){
                if(!err){
                  let client = new Client({'accessToken': response.data.access_token, 'refreshToken': response.data.refresh_token});
                  var args = {
                    "to": "sandaruwanwijerathne9495@gmail.com",
                    "amount": "0.000001",
                    "currency": "BTC",
                    "description": "Sample transaction for you"
                  };
                  account.sendMoney(args, function(err, txn) {
                    console.log('my txn id is: ' + txn.id);
                    if(!err){                      
                        res.send({txn})
                    }else{
                      res.send("Error in coinbase transaction: "+err);
                    }
                  });
                }else{
                  res.send("SQL Eror when insert coinbase: "+err);
                }
              })
            }
          }else{
            res.send("SQL Eror: "+err);
          }
       })
      }else{
        res.send("Eror: can't get tokens");
      }
    }
  )
  .catch(
    (error)=>{
      console.log("Error: " + error.message);
      res.send("Eror");
    }
  );
    
}
exports.userLogin = function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  query = "SELECT * FROM users WHERE username=\'"+username+"\' AND password=\'"+password+"\'";
  console.log(query)
  db.query(query, function(err, data){
    if (!err) {
      if (data.rowsAffected > 0) {
        res.send({
          status:true,
          error:false,
          error_message:"",
          message:"login success",
          data:{
            is_match:true,
            user:data.recordset[0]
          }
        })
      } else {
        res.send({
          status:false,
          error:false,
          error_message:"",
          message:"username or password incorrect",
          data:{
            is_match:false,
            user:{}
          }
        })
      }
    } else {
      res.send({
        status:false,
        error:true,
        error_message:err,
        message:"",
        data:{
          is_match:false,
          user:{}
        }
      })
    }
  })
}
exports.userRegistration = function(req,res){
  res.send("hi all")
}