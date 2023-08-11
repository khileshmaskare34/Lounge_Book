// var express = require('express');
const users = require('./../../users');


const get_user_account =  async  function(req, res, next){
    let email = req.cookies.user_email;
    let user = await users.findOne({email:email});
    res.render('userAccountPage', {user})
  }

  module.exports = {

    account : get_user_account
  }