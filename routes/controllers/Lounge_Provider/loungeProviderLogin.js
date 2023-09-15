const providerModel = require("../../../module/loungeProviderSchema");
const jwt = require('jsonwebtoken');

const lounge_provider_login = async (req, res, next) => {
    try {
        var email = req.body.email;
        const pass = req.body.password;

        if (!email || !pass) {
            return res.status(401).render('loungeProvider_login', { error: 'Incorrect email or password !' });

            // res.send("Please enter valid email and password");
        }

        const LoungeUser = await providerModel.findOne({ email: email });

        if (!LoungeUser || !(pass === LoungeUser.password)) {
            // res.send("Please enter the right password and email");
            return res.status(401).render('loungeProvider_login', { error: 'Incorrect email or password !' });

        }

        const token = jwt.sign(
            { id: LoungeUser._id },
            'mynameispulkitupadhyayfromharda',
            {
                expiresIn: '10d',
            }
        );
        
        res.cookie('Token', token, { httpOnly: true, maxAge: 1.728e8 });
        res.cookie('loungeProvider_email', LoungeUser.email);

        res.redirect('/lounge_provider_admin');
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    lounge_provider_login_account: lounge_provider_login
};
