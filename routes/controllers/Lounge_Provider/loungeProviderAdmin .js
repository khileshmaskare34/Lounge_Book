const providerModel = require("../../../module/loungeProviderSchema");
const loungeRegistration = require("../../../module/loungeModelSchema");

const lounge_provider_admin = async (req, res, next) => {
    try {
        var LoungeUser = await providerModel.findOne({ email: req.cookies.loungeProvider_email });

        if (!LoungeUser) {
            console.log("Lounge provider not found");
            return res.status(404).send("Lounge provider not found");
        }

        var his_launges = await loungeRegistration.find({ loungeProviderId: LoungeUser._id });

        var email = req.cookies.loungeProvider_email;

        var loungeProvider = await providerModel.findOne({ email: email });

        res.render('longe_provider_admin', { LoungeUser, his_launges, loungeProvider });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    lounge_provider_admin_account: lounge_provider_admin
};
