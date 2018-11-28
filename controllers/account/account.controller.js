const db_req = require('../dbconection.controller').req;

exports.index = function(req, res){
    db_req.query("SELECT * FROM users",function(err,data){
        console.log(data)
        res.send({data,message:"here"})
    })
}