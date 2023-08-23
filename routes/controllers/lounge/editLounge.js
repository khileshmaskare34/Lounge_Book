const loungeRegistration = require("../../../module/loungeModelSchema");

const edit_lounge = async (req, res, next) => {
    try {
        let edit_lounge = await loungeRegistration.findOneAndUpdate(
            { _id: req.body.loungeId_for_delete },
            {
                $set: {
                    loungeName: req.body.loungeName,
                    loungePhoneNo: req.body.loungePhoneNo,
                    loungeEmail: req.body.loungeEmail,
                    noOfSeats: req.body.noOfSeats
                }
            },
            { new: true }
        );
        
        console.log("edit_Loun" + edit_lounge);
        console.log('updated');
        res.redirect('/lounge_provider_admin');
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    edit_lounge_lounge: edit_lounge
};
