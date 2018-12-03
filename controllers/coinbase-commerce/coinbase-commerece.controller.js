const db = require('../dbconection.controller').req;
let coinbase = require('coinbase-commerce-node');
const common_helper = require('../common_helper.controller');
let query = "";
exports.index = function(req, res){
    query = "SELECT * FROM cources WHERE cource_id="+req.query.id
    db.query(query, function(err, data){
        if(!err){
        var Charge = coinbase.resources.Charge;
        var chargeData = {
            'name': data.recordset[0].cource_name,
            'description': 'Sample Cource',
            'local_price': {
                'amount': data.recordset[0].price,
                'currency': 'USD'
            },
            'pricing_type': 'fixed_price'
         
        }
        Charge.create(chargeData, function (error, response) {
          if(!error){
            res.send(response);
          }else{
            common_helper.send_error(res,error,"Cant create the cryptocurrency checkout")
          }
        });
        }else{
            common_helper.send_error(res,err,"Database Error")
        }
    })
}
exports.webhoockResponse = function(req, res){
    res.writeHead(200);
    res.end();
}
exports.charges = function(req, res){
    var Charge = coinbase.resources.Charge;
    Charge.all({}, function (err, list) {
        if(!err){
            res.send(list)
        }else{
            res.send(err)
        }
      });
}