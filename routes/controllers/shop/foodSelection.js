const loungeRegistration = require("../../../module/loungeModelSchema");
const shop_items = require('../../../module/shopItems');
const shopRegistration = require('../../../module/shopModelSchema');

const food_selection = async (req, res, next) => {
    try {
        let lounge = await loungeRegistration.findOne({ _id: req.cookies.longe_booked_by_user });

        if (!lounge) {
            console.log("Lounge not found");
            return res.status(404).send("Lounge not found");
        }

        let shops1 = await shopRegistration.find({ station_Name: lounge.stationLocation });

        var all_items = [];

        for (var i = 0; i < shops1.length; i++) {
            var shop_item = await shop_items.find({ shop_id: shops1[i].shopEmail });
            all_items.push(shop_item);
        }

        res.render('foodSelection', { all_items });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    food_selection_shop: food_selection
}
