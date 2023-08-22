const shopRegistration= require('../../../module/shopModelSchema');

const delete_shop = async (req, res, next)=>{
    await shopRegistration.findOneAndDelete({ _id: req.body.shopId_for_delete})
 
  
    res.redirect('/shop_procider_admin')
}

module.exports = {
    delete_shop_shop : delete_shop
}