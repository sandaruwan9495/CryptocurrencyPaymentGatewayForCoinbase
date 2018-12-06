const axios = require('axios');
const querystring = require('querystring');
const User = require('../../models/users.model');
const common_helper = require('../common_helper.controller');
let Client = require('coinbase').Client;

exports.index = (req, res) => {
 User.findById(1).then((users)=>{
   res.send(users)
 });
}
exports.userLogin = (req, res) => {
 User.findOne({where:{userName:req.body.username,password:req.body.password}})
 .then(
   (user)=>{
     if (user != null) {
      common_helper.send_success(res,"user login successfull",user)
     } else {
      common_helper.send_status_false(res,"username or password incorrect",user)
     }
   }
 )
 .catch(
  (err)=>{
    common_helper.send_error(res,err,"failed to login")
  }
 )
}
exports.adminLogin = (req, res) => {
  User.findOne({where:{userName:req.body.username,password:req.body.password,isAdmin:true}})
  .then(
    (user)=>{
      if (user != null) {
       common_helper.send_success(res,"user login successfull",user)
      } else {
       common_helper.send_status_false(res,"username or password incorrect",user)
      }
    }
  )
  .catch(
   (err)=>{
     common_helper.send_error(res,err,"failed to login")
   }
  )
}
exports.checkoutList = (req, res) => {
  
}