const shopRegistration = require('../../../module/shopModelSchema');

const delete_shop = async (req, res, next) => {
    try {
        await shopRegistration.findOneAndDelete({ _id: req.body.shopId_for_delete });
  
        res.redirect('/shop_procider_admin');
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    delete_shop_shop: delete_shop
}
