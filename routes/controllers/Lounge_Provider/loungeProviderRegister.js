const providerModel = require("../../../module/loungeProviderSchema");
const jwt = require('jsonwebtoken');

const lounge_provider_register = async (req, res, next) => {
    try {
        var newProvider = new providerModel({
            name: req.body.name,
            email: req.body.email,
            phoneNo: req.body.phoneNo,
            password: req.body.password 
        });
     
        const savedProvider = await newProvider.save();

        res.cookie('loungeProvider_email', req.body.email);
        res.redirect('/loungeRegistration');
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    lounge_provider_register_account: lounge_provider_register
};
