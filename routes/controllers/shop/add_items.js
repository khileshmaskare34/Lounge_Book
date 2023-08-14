
const shopRegistration= require('./../../shopModelSchema');


const add_items = async (req,res,next)=>{
    // console.log(req.params.id)
    var newShop = await shopRegistration.findOne({ _id : req.params.id})
    // console.log(newShop)
      res.render('add_items_of_shop', {newShop})
    
    
    }

    module.exports = {
        add_items:add_items
    }
