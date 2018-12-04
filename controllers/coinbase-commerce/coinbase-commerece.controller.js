const db = require('../dbconection.controller').req;
let coinbase = require('coinbase-commerce-node');
const common_helper = require('../common_helper.controller');
let query = "";
exports.index = function (req, res) {
    query = "SELECT * FROM cources WHERE cource_id=" + req.query.id
    db.query(query, function (err, data) {
        if (!err) {
            var Charge = coinbase.resources.Charge;
            var chargeData = {
                'name': data.recordset[0].cource_name,
                'description': 'Sample Cource',
                'local_price': {
                    'amount': data.recordset[0].price,
                    'currency': 'LKR'
                },
                'pricing_type': 'fixed_price'

            }
            Charge.create(chargeData, function (error, response) {
                if (!error) {
                    query = "INSERT INTO charges (price,price_type,code,item_name,host_url) VALUES(" +
                        response.pricing.local.amount +","+
                        "\'" +response.pricing.local.currency+ "\'," +
                        "\'" + response.code + "\'," +
                        "\'" + response.name + "\'," +
                        "\'" + response.hosted_url + "\')";
                    db.query(query).then(
                        (data1) => {
                            if (data1.rowsAffected > 0) {
                                query = "SELECT id FROM charges WHERE code=\'" + response.code + "\'"
                                db.query(query).then(
                                    (data2) => {
                                        if (data2.rowsAffected > 0) {
                                            query = "INSERT INTO user_make_charges (user_id, charge_id) VALUES(" +
                                                req.query.user_id +","+
                                                data2.recordset[0].id+")";
                                                db.query(query).then(
                                                (data3) => {
                                                    if (data3.rowsAffected > 0) {
                                                        common_helper.send_success(res, "Charge created successfully", response);
                                                    } else {
                                                        common_helper.send_error(res, null, "Something went wrong when inserting user_make_charges")
                                                    }
                                                }
                                            ).catch(
                                                (err) => {
                                                    common_helper.send_error(res, err, "Something went wrong")
                                                }
                                            )

                                        } else {
                                            common_helper.send_error(res, null, "Something went wrong when accessing the charge")
                                        }
                                    }
                                ).catch(
                                    (err) => {
                                        common_helper.send_error(res, err, "Something went wrong")
                                    }
                                )
                            } else {
                                common_helper.send_error(res, null, "Something went wrong in inserting charges")
                            }
                        }
                    ).catch(
                        (err) => {
                            common_helper.send_error(res, err, "Something went wrong")
                        }
                    )
                } else {
                    common_helper.send_error(res, error, "Cant create the cryptocurrency checkout")
                }
            });
        } else {
            common_helper.send_error(res, err, "Database Error")
        }
    })
}
exports.webhoockResponse = function (req, res) {
    query = "INSERT INTO charge_status (event_id, type, created_at, charge_code) VALUES(" +
        "\'"+req.body.event.id +"\',"+
        "\'"+req.body.event.type +"\',"+
        "\'"+req.body.event.created_at +"\',"+
        "\'"+req.body.event.data.code+"\')";        
    db.query(query).then(
        (data3) => {
            res.writeHead(200);
            res.end();
        }
    ).catch(
        (err) => {
            res.writeHead(200);
            res.end();
        }
    )    
}
exports.charges = function (req, res) {
    var Charge = coinbase.resources.Charge;
    Charge.all({}, function (err, list) {
        if (!err) {
            res.send(list)
        } else {
            res.send(err)
        }
    });
}
exports.lists = function (req, res) {
    var Charge = coinbase.resources.Charge;
    var Checkout = coinbase.resources.Checkout;
    var params = {
        'order': 'desc'
    };

    Checkout.all(params, function (err, list) {
        if (!err) {
            res.send(list)
        } else {
            res.send(err)
        }
    });
}
exports.test = function (req, res) {
    query = "INSERT INTO test (value) VALUES(\'test\')";
    query = "SELECT id FROM test WHERE id=1";
    db.query(query).then(
        (data) => {
            console.log(data)
            res.send(data)
        }
    ).catch(
        (err) => {
            res.send(err)
        }
    );
}