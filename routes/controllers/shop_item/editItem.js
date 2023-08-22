const shopItems = require('../../../module/shopItems');

const edit_item = async (req, res, next) => {
    try {
        const imageFilename = req.file.filename;

        let editedItem = await shopItems.findOneAndUpdate(
            { _id: req.body.itemId_for_delete },
            {
                $set: {
                    item_Name: req.body.item_Name,
                    description: req.body.description,
                    Image: imageFilename,
                    price: req.body.item_price,
                    shop_id: req.body.shopId,
                },
            },
            { new: true }
        );

        if (!editedItem) {
            console.log("Item not found");
            return res.status(404).send("Item not found");
        }

        res.redirect('/shop_procider_admin');
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {
    edit_item_item: edit_item
}
