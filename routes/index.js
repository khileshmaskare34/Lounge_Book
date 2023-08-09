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



// =========================check In===========================



let myDate;

//  async function schadule_delete(){

//   let current = new Date();
//   await longeOrders.deleteMany({ expireTime : { $lt: current } })
//   console.log('item deleted')
// }

// setInterval(schadule_delete,  3601000 );

/* GET home page. */
router.get('/', async function(req, res, next) {
  let loungess = await loungeRegistration.find();
  let station = [];
  for(let i=0;i<loungess.length;i++){
    let station1 = loungess[i].stationLocation
    station.push(station1); 
  }
  console.log(station);

  res.render('index', {station});
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


// router.get('/shofa', function(req, res){
//   res.render('shofa');
// })

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

  let loungess = await loungeRegistration.find();
  let station = [];
  for(let i=0;i<loungess.length;i++){
    let station1 = loungess[i].stationLocation
    station.push(station1); 
  }
  console.log(station);

  res.render('loggedInindex', {station});
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
  console.log(LoungeUser);
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
  res.cookie('loungeProvider_email', LoungeUser.email);



  // console.log(LoungeUser._id)
  res.redirect('/lounge_provider_admin')
})  





// =================================Lounge Registration=================================

router.get('/loungeRegistration', async(req, res)=>{
  var email = req.cookies.loungeProvider_email;
  // console.log("this is lucky" + email)

  var loungeProvider = await providerModel.findOne({email:email})

  var launges = await loungeRegistration.find({ loungeProviderId :loungeProvider._id  })
  // console.log("this is the lucky" + loungeProvider)
  res.render('loungeRegistration',{loungeProvider , launges});
  })
  
  
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
  
  router.get('/lounge_provider_admin', async (req,res,next)=>{

    var LoungeUser = await providerModel.findOne({ email: req.cookies.loungeProvider_email})
    var his_launges = await loungeRegistration.find({  loungeProviderId: LoungeUser._id })
  
  
    res.render('longe_provider_admin', {LoungeUser, his_launges})
  
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

router.get('/shopProvider_login', function(req, res){
  res.render('shopProvider_login');
})

router.post('/shopProviderLogin', async function(req, res, next){
  var shopemail = req.body.shopEmail

  console.log(shopemail)
  const shoppass = req.body.shopPassword

  if(!shopemail || !shoppass){
    res.send("please enter valid email and password");
  }
  

  const shopUser = await shopProviderSchema.findOne({shopEmail : shopemail})
var shops = await shopRegistration.find({ shopProviderId : shopUser._id })

  console.log(shopUser)
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

router.get('/shop_procider_admin',async (req,res,next)=>{


  const shopUser = await shopProviderSchema.findOne({ shopEmail : req.cookies.shopProvider_email})


 var shops = await shopRegistration.find({ shopProviderId : shopUser._id })


  res.render('shop_provider_home',{shopUser,shops})
})


// ==================================Shop Registeration================================

router.get('/shopRegistration', async (req, res)=>{
  var email = req.cookies.shopProvider_email;
  // console.log("this khilesh" + email);
  var shopProvider = await shopProviderSchema.findOne({shopEmail:email})
  res.redirect("/shop_procider_admin");
})



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
   
   
    res.render('add_items_of_shop',{shopProvider , newShop})
  })
})

router.get('/add_items/:id',async (req,res,next)=>{
console.log(req.params.id)
var newShop = await shopRegistration.findOne({ _id : req.params.id})
console.log(newShop)
  res.render('add_items_of_shop', {newShop})


})

router.post('/add_items',async (req,res,next)=>{

var new_item = new shop_items({
item_Name: req.body.item_name,
description: req.body.description,
image : req.body.item_image,
price: req.body.item_price,
shop_id: req.body.shopId

})
new_item.save().then(function(dets){
   
   
  res.redirect("/shop_procider_admin");
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









router.get('/shopRegistration', async (req, res)=>{
  var email = req.cookies.shopProvider_email;
  // console.log("this khilesh" + email);
  var shopProvider = await shopProviderSchema.findOne({email:email})
  res.render('shopRegistration', {shopProvider});
})


//_________________________________________________Enquiry Page_________________________________________



// _________________________________________________Enquiry Page_________________________________________
router.post('/choiceFilling', async (req,res,next)=>{
  const stationName = req.body.stationName
  // console.log(stationName)
  const bedCount = req.body.bedCount;
  let hours = req.body.hours

  let checkin1 = req.body.checkIn
  let dateF = moment(checkin1).format('YYYY-MM-DDTHH:mm:ss.SSSZ')
let UTC_futureDate = moment(dateF).utc().add(hours, 'hours')
  console.log('jijij' + checkin1)
  // console.log("lucky check in " + checkin);
  console.log("lucky hours"+ hours)
  // const futureTime = new Date(checkin1.getTime() + hours * 60 * 60 * 1000);
  myDate = UTC_futureDate ;
  // console.log("le beta isko bhi check kar"+ futureTime)


  let launges = await loungeRegistration.find({stationLocation: stationName})

  res.render("chooseLaunge", {launges})
})



// ==========================================================

router.get(`/chooseLaunge/:id`, async (req,res,next)=>{
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
let userx = await users.findOne({email : email});
// console.log("this is lucky"+ userx);

  res.render('shetbook', {launge,totalSeats, userx})

})

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


var newOrder = new longeOrders({
  loungeName: req.body.loungeName,
  userName: user.name,
  loungeId: launge._id,
  userId: user._id,
  seats: req.body.seat,
  expireTime: myDate,
})
newOrder.save().then(function(dets){
  res.redirect('/after_loungeBook_loggedInIndex');
})

})

router.get('/after_loungeBook_loggedInIndex',async (req, res)=>{
  let loungess = await loungeRegistration.find();
  let station = [];
  for(let i=0;i<loungess.length;i++){
    let station1 = loungess[i].stationLocation
    station.push(station1); 
  }
  res.render('after_loungeBook_loggedInIndex', {station});
})

router.post('/choose_station_for_order_food', async (req, res,next)=>{

var station = req.body.stationName

var shops = await shopRegistration.find({ station_Name : station })

console.log(shops)


var all_items =[];

for(var i = 0; i<shops.length; i++){

 var shop_item = await  shop_items.find({ shop_id: shops[i].shopEmail }) 

  all_items.push(shop_item);
}
console.log(all_items)
res.render('list_all_items_for_order_food',{ all_items})

})




router.get('/shopadminforaddingitems/:id', async (req, res,next)=>{

  let perticuler_shop = await shopRegistration.findOne({ _id: req.params.id })
let items = await shop_items.find({ shop_id: perticuler_shop.shopEmail })


  res.render('shop_admin_for_adding_items' ,{ perticuler_shop, items })

})





router.get('/laungeadminforaddingitems/:id', async (req,res,next)=>{

var perticuler_launge = await loungeRegistration.findOne({ _id: req.params.id})
console.log(perticuler_launge)

var orders = await longeOrders.find({ loungeId : perticuler_launge._id})
// console.log(orders)

var users1 = []

for(var i=0; i<orders.length; i++){

  for(var j = 0 ; j< orders[i].seats.length; j++){
var current_user = await users.findOne({ _id: orders[i].userId})
users1.push(current_user)
  }

}
// console.log(users1)
  res.render('for_perticuler_launge_admin',{ perticuler_launge, orders, users1 })

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
 
  
   res.redirect('shop_procider_admin')
 })
 



router.post('/edit_lounge', async (req, res, next)=>{

 await loungeRegistration.findOneAndUpdate(
    { _id: req.body.loungeId_for_delete }, // Conditions to find the document
    { $set: { loungeName: req.body.loungeName,
              loungePhoneNo : req.body.loungePhoneNo,
              loungeEmail: req.body.loungeEmail,
              noOfSeats: req.body.noOfSeats
    
    }}, // Update operation
    { new: true } // Return the updated document
  );
 
   console.log('updated')
   res.redirect('/lounge_provider_admin')
 })




module.exports = router;