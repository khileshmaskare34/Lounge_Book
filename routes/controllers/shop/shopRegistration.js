const jwt = require('jsonwebtoken')
const shopRegistration= require('../../../module/shopModelSchema');
const shopProviderSchema = require('../../../module/shopProviderSchema');

const shop_registration = async (req, res, next)=>{
    var newShop = new shopRegistration({
        shopName: req.body.shopName,
        shopEmail: req.body.shopEmail,
        shopPhoneNo: req.body.shopPhoneNo,
        shopProviderId: req.body.shopProviderId,
        station_Name: req.body.station
      })
     
      var email = req.cookies.shopProvider_email;
      // console.log("this khilesh" + email);
      var shopProvider = await shopProviderSchema.findOne({shopEmail:email})
      newShop.save().then(function(dets){
       
        // console.log("lll" + shopProvider)
       
        res.render('add_items_of_shop',{shopProvider , newShop})
      })
}

module.exports = {
    shop_registration_account : shop_registration
}