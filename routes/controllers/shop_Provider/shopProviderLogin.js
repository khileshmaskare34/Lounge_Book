const jwt = require('jsonwebtoken')
const shopProviderSchema = require('../../../module/shopProviderSchema');
const shopRegistration= require('../../../module/shopModelSchema');


const shop_provider_login = async (req, res, next)=>{
    var shopemail = req.body.shopEmail

    // console.log(shopemail)
    const shoppass = req.body.shopPassword
  
    if(!shopemail || !shoppass){
      res.send("please enter valid email and password");
    }
    
  
    const shopUser = await shopProviderSchema.findOne({shopEmail : shopemail})
  var shops = await shopRegistration.find({ shopProviderId : shopUser._id })
  
    // console.log(shopUser)
    // console.log("this is nature"+shopUser);
    if (!shopUser || !(shoppass === shopUser.shopPassword)) {
      res.send("please enter thr right password and email");
    }
    const token = jwt.sign(
      { id: shopUser._id },
      'mynameispulkitupadhyayfromharda',
      {
        expiresIn: '10d',
      }
    );
    res.cookie('Token', token, { httpOnly: true, maxAge: 1.728e8 });
  
  
    res.cookie('shopProvider_email', shopUser.shopEmail, { httpOnly: true, maxAge: 1.728e8 });
  
  
  
   
    res.redirect("/shop_procider_admin");
    
}

module.exports = {
    shop_provider_login_account : shop_provider_login
}