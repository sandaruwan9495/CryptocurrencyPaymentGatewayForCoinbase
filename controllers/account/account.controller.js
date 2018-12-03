const db_req = require('../dbconection.controller').req;
const common_helper = require('../common_helper.controller');

exports.index = function(req, res){
    db_req.query("SELECT * FROM cources",function(err,data){
        if(!err){
            common_helper.send_success(res,"Successfull",data);
        }else{
            common_helper.send_error(res,err,"Database Error");
        }
    })
}