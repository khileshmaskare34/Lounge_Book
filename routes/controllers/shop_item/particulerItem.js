const shopItems = require('../../../module/shopItems');
const shopRegistration = require('../../../module/shopModelSchema');

const particuler_item = async (req, res, next) => {
    try {
        var item = await shopItems.findOne({ _id: req.params.id });
        
        if (!item) {
            console.log("Item not found");
            return res.status(404).send("Item not found");
        }

        var shop_name = await shopRegistration.findOne({ _id: item.shopId });

        if (!shop_name) {
            console.log("Shop not found");
            return res.status(404).send("Shop not found");
        }

        res.render('foodSelection', { item, shop_name });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    particuler_item_item: particuler_item
}
