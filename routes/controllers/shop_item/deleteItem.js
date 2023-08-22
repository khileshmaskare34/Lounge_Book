const shop_items = require('../../../module/shopItems');
const shopRegistration= require('../../../module/shopModelSchema');

const delete_item = async (req, res, next)=>{
    var shopItem =  await shop_items.findOne({ _id: req.body.itemId_for_delete})
    var idddd = shopItem.shop_id;
    var shopForId = await shopRegistration.findOne({ shopEmail: idddd})
    console.log(idddd)
     console.log('deleted')
  var pathji = `/shopadminforaddingitems/` + shopForId._id
    await shop_items.findOneAndDelete({ _id: req.body.itemId_for_delete})
   
    
     res.redirect(pathji)
}
module.exports = {
    delete_item_shop : delete_item
}