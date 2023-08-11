
const providerModel = require("./../../loungeProviderSchema")
const loungeRegistration = require("./../../loungeModelSchema");


const L_admin = async (req,res,next)=>{

    var LoungeUser = await providerModel.findOne({ email: req.cookies.loungeProvider_email})
    var his_launges = await loungeRegistration.find({  loungeProviderId: LoungeUser._id })

    var email = req.cookies.loungeProvider_email;

    var loungeProvider = await providerModel.findOne({ email:email})
  
    res.render('longe_provider_admin', {LoungeUser, his_launges, loungeProvider})
  
  }

  module.exports = {
    admin: L_admin
  }