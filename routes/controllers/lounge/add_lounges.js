
const longeOrders = require('./../../../module/LoungeOrders')
const loungeRegistration = require("./../../loungeModelSchema");
const users = require('./../../users');




const add_lounges = async (req,res,next)=>{

    var perticuler_launge = await loungeRegistration.findOne({ _id: req.params.id})
    console.log(perticuler_launge)
    
    var orders = await longeOrders.find({ loungeId : perticuler_launge._id})
    console.log(orders)
    
    var users1 = []
    
    for(var i=0; i<orders.length; i++){
    
      for(var j = 0 ; j< orders[i].seats.length; j++){
    var current_user = await users.findOne({ _id: orders[i].userId})
    users1.push(current_user)
      }
    
    }
    // console.log(users1)
      res.render('for_perticuler_launge_admin',{ perticuler_launge, orders, users1 })
    
    }

    module.exports={
        add_lounges: add_lounges
    }