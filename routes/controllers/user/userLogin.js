const loungeRegistration = require("../../../module/loungeModelSchema");
const users = require('../../../module/users');
const jwt = require('jsonwebtoken')

const user_login = async (req, res, next)=>{
    const email = req.body.email
    const pass = req.body.password
    // console.log("this is user" + email)
    if (!email || !pass) {
      console.log('please enter password')
      return next('please enter valid email or password sp fdf');
    }
  
    const User = await  users.findOne({ email: email });
    // console.log(User.password)
    if(!User || !(pass ===  User.password)){
      console.log("please provide correct email or password")
      // return next('enter the correcr cridentals');
      res.send("please provide the right email or password");
    }
   
    const token = jwt.sign(
      { id: User._id },
      'mynameispulkitupadhyayfromharda',
      {
        expiresIn: '10d',
      }
    );
    res.cookie('Token', token, { httpOnly: true, maxAge: 1.728e8 });
    res.cookie('user_email', User.email);
  
    let loungess = await loungeRegistration.find();
    let station = [];
    for(let i=0;i<loungess.length;i++){
      let station1 = loungess[i].stationLocation
      station.push(station1); 
    }
    // console.log(station);
  
    res.render('loggedInindex', {station});
}

module.exports = {
    user_login_account : user_login
}