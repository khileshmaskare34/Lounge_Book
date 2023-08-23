const shopProviderSchema = require('../../../module/shopProviderSchema');
const shopRegistration = require('../../../module/shopModelSchema');
const loungeModelSchema = require('../../../module/loungeModelSchema');

const get_shop_provider_admin = async (req, res, next) => {
    try {
        const shopUser = await shopProviderSchema.findOne({ shopEmail: req.cookies.shopProvider_email });

        if (!shopUser) {
            console.log("Shop provider not found");
            return res.status(404).send("Shop provider not found");
        }

        var shops = await shopRegistration.find({ shopProviderId: shopUser._id });

        res.render('shop_provider_home', { shopUser, shops });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    shop_p_admin: get_shop_provider_admin
}
