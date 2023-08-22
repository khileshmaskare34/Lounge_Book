const shop_items = require('../../../module/shopItems');
const shopRegistration= require('../../../module/shopModelSchema');


const add_shops = async (req, res, next)=>{
    let perticuler_shop = await shopRegistration.findOne({ _id: req.params.id })
    let items = await shop_items.find({ shop_id: perticuler_shop.shopEmail })
    res.render('shop_admin_for_adding_items' ,{ perticuler_shop, items })
}

module.exports = {
    add_shops_shop : add_shops
}