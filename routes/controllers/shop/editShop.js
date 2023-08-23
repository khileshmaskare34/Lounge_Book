const shopRegistration = require('../../../module/shopModelSchema');

const edit_shop = async (req, res, next) => {
    try {
        let edit_shop = await shopRegistration.findOneAndUpdate(
            { _id: req.body.shopId_for_delete },
            {
                $set: {
                    shopName: req.body.shopName,
                    station_Name: req.body.station,
                    shopPhoneNo: req.body.shopPhoneNo,
                    shopEmail: req.body.shopEmail,
                },
            },
            { new: true }
        );

        if (!edit_shop) {
            console.log("Shop not found");
            return res.status(404).send("Shop not found");
        }

        res.redirect('/shop_procider_admin');
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    edit_shop_shop: edit_shop
}
