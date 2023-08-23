const mongoose=require("mongoose");
// mongoose.set('strictQuery',true);


mongoose.connect("mongodb://127.0.0.1:27017/LoungeBookDB") 
.then(function(){
  console.log("connected to db");
})
 
var userSchema=mongoose.Schema({
  password:String,
  // username:String,
  email:String,
  name:String
})


module.exports = mongoose.model("user",userSchema)