var express = require('express');
const passport = require('passport');
var router = express.Router();

const userModel = require("./users")
const localStrategy = require("passport-local");
const users = require('./users');
passport.use(new localStrategy(userModel.authenticate())); 


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

router.get('/register', function(req, res){
  res.render('register');
})


router.post('/register', function(req, res, next) {
  var newUser = new users({
    name:req.body.name,
    email:req.body.email,
    username:req.body.username,
    password:req.body.password  
  })
  users.register(newUser, req.body.password)
  .then(function(u){
    passport.authenticate('local')(req,res, function(){
      res.render("loggedInindex"); 
      // res.send("hello product saved");
    })
  })
});

router.get('/login',function(req,res,next){
  res.render("login");
  // res.send("hello");
})

router.post('/login',passport.authenticate('local',{
  successRedirect:'/loggedInindex',
  failureRedirect:'/login'
}),function(req,res,next){ 
  
 }
)

router.get('/loggedInindex',isLoggedIn,function(req,res,next){

  userModel.findOne({username:req.session.passport.user})
  .then(function(user){ 
    res.render("loggedInindex",{user});
  })
});

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
  
function isLoggedIn(req,res,next ){
  if(passport.authenticate()){
    return next();
  }
}



// ___________________________________Provider Login and Provider Register__________________________________

router.get('/provider_login', function(req, res){
  res.render('provider_login');
})

router.get('/provider_register', function(req, res){
  res.render('provider_register');
})


//_________________________________________________Enquiry Page_________________________________________
router.get('/enquiry', function(req, res){
  res.render('enquiry');
})

module.exports = router;
