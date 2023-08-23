const loungeRegistration = require("../../../module/loungeModelSchema");
const users = require('../../../module/users');
const jwt = require('jsonwebtoken')

const user_register = async (req, res, next) => {
    try {
        let loungess = await loungeRegistration.find();
        let station = [];
        for (let i = 0; i < loungess.length; i++) {
            let station1 = loungess[i].stationLocation;
            station.push(station1);
        }

        var newUser = new users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id },
            'mynameispulkitupadhyayfromharda',
            {
                expiresIn: '10d',
            }
        );

        res.cookie('Token', token, { httpOnly: true, maxAge: 1.728e8 });
        res.cookie('user_email', newUser.email);

        res.render('loggedInindex', { station });
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    user_register_account: user_register
}
