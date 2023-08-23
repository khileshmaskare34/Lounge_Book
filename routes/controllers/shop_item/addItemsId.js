const shopRegistration = require('../../../module/shopModelSchema');

const add_items_id = async (req, res, next) => {
    try {
        var newShop = await shopRegistration.findOne({ _id: req.params.id });

        if (!newShop) {
            console.log("Shop not found");
            return res.status(404).send("Shop not found");
        }

        res.render('add_items_of_shop', { newShop });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    add_items: add_items_id
}
