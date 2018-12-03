const db = require('./dbconection.controller').req;
let query = "";
exports.send_error = (res, err, message, data)=>{
    res.send({
        satatus:false,
        error:true,
        error_message:err,
        message:message,
        data:data
    });
}
exports.send_success = (res, message, data)=>{
    res.send({
        satatus:true,
        error:false,
        error_message:null,
        message:message,
        data:data
    });
}
exports.send_status_false = (res, message, data)=>{
    res.send({
        satatus:false,
        error:false,
        error_message:null,
        message:message,
        data:data
    });
}
exports.insert = (table, colums, values, condithon, callback) => {
    
}