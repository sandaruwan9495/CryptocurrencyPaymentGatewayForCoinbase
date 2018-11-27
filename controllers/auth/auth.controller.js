const axios = require('axios');
var querystring = require('querystring');

exports.index = function(req, res){
  axios.defaults.baseURL = 'https://www.coinbase.com';
  let url = 'https://www.coinbase.com/oauth/authorize?response_type=code&client_id='+  process.env.CLIENT_ID+'&redirect_uri=https://localhost:3000/client-auth-status&response_type=code&scope=wallet:user:read,wallet:accounts:read';
  res.writeHead(301,
    {Location: url}
  );
  res.end();
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
      console.log(response.data);
      if (response.data.access_token != null && response.data.refresh_token != null){
        url = 'https://api.coinbase.com/v2/user/';
        axios.get(
          url,
          {headers: {
              "Authorization" : `Bearer ${response.data.access_token}`
            }
          }
        )
        .then((response) => {
            var response = response.data;
            res.send(response)
          })
        .catch((error) => {
            var status = error.response.status
            res.send(status)
          }
        );
      }else{
        res.send("Eror");
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
  
}
exports.userRegistration = function(req,res){
  
}