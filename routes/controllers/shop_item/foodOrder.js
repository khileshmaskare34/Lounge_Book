const shopItems = require('../../../module/shopItems');
const users = require('../../../module/users');
const shopRegistration = require('../../../module/shopModelSchema');
const orderItem = require('../../../module/orderFood');

const food_order = async (req, res, next) => {
    try {
        const itemid = req.body.itemid;
        const item = await shopItems.findOne({ _id: itemid });

        if (!item) {
            console.log("Item not found");
            return res.status(404).send("Item not found");
        }

        const user = await users.findOne({ email: req.cookies.user_email });

        if (!user) {
            console.log("User not found");
            return res.status(404).send("User not found");
        }

        const quantitys = req.body.quantity;
        const shop = await shopRegistration.findOne({ shopEmail: item.shop_id });

        if (!shop) {
            console.log("Shop not found");
            return res.status(404).send("Shop not found");
        }

        var itemName = item.item_Name;
        var itemId = item._id;
        var itemPrice = item.price;
        var shopId = shop._id;
        var userId = user._id;

        var order_item = new orderItem({
            item_Name: itemName,
            item_id: itemId,
            price: itemPrice,
            shop_id: shopId,
            user_id: userId,
            quantity: quantitys,
        });

        order_item.save().then(function () {
            // res.send("Product saved in the database");
            res.redirect('/after_loungeBook_loggedInIndex')
        });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    food_order_item: food_order
}
