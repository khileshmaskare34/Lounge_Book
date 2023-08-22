const providerModel = require("../../../module/loungeProviderSchema")
// const providerModel = require('../../loungeProviderSchema')
const jwt = require('jsonwebtoken')


const lounge_provider_login =   async function(req, res, next){
    var email = req.body.email
    const pass = req.body.password
  
    if(!email || !pass){
      res.send("please enter valid email and password");
    }
    
  
    const LoungeUser = await providerModel.findOne({email : email})
    // console.log(LoungeUser);
    if (!LoungeUser || !(pass === LoungeUser.password)) {
      res.send("please enter thr right password and email");
    }
    const token = jwt.sign(
      { id: LoungeUser._id },
      'mynameispulkitupadhyayfromharda',
      {
        expiresIn: '10d',
      }
    );
    res.cookie('Token', token, { httpOnly: true, maxAge: 1.728e8 });
    res.cookie('loungeProvider_email', LoungeUser.email);
  
 
  
    // console.log(LoungeUser._id)
    res.redirect('/lounge_provider_admin')
    // res.render('longe_provider_admin')
  }


  module.exports ={
    lounge_provider_login_account : lounge_provider_login
  }