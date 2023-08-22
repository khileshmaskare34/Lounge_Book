const loungeRegistration = require("../../../module/loungeModelSchema");
const jwt = require('jsonwebtoken')


const lounge_registration = (req, res, next)=>{
    var email = req.cookies.loungeProvider_email;

    var newLounge = new loungeRegistration({
      loungeName: req.body.loungeName,
      loungeEmail: req.body.loungeEmail,
      loungePhoneNo: req.body.loungePhoneNo,
      noOfSeats: req.body.noOfSeats,
      stationLocation: req.body.stationLocation,
      loungeProviderId: req.body.loungeProviderId
    })
    newLounge.save().then(function(dets){
    res.redirect("/lounge_provider_admin");
    })
}

module.exports = {
    lounge_registration_account : lounge_registration
}