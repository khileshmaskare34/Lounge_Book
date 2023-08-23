const shopItems = require('../../../module/shopItems');
const shopRegistration = require('../../../module/shopModelSchema');

const particuler_item = async (req, res, next) => {
    
        var item = await shopItems.findOne({ _id: req.params.id });

        var shop_name = await shopRegistration.findOne({  });


        res.render('foodSelection', { item, shop_name });
   
}

module.exports = {
    particuler_item_item: particuler_item
}
