'use strict'
let app = module.exports = {};
app.runServer = function(){
    let app = require('./server')
    let dotenv = require('dotenv');
    dotenv.config();
    
    app.get('/', function(req, res){
      res.send('hello world');
    });
    
    app.listen(process.env.NODE_PORT, (err)=>{
        if(err){
            console.log('Server goes down due to '+err)
        }else{
            console.log('Server running on '+process.env.NODE_PORT)
        }
    });
}