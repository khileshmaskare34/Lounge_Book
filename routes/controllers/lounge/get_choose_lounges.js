const loungeRegistration = require("../../../module/loungeModelSchema");
const longeOrders = require('./../../../module/LoungeOrders');
const users = require('../../../module/users');

const get_choose_lounge = async (req, res, next) => {
    try {
        let laungeId = req.params.id;
        let launge = await loungeRegistration.findOne({ _id: laungeId });

        if (!launge) {
            console.log("Lounge not found");
            return res.status(404).send("Lounge not found");
        }

        let laungesWithOrders = await longeOrders.find({ loungeId: laungeId });
        let seatss = [];

        for (var i = 0; i < laungesWithOrders.length; i++) {
            let jiji = laungesWithOrders[i].seats;
            seatss.push(jiji);
        }

        let totalSeats = [];

        for (var k = 0; k < seatss.length; k++) {
            var ppp = seatss[k];
            for (var j = 0; j < ppp.length; j++) {
                totalSeats.push(ppp[j]);
            }
        }

        let email = req.cookies.user_email;
        let userx = await users.findOne({ email: email });

        res.render('shetbook', { launge, totalSeats, userx });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    get_choose_lounge: get_choose_lounge
};
