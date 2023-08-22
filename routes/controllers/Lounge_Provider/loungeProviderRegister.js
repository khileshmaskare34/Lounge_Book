const providerModel = require("../../../module/loungeProviderSchema")
const jwt = require('jsonwebtoken')

const lounge_provider_register = (req, res, next)=>{
    var newProvider = new providerModel({
        name:req.body.name,
        email:req.body.email,
        phoneNo:req.body.phoneNo,
        password:req.body.password 
      })
     
      newProvider.save().then((doc)=>{
        // res.cookie('Token', token, { httpOnly: true, maxAge: 1.728e8 });
        res.cookie('loungeProvider_email', req.body.email);
       
        res.redirect('/loungeRegistration');
      })
}

module.exports = {
    lounge_provider_register_account : lounge_provider_register
}