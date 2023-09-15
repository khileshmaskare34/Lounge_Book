const loungeRegistration = require("../../../module/loungeModelSchema");
const jwt = require('jsonwebtoken');

const lounge_registration = async (req, res, next) => {
    try {
        var email = req.cookies.loungeProvider_email;

        var newLounge = new loungeRegistration({
            loungeName: req.body.loungeName,
            loungeEmail: req.body.loungeEmail,
            loungePhoneNo: req.body.loungePhoneNo,
            noOfSeats: req.body.noOfSeats,
            stationLocation: req.body.stationLocation,
            loungeProviderId: req.body.loungeProviderId
        });

        await newLounge.save();

        res.redirect("/lounge_provider_admin");
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
        // return res.status(401).redirect('/loungeRegistration', { error: 'This station name is all ready registered !' });

    }
}

module.exports = {
    lounge_registration_account: lounge_registration
};
