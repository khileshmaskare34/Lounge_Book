
const shopProviderSchema = require('../../../module/shopProviderSchema');

const get_shop_reg =  async (req, res)=>{
    var email = req.cookies.shopProvider_email;
    // console.log("this khilesh" + email);
    var shopProvider = await shopProviderSchema.findOne({email:email})
    res.render('shopRegistration', {shopProvider});
  }
  module.exports={
    get_shop_reg:get_shop_reg
  }