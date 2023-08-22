
const providerModel = require("../../../module/loungeProviderSchema")
const loungeRegistration = require("../../../module/loungeModelSchema");


const get_lounge_reg = async(req, res)=>{
    var email = req.cookies.loungeProvider_email;
    // console.log("this is lucky" + email)
  
    var loungeProvider = await providerModel.findOne({email:email})
  
    var launges = await loungeRegistration.find({ loungeProviderId :loungeProvider._id  })
    // console.log("this is the lucky" + loungeProvider)
    res.render('loungeRegistration',{loungeProvider , launges});
    }


    module.exports = {

        get_lounge_registration : get_lounge_reg

    }