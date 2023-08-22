const shopItems = require('../../../module/shopItems');
const users = require('../../../module/users');
const shopRegistration= require('../../../module/shopModelSchema');
const orderItem  = require('../../../module/orderFood');



const food_order = async (req, res, next)=>{
    const itemid = req.body.itemid;
    const item = await shopItems.findOne({_id: itemid})
 
   const user = await users.findOne({email: req.cookies.user_email})
   const quantitys = req.body.quantity;
   const shop = await shopRegistration.findOne({shopEmail: item.shop_id})
 
 
 // item Name
   var itemName = item.item_Name
 // item id
   var itemId = item._id
 // price
   var itemPrice = item.price
 // shop id
   var shopId = shop._id
 // user id
   var userId = user._id
 
    var order_item = new orderItem({
     item_Name: itemName,
     item_id: itemId,
     price: itemPrice,
     shop_id: shopId,
     user_id: userId,
     quantity: quantitys,
 
    })
    try {
     order_item.save().then(function(){
       res.send("product saved in database");
     })
    } catch (error) {
     console.log(error);
    }
}

module.exports = {
    food_order_item : food_order
}