const shop_items = require('../../../module/shopItems');


const add_items = async (req, res, next) => {
    try {

        if (!req.file) {
          return res.status(400).send('No file uploaded');
        }
    
        const imageFilename = req.file.filename;
        // Now you can process the image filename as needed
    
        var new_item = new shop_items({
          item_Name: req.body.item_name,
          description: req.body.description,
          Image: imageFilename,
          price: req.body.item_price,
          shop_id: req.body.shopId
        });
    
    
        new_item.save().then(function (dets) {
          res.redirect("/shop_procider_admin");
        });
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error'); // Sending an error response
      }
}

module.exports = {
    add_items_post : add_items
}