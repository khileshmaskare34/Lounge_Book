const loungeRegistration = require("../../../module/loungeModelSchema");


const delete_lounge = async (req, res, next)=>{
    await loungeRegistration.findOneAndDelete({ _id: req.body.loungeId_for_delete})

  console.log('deleted')
  res.redirect('/lounge_provider_admin')
}

module.exports = {
    delete_lounge_lounge : delete_lounge
}