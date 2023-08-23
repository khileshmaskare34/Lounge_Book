const jwt = require('jsonwebtoken')
const shopProviderSchema = require('../../../module/shopProviderSchema');

const shop_provider_register = async (req, res, next) => {
    try {
        var newShopProvider = new shopProviderSchema({
            shopName: req.body.shopName,
            shopEmail: req.body.shopEmail,
            shopPhoneNo: req.body.shopPhoneNo,
            shopPassword: req.body.shopPassword,
        })

        const savedShopProvider = await newShopProvider.save();
        
        if (savedShopProvider) {
            res.cookie('shopProvider_email', req.body.shopEmail);
            res.redirect('/shop_procider_admin');
        } else {
            console.log("Failed to save shop provider");
            res.status(500).send("Failed to save shop provider");
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    shop_provider_register_account: shop_provider_register
}
