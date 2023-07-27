var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const providerModel = require("./loungeProviderSchema")
const loungeRegistration = require("./loungeModelSchema");

const shopProviderSchema = require('./shopProviderSchema');
const shopRegistration= require('./shopModelSchema');

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


router.get('/shofa', function(req, res){
  res.render('shofa');
})

router.get('/shetbook', function(req, res){
  res.render('shetbook');
})
router.get('/userAccountPage',  async  function(req, res, next){
  let email = req.cookies.user_email;
  let user = await users.findOne({email:email});
  res.render('userAccountPage', {user})
})

// ==================================User Register ====================================

router.get('/register', function(req, res){
  res.render('register');
})

router.post('/register', function(req, res, next) {
  var newUser = new users({
    name:req.body.name,
    email:req.body.email,
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


// ================================User Login ========================

router.get('/login',function(req,res,next){
  res.render("login");
})

router.post('/login',async (req,res,next)=>{
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
  res.render('loggedInindex');
})

// ===========================Lounge Provider Register===================================

router.get('/loungeProvider_register', function(req, res){
  res.render('loungeProvider_register');
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
    res.cookie('loungeProvider_email', req.body.email);
    console.log(newProvider._id)
//  var provider =    providerModel.findOne({email: newProvider.email})
    // console.log()
    // res.render('loungeRegistration');
    res.redirect('/loungeRegistration');
  })
});

// ===========================Lounge Provider Login=======================================

router.get('/loungeProvider_login', function(req, res){
  res.render('loungeProvider_login');
})

router.post('/loungeProviderLogin', async function(req, res, next){
  var email = req.body.email
  const pass = req.body.password

  if(!email || !pass){
    res.send("please enter valid email and password");
  }
  

  const LoungeUser = await providerModel.findOne({email : email})
  // console.log(LoungeUser);
  if (!LoungeUser || !(pass === LoungeUser.password)) {
    res.send("please enter thr right password and email");
  }
  const token = jwt.sign(
    { id: LoungeUser._id },
    'mynameispulkitupadhyayfromharda',
    {
      expiresIn: '10d',
    }
  );
  res.cookie('Token', token, { httpOnly: true, maxAge: 1.728e8 });
  res.cookies = ('loungeProvider_email', LoungeUser.email);
  res.send("Lounge Provider login");
  
})

// =================================Lounge Registration=================================

router.get('/loungeRegistration', async(req, res)=>{
  var email = req.cookies.loungeProvider_email;
  // console.log("this is lucky" + email)
  var loungeProvider = await providerModel.findOne({email:email})
  // console.log("this is the lucky" + loungeProvider)
  res.render('loungeRegistration',{loungeProvider});
  })
  
  
  router.post('/loungeRegistration', function(req, res){
    var newLounge = new loungeRegistration({
      loungeName: req.body.loungeName,
      loungeEmail: req.body.loungeEmail,
      loungePhoneNo: req.body.loungePhoneNo,
      loungeProviderId: req.body.loungeProviderId
    })
    newLounge.save().then(function(dets){
      res.send("saved");
    })
  })
  

// =================================ShopProvider Register================================

router.get('/shopProvider_register', function(req, res){
  res.render('shopProvider_register');
})

router.post('/shopProviderRegister', function(req, res, next) {
  var newShopProvider = new shopProviderSchema({
    shopName:req.body.shopName,
    shopEmail:req.body.shopEmail,
    shopPhoneNo:req.body.shopPhoneNo,
    shopPassword:req.body.shopPassword 
  })
 
  newShopProvider.save().then((doc)=>{
    // res.cookie('Token', token, { httpOnly: true, maxAge: 1.728e8 });
    res.cookie('shopProvider_email', req.body.shopEmail);
    // console.log(newShopProvider);
//  var provider =    providerModel.findOne({email: newProvider.email})
    // console.log()
    // res.render('shopRegistration');
    res.redirect('/shopRegistration')
  })
});

// ==================================Shop Provider Login==============================

router.get('/shopProvider_login', function(req, res){
  res.render('shopProvider_login');
})

router.post('/shopProviderLogin', async function(req, res, next){
  var shopemail = req.body.shopEmail
  const shoppass = req.body.shopPassword

  if(!shopemail || !shoppass){
    res.send("please enter valid email and password");
  }
  

  const shopUser = await shopProviderSchema.findOne({shopEmail : shopemail})
  console.log("this is nature"+shopUser);
  if (!shopUser || !(shoppass === shopUser.shopPassword)) {
    res.send("please enter thr right password and email");
  }
  const token = jwt.sign(
    { id: shopUser._id },
    'mynameispulkitupadhyayfromharda',
    {
      expiresIn: '10d',
    }
  );
  res.cookie('Token', token, { httpOnly: true, maxAge: 1.728e8 });
  res.cookies = ('shopProvider_email', shopUser.email);
  res.send("shop Provider login");
  
})

// ==================================Shop Registeration================================

router.get('/shopRegistration', async (req, res)=>{
  var email = req.cookies.shopProvider_email;
  // console.log("this khilesh" + email);
  var shopProvider = await shopProviderSchema.findOne({email:email})
  res.render('shopRegistration', {shopProvider});
})

router.post('/shopRegistration', (req, res)=>{
  var newShop = new shopRegistration({
    shopName: req.body.shopName,
    shopEmail: req.body.shopEmail,
    shopPhoneNo: req.body.shopPhoneNo,
    shopProviderId: req.body.shopProviderId
  })
  newShop.save().then(function(dets){
    res.send("shop saved in db");
  })
})

// ==========================================User Logout==================================

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





// _______________LoungeProvider Login and LoungeProvider Register_________________________




router.get('/provider', function(req, res){
  res.render('provider');
})
router.get('/shofa', function(req, res){
  res.render('shofa');
})










//_________________________________________________Enquiry Page_________________________________________



// _________________________________________________Enquiry Page_________________________________________





module.exports = router;