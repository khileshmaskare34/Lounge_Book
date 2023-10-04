let myDate;
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

// -------------------------------------------- collection -------------------------------------------------------------
const providerModel = require("../module/loungeProviderSchema")
const loungeRegistration = require("../module/loungeModelSchema");
const shopProviderSchema = require('../module/shopProviderSchema');
const shopRegistration= require('../module/shopModelSchema');
const users = require('../module/users');
const longeOrders = require('./../module/LoungeOrders')
const orderItem  = require('../module/orderFood');
const shop_items = require('../module/shopItems');
const shopItems = require('../module/shopItems');
const Otp = require('../module/otp');
const crypto =require("crypto")
const nodemailer = require('nodemailer');
const { isLoggedIn } = require('./../module/isLoggedIn')

const moment = require('moment');
const schedule = require('node-schedule');
const { route } = require('../app');
const home = require('./controllers/home')
const get_lounge_reg = require('./controllers/lounge/get_lounge_reg')
const get_shop_P_admin = require('./controllers/shop_Provider/get_s_p_admin')
const get_shop_reg = require('./controllers/shop/get_shop_reg')
const get_add_items = require('./controllers/shop_item/addItemsId')
const get_choose_lounge = require('./controllers/lounge/get_choose_lounges')
const add_lounges = require('./controllers/lounge/add_lounges')

// ------------------------user require----------------------------
const user_register = require("./controllers/user/userRegister")
const user_login = require('./controllers/user/userLogin')
const userAccount = require('./controllers/user/userAccount')

// ---------------lounge provider----------------------
const lounge_provider_register = require('./controllers/Lounge_Provider/loungeProviderRegister')
const lounge_provider_login = require('./controllers/Lounge_Provider/loungeProviderLogin')
const lounge_provider_admin = require('./controllers/Lounge_Provider/loungeProviderAdmin ')

// --------lounge---------
const lounge_registration = require('./controllers/lounge/loungeRegistration')
const edit_lounge = require('./controllers/lounge/editLounge')
const delete_lounge = require('./controllers/lounge/deleteLounge')

// -------------------shop provider----------------------
const shop_provider_register = require('./controllers/shop_Provider/shopProviderRegister')
const shop_provider_login = require('./controllers/shop_Provider/shopProviderLogin')
const shop_registration = require('./controllers/shop/shopRegistration')

// ----------------------- shop  ------------------
const food_selection = require('./controllers/shop/foodSelection')
const add_shops = require('./controllers/shop/addShops')
const delete_shop = require('./controllers/shop/deleteShop')
const edit_shop = require('./controllers/shop/editShop')

// ------------------------shop item ----------------
const delete_item = require('./controllers/shop_item/deleteItem')
const edit_item = require('./controllers/shop_item/editItem')
const food_order = require('./controllers/shop_item/foodOrder')
const particuler_item = require('./controllers/shop_item/particulerItem')


const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_test_05baNxbdPygtnZ',
  key_secret: 'MxREinR1HOpGfYxQLQEWnN6Q', // Removed the extra space at the end
});
















// ---------------------multer require-----------------------------
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

// _____________________multer _______________________

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

// *************************************************** ALL GET ROUTS *************************************************

//  HOME 
router.get('/', home.home);

router.get('/lounge_provider_admin', lounge_provider_admin.lounge_provider_admin_account)

// LOGIN AND REGISTERS 

router.get('/get-started', function(req, res, next) {
  res.render('get-started', { title: 'Express' });
});
router.get('/register', function(req, res){
  res.render('register');
})
router.get('/login',function(req,res,next){
  res.render("login", { error: '' });
})
router.get('/userAccountPage', userAccount.account )
router.get('/new-user', function(req, res, next) {
  res.render('new-user', { title: 'Express' });
});
router.get('/provider', function(req, res){
  res.render('provider');
})

//  LOGIN AND REGISTER GET ROUTE FOR LOUNGES 

router.get('/loungeProvider_register', function(req, res){
  res.render('loungeProvider_register');
})
router.get('/loungeProvider_login', function(req, res){
  res.render('loungeProvider_login', { error: ''});
})
router.get('/loungeRegistration', get_lounge_reg.get_lounge_registration);
  
// LOGIN AND REGISTER GET ROUTE FOR SHOPS 

router.get('/shopProvider_login', function(req, res){
  res.render('shopProvider_login',{ error: ''});
})
router.get('/shopProvider_register', function(req, res){
  res.render('shopProvider_register');
})
router.get('/shopRegistration', get_shop_reg.get_shop_reg)

//  LOUNGE RELETED GET ROUTS

router.get('/shetbook', function(req, res, next){
  res.redirect('/choiceFilling');
})
router.get(`/chooseLaunge/:id`, get_choose_lounge.get_choose_lounge )
router.get('/laungeadminforaddingitems/:id', add_lounges.add_lounges)

//  SHOP RELETED GET ROUTES 

router.get('/shop_procider_admin', get_shop_P_admin.shop_p_admin)
router.get('/shopadminforaddingitems/:id', add_shops.add_shops_shop)

// ITEM RELETED GET ROUTES  

router.get('/add_items/:id', get_add_items.add_items)
router.get('/item/:id', particuler_item.particuler_item_item)
router.get('/foodSelection', food_selection.food_selection_shop)




/****************************************** ALL POST ROUTES *************************************************************************/

//-----------------user-register-login ------------

router.post('/register', user_register.user_register_account);
router.post('/login', user_login.user_login_account)

// ------------- Lounge Provider ---------------------

router.post('/loungeProviderRegister', lounge_provider_register.lounge_provider_register_account );
router.post('/loungeProviderLogin', lounge_provider_login.lounge_provider_login_account)  
router.post('/loungeRegistration', lounge_registration.lounge_registration_account)
router.post('/edit_lounge', edit_lounge.edit_lounge_lounge)
router.post('/delete_lounge', delete_lounge.delete_lounge_lounge)
  
// ---------------------- ShopProvider ---------------------

router.post('/shopProviderRegister', shop_provider_register.shop_provider_register_account );
router.post('/shopProviderLogin', shop_provider_login.shop_provider_login_account)
router.post('/shopRegistration', shop_registration.shop_registration_account)
const add_items_post = require('./controllers/shop_item/addItems')

// ---------------------shop---------------------

router.post('/edit_shop', edit_shop.edit_shop_shop)
router.post('/delete_shop', delete_shop.delete_shop_shop)

// --------------------shop item ----------------

router.post('/foodOrder', food_order.food_order_item)
router.post('/add_items', upload.single("item_image"), add_items_post.add_items_post  
);
router.post('/edit_item',upload.single("Image"), edit_item.edit_item_item)
router.post('/delete_item', delete_item.delete_item_shop)

// ________________LOGOUT____________________

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

router.post('/choiceFilling',    async (req, res, next)=>{
  const stationName = req.body.stationName
  const bedCount = req.body.bedCount;
  let hours = req.body.hours

  let checkin1 = req.body.checkIn
  let dateF = moment(checkin1).format('YYYY-MM-DDTHH:mm:ss.SSSZ')
  let UTC_futureDate = moment(dateF).utc().add(hours, 'hours')

  myDate = UTC_futureDate ;
  let launges = await loungeRegistration.find({stationLocation: stationName})

  res.render("chooseLaunge", {launges})
} )


router.post('/choosen/:id', isLoggedIn,  async (req,res,next)=>{

let launge = await loungeRegistration.findOne({ _id: req.params.id})
let laungeName = launge.loungeName;
let user = await users.findOne({ email: req.cookies.user_email})
let username = user.name;

let seat_1;
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
  res.cookie('longe_booked_by_user', newOrder.loungeId, { httpOnly: true, maxAge: 1.728e8 });
  // res.redirect('/after_loungeBook_loggedInIndex')
  // console.log(newOrder.userName)
  res.render("selected_seat", {newOrder});
})
})

router.get('/after_loungeBook_loggedInIndex', async function(req, res){
 
  var lounges_for_shop = await loungeRegistration.find();
  let station = [];
  for(let i = 0;i<lounges_for_shop.length;i++){
    let station1 = lounges_for_shop[i].stationLocation
    station.push(station1)
  }

  let lounge = await loungeRegistration.findOne({ _id: req.cookies.longe_booked_by_user});  
  
  let shops1 = await shopRegistration.find({ station_Name: lounge.stationLocation });  
  
  var all_items =[];
  for(var i = 0; i < shops1.length; i++){
    var shop_item = await  shop_items.find({ shop_id: shops1[i].shopEmail }) 
    all_items.push(shop_item);
  }
  
  let shop_name = await shopRegistration.find();
    res.render('after_loungeBook_loggedInIndex', {station,lounge, all_items, shops1});
  })

  router.get('/forgot', (req, res)=>{
    res.render('forgot', { error: ''});
  })

  router.get('/forgot-lounge-provider', (req, res)=>{
    res.render('forgotLoungeProvider', { error: ''});
  })

  router.get('/forgot-shop-provider', (req, res)=>{
    res.render('forgotShopProvider', { error: ''});
  })
  // Route to send an OTP for password reset
router.post('/forgot', async (req, res) => {
  try {
    const userEmail = req.body.newemail;
    const user = await users.findOne({ email: userEmail });

    if (!user) {
      return res.status(401).render('forgot', { error: 'Incorrect email!..' });
      
    }

    // Generate a random OTP (4 digits)
    const otpCode = Math.floor(1000 + Math.random() * 9000);

    // Save the OTP in your database
    const otpData = new Otp({
      email: userEmail,
      code: otpCode,
      expireIn: new Date().getTime() + 60 * 1000, // OTP expiration time (5 minutes)
    });

    await otpData.save();

    // Send the OTP via email
    await sendOtpEmail(userEmail, otpCode);

     res.render('otp',{userEmail, otpCode});
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusText: 'error',
      message: 'An error occurred while processing your request.',
    });
  }
});

router.post('/forgot-lounge-provider', async (req, res) => {
  try {
    const userEmail = req.body.newemail;
    const user = await providerModel.findOne({ email: userEmail });

    if (!user) {
      return res.status(401).render('forgot-lounge-provider ', { error: 'Incorrect email!..' });
      
    }

    // Generate a random OTP (4 digits)
    const otpCode = Math.floor(1000 + Math.random() * 9000);

    // Save the OTP in your database
    const otpData = new Otp({
      email: userEmail,
      code: otpCode,
      expireIn: new Date().getTime() + 60 * 1000, // OTP expiration time (5 minutes)
    });

    await otpData.save();

    // Send the OTP via email
    await sendOtpEmail(userEmail, otpCode);

     res.render('otpLoungeProvider',{userEmail, otpCode});
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusText: 'error',
      message: 'An error occurred while processing your request.',
    });
  }
});

router.post('/forgot-shop-provider', async (req, res) => {
  try {
    const userEmail = req.body.newemail;
    const user = await shopProviderSchema.findOne({ shopEmail: userEmail });

    if (!user) {
      return res.status(401).render('forgot-shop-provider ', { error: 'Incorrect email!..' });
      
    }

    // Generate a random OTP (4 digits)
    const otpCode = Math.floor(1000 + Math.random() * 9000);

    // Save the OTP in your database
    const otpData = new Otp({
      email: userEmail,
      code: otpCode,
      expireIn: new Date().getTime() + 60 * 1000, // OTP expiration time (5 minutes)
    });

    await otpData.save();

    // Send the OTP via email
    await sendOtpEmail(userEmail, otpCode);

     res.render('otpShopProvider',{userEmail, otpCode});
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusText: 'error',
      message: 'An error occurred while processing your request.',
    });
  }
});

// Function to send an OTP via email
async function sendOtpEmail(email, otpCode) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'khileshmaskare03@gmail.com',
        pass: 'cerxgpsssmijkyil',
      },
    });

    const mailOptions = {
      from: 'khileshmaskare03@gmail.com',
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP code for password reset is: ${otpCode}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}


router.post('/otp', async (req, res, next) => {
  const otpCode = req.body.otpNumber;
  
  try {
    const otpData = await Otp.findOne({ code: otpCode });
    
    if (!otpData) {
      return res.status(400).redirect('/otp').json({
        statusText: 'error',
        message: 'Invalid OTP code',
      });
    }

    const currentTime = new Date().getTime();
    const diff = otpData.expireIn - currentTime;

    if (diff < 0) {
      return res.status(400).json({
        statusText: 'error',
        message: 'Token Expired',
      });
    }

    // If the OTP code is valid and not expired, render the 'reset-password' template
    res.render('reset-password', { otpData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusText: 'error',
      message: 'An error occurred while processing your request.',
    });
  }
});

router.post('/otp-lounge-provider', async (req, res, next) => {
  const otpCode = req.body.otpNumber;
  
  try {
    const otpData = await Otp.findOne({ code: otpCode });
    
    if (!otpData) {
      return res.status(400).redirect('/otp-lounge-provider').json({
        statusText: 'error',
        message: 'Invalid OTP code',
      });
    }

    const currentTime = new Date().getTime();
    const diff = otpData.expireIn - currentTime;

    if (diff < 0) {
      return res.status(400).json({
        statusText: 'error',
        message: 'Token Expired',
      });
    }

    // If the OTP code is valid and not expired, render the 'reset-password' template
    res.render('reset-password-lounge-provider', { otpData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusText: 'error',
      message: 'An error occurred while processing your request.',
    });
  }
});

router.post('/otp-shop-provider', async (req, res, next) => {
  const otpCode = req.body.otpNumber;
  
  try {
    const otpData = await Otp.findOne({ code: otpCode });
    
    if (!otpData) {
      return res.status(400).redirect('/otp-shop-provider').json({
        statusText: 'error',
        message: 'Invalid OTP code',
      });
    }

    const currentTime = new Date().getTime();
    const diff = otpData.expireIn - currentTime;

    if (diff < 0) {
      return res.status(400).json({
        statusText: 'error',
        message: 'Token Expired',
      });
    }

    // If the OTP code is valid and not expired, render the 'reset-password' template
    res.render('reset-password-shop-provider', { otpData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusText: 'error',
      message: 'An error occurred while processing your request.',
    });
  }
});

router.post('/reset', async (req, res) => {
  const { email, newPassword, otpCode } = req.body;

  try {
    // Find the OTP data in your database
    const otpData = await Otp.findOne({ email, code: otpCode });

    if (!otpData || otpData.expireIn < new Date().getTime()) {

      const message = "The OTP has expired. Please request a new OTP.";
      return res.render('reset-password', { message, otpData });
    }

    // Find the user associated with the email in otpData
    const user = await users.findOne({ email });

    if (!user) {
      return res.status(400).json({
        statusText: 'error',
        message: 'User not found.',
      });
    }

    // Update the user's password with the new one
    user.password = newPassword;

    // Save the updated user data
    await user.save();

    // Delete the OTP data (since it's no longer needed)
    // await otpData.remove();

    res.redirect('/login');
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusText: 'error',
      message: 'An error occurred while processing your request.',
    });
  }
});

router.post('/reset-lounge-provider', async (req, res) => {
  const { email, newPassword, otpCode } = req.body;

  try {
    // Find the OTP data in your database
    const otpData = await Otp.findOne({ email, code: otpCode });

    if (!otpData || otpData.expireIn < new Date().getTime()) {

      const message = "The OTP has expired. Please request a new OTP.";
      return res.render('reset-password-lounge-provider', { message, otpData });
    }

    // Find the user associated with the email in otpData
    const user = await providerModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        statusText: 'error',
        message: 'User not found.',
      });
    }

    console.log("previous pass"+user)
    // Update the user's password with the new one
    user.password = newPassword;

    // Save the updated user data
    await user.save();
    console.log("new pass"+user)
 
    // Delete the OTP data (since it's no longer needed)
    // await otpData.remove();

    res.redirect('/loungeProvider_login');
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusText: 'error',
      message: 'An error occurred while processing your request.',
    });
  }
});

router.post('/reset-shop-provider', async (req, res) => {
  const { email, newPassword, otpCode } = req.body;

  try {
    // Find the OTP data in your database
    const otpData = await Otp.findOne({ email, code: otpCode });

    if (!otpData || otpData.expireIn < new Date().getTime()) {

      const message = "The OTP has expired. Please request a new OTP.";
      return res.render('reset-password-shop-provider', { message, otpData });
    }

    
    // Find the user associated with the email in otpData
    const user = await shopProviderSchema.findOne({ email });
    
    if (!user) {
      return res.status(400).json({
        statusText: 'error',
        message: 'User not found.',
      });
    }
    
    // Update the user's password with the new one
    user.password = newPassword;
    
    // Save the updated user data
    await user.save();
    // console.log("khilesh"+ user)

    // Delete the OTP data (since it's no longer needed)
    // await otpData.remove();

    res.redirect('/shopProvider_login');
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusText: 'error',
      message: 'An error occurred while processing your request.',
    });
  }
});

router.post('/payment', async (req, res) => {
  // Access the amount from the request body correctly
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,  // amount in the smallest currency unit (paise for INR)
      currency: "INR",
      receipt: "order_rcptid_11"
    });

    res.status(201).json({
      success: true,
      order,
      amount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error creating the order.',
    });
  }
});

module.exports = router;