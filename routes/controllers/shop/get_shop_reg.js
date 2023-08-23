const shopProviderSchema = require('../../../module/shopProviderSchema');

const get_shop_reg = async (req, res) => {
    try {
        var email = req.cookies.shopProvider_email;
        var shopProvider = await shopProviderSchema.findOne({ email: email });

        if (!shopProvider) {
            console.log("Shop provider not found");
            return res.status(404).send("Shop provider not found");
        }

        res.render('shopRegistration', { shopProvider });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    get_shop_reg: get_shop_reg
}
