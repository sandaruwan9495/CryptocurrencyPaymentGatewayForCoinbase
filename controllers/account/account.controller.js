const axios = require('axios');

exports.index = function(req, res){
  axios.get(
    'https://www.coinbase.com/oauth/authorize?response_type=code&client_id='+
    process.env.CLIENT_ID+
  '&redirect_uri=https://localhost:3000/transaction-status&state=134ef5504a94&scope=wallet:user:read,wallet:accounts:read')
  .then(
    (response)=>{
      res.send(response.data);
    }
  )
  .catch(
    (error)=>{
      console.log("Error: " + error.message);
    }
  );
}

exports.callback1 = function(req, res){
  console.log("Came.")
    axios.post('https://api.coinbase.com/oauth/token', {
      grant_type: authorization_code,
      code: req.query.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: 'https://localhost:3000/transaction-status2'
    })
    .then(
      (response)=>{
        res.send(response.data);
      }
    )
    .catch(
      (error)=>{
        console.log("Error: " + error.message);
      }
    );
}
exports.callback2 = function(req, res){
  axios.post('https://api.coinbase.com/oauth/token', {
    grant_type: authorization_code,
    code: req.query.code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: 'https://localhost:3000/transaction-status2'
  })
  .then(
    (response)=>{
      res.send(response.data);
    }
  )
  .catch(
    (error)=>{
      console.log("Error: " + error.message);
    }
  );
}