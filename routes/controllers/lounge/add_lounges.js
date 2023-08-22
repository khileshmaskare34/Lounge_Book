const longeOrders = require('./../../../module/LoungeOrders');
const loungeRegistration = require("../../../module/loungeModelSchema");
const users = require('../../../module/users');

const add_lounges = async (req, res, next) => {
    try {
        var perticuler_launge = await loungeRegistration.findOne({ _id: req.params.id });

        if (!perticuler_launge) {
            console.log("Lounge not found");
            return res.status(404).send("Lounge not found");
        }

        var orders = await longeOrders.find({ loungeId: perticuler_launge._id });
        var users1 = [];

        for (var i = 0; i < orders.length; i++) {
            for (var j = 0; j < orders[i].seats.length; j++) {
                var current_user = await users.findOne({ _id: orders[i].userId });
                users1.push(current_user);
            }
        }

        res.render('for_perticuler_launge_admin', { perticuler_launge, orders, users1 });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    add_lounges: add_lounges
};
