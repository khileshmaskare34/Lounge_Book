const loungeRegistration = require("../../../module/loungeModelSchema");
const longeOrders = require('./../../../module/LoungeOrders')
const users = require('../../../module/users');





const get_choose_lounge =    async (req,res,next)=>{
    let laungeId = req.params.id;
        let launge = await loungeRegistration.findOne({ _id: laungeId})
        // console.log("this is the moto" + launge)
    
    let laungesWithOrders = await longeOrders.find({  loungeId: laungeId})
    // console.log(laungesWithOrders +'sdfsdfsdf')
    
    let seatss =[];
    for(var i = 0 ; i< laungesWithOrders.length; i++){
       let jiji=laungesWithOrders[i].seats   
       seatss.push(jiji)
    }
                      
    // console.log(seatss)
    let totalSeats =[] 
    for(var k=0; k<seatss.length; k++){
    var ppp = seatss[k]
    // console.log(ppp)
      for(var j=0; j< ppp.length; j++){
      totalSeats.push(ppp[j])
    }
    
    }
    // console.log(totalSeats )
    
    let email = req.cookies.user_email;
    // console.log("email"+email)
    let userx = await users.findOne({email : email});
    // console.log("this is lucky"+ userx);
    
      res.render('shetbook', {launge,totalSeats, userx})
    
    }

    module.exports={
        get_choose_lounge:get_choose_lounge
    }