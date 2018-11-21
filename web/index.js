'use strict'
const path = require('path');
const fs = require('fs');
const https = require('https');
const server = require('./server')
const dotenv = require('dotenv');
const accountRoute = require('./router/account.route')

const httpOption = {
    cert:fs.readFileSync(path.join(__dirname,'../','SSL_Certificate','server.crt')),
    key:fs.readFileSync(path.join(__dirname,'../','SSL_Certificate','server.key'))
}
const app = module.exports = {}; 
app.runServer = function(args){
    dotenv.config();    
    server.use('/',accountRoute); 
    https.createServer(httpOption,server).listen(process.env.NODE_PORT, (err)=>{
        if(err){
            console.log('Server goes down due to '+err)
        }else{
            console.log('Server running on '+process.env.NODE_PORT)
        }
    });
}