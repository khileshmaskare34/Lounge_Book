const loungeRegistration = require("../../../module/loungeModelSchema");

const edit_lounge = async (req, res, next)=>{
    let edit_lounge = await loungeRegistration.findOneAndUpdate(
        { _id: req.body.loungeId_for_delete }, // Conditions to find the document
        { $set: { loungeName: req.body.loungeName,
                  loungePhoneNo : req.body.loungePhoneNo,
                  loungeEmail: req.body.loungeEmail,
                  noOfSeats: req.body.noOfSeats
        
        }}, // Update operation
        { new: true } // Return the updated document
      );
      console.log("edit_Loun"+ edit_lounge)
     
       console.log('updated')
       res.redirect('/lounge_provider_admin')
}

module.exports = {
    edit_lounge_lounge : edit_lounge
}