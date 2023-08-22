const jwt = require('jsonwebtoken')
const shopProviderSchema = require('../../../module/shopProviderSchema');

const shop_provider_register = async (req, res, next)=>{
    var newShopProvider = new shopProviderSchema({
        shopName:req.body.shopName,
        shopEmail:req.body.shopEmail,
        shopPhoneNo:req.body.shopPhoneNo,
        shopPassword:req.body.shopPassword,
        
      })
     
      newShopProvider.save().then((doc)=>{
        // res.cookie('Token', token, { httpOnly: true, maxAge: 1.728e8 });
        res.cookie('shopProvider_email', req.body.shopEmail);
        
        res.redirect('/shop_procider_admin')
      })
}

module.exports = {
    shop_provider_register_account : shop_provider_register
}