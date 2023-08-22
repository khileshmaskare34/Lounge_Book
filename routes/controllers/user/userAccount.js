// var express = require('express');
const users = require('../../../module/users');
const loungeOrders = require('./../../../module/LoungeOrders');


const get_user_account =  async  function(req, res, next){
    let email = req.cookies.user_email;
    let user = await users.findOne({email:email});
    let orders = await loungeOrders.find({userId: user._id})
    console.log("skfn bhb" + orders);
    res.render('userAccountPage', {user, orders})
  }

  module.exports = {

    account : get_user_account
  }