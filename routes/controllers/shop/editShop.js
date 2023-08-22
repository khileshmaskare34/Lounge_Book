const shopRegistration= require('../../../module/shopModelSchema');


const edit_shop = async (req, res, next)=>{
    let edit_shop =  await shopRegistration.findOneAndUpdate(
        {_id: req.body.shopId_for_delete },
        { $set: { shopName: req.body.shopName,
                  station_Name: req.body.station, 
                  shopPhoneNo: req.body.shopPhoneNo,
                  shopEmail : req.body.shopEmail,
                   
                }
        },
        { new: true}
      )
      // console.log("edit"+edit_shop);
        //  console.log('updated')
         res.redirect('/shop_procider_admin')
}

module.exports = {
    edit_shop_shop : edit_shop
}