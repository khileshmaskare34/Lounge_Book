const shop_items = require('../../../module/shopItems');
const shopRegistration = require('../../../module/shopModelSchema');

const delete_item = async (req, res, next) => {
    try {
        var shopItem = await shop_items.findOne({ _id: req.body.itemId_for_delete });

        if (!shopItem) {
            console.log("Item not found");
            return res.status(404).send("Item not found");
        }

        var idddd = shopItem.shop_id;
        var shopForId = await shopRegistration.findOne({ shopEmail: idddd });

        if (!shopForId) {
            console.log("Shop not found");
            return res.status(404).send("Shop not found");
        }

        console.log('Deleted');
        var pathji = `/shopadminforaddingitems/` + shopForId._id;
        await shop_items.findOneAndDelete({ _id: req.body.itemId_for_delete });

        res.redirect(pathji);
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    delete_item_shop: delete_item
}
