const loungeRegistration = require("../../../module/loungeModelSchema");

const delete_lounge = async (req, res, next) => {
    try {
        await loungeRegistration.findOneAndDelete({ _id: req.body.loungeId_for_delete });
        console.log('deleted');
        res.redirect('/lounge_provider_admin');
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    delete_lounge_lounge: delete_lounge
};
