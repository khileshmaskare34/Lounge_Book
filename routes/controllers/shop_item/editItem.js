const shopItems = require('../../../module/shopItems');

const edit_item = async (req, res, next)=>{
      
 const imageFilename = req.file.filename;


  let edit_item =  await shopItems.findOneAndUpdate(
    {_id: req.body.itemId_for_delete },
    { $set: { item_Name: req.body.item_Name,
              description : req.body.description,
              Image: imageFilename,
              price: req.body.item_price,
              shop_id: req.body.shopId
            }
    },
    { new: true}
  )
    //  console.log('updated')
     res.redirect('/shop_procider_admin')
}

module.exports = {
    edit_item_item : edit_item
}