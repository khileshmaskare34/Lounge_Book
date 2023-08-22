
const shopProviderSchema = require('../../../module/shopProviderSchema');
const shopRegistration= require('../../../module/shopModelSchema');
const loungeModelSchema = require('../../../module/loungeModelSchema');


const get_shop_provider_admin = async (req,res,next)=>{
    // const stationName = req.body.stationName

    const shopUser = await shopProviderSchema.findOne({ shopEmail : req.cookies.shopProvider_email})
  
  
   var shops = await shopRegistration.find({ shopProviderId : shopUser._id })
  //  console.log("prem" +shops);
  //  var lounges = await loungeModelSchema.find({stationLocation: stationName})
  //  console.log("lalubhai" + lounges)
    res.render('shop_provider_home',{shopUser,shops })
  }

  module.exports= {
    shop_p_admin : get_shop_provider_admin
  }