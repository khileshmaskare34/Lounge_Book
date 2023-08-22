const shop_items = require('../../../module/shopItems');
const shopRegistration = require('../../../module/shopModelSchema');

const add_shops = async (req, res, next) => {
    try {
        let perticuler_shop = await shopRegistration.findOne({ _id: req.params.id });

        if (!perticuler_shop) {
            console.log("Shop not found");
            return res.status(404).send("Shop not found");
        }

        let items = await shop_items.find({ shop_id: perticuler_shop.shopEmail });

        res.render('shop_admin_for_adding_items', { perticuler_shop, items });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    add_shops_shop: add_shops
}
