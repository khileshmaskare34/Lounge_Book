var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const providerModel = require("./providerModel")
const loungeRegistration = require("./loungeModelSchema");
const users = require('./users');
const isLoggedIn = require('./../module/isLoggedIn')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-started', function(req, res, next) {
  res.render('get-started', { title: 'Express' });
});
router.get('/new-user', function(req, res, next) {
  res.render('new-user', { title: 'Express' });
});



// ______________________________________User Register Page_____________________________
router.get('/register', function(req, res){
  res.render('register');
})
router.get('/shofa', function(req, res){
  res.render('shofa');
})
router.get('/shetbook', function(req, res){
  res.render('shetbook');
})

router.post('/register', function(req, res, next) {
  var newUser = new users({
    name:req.body.name,
    email:req.body.email,
    // username:req.body.username,
    password:req.body.password  
  })
  newUser.save().then(function(){
    const token = jwt.sign(
      { id: newUser.__id },
      'mynameispulkitupadhyayfromharda',
      {
        expiresIn: '10d',
      }
    );
    res.cookie('Token', token, { httpOnly: true, maxAge: 1.728e8 });
    res.cookie('user_email', newUser.email);
    res.render('loggedInindex');
  })
});

router.get('/userAccountPage',  async  function(req, res, next){
  let email = req.cookies.user_email;
  let user = await users.findOne({email:email});
  res.render('userAccountPage', {user})
})

// ___________________________________User Login Page______________________________

router.get('/login',function(req,res,next){
  res.render("login");
})

router.post('/login',async (req,res,next)=>{
  const email = req.body.email
  const pass = req.body.password
  console.log(pass)
  if (!email || !pass) {
    console.log('please enter password')
    return next('please enter valid email or password sp fdf');
  }

  const User = await  users.findOne({ email: email });
  console.log(User)
  if (!User || !pass == User.password) {
    console.log("please provide correct email or password")
    return next('enter the correcr cridentals');
  }
  console.log(User );
  const token = jwt.sign(
    { id: User._id },
    'mynameispulkitupadhyayfromharda',
    {
      expiresIn: '10d',
    }
  );
  res.cookie('Token', token, { httpOnly: true, maxAge: 1.728e8 });
  res.cookie('user_email', User.email);
  res.render('loggedInindex');



}
)

router.post('/loungeProviderLogin', async function(req, res, next){
  var email = req.body.email
  const pass = req.body.password

  if(!email || !pass){
    res.send("please enter valid email and password");
  }
  

  const LoungeUser = await providerModel.findOne({email : email})
  console.log(LoungeUser);
  if (!LoungeUser || !pass == LoungeUser.password) {
    console.log("please provide correct email or password")
    return next('enter the correcr cridentals');
  }
  const token = jwt.sign(
    { id: LoungeUser._id },
    'mynameispulkitupadhyayfromharda',
    {
      expiresIn: '10d',
    }
  );
  res.cookie('Token', token, { httpOnly: true, maxAge: 1.728e8 });
  res.cookies = ('Provider_email', LoungeUser.email);
  res.send("provider login");
  
})

router.post('/logout',(req,res,next)=>{
  const token = req.cookies.Token
  jwt.verify(
   token,
    'mynameispulkitupadhyayfromharda',
    (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.clearCookie('Token');
        res.clearCookie('provider_email');
        res.redirect('/');
      }
    }
  );
  
})




// router.get('/loggedInindex',isLoggedIn,function(req,res,next){

//   userModel.findOne({name:req.session.passport.user})
//   .then(function(user){ 
//     res.render("loggedInindex",{user});
//   })
// });

// router.get('/users',isLoggedIn,function(req,res,next){

//   userModel.findOne()
//   .then(function(user){
//     res.render("users",{user});
//   })
// });

// router.post('/logout',function(req,res){
//   req.logout(function(err){
//     if(err){return next(err);}

//     res.redirect('/');
//   })
// })
  
// function isLoggedIn(req,res,next ){
//   if(passport.authenticate()){
//     return next();
//   }
// }



// ___________________________________Provider Login and Provider Register__________________________________

router.get('/loungeProvider_login', function(req, res){
  res.render('loungeProvider_login');
})

router.get('/loungeProvider_register', function(req, res){
  res.render('loungeProvider_register');
})

router.get('/provider', function(req, res){
  res.render('provider');
})

router.get('/shopProvider_login', function(req, res){
  res.render('shopProvider_login');
})

router.get('/shopProvider_register', function(req, res){
  res.render('shopProvider_register');
})

router.post('/loungeProviderRegister', function(req, res, next) {
  var newProvider = new providerModel({
    name:req.body.name,
    email:req.body.email,
    phoneNo:req.body.phoneNo,
    password:req.body.password 
  })
 
  newProvider.save().then((doc)=>{
    // res.cookie('Token', token, { httpOnly: true, maxAge: 1.728e8 });
    res.cookie('provider_email', req.body.email);
    console.log(newProvider.email)
//  var provider =    providerModel.findOne({email: newProvider.email})
    // console.log()
    // res.render('loungeRegistration');
    res.redirect('/loungeRegistration');
  })
});

router.post('/shopProviderRegister', function(req, res, next) {
  var newProvider = new providerModel({
    name:req.body.name,
    email:req.body.email,
    phoneNo:req.body.phoneNo,
    password:req.body.password 
  })
 
  newProvider.save().then((doc)=>{
    // res.cookie('Token', token, { httpOnly: true, maxAge: 1.728e8 });
    res.cookie('provider_email', req.body.email);
    console.log(newProvider.email)
//  var provider =    providerModel.findOne({email: newProvider.email})
    // console.log()
    // res.render('loungeRegistration');
    res.redirect('/shopRegistration');
  })
});


//_________________________________________________Enquiry Page_________________________________________
router.get('/enquiry', function(req, res){
  res.render('enquiry');
})


router.get('/loungeRegistration', async(req, res)=>{
var email = req.cookies.provider_email;
console.log(email)
var provider = await providerModel.findOne({email:email})
console.log(provider)
res.render('loungeRegistration',{provider});
})


router.post('/loungeRegistration', function(req, res){
  var newLounge = new loungeRegistration({
    loungename: req.body.loungeName,
    loungeEmail: req.body.loungeEmail,
    loungePhoneNo: req.body.loungePhoneNo,
    loungeProviderId: req.body.loungeProviderId
  })
  newLounge.save().then(function(dets){
    res.send("saved");
  })

})
module.exports = router;
