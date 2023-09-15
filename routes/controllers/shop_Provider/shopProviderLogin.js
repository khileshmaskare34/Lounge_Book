const jwt = require('jsonwebtoken')
const shopProviderSchema = require('../../../module/shopProviderSchema');
const shopRegistration = require('../../../module/shopModelSchema');

const shop_provider_login = async (req, res, next) => {
    try {
        var shopemail = req.body.shopEmail;
        const shoppass = req.body.shopPassword;

        if (!shopemail || !shoppass) {
            // res.send("Please enter valid email and password");
            return res.status(401).render('shopProvider_login', { error: 'Incorrect email or password !' });

        }

        const shopUser = await shopProviderSchema.findOne({ shopEmail: shopemail });

        if (!shopUser || !(shoppass === shopUser.shopPassword)) {
            // res.send("Please enter the right password and email");
            return res.status(401).render('shopProvider_login', { error: 'Incorrect email or password !' });

        } else {
            var shops = await shopRegistration.find({ shopProviderId: shopUser._id });

            const token = jwt.sign(
                { id: shopUser._id },
                'mynameispulkitupadhyayfromharda',
                {
                    expiresIn: '10d',
                }
            );

            res.cookie('Token', token, { httpOnly: true, maxAge: 1.728e8 });
            res.cookie('shopProvider_email', shopUser.shopEmail, { httpOnly: true, maxAge: 1.728e8 });

            res.redirect("/shop_procider_admin");
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    shop_provider_login_account: shop_provider_login
}
