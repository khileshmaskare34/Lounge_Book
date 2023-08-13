var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const providerModel = require("./loungeProviderSchema")
const loungeRegistration = require("./loungeModelSchema");
const shopProviderSchema = require('./shopProviderSchema');
const shopRegistration= require('./shopModelSchema');
const users = require('./users');
const isLoggedIn = require('./../module/isLoggedIn')
const longeOrders = require('./../module/LoungeOrders')
const moment = require('moment');
const schedule = require('node-schedule');
const shop_items = require('./shopItems');
const shopItems = require('./shopItems');
const { route } = require('../app');
const home = require('./controllers/home')
const userAccount = require('./controllers/user/userAccount')
const lounge_admin = require('./controllers/Lounge_Provider/L_P_admin')
let myDate;
const get_lounge_reg = require('./controllers/lounge/get_lounge_reg')
const get_shop_P_admin = require('./controllers/shop_Provider/get_s_p_admin')
const get_shop_reg = require('./controllers/shop/get_shop_reg')
const get_add_items = require('./controllers/shop/add_items')
const get_choose_lounge = require('./controllers/lounge/get_choose_lounges')
const add_lounges = require('./controllers/lounge/add_lounges')
const lounge_provider_login = require('./controllers/Lounge_Provider/lounge_provider_login')


const multer = require('multer')
const path=require('path');




//  ************** The scheduler which runs every 1 hour and 1 minut ******************


schedule.scheduleJob('1 */1 * * *', () => {
  console.log('This task will run every 1 hour and 1 minute.' + new Date());
  let current = new Date();
  let current_utc =  moment(current).utc()
 async function deleted(){
  console.log(deleted)
 try {
   await longeOrders.deleteMany({ expireTime : { $lt: current_utc } })
   
 } catch (error) {
 console.log(error)  
 }
 

 }
 
 deleted();
 
});


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< multer >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, './../public/upload'));
  },
  filename: (req, file, cb) => {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  },
});

var upload = multer({ storage: storage });

// <<<<<<<<<<<<<<<<<<<multer>>>>>>>>>>>>>>>>>>>>>>



// **************************** ALL GET ROUTS ********************************************


// ******** HOME ****************


router.get('/', home.home);
router.get('/lounge_provider_admin', lounge_admin.admin)




// USER ACCOUNT PAGE 

router.get('/userAccountPage', userAccount.account )





// ************* LOGIN AND REGISTERS ********************

router.get('/get-started', function(req, res, next) {
  res.render('get-started', { title: 'Express' });
});

router.get('/register', function(req, res){
  res.render('register');
})

router.get('/login',function(req,res,next){
  res.render("login");
})

router.get('/new-user', function(req, res, next) {
  res.render('new-user', { title: 'Express' });
});


router.get('/provider', function(req, res){
  res.render('provider');
})



//  LOGIN AND REGISTER FOR LOUNGES 

router.get('/loungeProvider_register', function(req, res){
  res.render('loungeProvider_register');
})

router.get('/loungeProvider_login', function(req, res){
  res.render('loungeProvider_login');
})
router.get('/loungeRegistration', get_lounge_reg.get_lounge_registration);
  



// LOGIN AND REGISTER FOR SHOPS 

router.get('/shopProvider_login', function(req, res){
  res.render('shopProvider_login');
})

router.get('/shopProvider_register', function(req, res){
  res.render('shopProvider_register');
})

router.get('/shopRegistration', get_shop_reg.get_shop_reg)




//******************* */ LOUNGE RELETED GET ROUTS************************ 


router.get('/shetbook', function(req, res){
  res.render('shetbook');
})


router.get(`/chooseLaunge/:id`, get_choose_lounge.get_choose_lounge )

router.get('/laungeadminforaddingitems/:id', add_lounges.add_lounges)





//************************* */ SHOP RELETED GET ROUTES **********************


router.get('/shop_procider_admin', get_shop_P_admin.shop_p_admin)

router.get('/add_items/:id', get_add_items.add_items)

router.get('/shopadminforaddingitems/:id', async (req, res,next)=>{

  let perticuler_shop = await shopRegistration.findOne({ _id: req.params.id })
let items = await shop_items.find({ shop_id: perticuler_shop.shopEmail })

 
  res.render('shop_admin_for_adding_items' ,{ perticuler_shop, items })

})







//888************************************* ALL POST ROUTES ******************************







router.post('/register', async function(req, res, next) {
  let loungess = await loungeRegistration.find();
  let station = [];
  for(let i=0;i<loungess.length;i++){
    let station1 = loungess[i].stationLocation
    station.push(station1); 
  }
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

    res.render('loggedInindex',{station});
  })
});


// ================================User Login ========================


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

  let loungess = await loungeRegistration.find();
  let station = [];
  for(let i=0;i<loungess.length;i++){
    let station1 = loungess[i].stationLocation
    station.push(station1); 
  }
  // console.log(station);

  res.render('loggedInindex', {station});
})

// ===========================Lounge Provider Register===================================


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
    // console.log(newProvider._id)
//  var provider =    providerModel.findOne({email: newProvider.email})
    // console.log()
    // res.render('loungeRegistration');
    res.redirect('/loungeRegistration');
  })
});

// ===========================Lounge Provider Login=======================================


router.post('/loungeProviderLogin', lounge_provider_login.lounge_provider_login)  





// =================================Lounge Registration=================================


  
  router.post('/loungeRegistration', async function(req, res){
  var email = req.cookies.loungeProvider_email;

    var newLounge = new loungeRegistration({
      loungeName: req.body.loungeName,
      loungeEmail: req.body.loungeEmail,
      loungePhoneNo: req.body.loungePhoneNo,
      noOfSeats: req.body.noOfSeats,
      stationLocation: req.body.stationLocation,
      loungeProviderId: req.body.loungeProviderId
    })



    newLounge.save().then(function(dets){


      res.redirect("/lounge_provider_admin");


    })
  })
  
 
 

// =================================ShopProvider Register================================


router.post('/shopProviderRegister', function(req, res, next) {
  var newShopProvider = new shopProviderSchema({
    shopName:req.body.shopName,
    shopEmail:req.body.shopEmail,
    shopPhoneNo:req.body.shopPhoneNo,
    shopPassword:req.body.shopPassword,
    
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



router.post('/shopProviderLogin', async function(req, res, next){
  var shopemail = req.body.shopEmail

  // console.log(shopemail)
  const shoppass = req.body.shopPassword

  if(!shopemail || !shoppass){
    res.send("please enter valid email and password");
  }
  

  const shopUser = await shopProviderSchema.findOne({shopEmail : shopemail})
var shops = await shopRegistration.find({ shopProviderId : shopUser._id })

  // console.log(shopUser)
  // console.log("this is nature"+shopUser);
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


  res.cookie('shopProvider_email', shopUser.shopEmail, { httpOnly: true, maxAge: 1.728e8 });



 
  res.redirect("/shop_procider_admin");
  
})




// ==================================Shop Registeration================================





router.post('/shopRegistration', async(req, res)=>{
  var newShop = new shopRegistration({
    shopName: req.body.shopName,
    shopEmail: req.body.shopEmail,
    shopPhoneNo: req.body.shopPhoneNo,
    shopProviderId: req.body.shopProviderId,
    station_Name: req.body.station
  })
 
  var email = req.cookies.shopProvider_email;
  // console.log("this khilesh" + email);
  var shopProvider = await shopProviderSchema.findOne({shopEmail:email})
  newShop.save().then(function(dets){
   
    // console.log("lll" + shopProvider)
   
    res.render('add_items_of_shop',{shopProvider , newShop})
  })
})






router.post('/add_items', upload.single("item_image"), async (req, res, next) => {
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
});


router.post('/edit_item',upload.single("Image"), async (req, res, next)=>{
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
  })
 

  router.post('/edit_shop', async (req, res, next)=>{
  
  
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



// _________________________________________________Enquiry Page_________________________________________
router.post('/choiceFilling', async (req,res,next)=>{
  const stationName = req.body.stationName
  // console.log(stationName)
  const bedCount = req.body.bedCount;
  let hours = req.body.hours

  let checkin1 = req.body.checkIn
  let dateF = moment(checkin1).format('YYYY-MM-DDTHH:mm:ss.SSSZ')
let UTC_futureDate = moment(dateF).utc().add(hours, 'hours')
  // console.log('jijij' + checkin1)
  // console.log("lucky check in " + checkin);
  // console.log("lucky hours"+ hours)
  // const futureTime = new Date(checkin1.getTime() + hours * 60 * 60 * 1000);
  myDate = UTC_futureDate ;
  // console.log("le beta isko bhi check kar"+ futureTime)


  let launges = await loungeRegistration.find({stationLocation: stationName})

  res.render("chooseLaunge", {launges})
})



// ==========================================================



// =============================================================*******************************==============

router.post('/choosen/:id', async (req,res,next)=>{

  // console.log(req.params)
let launge = await loungeRegistration.findOne({ _id: req.params.id})
let laungeName = launge.loungeName;
let user = await users.findOne({ email: req.cookies.user_email})
let username = user.name;
// let myDate = req.body.myDate
// console.log("lafda lag raha hai baba" + req.body.myDate);
// console.log("lafda lag raha " + myDate1);
let seat_1;
// console.log( typeof req.body.seat )
if(typeof req.body.seat !== 'object'){
  seat_1 = [req.body.seat]
}else{
  seat_1 = req.body.seat
}


var newOrder = new longeOrders({
  loungeName: req.body.loungeName,
  userName: user.name,
  loungeId: launge._id,
  userId: user._id,
  
  seats: seat_1,
  expireTime: myDate,
})
newOrder.save().then(function(dets){
  // res.send("order saved in db");
  res.cookie('longe_booked_by_user', newOrder.loungeId, { httpOnly: true, maxAge: 1.728e8 });

  res.redirect('/after_loungeBook_loggedInIndex')
})
})

router.get('/after_loungeBook_loggedInIndex', async function(req, res){
 
// let all_food_items =[]

// for(var k = 0 ; k<shops.length; k++){
  
// }
var lounges_for_shop = await loungeRegistration.find();
let station = [];
for(let i = 0;i<lounges_for_shop.length;i++){
  let station1 = lounges_for_shop[i].stationLocation
  station.push(station1)
}
// >>>>>>>>>>>>>>>>>>lucky code>>>>>>>>>>>>>>>>
let lounge = await loungeRegistration.findOne({ _id: req.cookies.longe_booked_by_user});
 
// console.log('as;ldkfjdkdfkdkfdfdsfdsfdsfs' + lounge)


let shops1 = await shopRegistration.find({ station_Name: lounge.stationLocation });
// console.log("khles"+shops1) 
// console.log(shops1)


var all_items =[];

for(var i = 0; i < shops1.length; i++){

var shop_item = await  shop_items.find({ shop_id: shops1[i].shopEmail }) 
// console.log("youth"+shop_item)
 all_items.push(shop_item);
}
// console.log("ley"+ all_items)
// >>>>>>>>>>>>>>>>>>lucky code>>>>>>>>>>>>>>>>

let shop_name = await shopRegistration.find();
// console.log("thunder"+shop_name);
 
  res.render('after_loungeBook_loggedInIndex', {station,lounge, all_items, shops1});
})

















router.post('/delete_lounge', async (req, res, next)=>{

 await loungeRegistration.findOneAndDelete({ _id: req.body.loungeId_for_delete})

  console.log('deleted')
  res.redirect('/lounge_provider_admin')
})


router.post('/delete_item', async (req, res, next)=>{
  var shopItem =  await shop_items.findOne({ _id: req.body.itemId_for_delete})
  var idddd = shopItem.shop_id;
  var shopForId = await shopRegistration.findOne({ shopEmail: idddd})
  console.log(idddd)
   console.log('deleted')
var pathji = `/shopadminforaddingitems/` + shopForId._id
  await shop_items.findOneAndDelete({ _id: req.body.itemId_for_delete})
 
  
   res.redirect(pathji)
 })

 router.post('/delete_shop', async (req, res, next)=>{
 
  await shopRegistration.findOneAndDelete({ _id: req.body.shopId_for_delete})
 
  
   res.redirect('/shop_procider_admin')
 })
 



router.post('/edit_lounge', async (req, res, next)=>{

 let edit_lounge = await loungeRegistration.findOneAndUpdate(
    { _id: req.body.loungeId_for_delete }, // Conditions to find the document
    { $set: { loungeName: req.body.loungeName,
              loungePhoneNo : req.body.loungePhoneNo,
              loungeEmail: req.body.loungeEmail,
              noOfSeats: req.body.noOfSeats
    
    }}, // Update operation
    { new: true } // Return the updated document
  );
  console.log("edit_Loun"+ edit_lounge)
 
   console.log('updated')
   res.redirect('/lounge_provider_admin')
 })




module.exports = router;