const loungeRegistration = require("../../../module/loungeModelSchema");
const shop_items = require('../../../module/shopItems');
const shopRegistration= require('../../../module/shopModelSchema');

const food_selection = async (req, res, next)=>{
    let lounge = await loungeRegistration.findOne({ _id: req.cookies.longe_booked_by_user});

    let shops1 = await shopRegistration.find({ station_Name: lounge.stationLocation });
  // console.log("khles"+shops1) 
  // console.log(shops1)
  
  
  var all_items =[];
  
  for(var i = 0; i < shops1.length; i++){
  
  var shop_item = await  shop_items.find({ shop_id: shops1[i].shopEmail }) 
  // console.log("youth"+shop_item)
   all_items.push(shop_item);
  }
    res.render('foodSelection', {all_items});
}
module.exports = {
    food_selection_shop : food_selection
}