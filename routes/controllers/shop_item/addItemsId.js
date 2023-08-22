
const shopRegistration= require('../../../module/shopModelSchema');


const add_items_id = async (req,res,next)=>{
    // console.log(req.params.id)
    var newShop = await shopRegistration.findOne({ _id : req.params.id})
    // console.log(newShop)
      res.render('add_items_of_shop', {newShop})
    
    
    }

    module.exports = {
        add_items:add_items_id
    }
