const axios = require('axios');
var querystring = require('querystring');

var Client = require('coinbase').Client;

exports.index = function(req, res){
  axios.defaults.baseURL = 'https://www.coinbase.com';
  let url = 'https://www.coinbase.com/oauth/authorize?response_type=code&client_id='+  process.env.CLIENT_ID+'&redirect_uri=https://localhost:3000/client-auth-status&response_type=code&scope=wallet:user:read,wallet:accounts:read';
  res.writeHead(301,
    {Location: url}
  );
  res.end();
}