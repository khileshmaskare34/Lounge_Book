const mongoose=require("mongoose");
const passport = require("passport");
mongoose.set('strictQuery',true);
var passportLocalmongoose= require('passport-local-mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/LoungeBookDB")
.then(function(){
  console.log("connected to db");
})

var userSchema=mongoose.Schema({
  password:String,
  username:String,
  email:String,
  name:String
})


userSchema.plugin(passportLocalmongoose);
module.exports = mongoose.model("user",userSchema)