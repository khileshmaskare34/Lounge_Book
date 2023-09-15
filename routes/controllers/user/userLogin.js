const loungeRegistration = require("../../../module/loungeModelSchema");
const users = require('../../../module/users');
const jwt = require('jsonwebtoken');

const user_login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const pass = req.body.password;

        if (!email || !pass) {
            console.log('Please enter email and password');
            return res.status(400).render('login', { error: 'Please enter valid email and password.' });
        }

        const User = await users.findOne({ email: email });

        if (!User || !(pass === User.password)) {
            // Incorrect password or user not found
            console.log("Login failed: Incorrect email or password");
            return res.status(401).render('login', { error: 'Incorrect email or password !' });
        } else {
            const token = jwt.sign(
                { id: User._id },
                'mynameispulkitupadhyayfromharda',
                {
                    expiresIn: '10d',
                }
            );
            res.cookie('Token', token, { httpOnly: true, maxAge: 1.728e8 });
            res.cookie('user_email', User.email);

            let loungess = await loungeRegistration.find();
            let station = [];
            for (let i = 0; i < loungess.length; i++) {
                let station1 = loungess[i].stationLocation;
                station.push(station1);
            }

            res.render('loggedInindex', { station });
        }
    } catch (error) {
        console.error("An error occurred:", error);
        next(error); // Pass the error to the error handling middleware
    }
}

module.exports = {
    user_login_account: user_login
}
