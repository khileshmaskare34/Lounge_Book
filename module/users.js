const mongoose=require("mongoose");
// mongoose.set('strictQuery',true);


mongoose.connect("mongodb://khileshmaskare03:Khilesh123@ac-kdampfs-shard-00-00.ulpglma.mongodb.net:27017,ac-kdampfs-shard-00-01.ulpglma.mongodb.net:27017,ac-kdampfs-shard-00-02.ulpglma.mongodb.net:27017/?ssl=true&replicaSet=atlas-kpbofv-shard-0&authSource=admin&retryWrites=true&w=majority") 
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