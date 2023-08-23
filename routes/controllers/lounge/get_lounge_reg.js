const providerModel = require("../../../module/loungeProviderSchema");
const loungeRegistration = require("../../../module/loungeModelSchema");

const get_lounge_reg = async (req, res) => {
    try {
        var email = req.cookies.loungeProvider_email;

        var loungeProvider = await providerModel.findOne({ email: email });

        if (!loungeProvider) {
            console.log("Lounge provider not found");
            return res.status(404).send("Lounge provider not found");
        }

        var launges = await loungeRegistration.find({ loungeProviderId: loungeProvider._id });

        res.render('loungeRegistration', { loungeProvider, launges });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    get_lounge_registration: get_lounge_reg
};
