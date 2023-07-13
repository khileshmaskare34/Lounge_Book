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

router.get('/slider', function(req, res){
  res.render('slider');
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
      // res.render("loggedInindex"); 
      res.send("hello product saved");
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






module.exports = router;
