let db = require('../../models/dbconfig');
const common_helper = require('../common_helper.controller');

exports.index = (req, res) => {
    db.Product.all()
    .then((charges)=>{
        common_helper.send_success(res, "all products", charges)
    })
    .catch((err)=>{
        common_helper.send_error(res, err, "database Error")
    })
}